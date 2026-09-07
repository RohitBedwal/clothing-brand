import NavBar2 from '../components/NavBar2'

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <NavBar2 />
      <main className="pt-[110px] pb-[80px] max-w-[1000px] mx-auto px-[30px] max-md:px-[16px]">
        <h1 className="font-[amma4] text-gray-900 text-[42px] uppercase tracking-[4px] mb-[12px]">
          Privacy Policy
        </h1>
        <p className="font-[amma3] text-gray-400 text-[14px] mb-[60px]">Last updated: September 7, 2026</p>

        <div className="space-y-[60px]">
          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Information We Collect
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] mb-[16px]">
              We collect information you provide directly to us, including your name, email address, shipping address, and payment details when you place an order or create an account. We also collect data about your browsing activity on our website, such as pages visited and products viewed, to improve your experience.
            </p>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
              Additionally, we may receive information from third-party services, such as payment processors and analytics providers, to help us operate and improve our services.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              How We Use Your Information
            </h2>
            <ul className="space-y-[8px]">
              <li className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] pl-[16px] relative before:content-['—'] before:absolute before:left-0 before:text-gray-400">
                To process and fulfil your orders, including shipping and payment processing
              </li>
              <li className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] pl-[16px] relative before:content-['—'] before:absolute before:left-0 before:text-gray-400">
                To communicate with you about your orders, account, and promotional offers
              </li>
              <li className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] pl-[16px] relative before:content-['—'] before:absolute before:left-0 before:text-gray-400">
                To personalise your shopping experience and provide relevant product recommendations
              </li>
              <li className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] pl-[16px] relative before:content-['—'] before:absolute before:left-0 before:text-gray-400">
                To detect, prevent, and address fraud, security breaches, and technical issues
              </li>
            </ul>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Sharing Your Information
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] mb-[16px]">
              We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, including payment processors, shipping carriers, and analytics services.
            </p>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
              These third parties are obligated to keep your information confidential and use it only for the purposes for which it was shared. We may also disclose your information when required by law or to protect our rights and safety.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Security
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
              We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. Payment transactions are encrypted using SSL technology. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Cookies
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] mb-[16px]">
              Our website uses cookies and similar technologies to enhance your browsing experience, analyse site traffic, and understand usage patterns. Cookies are small data files stored on your device that help us recognise you and remember your preferences.
            </p>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
              You can control cookies through your browser settings. Disabling certain cookies may limit your ability to use some features of our website.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Your Rights
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] mb-[16px]">
              You have the right to access, correct, or delete your personal information at any time. You may also opt out of receiving marketing communications from us by following the unsubscribe link in our emails or by contacting us directly.
            </p>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
              To exercise any of these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Contact Us
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] mb-[16px]">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="font-[amma3] text-gray-900 text-[15px] leading-[1.8]">
              Email: support@foodians.in
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
