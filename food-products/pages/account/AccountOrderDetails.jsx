import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AccountLayout from '../../components/AccountLayout'
import orderService from '../../services/orderService'

const TRACKING_STEPS = ['PENDING', 'CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];

const getStatusColor = (status) => {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    CONFIRMED: 'bg-blue-100 text-blue-700',
    PROCESSING: 'bg-indigo-100 text-indigo-700',
    PACKED: 'bg-purple-100 text-purple-700',
    SHIPPED: 'bg-cyan-100 text-cyan-700',
    OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-700',
    DELIVERED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

const formatStatus = (status) => status?.replace(/_/g, ' ') || 'Unknown';

const AccountOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderService.getOrderById(orderId);
        setOrder(res);
      } catch {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const res = await orderService.cancelOrder(orderId);
      setOrder(res);
      setShowCancelModal(false);
    } catch {
      /* ignore */
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <AccountLayout>
        <div className='border border-gray-200 p-[60px] text-center'>
          <p className='font-[amma3] text-gray-400 text-[14px]'>Loading order details...</p>
        </div>
      </AccountLayout>
    );
  }

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
  const isDelivered = order.status === 'DELIVERED';
  const canCancel = ['PENDING', 'CONFIRMED'].includes(order.status);

  const addr = order.shippingAddressSnapshot;

  return (
    <AccountLayout>
      <div className='space-y-[32px]'>
        <div className='flex items-start justify-between max-sm:flex-col max-sm:gap-[12px]'>
          <div>
            <h2 className='font-[amma4] text-gray-900 text-[16px] tracking-[2px] uppercase'>#{order.orderNumber || order.id.slice(0, 8)}</h2>
            <p className='font-[amma3] text-gray-500 text-[12px] mt-[4px]'>
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className='flex items-center gap-[12px]'>
            <span className={`px-[12px] py-[4px] font-[amma3] text-[11px] uppercase tracking-[1px] ${getStatusColor(order.status)}`}>{formatStatus(order.status)}</span>
            <span className='px-[12px] py-[4px] font-[amma3] text-[11px] uppercase tracking-[1px] bg-gray-100 text-gray-600'>Paid</span>
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
                    <p className={`font-[amma3] text-[13px] ${isActive ? 'text-gray-900 font-[amma4]' : 'text-gray-400'}`}>{formatStatus(step)}</p>
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
            {(order.items || []).map((item, i) => (
              <div key={i} className='flex items-center gap-[14px] pb-[12px] border-b border-gray-100 last:border-0 last:pb-0'>
                <div className='w-[56px] h-[56px] bg-gray-100 shrink-0 overflow-hidden'>
                  <img src={item.imageUrl || '/placeholder.png'} alt='' className='w-full h-full object-cover' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='font-[amma4] text-gray-900 text-[13px] truncate'>{item.name}</p>
                  <p className='font-[amma3] text-gray-500 text-[12px] mt-[2px]'>
                    {item.color && `${item.color} / `}{item.size && `${item.size} / `}Qty: {item.quantity}
                  </p>
                </div>
                <p className='font-[amma4] text-gray-900 text-[13px] shrink-0'>₹{Number(item.totalPrice).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-[24px]'>
          {/* Shipping */}
          {addr && (
            <div className='border border-gray-200 p-[24px]'>
              <h3 className='font-[amma4] text-gray-900 text-[13px] tracking-[2px] uppercase mb-[12px]'>Shipping Address</h3>
              <div className='font-[amma3] text-gray-600 text-[13px] leading-[1.8]'>
                <p>{addr.firstName} {addr.lastName}</p>
                <p>{addr.address}</p>
                {addr.apartment && <p>{addr.apartment}</p>}
                <p>{addr.city}, {addr.state} {addr.pinCode}</p>
                {addr.phone && <p>{addr.phone}</p>}
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div className='border border-gray-200 p-[24px]'>
            <h3 className='font-[amma4] text-gray-900 text-[13px] tracking-[2px] uppercase mb-[12px]'>Payment Summary</h3>
            <div className='space-y-[8px] font-[amma3] text-[13px]'>
              <div className='flex justify-between'><span className='text-gray-500'>Subtotal</span><span className='text-gray-900'>₹{Number(order.subtotal).toLocaleString('en-IN')}</span></div>
              <div className='flex justify-between'><span className='text-gray-500'>Shipping</span><span className='text-gray-900'>{order.shippingCost === 0 ? 'FREE' : `₹${order.shippingCost}`}</span></div>
              {order.discountAmount > 0 && <div className='flex justify-between'><span className='text-gray-500'>Discount</span><span className='text-green-600'>-₹{Number(order.discountAmount).toLocaleString('en-IN')}</span></div>}
              {order.taxAmount > 0 && <div className='flex justify-between'><span className='text-gray-500'>Tax (GST)</span><span className='text-gray-900'>₹{Number(order.taxAmount).toLocaleString('en-IN')}</span></div>}
              <div className='flex justify-between pt-[8px] border-t border-gray-200 font-[amma4]'>
                <span>Total</span><span>₹{Number(order.total).toLocaleString('en-IN')}</span>
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
              <p className='font-[amma3] text-gray-500 text-[13px] mb-[24px]'>Are you sure you want to cancel order #{order.orderNumber || order.id.slice(0, 8)}? This action cannot be undone.</p>
              <div className='flex gap-[12px]'>
                <button onClick={() => setShowCancelModal(false)} className='flex-1 py-[12px] border border-gray-300 font-[amma3] text-[11px] tracking-[2px] uppercase text-gray-700 hover:border-gray-900 transition-colors'>Keep Order</button>
                <button onClick={handleCancel} disabled={cancelling} className='flex-1 py-[12px] bg-red-600 text-white font-[amma3] text-[11px] tracking-[2px] uppercase hover:bg-red-700 transition-colors disabled:opacity-50'>
                  {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default AccountOrderDetails;
