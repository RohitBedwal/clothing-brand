import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-gray-950 text-white'>
      {/* Newsletter */}
      <div className='border-b border-white/10'>
        <div className='max-w-[1200px] mx-auto px-[30px] max-md:px-[16px] py-[48px] flex flex-col md:flex-row items-start md:items-center justify-between gap-[24px]'>
          <div>
            <h3 className='font-[amma4] text-[16px] tracking-[4px] uppercase mb-[6px]'>Stay in Touch</h3>
            <p className='font-[amma3] text-[13px] text-gray-400'>Subscribe for new arrivals, exclusive offers, and style inspiration.</p>
          </div>
          <div className='flex w-full md:w-auto'>
            <input type='email' placeholder='Enter your email' className='flex-1 md:w-[300px] px-[14px] py-[12px] bg-white/5 border border-white/20 font-[amma3] text-[13px] text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 transition-colors' />
            <button className='px-[24px] py-[12px] bg-white text-gray-950 font-[amma3] text-[11px] tracking-[2px] uppercase hover:bg-gray-200 transition-colors shrink-0'>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className='max-w-[1200px] mx-auto px-[30px] max-md:px-[16px] py-[48px]'>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-[32px] max-md:gap-[24px]'>
          <div>
            <h4 className='font-[amma4] text-[11px] tracking-[3px] uppercase mb-[16px]'>Shop</h4>
            <ul className='space-y-[10px]'>
              {[
                { to: '/shop', label: 'Shop All' },
                { to: '/new-arrivals', label: 'New Arrivals' },
                { to: '/collections', label: 'Collections' },
                { to: '/sale', label: 'Sale' },
                { to: '/ready-to-ship', label: 'Ready to Ship' },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className='font-[amma3] text-[13px] text-gray-400 hover:text-white transition-colors'>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-[amma4] text-[11px] tracking-[3px] uppercase mb-[16px]'>Categories</h4>
            <ul className='space-y-[10px]'>
              {[
                { to: '/collection/dresses', label: 'Dresses' },
                { to: '/collection/sarees', label: 'Sarees' },
                { to: '/collection/co-ord-sets', label: 'Co-ord Sets' },
                { to: '/concept-saree-dresses', label: 'Concept Saree Dresses' },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className='font-[amma3] text-[13px] text-gray-400 hover:text-white transition-colors'>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-[amma4] text-[11px] tracking-[3px] uppercase mb-[16px]'>Customer Care</h4>
            <ul className='space-y-[10px]'>
              {[
                { to: '/contact', label: 'Contact' },
                { to: '/faq', label: 'FAQ' },
                { to: '/shipping', label: 'Shipping' },
                { to: '/returns', label: 'Returns & Exchange' },
                { to: '/size-guide', label: 'Size Guide' },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className='font-[amma3] text-[13px] text-gray-400 hover:text-white transition-colors'>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-[amma4] text-[11px] tracking-[3px] uppercase mb-[16px]'>About</h4>
            <ul className='space-y-[10px]'>
              {[
                { to: '/about', label: 'Our Story' },
                { to: '/privacy-policy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms & Conditions' },
                { to: '/refund-policy', label: 'Refund Policy' },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className='font-[amma3] text-[13px] text-gray-400 hover:text-white transition-colors'>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-[amma4] text-[11px] tracking-[3px] uppercase mb-[16px]'>Follow Us</h4>
            <div className='flex gap-[12px]'>
              {[
                { icon: 'ri-instagram-line', label: 'Instagram' },
                { icon: 'ri-facebook-fill', label: 'Facebook' },
                { icon: 'ri-pinterest-fill', label: 'Pinterest' },
                { icon: 'ri-whatsapp-line', label: 'WhatsApp' },
              ].map(s => (
                <a key={s.label} href='#' aria-label={s.label} className='w-[36px] h-[36px] border border-white/20 flex items-center justify-center hover:bg-white hover:text-gray-950 transition-colors'>
                  <i className={`${s.icon} text-[16px]`}></i>
                </a>
              ))}
            </div>
            <p className='font-[amma3] text-[12px] text-gray-500 mt-[16px]'>hello@echostudio.in</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className='border-t border-white/10'>
        <div className='max-w-[1200px] mx-auto px-[30px] max-md:px-[16px] py-[20px] flex flex-col md:flex-row items-center justify-between gap-[12px]'>
          <p className='font-[amma3] text-[11px] text-gray-500 tracking-[1px]'>&copy; {new Date().getFullYear()} Echo Studio. All rights reserved.</p>
          <div className='flex items-center gap-[16px]'>
            <i className='ri-visa-fill text-[24px] text-gray-500'></i>
            <i className='ri-mastercard-fill text-[24px] text-gray-500'></i>
            <i className='ri-google-pay-fill text-[24px] text-gray-500'></i>
            <i className='ri-apple-fill text-[24px] text-gray-500'></i>
            <i className='ri-money-dollar-circle-fill text-[24px] text-gray-500'></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
