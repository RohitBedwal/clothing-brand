import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
import NavBar2 from '../components/NavBar2'

const links = [
  { to: '/account', label: 'Dashboard', icon: 'ri-dashboard-line', end: true },
  { to: '/account/orders', label: 'Orders', icon: 'ri-file-list-3-line' },
  { to: '/account/wishlist', label: 'Wishlist', icon: 'ri-heart-line' },
  { to: '/account/profile', label: 'Profile', icon: 'ri-user-3-line' },
  { to: '/account/addresses', label: 'Addresses', icon: 'ri-map-pin-line' },
];

const AccountLayout = ({ children }) => {
  const { currentUser, logout } = useContext(authContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <div className='pt-[110px] pb-[80px] px-[30px] max-md:px-[16px] max-w-[1200px] mx-auto'>
        <h1 className='font-[amma4] text-gray-900 text-[22px] tracking-[4px] uppercase mb-[32px]'>My Account</h1>

        <div className='flex gap-[40px] max-md:flex-col'>
          {/* Sidebar */}
          <div className='w-full max-w-[240px] max-md:w-full max-md:max-w-none shrink-0 max-md:mb-[20px]'>
            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className='hidden max-md:flex w-full items-center justify-between py-[12px] px-[14px] border border-gray-200 font-[amma3] text-[13px] text-gray-700'
            >
              <span>{currentUser?.firstName || 'My Account'}</span>
              <i className={`ri-arrow-down-s-line text-[18px] transition-transform ${mobileOpen ? 'rotate-180' : ''}`}></i>
            </button>

            <nav className={`${mobileOpen ? 'block' : 'hidden'} max-md:block md:block space-y-[2px]`}>
              {links.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-[10px] py-[10px] px-[14px] font-[amma3] text-[13px] transition-colors ${
                      isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <i className={`${link.icon} text-[16px]`}></i>
                  {link.label}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className='flex items-center gap-[10px] py-[10px] px-[14px] font-[amma3] text-[13px] text-red-500 hover:bg-red-50 transition-colors w-full text-left'
              >
                <i className='ri-logout-box-r-line text-[16px]'></i>
                Logout
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className='flex-1 min-w-0'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
