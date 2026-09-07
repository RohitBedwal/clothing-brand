import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartOpenContext } from '../context/CartContext'
import { authContext } from '../context/AuthContext'
import orderService from '../services/orderService'
import { formatPrice } from '../src/utils/formatPrice'
import userService from '../services/userService'
import couponService from '../services/couponService'
import NavBar2 from '../components/NavBar2'

const shippingMethods = [
  { id: 'standard', name: 'Standard Delivery', days: '5–7 business days', price: 0, label: 'FREE' },
  { id: 'express', name: 'Express Delivery', days: '2–3 business days', price: 150, label: '₹150' },
];

const paymentMethods = [
  { id: 'upi', name: 'UPI' },
  { id: 'card', name: 'Credit / Debit Card' },
  { id: 'netbanking', name: 'Net Banking' },
  { id: 'wallet', name: 'Wallet' },
  { id: 'cod', name: 'Cash on Delivery' },
];

const InputField = ({ label, value, onChange, error, placeholder, type = 'text', half = false }) => (
  <div className={half ? 'flex-1' : 'w-full'}>
    <label className='block font-[amma3] text-[11px] text-gray-500 uppercase tracking-[1px] mb-[6px]'>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border ${error ? 'border-red-400' : 'border-gray-200'} px-[14px] py-[11px] font-[amma3] text-[13px] text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors`}
    />
    {error && <p className='font-[amma3] text-[10px] text-red-500 mt-[4px]'>{error}</p>}
  </div>
);

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, totalQuantity, clearCart } = useContext(cartOpenContext);
  const { currentUser } = useContext(authContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);

  // Contact
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newsletter, setNewsletter] = useState(false);

  // Shipping Address (for new address)
  const [country, setCountry] = useState('India');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [shipPhone, setShipPhone] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email || '');
      setPhone(currentUser.phone || '');
      setFirstName(currentUser.firstName || '');
      setLastName(currentUser.lastName || '');
      setShipPhone(currentUser.phone || '');
    }
  }, [currentUser]);

  // Shipping Method
  const [selectedShipping, setSelectedShipping] = useState('standard');

  // Payment
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  // Discount
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const shippingCost = shippingMethods.find(m => m.id === selectedShipping)?.price || 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shippingCost + tax - discount;

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const res = await userService.getAddresses();
        if (res.success) {
          setAddresses(res.addresses || []);
          const defaultAddr = res.addresses?.find(a => a.isDefault);
          if (defaultAddr) setSelectedAddressId(defaultAddr.id);
        }
      } catch { /* ignore */ }
    };
    loadAddresses();
  }, []);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    try {
      const res = await couponService.validateCoupon(discountCode);
      if (res.valid) {
        setDiscount(res.discount || 0);
        setDiscountApplied(true);
        setCouponError('');
      } else {
        setDiscount(0);
        setDiscountApplied(false);
        setCouponError(res.message || 'Invalid discount code');
      }
    } catch (err) {
      setDiscount(0);
      setDiscountApplied(false);
      setCouponError(err.message || 'Invalid discount code');
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!phone) newErrors.phone = 'Phone is required';

    if (showNewAddress || addresses.length === 0) {
      if (!firstName) newErrors.firstName = 'First name is required';
      if (!lastName) newErrors.lastName = 'Last name is required';
      if (!address) newErrors.address = 'Address is required';
      if (!city) newErrors.city = 'City is required';
      if (!state) newErrors.state = 'State is required';
      if (!pinCode) newErrors.pinCode = 'PIN code is required';
      if (!shipPhone) newErrors.shipPhone = 'Phone is required';
    } else if (!selectedAddressId) {
      newErrors.address = 'Select a shipping address';
    }

    if (selectedPayment === 'card') {
      if (!cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!cardName) newErrors.cardName = 'Name on card is required';
      if (!cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      if (!cardCvv) newErrors.cardCvv = 'CVV is required';
    }
    if (selectedPayment === 'upi' && !upiId) newErrors.upiId = 'UPI ID is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    if (cartItems.length === 0) return;

    setIsProcessing(true);
    try {
      let addressId = selectedAddressId;

      // If using new address, create it first
      if (showNewAddress || addresses.length === 0) {
        const addrRes = await userService.createAddress({
          firstName,
          lastName,
          phone: shipPhone,
          address,
          apartment,
          city,
          state,
          pinCode,
          country,
          isDefault: saveInfo,
        });
        if (addrRes.success) {
          addressId = addrRes.address.id;
        }
      }

      // Create order
      const orderData = {
        items: cartItems.map(item => ({
          variantId: item.variantId || item.variant?.id,
          quantity: item.quantity,
        })),
        addressId,
        shippingMethod: selectedShipping,
        notes: undefined,
        couponCode: discountApplied ? discountCode : undefined,
      };

      const order = await orderService.createOrder(orderData);
      localStorage.removeItem('echo_guest_cart');
      navigate(`/order-success/${order.orderNumber || order.id}`);
      clearCart();
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className='bg-white min-h-screen'>
        <NavBar2 />
        <div className='pt-[120px] pb-[80px] px-[30px] max-md:px-[16px] flex flex-col items-center'>
          <div className='text-center'>
            <i className="text-[60px] text-gray-200 ri-shopping-bag-line mb-[20px]"></i>
            <h2 className='font-[amma4] text-gray-900 text-[24px] tracking-[4px] uppercase mb-[12px]'>Your bag is empty</h2>
            <p className='font-[amma3] text-gray-400 text-[13px] tracking-[1px] mb-[32px]'>Add items to proceed with checkout</p>
            <button
              onClick={() => navigate('/')}
              className='px-[40px] py-[14px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors'
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />

      <div className='pt-[100px] pb-[60px] px-[30px] max-md:px-[16px]'>
        <div className='max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-[50px]'>

          {/* LEFT — Checkout Form */}
          <div className='w-full lg:w-[60%] space-y-[40px]'>

            {errors.general && (
              <div className='p-[14px] bg-red-50 border border-red-200 text-red-700 font-[amma3] text-[13px] text-center'>
                {errors.general}
              </div>
            )}

            {/* Contact Information */}
            <div>
              <h2 className='font-[amma4] text-gray-900 text-[16px] tracking-[3px] uppercase mb-[20px]'>Contact Information</h2>
              <div className='space-y-[14px]'>
                <InputField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="email@example.com" type="email" />
                <InputField label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} placeholder="+91 98765 43210" type="tel" />
                <label className='flex items-center gap-[8px] cursor-pointer'>
                  <input type='checkbox' checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} className='w-[14px] h-[14px] accent-gray-900' />
                  <span className='font-[amma3] text-[12px] text-gray-500'>Email me with news and offers</span>
                </label>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className='font-[amma4] text-gray-900 text-[16px] tracking-[3px] uppercase mb-[20px]'>Shipping Address</h2>

              {addresses.length > 0 && !showNewAddress && (
                <div className='space-y-[10px] mb-[16px]'>
                  {addresses.map(addr => (
                    <button
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`w-full text-left p-[14px] border transition-all ${
                        selectedAddressId === addr.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className='flex items-start gap-[12px]'>
                        <div className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center mt-[2px] shrink-0 ${
                          selectedAddressId === addr.id ? 'border-gray-900' : 'border-gray-300'
                        }`}>
                          {selectedAddressId === addr.id && <div className='w-[8px] h-[8px] bg-gray-900 rounded-full'></div>}
                        </div>
                        <div>
                          <p className='font-[amma3] text-[13px] text-gray-900'>{addr.firstName} {addr.lastName}</p>
                          <p className='font-[amma3] text-[12px] text-gray-500 mt-[2px]'>
                            {addr.address}{addr.apartment ? `, ${addr.apartment}` : ''}, {addr.city}, {addr.state} {addr.pinCode}
                          </p>
                          {addr.isDefault && (
                            <span className='inline-block mt-[4px] px-[6px] py-[1px] bg-gray-100 text-gray-600 font-[amma3] text-[10px] uppercase'>Default</span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                  <button onClick={() => setShowNewAddress(true)} className='font-[amma3] text-[12px] text-gray-500 hover:text-gray-900 underline underline-offset-2'>
                    Use a new address
                  </button>
                </div>
              )}

              {(showNewAddress || addresses.length === 0) && (
                <div className='space-y-[14px]'>
                  <InputField label="Country / Region" value={country} onChange={(e) => setCountry(e.target.value)} />
                  <div className='flex gap-[14px]'>
                    <InputField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={errors.firstName} placeholder="John" half />
                    <InputField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} error={errors.lastName} placeholder="Doe" half />
                  </div>
                  <InputField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} error={errors.address} placeholder="123 Main Street" />
                  <InputField label="Apartment, suite, etc. (optional)" value={apartment} onChange={(e) => setApartment(e.target.value)} placeholder="Apt 4B" />
                  <div className='flex gap-[14px]'>
                    <InputField label="City" value={city} onChange={(e) => setCity(e.target.value)} error={errors.city} placeholder="Mumbai" half />
                    <InputField label="State" value={state} onChange={(e) => setState(e.target.value)} error={errors.state} placeholder="Maharashtra" half />
                  </div>
                  <div className='flex gap-[14px]'>
                    <InputField label="PIN Code" value={pinCode} onChange={(e) => setPinCode(e.target.value)} error={errors.pinCode} placeholder="400001" half />
                    <InputField label="Phone" value={shipPhone} onChange={(e) => setShipPhone(e.target.value)} error={errors.shipPhone} placeholder="+91 98765 43210" type="tel" half />
                  </div>
                  <label className='flex items-center gap-[8px] cursor-pointer'>
                    <input type='checkbox' checked={saveInfo} onChange={(e) => setSaveInfo(e.target.checked)} className='w-[14px] h-[14px] accent-gray-900' />
                    <span className='font-[amma3] text-[12px] text-gray-500'>Save this information for next time</span>
                  </label>
                  {addresses.length > 0 && (
                    <button onClick={() => setShowNewAddress(false)} className='font-[amma3] text-[12px] text-gray-500 hover:text-gray-900 underline underline-offset-2'>
                      Use a saved address
                    </button>
                  )}
                </div>
              )}
              {errors.address && !showNewAddress && addresses.length > 0 && (
                <p className='font-[amma3] text-[10px] text-red-500 mt-[4px]'>{errors.address}</p>
              )}
            </div>

            {/* Shipping Method */}
            <div>
              <h2 className='font-[amma4] text-gray-900 text-[16px] tracking-[3px] uppercase mb-[20px]'>Shipping Method</h2>
              <div className='space-y-[10px]'>
                {shippingMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedShipping(method.id)}
                    className={`w-full flex items-center justify-between px-[16px] py-[14px] border transition-all ${
                      selectedShipping === method.id
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className='flex items-center gap-[12px]'>
                      <div className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center ${
                        selectedShipping === method.id ? 'border-gray-900' : 'border-gray-300'
                      }`}>
                        {selectedShipping === method.id && <div className='w-[8px] h-[8px] bg-gray-900 rounded-full'></div>}
                      </div>
                      <div className='text-left'>
                        <p className='font-[amma3] text-[13px] text-gray-900'>{method.name}</p>
                        <p className='font-[amma3] text-[11px] text-gray-400'>{method.days}</p>
                      </div>
                    </div>
                    <span className='font-[amma3] text-[13px] text-gray-900'>{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className='font-[amma4] text-gray-900 text-[16px] tracking-[3px] uppercase mb-[20px]'>Payment</h2>
              <div className='space-y-[8px]'>
                {paymentMethods.map((method) => (
                  <div key={method.id}>
                    <button
                      onClick={() => setSelectedPayment(method.id)}
                      className={`w-full flex items-center gap-[12px] px-[16px] py-[14px] border transition-all ${
                        selectedPayment === method.id
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedPayment === method.id ? 'border-gray-900' : 'border-gray-300'
                      }`}>
                        {selectedPayment === method.id && <div className='w-[8px] h-[8px] bg-gray-900 rounded-full'></div>}
                      </div>
                      <span className='font-[amma3] text-[13px] text-gray-900'>{method.name}</span>
                    </button>

                    {method.id === 'card' && selectedPayment === 'card' && (
                      <div className='pl-[28px] pt-[14px] space-y-[12px] transition-all duration-300'>
                        <InputField label="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} error={errors.cardNumber} placeholder="1234 5678 9012 3456" />
                        <InputField label="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} error={errors.cardName} placeholder="John Doe" />
                        <div className='flex gap-[12px]'>
                          <InputField label="Expiry Date" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} error={errors.cardExpiry} placeholder="MM/YY" half />
                          <InputField label="CVV" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} error={errors.cardCvv} placeholder="123" type="password" half />
                        </div>
                      </div>
                    )}

                    {method.id === 'upi' && selectedPayment === 'upi' && (
                      <div className='pl-[28px] pt-[14px] transition-all duration-300'>
                        <InputField label="UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} error={errors.upiId} placeholder="yourname@upi" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Place Order Button - Mobile */}
            <div className='lg:hidden'>
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`w-full py-[16px] font-[amma3] text-[12px] tracking-[3px] uppercase transition-colors ${
                  isProcessing
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-black'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className='w-full lg:w-[40%] lg:pl-[20px]'>
            <div className='lg:sticky lg:top-[100px] lg:self-start'>
              <h2 className='font-[amma4] text-gray-900 text-[16px] tracking-[3px] uppercase mb-[24px]'>Order Summary</h2>

              {/* Cart Items */}
              <div className='space-y-[16px] mb-[24px] max-h-[300px] overflow-y-auto'>
                {cartItems.map((item) => {
                  const variant = item.variant;
                  const product = variant?.product;
                  const price = Number(variant?.price) || 0;
                  const itemTotal = price * (item.quantity || 1);
                  const img = product?.images?.[0]?.url;
                  return (
                    <div key={item.id} className='flex gap-[12px]'>
                      <div className='w-[60px] h-[76px] bg-gray-50 flex-shrink-0 overflow-hidden relative'>
                        {img && <img src={img} alt={product?.name} className='w-full h-full object-cover' />}
                        <span className='absolute -top-[1px] -right-[1px] w-[18px] h-[18px] bg-gray-600 text-white text-[9px] font-[amma3] flex items-center justify-center rounded-full'>
                          {item.quantity || 1}
                        </span>
                      </div>
                      <div className='flex-1'>
                        <p className='font-[amma4] text-[12px] text-gray-900 uppercase tracking-[1px] mb-[2px]'>{product?.name || 'Product'}</p>
                        {variant?.color && <p className='font-[amma3] text-[10px] text-gray-400'>Color: {variant.color}</p>}
                        {variant?.size && <p className='font-[amma3] text-[10px] text-gray-400'>Size: {variant.size}</p>}
                        <p className='font-[amma3] text-[11px] text-gray-400 mt-[4px]'>Qty: {item.quantity || 1}</p>
                      </div>
                      <span className='font-[amma3] text-[12px] text-gray-900'>{formatPrice(itemTotal)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Discount Code */}
              <div className='mb-[24px] pb-[24px] border-b border-gray-100'>
                <p className='font-[amma3] text-[11px] text-gray-500 uppercase tracking-[1px] mb-[8px]'>Discount Code</p>
                <div className='flex gap-[8px]'>
                  <input
                    type='text'
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder='Enter discount code'
                    className='flex-1 border border-gray-200 px-[12px] py-[10px] font-[amma3] text-[12px] text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors'
                  />
                  <button
                    onClick={handleApplyDiscount}
                    className='px-[16px] py-[10px] border border-gray-900 font-[amma3] text-[11px] tracking-[1px] uppercase text-gray-900 hover:bg-gray-900 hover:text-white transition-all'
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className='font-[amma3] text-[10px] text-red-500 mt-[4px]'>{couponError}</p>}
                {discountApplied && <p className='font-[amma3] text-[10px] text-green-600 mt-[4px]'>Discount applied!</p>}
              </div>

              {/* Summary */}
              <div className='space-y-[12px] mb-[20px]'>
                <div className='flex justify-between'>
                  <span className='font-[amma3] text-[12px] text-gray-500'>Subtotal ({totalQuantity} items)</span>
                  <span className='font-[amma3] text-[13px] text-gray-900'>{formatPrice(subtotal)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-[amma3] text-[12px] text-gray-500'>Shipping</span>
                  <span className='font-[amma3] text-[13px] text-gray-900'>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                </div>
                {discount > 0 && (
                  <div className='flex justify-between'>
                    <span className='font-[amma3] text-[12px] text-gray-500'>Discount</span>
                    <span className='font-[amma3] text-[13px] text-green-600'>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className='flex justify-between'>
                  <span className='font-[amma3] text-[12px] text-gray-500'>Tax (18% GST)</span>
                  <span className='font-[amma3] text-[13px] text-gray-900'>{formatPrice(tax)}</span>
                </div>
              </div>

              <div className='border-t border-gray-200 pt-[16px] mb-[24px]'>
                <div className='flex justify-between'>
                  <span className='font-[amma4] text-[14px] text-gray-900 uppercase tracking-[1px]'>Total</span>
                  <span className='font-[amma4] text-[16px] text-gray-900'>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Place Order Button - Desktop */}
              <div className='hidden lg:block'>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className={`w-full py-[16px] font-[amma3] text-[12px] tracking-[3px] uppercase transition-colors ${
                    isProcessing
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-black'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </div>

              <p className='font-[amma3] text-[10px] text-gray-400 text-center mt-[16px]'>
                Tax included. Shipping calculated at checkout.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
