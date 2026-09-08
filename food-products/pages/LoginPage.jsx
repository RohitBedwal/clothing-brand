import React, { useContext, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
import { cartOpenContext } from '../context/CartContext'
import NavBar2 from '../components/NavBar2'

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { login } = useContext(authContext);
  const { syncCart } = useContext(cartOpenContext);

  const [email, setEmail] = useState('abc123@gmail.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      await login(email, password);
      setLoading(false);
      setSyncing(true);
      await syncCart();
      navigate(redirect, { replace: true });
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <div className='pt-[120px] pb-[80px] px-[30px] max-md:px-[16px] flex justify-center'>
        <div className='w-full max-w-[420px]'>
          <h1 className='font-[amma4] text-gray-900 text-[24px] tracking-[4px] uppercase text-center mb-[8px]'>
            Sign In
          </h1>
          <p className='font-[amma3] text-gray-500 text-[13px] text-center mb-[36px]'>
            Welcome back to Echo Studio
          </p>

          {errors.general && (
            <div className='mb-[20px] p-[14px] bg-red-50 border border-red-200 text-red-700 font-[amma3] text-[13px] text-center'>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-[18px]'>
            <div>
              <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-[14px] py-[12px] border ${errors.email ? 'border-red-400' : 'border-gray-300'} font-[amma3] text-[14px] text-gray-900 focus:outline-none focus:border-gray-900 transition-colors`}
                placeholder='your@email.com'
              />
              {errors.email && <p className='mt-[4px] font-[amma3] text-[11px] text-red-500'>{errors.email}</p>}
            </div>

            <div>
              <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-[14px] py-[12px] pr-[42px] border ${errors.password ? 'border-red-400' : 'border-gray-300'} font-[amma3] text-[14px] text-gray-900 focus:outline-none focus:border-gray-900 transition-colors`}
                  placeholder='Enter password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-[12px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-[18px]`}></i>
                </button>
              </div>
              {errors.password && <p className='mt-[4px] font-[amma3] text-[11px] text-red-500'>{errors.password}</p>}
            </div>

            <div className='flex items-center justify-between'>
              <label className='flex items-center gap-[8px] cursor-pointer'>
                <input
                  type='checkbox'
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className='w-[14px] h-[14px] accent-gray-900'
                />
                <span className='font-[amma3] text-[12px] text-gray-600'>Remember me</span>
              </label>
              <Link to='/forgot-password' className='font-[amma3] text-[12px] text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-2'>
                Forgot password?
              </Link>
            </div>

            <button
              type='submit'
              disabled={loading || syncing}
              className='w-full py-[14px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors disabled:opacity-50 mt-[8px] flex items-center justify-center gap-[8px]'
            >
              {syncing ? (
                <>
                  <div className='w-[14px] h-[14px] border-[1.5px] border-white/30 border-t-white rounded-full animate-spin'></div>
                  Syncing cart...
                </>
              ) : loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className='text-center mt-[28px] font-[amma3] text-[13px] text-gray-500'>
            Don't have an account?{' '}
            <Link to='/register' className='text-gray-900 font-[amma4] hover:underline underline-offset-2'>
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
