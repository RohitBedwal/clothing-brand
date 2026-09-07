import React, { useContext, useState } from 'react'
import { authContext } from '../../context/AuthContext'
import AccountLayout from '../../components/AccountLayout'

const AccountProfile = () => {
  const { currentUser, updateProfile } = useContext(authContext);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const validate = () => {
    const e = {};
    if (!firstName.trim()) e.firstName = 'First name is required';
    if (!lastName.trim()) e.lastName = 'Last name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!phone.trim()) e.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await updateProfile({ firstName, lastName, email, phone });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFirstName(currentUser?.firstName || '');
    setLastName(currentUser?.lastName || '');
    setEmail(currentUser?.email || '');
    setPhone(currentUser?.phone || '');
    setErrors({});
    setEditing(false);
  };

  const ic = (err) => `w-full px-[14px] py-[12px] border ${err ? 'border-red-400' : 'border-gray-300'} font-[amma3] text-[14px] text-gray-900 focus:outline-none focus:border-gray-900 transition-colors bg-white`;

  return (
    <AccountLayout>
      <div className='flex items-center justify-between mb-[24px]'>
        <h2 className='font-[amma4] text-gray-900 text-[16px] tracking-[2px] uppercase'>Profile</h2>
        {!editing && (
          <button onClick={() => setEditing(true)} className='py-[8px] px-[16px] border border-gray-300 font-[amma3] text-[11px] tracking-[2px] uppercase text-gray-700 hover:border-gray-900 transition-colors'>
            Edit Profile
          </button>
        )}
      </div>

      {saved && (
        <div className='mb-[20px] p-[14px] bg-green-50 border border-green-200 text-green-700 font-[amma3] text-[13px] text-center'>
          Profile updated successfully.
        </div>
      )}

      {errors.general && (
        <div className='mb-[20px] p-[14px] bg-red-50 border border-red-200 text-red-700 font-[amma3] text-[13px] text-center'>
          {errors.general}
        </div>
      )}

      <div className='border border-gray-200 p-[24px]'>
        <div className='space-y-[18px]'>
          <div className='grid grid-cols-2 gap-[14px] max-md:grid-cols-1'>
            <div>
              <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>First Name</label>
              {editing ? (
                <>
                  <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} className={ic(errors.firstName)} />
                  {errors.firstName && <p className='mt-[4px] font-[amma3] text-[11px] text-red-500'>{errors.firstName}</p>}
                </>
              ) : <p className='font-[amma3] text-[14px] text-gray-900 py-[12px]'>{currentUser?.firstName || '-'}</p>}
            </div>
            <div>
              <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>Last Name</label>
              {editing ? (
                <>
                  <input type='text' value={lastName} onChange={e => setLastName(e.target.value)} className={ic(errors.lastName)} />
                  {errors.lastName && <p className='mt-[4px] font-[amma3] text-[11px] text-red-500'>{errors.lastName}</p>}
                </>
              ) : <p className='font-[amma3] text-[14px] text-gray-900 py-[12px]'>{currentUser?.lastName || '-'}</p>}
            </div>
          </div>

          <div>
            <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>Email</label>
            {editing ? (
              <>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} className={ic(errors.email)} />
                {errors.email && <p className='mt-[4px] font-[amma3] text-[11px] text-red-500'>{errors.email}</p>}
              </>
            ) : <p className='font-[amma3] text-[14px] text-gray-900 py-[12px]'>{currentUser?.email || '-'}</p>}
          </div>

          <div>
            <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[6px]'>Phone</label>
            {editing ? (
              <>
                <input type='tel' value={phone} onChange={e => setPhone(e.target.value)} className={ic(errors.phone)} />
                {errors.phone && <p className='mt-[4px] font-[amma3] text-[11px] text-red-500'>{errors.phone}</p>}
              </>
            ) : <p className='font-[amma3] text-[14px] text-gray-900 py-[12px]'>{currentUser?.phone || '-'}</p>}
          </div>
        </div>

        {editing && (
          <div className='flex gap-[12px] mt-[24px]'>
            <button onClick={handleSave} disabled={loading} className='py-[12px] px-[28px] bg-gray-900 text-white font-[amma3] text-[11px] tracking-[3px] uppercase hover:bg-black transition-colors disabled:opacity-50'>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button onClick={handleCancel} className='py-[12px] px-[28px] border border-gray-300 font-[amma3] text-[11px] tracking-[3px] uppercase text-gray-700 hover:border-gray-900 transition-colors'>
              Cancel
            </button>
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default AccountProfile;
