import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AccountLayout from '../../components/AccountLayout'

const TRACKING_STEPS = ['Order Placed', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

const getStatusColor = (status) => {
  const colors = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Confirmed: 'bg-blue-100 text-blue-700',
    Processing: 'bg-indigo-100 text-indigo-700',
    Packed: 'bg-purple-100 text-purple-700',
    Shipped: 'bg-cyan-100 text-cyan-700',
    'Out for Delivery': 'bg-orange-100 text-orange-700',
    Delivered: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

const AccountOrderDetails = () => {
  const { orderId } = useParams();
  const orders = JSON.parse(localStorage.getItem('echo_orders') || '[]');
  const order = orders.find(o => o.id === orderId);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  if (!order) {
    return (
      <AccountLayout>
        <div className='border border-gray-200 p-[60px] text-center'>
          <p className='font-[amma3] text-gray-400 text-[14px] mb-[20px]'>Order not found.</p>
          <Link to='/account/orders' className='inline-block py-[12px] px-[28px] bg-gray-900 text-white font-[amma3] text-[11px] tracking-[3px] uppercase hover:bg-black transition-colors'>
            View Orders
          </Link>
        </div>
      </AccountLayout>
    );
  }

  const currentStep = TRACKING_STEPS.indexOf(order.status);
  const isDelivered = order.status === 'Delivered';
  const canCancel = ['Pending', 'Confirmed'].includes(order.status) && !cancelled;

  const handleCancel = () => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o);
    localStorage.setItem('echo_orders', JSON.stringify(updated));
    setShowCancelModal(false);
    setCancelled(true);
  };

  return (
    <AccountLayout>
      <div className='space-y-[32px]'>
        <div className='flex items-start justify-between max-sm:flex-col max-sm:gap-[12px]'>
          <div>
            <h2 className='font-[amma4] text-gray-900 text-[16px] tracking-[2px] uppercase'>#{order.id}</h2>
            <p className='font-[amma3] text-gray-500 text-[12px] mt-[4px]'>
              Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className='flex items-center gap-[12px]'>
            <span className={`px-[12px] py-[4px] font-[amma3] text-[11px] uppercase tracking-[1px] ${getStatusColor(order.status)}`}>{order.status}</span>
            <span className='px-[12px] py-[4px] font-[amma3] text-[11px] uppercase tracking-[1px] bg-gray-100 text-gray-600'>
              {order.paymentMethod === 'cod' ? 'COD' : 'Paid'}
            </span>
          </div>
        </div>

        {/* Tracking */}
        <div className='border border-gray-200 p-[24px]'>
          <h3 className='font-[amma4] text-gray-900 text-[13px] tracking-[2px] uppercase mb-[20px]'>Order Tracking</h3>
          <div className='space-y-[0px]'>
            {TRACKING_STEPS.map((step, i) => {
              const isActive = i <= currentStep && currentStep >= 0;
              const isCurrent = i === currentStep;
              return (
                <div key={step} className='flex items-start gap-[14px]'>
                  <div className='flex flex-col items-center'>
                    <div className={`w-[14px] h-[14px] rounded-full border-2 shrink-0 ${isActive ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-300'} ${isCurrent ? 'ring-2 ring-gray-300' : ''}`}></div>
                    {i < TRACKING_STEPS.length - 1 && <div className={`w-[1px] h-[28px] ${isActive ? 'bg-gray-900' : 'bg-gray-200'}`}></div>}
                  </div>
                  <div className='pb-[14px]'>
                    <p className={`font-[amma3] text-[13px] ${isActive ? 'text-gray-900 font-[amma4]' : 'text-gray-400'}`}>{step}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Products */}
        <div className='border border-gray-200 p-[24px]'>
          <h3 className='font-[amma4] text-gray-900 text-[13px] tracking-[2px] uppercase mb-[16px]'>Products</h3>
          <div className='space-y-[12px]'>
            {order.items.map((item, i) => (
              <div key={i} className='flex items-center gap-[14px] pb-[12px] border-b border-gray-100 last:border-0 last:pb-0'>
                <div className='w-[56px] h-[56px] bg-gray-100 shrink-0 overflow-hidden'>
                  {item.image && <img src={item.image} alt='' className='w-full h-full object-cover' />}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='font-[amma4] text-gray-900 text-[13px] truncate'>{item.name}</p>
                  <p className='font-[amma3] text-gray-500 text-[12px] mt-[2px]'>
                    {item.color && `${item.color} / `}{item.size && `${item.size} / `}Qty: {item.count || 1}
                  </p>
                </div>
                <p className='font-[amma4] text-gray-900 text-[13px] shrink-0'>₹{(item.price * (item.count || 1)).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-[24px]'>
          {/* Shipping */}
          {order.shippingAddress && (
            <div className='border border-gray-200 p-[24px]'>
              <h3 className='font-[amma4] text-gray-900 text-[13px] tracking-[2px] uppercase mb-[12px]'>Shipping Address</h3>
              <div className='font-[amma3] text-gray-600 text-[13px] leading-[1.8]'>
                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.address}</p>
                {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pinCode}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div className='border border-gray-200 p-[24px]'>
            <h3 className='font-[amma4] text-gray-900 text-[13px] tracking-[2px] uppercase mb-[12px]'>Payment Summary</h3>
            <div className='space-y-[8px] font-[amma3] text-[13px]'>
              <div className='flex justify-between'><span className='text-gray-500'>Subtotal</span><span className='text-gray-900'>₹{order.subtotal.toLocaleString('en-IN')}</span></div>
              <div className='flex justify-between'><span className='text-gray-500'>Shipping</span><span className='text-gray-900'>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span></div>
              {order.discount > 0 && <div className='flex justify-between'><span className='text-gray-500'>Discount</span><span className='text-green-600'>-₹{order.discount.toLocaleString('en-IN')}</span></div>}
              {order.tax > 0 && <div className='flex justify-between'><span className='text-gray-500'>Tax (GST)</span><span className='text-gray-900'>₹{order.tax.toLocaleString('en-IN')}</span></div>}
              <div className='flex justify-between pt-[8px] border-t border-gray-200 font-[amma4]'>
                <span>Total</span><span>₹{order.total.toLocaleString('en-IN')}</span>
              </div>
              <div className='flex justify-between pt-[4px]'>
                <span className='text-gray-500'>Payment</span>
                <span className='text-gray-700 uppercase'>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex gap-[12px] max-sm:flex-col'>
          {isDelivered && (
            <button className='py-[12px] px-[24px] border border-gray-300 font-[amma3] text-[11px] tracking-[2px] uppercase text-gray-700 hover:border-gray-900 transition-colors'>
              <i className='ri-download-line mr-[6px]'></i>Download Invoice
            </button>
          )}
          {isDelivered && (
            <button className='py-[12px] px-[24px] border border-gray-300 font-[amma3] text-[11px] tracking-[2px] uppercase text-gray-700 hover:border-gray-900 transition-colors'>
              <i className='ri-return-left-line mr-[6px]'></i>Return Item
            </button>
          )}
          {canCancel && (
            <button onClick={() => setShowCancelModal(true)} className='py-[12px] px-[24px] border border-red-300 font-[amma3] text-[11px] tracking-[2px] uppercase text-red-600 hover:bg-red-50 transition-colors'>
              Cancel Order
            </button>
          )}
        </div>

        <Link to='/account/orders' className='inline-flex items-center gap-[6px] font-[amma3] text-[12px] text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-2'>
          <i className='ri-arrow-left-line text-[14px]'></i>Back to Orders
        </Link>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40' onClick={() => setShowCancelModal(false)}>
            <div className='bg-white p-[32px] max-w-[380px] w-[90%]' onClick={e => e.stopPropagation()}>
              <h3 className='font-[amma4] text-gray-900 text-[16px] tracking-[1px] uppercase mb-[12px]'>Cancel Order?</h3>
              <p className='font-[amma3] text-gray-500 text-[13px] mb-[24px]'>Are you sure you want to cancel order #{orderId}? This action cannot be undone.</p>
              <div className='flex gap-[12px]'>
                <button onClick={() => setShowCancelModal(false)} className='flex-1 py-[12px] border border-gray-300 font-[amma3] text-[11px] tracking-[2px] uppercase text-gray-700 hover:border-gray-900 transition-colors'>Keep Order</button>
                <button onClick={handleCancel} className='flex-1 py-[12px] bg-red-600 text-white font-[amma3] text-[11px] tracking-[2px] uppercase hover:bg-red-700 transition-colors'>Yes, Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default AccountOrderDetails;
