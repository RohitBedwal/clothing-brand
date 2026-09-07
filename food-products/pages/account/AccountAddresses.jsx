import React, { useState } from 'react'
import AccountLayout from '../../components/AccountLayout'

const AccountAddresses = () => {
  const [addresses, setAddresses] = useState(() => JSON.parse(localStorage.getItem('echo_addresses') || '[]'));
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', address: '', apartment: '', city: '', state: '', pinCode: '', country: 'India', isDefault: false });
  const [errors, setErrors] = useState({});

  const saveAddresses = (addrs) => {
    setAddresses(addrs);
    localStorage.setItem('echo_addresses', JSON.stringify(addrs));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ firstName: '', lastName: '', phone: '', address: '', apartment: '', city: '', state: '', pinCode: '', country: 'India', isDefault: false });
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (addr) => {
    setEditingId(addr._id);
    setForm({ ...addr });
    setErrors({});
    setShowModal(true);
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Invalid phone';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state.trim()) e.state = 'Required';
    if (!form.pinCode.trim()) e.pinCode = 'Required';
    else if (!/^\d{6}$/.test(form.pinCode)) e.pinCode = 'Invalid PIN';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (form.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })));
    }
    if (editingId) {
      const updated = addresses.map(a => a._id === editingId ? { ...form, _id: editingId } : a);
      saveAddresses(updated);
    } else {
      const newAddr = { ...form, _id: 'addr_' + Date.now() };
      const updated = form.isDefault ? [...addresses.map(a => ({ ...a, isDefault: false })), newAddr] : [...addresses, newAddr];
      saveAddresses(updated);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const updated = addresses.filter(a => a._id !== id);
    saveAddresses(updated);
  };

  const handleSetDefault = (id) => {
    const updated = addresses.map(a => ({ ...a, isDefault: a._id === id }));
    saveAddresses(updated);
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const ic = (err) => `w-full px-[14px] py-[12px] border ${err ? 'border-red-400' : 'border-gray-300'} font-[amma3] text-[14px] text-gray-900 focus:outline-none focus:border-gray-900 transition-colors`;

  return (
    <AccountLayout>
      <div className='flex items-center justify-between mb-[24px]'>
        <h2 className='font-[amma4] text-gray-900 text-[16px] tracking-[2px] uppercase'>Addresses</h2>
        <button onClick={openAdd} className='py-[8px] px-[16px] bg-gray-900 text-white font-[amma3] text-[11px] tracking-[2px] uppercase hover:bg-black transition-colors'>
          + Add New
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className='border border-gray-200 p-[60px] text-center'>
          <i className='ri-map-pin-line text-[48px] text-gray-200 mb-[16px]'></i>
          <p className='font-[amma3] text-gray-400 text-[14px] mb-[20px]'>No saved addresses.</p>
          <button onClick={openAdd} className='inline-block py-[12px] px-[28px] bg-gray-900 text-white font-[amma3] text-[11px] tracking-[3px] uppercase hover:bg-black transition-colors'>
            Add Address
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[16px]'>
          {addresses.map(addr => (
            <div key={addr._id} className={`border p-[20px] ${addr.isDefault ? 'border-gray-900' : 'border-gray-200'} relative`}>
              {addr.isDefault && (
                <span className='absolute top-[12px] right-[12px] px-[8px] py-[2px] bg-gray-900 text-white font-[amma3] text-[9px] uppercase tracking-[1px]'>Default</span>
              )}
              <p className='font-[amma4] text-gray-900 text-[13px]'>{addr.firstName} {addr.lastName}</p>
              <p className='font-[amma3] text-gray-600 text-[13px] mt-[6px] leading-[1.7]'>
                {addr.address}{addr.apartment ? `, ${addr.apartment}` : ''}<br />
                {addr.city}, {addr.state} {addr.pinCode}<br />
                {addr.phone}
              </p>
              <div className='flex gap-[8px] mt-[14px] pt-[14px] border-t border-gray-100'>
                <button onClick={() => openEdit(addr)} className='font-[amma3] text-[11px] text-gray-500 hover:text-gray-900 uppercase tracking-[1px] transition-colors'>Edit</button>
                {!addr.isDefault && (
                  <button onClick={() => handleSetDefault(addr._id)} className='font-[amma3] text-[11px] text-gray-500 hover:text-gray-900 uppercase tracking-[1px] transition-colors ml-[12px]'>Set Default</button>
                )}
                <button onClick={() => handleDelete(addr._id)} className='font-[amma3] text-[11px] text-red-400 hover:text-red-600 uppercase tracking-[1px] transition-colors ml-auto'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40' onClick={() => setShowModal(false)}>
          <div className='bg-white p-[32px] max-w-[500px] w-[90%] max-h-[85vh] overflow-y-auto' onClick={e => e.stopPropagation()}>
            <h3 className='font-[amma4] text-gray-900 text-[16px] tracking-[1px] uppercase mb-[20px]'>{editingId ? 'Edit Address' : 'New Address'}</h3>
            <div className='space-y-[14px]'>
              <div className='grid grid-cols-2 gap-[12px] max-sm:grid-cols-1'>
                <div>
                  <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[4px]'>First Name</label>
                  <input value={form.firstName} onChange={e => update('firstName', e.target.value)} className={ic(errors.firstName)} />
                  {errors.firstName && <p className='mt-[2px] font-[amma3] text-[10px] text-red-500'>{errors.firstName}</p>}
                </div>
                <div>
                  <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[4px]'>Last Name</label>
                  <input value={form.lastName} onChange={e => update('lastName', e.target.value)} className={ic(errors.lastName)} />
                </div>
              </div>
              <div>
                <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[4px]'>Phone</label>
                <input value={form.phone} onChange={e => update('phone', e.target.value)} className={ic(errors.phone)} placeholder='10-digit number' />
                {errors.phone && <p className='mt-[2px] font-[amma3] text-[10px] text-red-500'>{errors.phone}</p>}
              </div>
              <div>
                <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[4px]'>Address</label>
                <input value={form.address} onChange={e => update('address', e.target.value)} className={ic(errors.address)} placeholder='Street address' />
                {errors.address && <p className='mt-[2px] font-[amma3] text-[10px] text-red-500'>{errors.address}</p>}
              </div>
              <div>
                <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[4px]'>Apartment / Suite</label>
                <input value={form.apartment} onChange={e => update('apartment', e.target.value)} className={ic()} placeholder='Optional' />
              </div>
              <div className='grid grid-cols-2 gap-[12px] max-sm:grid-cols-1'>
                <div>
                  <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[4px]'>City</label>
                  <input value={form.city} onChange={e => update('city', e.target.value)} className={ic(errors.city)} />
                  {errors.city && <p className='mt-[2px] font-[amma3] text-[10px] text-red-500'>{errors.city}</p>}
                </div>
                <div>
                  <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[4px]'>State</label>
                  <input value={form.state} onChange={e => update('state', e.target.value)} className={ic(errors.state)} />
                  {errors.state && <p className='mt-[2px] font-[amma3] text-[10px] text-red-500'>{errors.state}</p>}
                </div>
              </div>
              <div className='grid grid-cols-2 gap-[12px] max-sm:grid-cols-1'>
                <div>
                  <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[4px]'>PIN Code</label>
                  <input value={form.pinCode} onChange={e => update('pinCode', e.target.value)} className={ic(errors.pinCode)} />
                  {errors.pinCode && <p className='mt-[2px] font-[amma3] text-[10px] text-red-500'>{errors.pinCode}</p>}
                </div>
                <div>
                  <label className='block font-[amma3] text-[11px] text-gray-700 uppercase tracking-[2px] mb-[4px]'>Country</label>
                  <input value={form.country} onChange={e => update('country', e.target.value)} className={ic()} />
                </div>
              </div>
              <label className='flex items-center gap-[8px] cursor-pointer pt-[4px]'>
                <input type='checkbox' checked={form.isDefault} onChange={e => update('isDefault', e.target.checked)} className='w-[14px] h-[14px] accent-gray-900' />
                <span className='font-[amma3] text-[12px] text-gray-600'>Set as default address</span>
              </label>
            </div>
            <div className='flex gap-[12px] mt-[24px]'>
              <button onClick={handleSave} className='flex-1 py-[12px] bg-gray-900 text-white font-[amma3] text-[11px] tracking-[3px] uppercase hover:bg-black transition-colors'>
                {editingId ? 'Save Changes' : 'Add Address'}
              </button>
              <button onClick={() => setShowModal(false)} className='py-[12px] px-[20px] border border-gray-300 font-[amma3] text-[11px] tracking-[3px] uppercase text-gray-700 hover:border-gray-900 transition-colors'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
};

export default AccountAddresses;
