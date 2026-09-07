import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AccountLayout from '../../components/AccountLayout'
import orderService from '../../services/orderService'

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
    RETURNED: 'bg-gray-100 text-gray-700',
    REFUNDED: 'bg-emerald-100 text-emerald-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

const formatStatus = (status) => {
  return status?.replace(/_/g, ' ') || 'Unknown';
};

const AccountOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getOrders();
        setOrders(res.orders || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <AccountLayout>
      <h2 className='font-[amma4] text-gray-900 text-[16px] tracking-[2px] uppercase mb-[24px]'>Order History</h2>

      {loading ? (
        <div className='border border-gray-200 p-[60px] text-center'>
          <p className='font-[amma3] text-gray-400 text-[14px]'>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className='border border-gray-200 p-[60px] text-center'>
          <i className='ri-shopping_bag-line text-[48px] text-gray-200 mb-[16px]'></i>
          <p className='font-[amma3] text-gray-400 text-[14px] mb-[20px]'>You haven't placed any orders yet.</p>
          <Link to='/collections' className='inline-block py-[12px] px-[28px] bg-gray-900 text-white font-[amma3] text-[11px] tracking-[3px] uppercase hover:bg-black transition-colors'>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className='space-y-[16px]'>
          {orders.map(order => (
            <Link key={order.id} to={`/account/orders/${order.id}`} className='block border border-gray-200 p-[20px] hover:border-gray-900 transition-colors'>
              <div className='flex items-start justify-between mb-[12px] max-sm:flex-col max-sm:gap-[8px]'>
                <div>
                  <p className='font-[amma4] text-gray-900 text-[14px]'>#{order.orderNumber || order.id.slice(0, 8)}</p>
                  <p className='font-[amma3] text-gray-500 text-[12px] mt-[2px]'>
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-[amma4] text-gray-900 text-[14px]'>₹{Number(order.total).toLocaleString('en-IN')}</p>
                  <span className={`inline-block mt-[4px] px-[10px] py-[3px] font-[amma3] text-[10px] uppercase tracking-[1px] ${getStatusColor(order.status)}`}>
                    {formatStatus(order.status)}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-[8px] overflow-x-auto pb-[4px]'>
                {(order.items || []).slice(0, 4).map((item, i) => (
                  <div key={i} className='w-[50px] h-[50px] bg-gray-100 shrink-0 overflow-hidden'>
                    <img src={item.imageUrl || '/placeholder.png'} alt='' className='w-full h-full object-cover' />
                  </div>
                ))}
                {order.items?.length > 4 && (
                  <span className='font-[amma3] text-[12px] text-gray-400'>+{order.items.length - 4} more</span>
                )}
              </div>

              <div className='flex items-center justify-between mt-[12px] pt-[12px] border-t border-gray-100'>
                <span className='font-[amma3] text-[12px] text-gray-500'>{order.items?.length || 0} item{(order.items?.length || 0) > 1 ? 's' : ''}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AccountLayout>
  );
};

export default AccountOrders;
