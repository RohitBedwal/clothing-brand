import NavBar2 from '../components/NavBar2'

export default function RefundPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <NavBar2 />
      <main className="pt-[110px] pb-[80px] max-w-[1000px] mx-auto px-[30px] max-md:px-[16px]">
        <h1 className="font-[amma4] text-[40px] max-md:text-[28px] tracking-[4px] uppercase text-gray-900 mb-[12px]">
          Refund Policy
        </h1>
        <p className="font-[amma3] text-[14px] text-gray-500 mb-[60px] border-b border-gray-200 pb-[30px]">
          Last updated: September 1, 2025
        </p>

        <div className="space-y-[50px]">
          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Refund Eligibility
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              We want you to be completely satisfied with your purchase. If you are not happy with your order, you may be eligible for a refund under the following conditions: the item was purchased within the last 14 days, the item is unused, unworn, and in its original packaging with all tags attached, and the item is not a final sale or clearance product. Items that show signs of wear, washing, or alteration will not be accepted for refund.
            </p>
          </section>

          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Refund Process
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              To initiate a refund, please contact our support team at{' '}
              <span className="text-gray-900 font-[amma4] tracking-[1px]">hello@foodians.in</span>{' '}
              with your order number and reason for the refund. Our team will review your request and provide instructions on how to return the item. Once we receive and inspect the returned product, we will notify you of the approval or rejection of your refund. Approved refunds will be processed to your original method of payment.
            </p>
          </section>

          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Refund Timeline
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              Once your refund has been approved, please allow 5 to 10 business days for the refund to appear on your original payment method. Please note that processing times may vary depending on your bank or credit card issuer. If you have not received your refund after 10 business days, please contact your bank first, then reach out to our support team.
            </p>
          </section>

          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Late Refunds
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              If you haven't received your refund within the expected timeframe, first check your bank account or credit card statement again. Then contact your bank or credit card company, as there is often a processing time before a refund is officially posted. If you've done all of this and still have not received your refund, please contact us at{' '}
              <span className="text-gray-900 font-[amma4] tracking-[1px]">hello@foodians.in</span>.
            </p>
          </section>

          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Exchanges
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              We currently do not offer direct exchanges. If you need a different size or color, please initiate a refund for the original item and place a new order for the desired product. This ensures you receive your preferred item as quickly as possible and is subject to the same 14-day refund eligibility window.
            </p>
          </section>

          <section>
            <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[16px] border-b border-gray-100 pb-[12px]">
              Contact
            </h2>
            <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
              For any questions or concerns regarding refunds, please reach out to our support team at{' '}
              <span className="text-gray-900 font-[amma4] tracking-[1px]">hello@foodians.in</span>.
              We are available Monday through Friday, 10:00 AM to 6:00 PM IST.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
