import React, { useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
import NavBar2 from '../components/NavBar2'

const ResetPasswordPage = () => {
  const { token } = useParams();
  const { resetPassword } = useContext(authContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'At least 6 characters';
    if (!confirmPassword) e.confirmPassword = 'Confirm your password';
    else if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  const ic = (err) => `w-full px-[14px] py-[12px] border ${err ? 'border-red-400' : 'border-gray-300'} font-[amma3] text-[14px] text-gray-900 focus:outline-none focus:border-gray-900 transition-colors`;

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <div className='pt-[120px] pb-[80px] px-[30px] max-md:px-[16px] flex justify-center'>
        <div className='w-full max-w-[420px]'>
          {success ? (
            <>
              <div className='w-[60px] h-[60px] bg-green-500 rounded-full flex items-center justify-center mx-auto mb-[24px]'>
                <i className='ri-check-line text-[28px] text-white'></i>
              </div>
              <h1 className='font-[amma4] text-gray-900 text-[22px] tracking-[3px] uppercase text-center mb-[12px]'>Password Reset</h1>
              <p className='font-[amma3] text-gray-500 text-[13px] text-center mb-[32px]'>
                Your password has been reset successfully.
              </p>
              <Link to='/login' className='block w-full py-[14px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors text-center'>
                Sign In
              </Link>
            </>
          ) : (
            <>
              <h1 className='font-[amma4] text-gray-900 text-[24px] tracking-[4px] uppercase text-center mb-[8px]'>Reset Password</h1>
              <p className='font-[amma3] text-gray-500 text-[13px] text-center mb-[36px]'>Enter your new password below.</p>

              {errors.general && <div className='mb-[20px] p-[14px] bg-red-50 border border-red-200 text-red-700 font-[amma3] text-[13px] text-center'>{errors.general}</div>}

              <form onSubmit={handleSubmit} className='space-y-[18px]'>
                <div>
                  <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>New Password</label>
                  <div className='relative'>
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className={`${ic(errors.password)} pr-[42px]`} placeholder='Min. 6 characters' />
                    <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-[12px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                      <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-[18px]`}></i>
                    </button>
                  </div>
                  {errors.password && <p className='mt-[4px] font-[amma3] text-[11px] text-red-500'>{errors.password}</p>}
                </div>

                <div>
                  <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>Confirm Password</label>
                  <div className='relative'>
                    <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={`${ic(errors.confirmPassword)} pr-[42px]`} placeholder='Re-enter password' />
                    <button type='button' onClick={() => setShowConfirm(!showConfirm)} className='absolute right-[12px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                      <i className={`${showConfirm ? 'ri-eye-off-line' : 'ri-eye-line'} text-[18px]`}></i>
                    </button>
                  </div>
                  {errors.confirmPassword && <p className='mt-[4px] font-[amma3] text-[11px] text-red-500'>{errors.confirmPassword}</p>}
                </div>

                <button type='submit' disabled={loading} className='w-full py-[14px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors disabled:opacity-50 mt-[8px]'>
                  {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPasswordPage;
