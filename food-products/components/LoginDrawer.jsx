import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
import { cartOpenContext } from '../context/CartContext'
import gsap from 'gsap'

const LoginDrawer = ({ open, onClose }) => {
  const { login } = useContext(authContext);
  const { syncCart } = useContext(cartOpenContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('abc123@gmail.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' });
      gsap.fromTo(drawerRef.current, { y: '100%' }, { y: '0%', duration: 0.4, ease: 'power2.out' });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(drawerRef.current, { y: '100%', duration: 0.3, ease: 'power2.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
        overlayRef.current.style.display = 'none';
        document.body.style.overflow = '';
      }});
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      setLoading(false);
      setSyncing(true);
      await syncCart();
      onClose();
      navigate('/checkout');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  return (
    <>
      <div
        ref={overlayRef}
        className='fixed inset-0 bg-black/40 z-50 hidden'
        style={{ opacity: 0 }}
        onClick={onClose}
      ></div>
      <div
        ref={drawerRef}
        className='fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:max-w-[640px] bg-white z-50 rounded-t-[20px] shadow-2xl'
        style={{ transform: 'translateY(100%)' }}
      >
        {/* Handle */}
        <div className='flex justify-center pt-[12px] pb-[8px]'>
          <div className='w-[40px] h-[4px] bg-gray-300 rounded-full'></div>
        </div>

        <div className='px-[30px] max-md:px-[20px] pb-[40px]'>

          {/* Header */}
          <div className='flex justify-between items-center mb-[24px]'>
            <h2 className='font-[amma4] text-[20px] text-gray-900 tracking-[2px] uppercase'>Login to Checkout</h2>
            <button onClick={onClose} className='w-[32px] h-[32px] flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors'>
              <i className="ri-close-line text-[20px]"></i>
            </button>
          </div>

          <p className='font-[amma3] text-[12px] text-gray-400 mb-[24px] tracking-[1px]'>
            Login to complete your purchase and track your orders.
          </p>

          {error && (
            <div className='mb-[16px] p-[12px] bg-red-50 border border-red-200 rounded-[4px]'>
              <p className='font-[amma3] text-[11px] text-red-600'>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className='flex flex-col gap-[16px]'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className='w-full border border-gray-200 px-[16px] py-[14px] font-[amma3] text-[12px] text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors'
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className='w-full border border-gray-200 px-[16px] py-[14px] font-[amma3] text-[12px] text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors'
            />

            <button
              type="submit"
              disabled={loading || syncing}
              className='w-full py-[15px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-[8px]'
            >
              {syncing ? (
                <>
                  <div className='w-[14px] h-[14px] border-[1.5px] border-white/30 border-t-white rounded-full animate-spin'></div>
                  Syncing cart...
                </>
              ) : loading ? 'Logging in...' : 'Login & Checkout'}
            </button>
          </form>

          <div className='flex flex-col items-center gap-[12px] mt-[20px]'>
            <Link
              to="/forgot-password"
              onClick={onClose}
              className='font-[amma3] text-[11px] text-gray-400 underline hover:text-gray-600 transition-colors'
            >
              Forgot password?
            </Link>
            <p className='font-[amma3] text-[11px] text-gray-400'>
              Don't have an account?{' '}
              <Link to="/register" onClick={onClose} className='text-gray-900 underline hover:text-gray-600 transition-colors'>
                Register
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default LoginDrawer;
