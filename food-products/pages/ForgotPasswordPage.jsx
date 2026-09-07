import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
import NavBar2 from '../components/NavBar2'

const ForgotPasswordPage = () => {
  const { forgotPassword } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!email.trim()) { setError('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email'); return; }
    setLoading(true);
    setError('');
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <div className='pt-[120px] pb-[80px] px-[30px] max-md:px-[16px] flex justify-center'>
        <div className='w-full max-w-[420px]'>
          {sent ? (
            <>
              <div className='w-[60px] h-[60px] bg-green-500 rounded-full flex items-center justify-center mx-auto mb-[24px]'>
                <i className='ri-mail-send-line text-[28px] text-white'></i>
              </div>
              <h1 className='font-[amma4] text-gray-900 text-[22px] tracking-[3px] uppercase text-center mb-[12px]'>Check Your Email</h1>
              <p className='font-[amma3] text-gray-500 text-[13px] text-center mb-[8px]'>
                We've sent password reset instructions to <span className='text-gray-700'>{email}</span>
              </p>
              <p className='font-[amma3] text-gray-400 text-[12px] text-center mb-[32px]'>
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <button onClick={() => { setSent(false); setEmail(''); }} className='w-full py-[14px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors mb-[16px]'>
                Try Again
              </button>
              <Link to='/login' className='block text-center font-[amma3] text-[13px] text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-2'>
                Back to Sign In
              </Link>
            </>
          ) : (
            <>
              <h1 className='font-[amma4] text-gray-900 text-[24px] tracking-[4px] uppercase text-center mb-[8px]'>Forgot Password</h1>
              <p className='font-[amma3] text-gray-500 text-[13px] text-center mb-[36px]'>
                Enter your email and we'll send you a link to reset your password.
              </p>

              {error && <div className='mb-[20px] p-[14px] bg-red-50 border border-red-200 text-red-700 font-[amma3] text-[13px] text-center'>{error}</div>}

              <form onSubmit={handleSubmit} className='space-y-[18px]'>
                <div>
                  <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>Email</label>
                  <input type='email' value={email} onChange={e => setEmail(e.target.value)} className='w-full px-[14px] py-[12px] border border-gray-300 font-[amma3] text-[14px] text-gray-900 focus:outline-none focus:border-gray-900 transition-colors' placeholder='your@email.com' />
                </div>
                <button type='submit' disabled={loading} className='w-full py-[14px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors disabled:opacity-50'>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <Link to='/login' className='block text-center mt-[28px] font-[amma3] text-[13px] text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-2'>
                Back to Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
