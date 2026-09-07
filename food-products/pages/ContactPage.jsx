import { useState } from 'react';
import NavBar2 from '../components/NavBar2';

const subjects = [
  'General Inquiry',
  'Order Support',
  'Returns & Exchanges',
  'Wholesale',
  'Press',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const validate = (field, value) => {
    const newErrors = { ...errors };

    if (field === 'name' || field === 'all') {
      const v = field === 'all' ? form.name : value;
      if (!v.trim()) {
        newErrors.name = 'Name is required';
      } else {
        delete newErrors.name;
      }
    }

    if (field === 'email' || field === 'all') {
      const v = field === 'all' ? form.email : value;
      if (!v.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        newErrors.email = 'Please enter a valid email';
      } else {
        delete newErrors.email;
      }
    }

    if (field === 'message' || field === 'all') {
      const v = field === 'all' ? form.message : value;
      if (!v.trim()) {
        newErrors.message = 'Message is required';
      } else {
        delete newErrors.message;
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(validate(name, value));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(name, value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate('all');
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <NavBar2 />

      <div className="pt-[110px] pb-[80px] max-w-[1000px] mx-auto px-[30px] max-md:px-[16px]">
        {/* Header */}
        <div className="mb-[60px]">
          <p className="font-[amma3] text-[12px] tracking-[4px] uppercase text-gray-500 mb-[16px]">
            Reach Out
          </p>
          <h1 className="font-[amma4] text-[48px] max-md:text-[32px] tracking-[3px] uppercase text-gray-900 mb-[20px] leading-[1.1]">
            Get in Touch
          </h1>
          <div className="w-[60px] h-[1px] bg-gray-900 mb-[24px]" />
          <p className="font-[amma3] text-[16px] leading-[1.8] text-gray-500 max-w-[500px]">
            Have a question, feedback, or partnership inquiry? We'd love to hear from you.
            Our team typically responds within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="border border-gray-200 py-[80px] text-center">
            <i className="ri-check-line text-[48px] text-gray-900 mb-[24px] block" />
            <h2 className="font-[amma4] text-[24px] tracking-[3px] uppercase text-gray-900 mb-[16px]">
              Thank You
            </h2>
            <p className="font-[amma3] text-[15px] text-gray-500 mb-[30px]">
              Your message has been sent successfully. We&apos;ll get back to you soon.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                setErrors({});
                setTouched({});
              }}
              className="font-[amma3] text-[13px] tracking-[3px] uppercase border border-gray-900 text-gray-900 px-[30px] py-[14px] hover:bg-gray-900 hover:text-white transition-colors duration-300"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-[1.2fr_0.8fr] max-md:grid-cols-1 gap-[60px]">
            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-[30px]">
                <label className="font-[amma3] text-[12px] tracking-[3px] uppercase text-gray-500 mb-[10px] block">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-gray-200 px-[16px] py-[14px] font-[amma3] text-[14px] text-gray-900 outline-none focus:border-gray-900 transition-colors duration-200"
                  placeholder="Your full name"
                />
                {errors.name && touched.name && (
                  <p className="font-[amma3] text-[12px] text-red-500 mt-[6px]">{errors.name}</p>
                )}
              </div>

              <div className="mb-[30px]">
                <label className="font-[amma3] text-[12px] tracking-[3px] uppercase text-gray-500 mb-[10px] block">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-gray-200 px-[16px] py-[14px] font-[amma3] text-[14px] text-gray-900 outline-none focus:border-gray-900 transition-colors duration-200"
                  placeholder="you@example.com"
                />
                {errors.email && touched.email && (
                  <p className="font-[amma3] text-[12px] text-red-500 mt-[6px]">{errors.email}</p>
                )}
              </div>

              <div className="mb-[30px]">
                <label className="font-[amma3] text-[12px] tracking-[3px] uppercase text-gray-500 mb-[10px] block">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 px-[16px] py-[14px] font-[amma3] text-[14px] text-gray-900 outline-none focus:border-gray-900 transition-colors duration-200"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="mb-[30px]">
                <label className="font-[amma3] text-[12px] tracking-[3px] uppercase text-gray-500 mb-[10px] block">
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-200 px-[16px] py-[14px] font-[amma3] text-[14px] text-gray-900 outline-none focus:border-gray-900 transition-colors duration-200 bg-white appearance-none cursor-pointer"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-[40px]">
                <label className="font-[amma3] text-[12px] tracking-[3px] uppercase text-gray-500 mb-[10px] block">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={6}
                  className="w-full border border-gray-200 px-[16px] py-[14px] font-[amma3] text-[14px] text-gray-900 outline-none focus:border-gray-900 transition-colors duration-200 resize-none"
                  placeholder="Tell us how we can help..."
                />
                {errors.message && touched.message && (
                  <p className="font-[amma3] text-[12px] text-red-500 mt-[6px]">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="font-[amma3] text-[13px] tracking-[3px] uppercase bg-gray-900 text-white px-[40px] py-[16px] hover:bg-gray-800 transition-colors duration-300 w-full"
              >
                Send Message
              </button>
            </form>

            {/* Contact Info */}
            <div>
              <div className="mb-[40px]">
                <h3 className="font-[amma4] text-[14px] tracking-[3px] uppercase text-gray-900 mb-[24px]">
                  Contact Information
                </h3>
                <div className="w-[40px] h-[1px] bg-gray-900 mb-[24px]" />

                <div className="mb-[24px]">
                  <p className="font-[amma3] text-[12px] tracking-[3px] uppercase text-gray-400 mb-[6px]">
                    Email
                  </p>
                  <a
                    href="mailto:hello@echostudio.in"
                    className="font-[amma3] text-[15px] text-gray-900 hover:text-gray-500 transition-colors duration-200"
                  >
                    hello@echostudio.in
                  </a>
                </div>

                <div className="mb-[24px]">
                  <p className="font-[amma3] text-[12px] tracking-[3px] uppercase text-gray-400 mb-[6px]">
                    Phone
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="font-[amma3] text-[15px] text-gray-900 hover:text-gray-500 transition-colors duration-200"
                  >
                    +91 98765 43210
                  </a>
                </div>

                <div className="mb-[24px]">
                  <p className="font-[amma3] text-[12px] tracking-[3px] uppercase text-gray-400 mb-[6px]">
                    Address
                  </p>
                  <p className="font-[amma3] text-[15px] text-gray-900 leading-[1.7]">
                    Echo Studio
                    <br />
                    Mumbai, India
                  </p>
                </div>

                <div className="mb-[24px]">
                  <p className="font-[amma3] text-[12px] tracking-[3px] uppercase text-gray-400 mb-[6px]">
                    Hours
                  </p>
                  <p className="font-[amma3] text-[15px] text-gray-900">
                    Mon – Sat, 10AM – 7PM
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="border-t border-gray-200 pt-[30px]">
                <p className="font-[amma3] text-[12px] tracking-[3px] uppercase text-gray-400 mb-[20px]">
                  Follow Us
                </p>
                <div className="flex gap-[20px]">
                  <a
                    href="#"
                    className="text-gray-900 hover:text-gray-500 transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <i className="ri-instagram-line text-[22px]" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-900 hover:text-gray-500 transition-colors duration-200"
                    aria-label="Facebook"
                  >
                    <i className="ri-facebook-fill text-[22px]" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-900 hover:text-gray-500 transition-colors duration-200"
                    aria-label="Pinterest"
                  >
                    <i className="ri-pinterest-line text-[22px]" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-900 hover:text-gray-500 transition-colors duration-200"
                    aria-label="WhatsApp"
                  >
                    <i className="ri-whatsapp-line text-[22px]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-[40px] px-[30px] max-md:px-[16px]">
        <div className="max-w-[1000px] mx-auto flex justify-between items-center">
          <p className="font-[amma3] text-[12px] tracking-[2px] uppercase text-gray-400">
            © 2026 Echo Studio
          </p>
          <p className="font-[amma3] text-[12px] tracking-[2px] uppercase text-gray-400">
            Mumbai, India
          </p>
        </div>
      </footer>
    </div>
  );
}
