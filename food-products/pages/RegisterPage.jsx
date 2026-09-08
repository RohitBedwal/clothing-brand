import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
import { cartOpenContext } from '../context/CartContext'
import NavBar2 from '../components/NavBar2'

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useContext(authContext);
  const { syncCart } = useContext(cartOpenContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const validate = () => {
    const e = {};
    if (!firstName.trim()) e.firstName = 'First name is required';
    if (!lastName.trim()) e.lastName = 'Last name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!phone.trim()) e.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit phone number';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'At least 6 characters';
    if (!confirmPassword) e.confirmPassword = 'Confirm your password';
    else if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!acceptTerms) e.terms = 'Accept the terms to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      await register({ firstName, lastName, email, phone, password });
      setLoading(false);
      setSyncing(true);
      await syncCart();
      navigate('/', { replace: true });
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  const ic = (err) => `w-full px-[14px] py-[12px] border ${err ? 'border-red-400' : 'border-gray-300'} font-[amma3] text-[14px] text-gray-900 focus:outline-none focus:border-gray-900 transition-colors`;

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <div className='pt-[120px] pb-[80px] px-[30px] max-md:px-[16px] flex justify-center'>
        <div className='w-full max-w-[480px]'>
          <h1 className='font-[amma4] text-gray-900 text-[24px] tracking-[4px] uppercase text-center mb-[8px]'>Create Account</h1>
          <p className='font-[amma3] text-gray-500 text-[13px] text-center mb-[36px]'>Join Echo Studio</p>

          {errors.general && <div className='mb-[20px] p-[14px] bg-red-50 border border-red-200 text-red-700 font-[amma3] text-[13px] text-center'>{errors.general}</div>}

          <form onSubmit={handleSubmit} className='space-y-[16px]'>
            <div className='grid grid-cols-2 gap-[14px] max-md:grid-cols-1'>
              <div>
                <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>First Name</label>
                <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} className={ic(errors.firstName)} />
                {errors.firstName && <p className='mt-[4px] font-[amma3] text-[11px] text-red-500'>{errors.firstName}</p>}
              </div>
              <div>
                <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>Last Name</label>
                <input type='text' value={lastName} onChange={e => setLastName(e.target.value)} className={ic(errors.lastName)} />
                {errors.lastName && <p className='mt-[4px] font-[amma3] text-[11px] text-red-500'>{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>Email</label>
              <input type='email' value={email} onChange={e => setEmail(e.target.value)} className={ic(errors.email)} placeholder='your@email.com' />
              {errors.email && <p className='mt-[4px] font-[amma3] text-[11px] text-red-500'>{errors.email}</p>}
            </div>

            <div>
              <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>Phone</label>
              <input type='tel' value={phone} onChange={e => setPhone(e.target.value)} className={ic(errors.phone)} placeholder='10-digit mobile number' />
              {errors.phone && <p className='mt-[4px] font-[amma3] text-[11px] text-red-500'>{errors.phone}</p>}
            </div>

            <div>
              <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>Password</label>
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

            <label className='flex items-start gap-[8px] cursor-pointer'>
              <input type='checkbox' checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} className='w-[14px] h-[14px] mt-[2px] accent-gray-900' />
              <span className='font-[amma3] text-[12px] text-gray-600'>I agree to the <Link to='/terms' className='underline'>Terms & Conditions</Link> and <Link to='/privacy-policy' className='underline'>Privacy Policy</Link></span>
            </label>
            {errors.terms && <p className='font-[amma3] text-[11px] text-red-500'>{errors.terms}</p>}

            <button type='submit' disabled={loading || syncing} className='w-full py-[14px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors disabled:opacity-50 mt-[8px] flex items-center justify-center gap-[8px]'>
              {syncing ? (
                <>
                  <div className='w-[14px] h-[14px] border-[1.5px] border-white/30 border-t-white rounded-full animate-spin'></div>
                  Syncing cart...
                </>
              ) : loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className='text-center mt-[28px] font-[amma3] text-[13px] text-gray-500'>
            Already have an account? <Link to='/login' className='text-gray-900 font-[amma4] hover:underline underline-offset-2'>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
