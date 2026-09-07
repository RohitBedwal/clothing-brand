import NavBar2 from '../components/NavBar2'

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <NavBar2 />
      <main className="pt-[110px] pb-[80px] max-w-[1000px] mx-auto px-[30px] max-md:px-[16px]">
        <h1 className="font-[amma4] text-[40px] max-md:text-[28px] tracking-[4px] uppercase text-gray-900 mb-[12px]">
          Terms &amp; Conditions
        </h1>
        <p className="font-[amma3] text-[14px] text-gray-500 mb-[60px] border-b border-gray-200 pb-[30px]">
          Last updated: September 1, 2025
        </p>

        <div className="space-y-[50px]">
          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Acceptance of Terms
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              By accessing or using the Foodians website and purchasing our products, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services. We reserve the right to update these terms at any time, and continued use of the site constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Products &amp; Pricing
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              All product descriptions, images, and pricing are subject to change without notice. We make every effort to display colors and images accurately; however, we cannot guarantee that your monitor's display will accurately reflect the actual product. Prices are listed in USD and are inclusive of applicable taxes unless otherwise stated. We reserve the right to modify or discontinue any product at any time.
            </p>
          </section>

          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Orders
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              Placing an order constitutes an offer to purchase the selected products. We reserve the right to accept or decline any order at our sole discretion. An order confirmation email does not constitute acceptance of your order; it is a confirmation that we have received your request. All orders are subject to product availability. In the event that an item is out of stock, we will notify you and offer a full refund or an alternative product.
            </p>
          </section>

          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Intellectual Property
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              All content on this website, including but not limited to text, graphics, logos, images, product descriptions, and software, is the property of Foodians or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without prior written consent from Foodians.
            </p>
          </section>

          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Limitation of Liability
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              To the fullest extent permitted by law, Foodians shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our products or website. Our total liability for any claim arising from a purchase shall not exceed the amount paid by you for the product in question. We do not warrant that our website will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Governing Law
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which Foodians operates. Any disputes arising from these terms shall be resolved exclusively in the courts of that jurisdiction. You agree to submit to the personal jurisdiction of such courts.
            </p>
          </section>

          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Contact
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              If you have any questions about these Terms and Conditions, please contact us at{' '}
              <span className="text-gray-900 font-[amma4] tracking-[1px]">hello@foodians.in</span>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
