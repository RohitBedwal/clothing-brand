import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../../context/AuthContext'
import { cartOpenContext } from '../../context/CartContext'
import { wishlistContext } from '../../context/WishlistContext'
import AccountLayout from '../../components/AccountLayout'

const AccountDashboard = () => {
  const { currentUser } = useContext(authContext);
  const { cartItems } = useContext(cartOpenContext);
  const { wishlistItems } = useContext(wishlistContext);
  const orders = JSON.parse(localStorage.getItem('echo_orders') || '[]');
  const addresses = JSON.parse(localStorage.getItem('echo_addresses') || '[]');
  const recentOrders = orders.slice(-3).reverse();

  return (
    <AccountLayout>
      <div className='space-y-[32px]'>
        <div>
          <p className='font-[amma3] text-[13px] text-gray-500 mb-[4px]'>Hello,</p>
          <h2 className='font-[amma4] text-gray-900 text-[18px] tracking-[2px]'>
            {currentUser?.firstName} {currentUser?.lastName}
          </h2>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-[16px]'>
          {[
            { label: 'Orders', value: orders.length, icon: 'ri-file-list-3-line', to: '/account/orders' },
            { label: 'Wishlist', value: wishlistItems.length, icon: 'ri-heart-line', to: '/account/wishlist' },
            { label: 'Addresses', value: addresses.length, icon: 'ri-map-pin-line', to: '/account/addresses' },
            { label: 'Cart', value: cartItems.length, icon: 'ri-shopping-bag-line', to: '/cart' },
          ].map(item => (
            <Link key={item.label} to={item.to} className='border border-gray-200 p-[20px] text-center hover:border-gray-900 transition-colors'>
              <i className={`${item.icon} text-[24px] text-gray-400 mb-[8px]`}></i>
              <p className='font-[amma4] text-gray-900 text-[20px]'>{item.value}</p>
              <p className='font-[amma3] text-gray-500 text-[11px] uppercase tracking-[2px] mt-[4px]'>{item.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-[12px]'>
          {[
            { label: 'View Orders', to: '/account/orders', icon: 'ri-arrow-right-line' },
            { label: 'Wishlist', to: '/account/wishlist', icon: 'ri-arrow-right-line' },
            { label: 'Edit Profile', to: '/account/profile', icon: 'ri-arrow-right-line' },
            { label: 'Manage Addresses', to: '/account/addresses', icon: 'ri-arrow-right-line' },
          ].map(item => (
            <Link key={item.to} to={item.to} className='flex items-center justify-between p-[14px] bg-gray-50 hover:bg-gray-100 transition-colors font-[amma3] text-[12px] text-gray-700 uppercase tracking-[1px]'>
              {item.label}
              <i className={`${item.icon} text-[14px]`}></i>
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div>
          <div className='flex items-center justify-between mb-[16px]'>
            <h3 className='font-[amma4] text-gray-900 text-[14px] tracking-[2px] uppercase'>Recent Orders</h3>
            {orders.length > 0 && <Link to='/account/orders' className='font-[amma3] text-[12px] text-gray-500 hover:text-gray-900 underline underline-offset-2'>View All</Link>}
          </div>

          {recentOrders.length === 0 ? (
            <div className='border border-gray-200 p-[40px] text-center'>
              <p className='font-[amma3] text-gray-400 text-[13px] mb-[16px]'>You haven't placed any orders yet.</p>
              <Link to='/collections' className='inline-block py-[12px] px-[28px] bg-gray-900 text-white font-[amma3] text-[11px] tracking-[3px] uppercase hover:bg-black transition-colors'>
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className='space-y-[12px]'>
              {recentOrders.map(order => (
                <Link key={order.id} to={`/account/orders/${order.id}`} className='flex items-center justify-between border border-gray-200 p-[16px] hover:border-gray-900 transition-colors'>
                  <div>
                    <p className='font-[amma4] text-gray-900 text-[13px]'>#{order.id}</p>
                    <p className='font-[amma3] text-gray-500 text-[12px] mt-[2px]'>
                      {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} &middot; {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-[amma4] text-gray-900 text-[13px]'>₹{order.total.toLocaleString('en-IN')}</p>
                    <span className={`inline-block mt-[4px] px-[8px] py-[2px] font-[amma3] text-[10px] uppercase tracking-[1px] ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>{order.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default AccountDashboard;
