import NavBar2 from '../components/NavBar2'

export default function ShippingPage() {
  return (
    <div className="bg-white min-h-screen">
      <NavBar2 />
      <main className="pt-[110px] pb-[80px] max-w-[1000px] mx-auto px-[30px] max-md:px-[16px]">
        <h1 className="font-[amma4] text-gray-900 text-[42px] uppercase tracking-[4px] mb-[60px]">
          Shipping Information
        </h1>

        <div className="space-y-[60px]">
          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Shipping Methods
            </h2>
            <div className="space-y-[20px]">
              <div className="flex justify-between items-start border-b border-gray-100 pb-[20px]">
                <div>
                  <p className="font-[amma3] text-gray-900 text-[16px] mb-[4px]">Standard Shipping</p>
                  <p className="font-[amma3] text-gray-500 text-[14px]">Delivery within 5–7 business days</p>
                </div>
                <span className="font-[amma4] text-gray-900 text-[14px] uppercase tracking-[3px]">Free</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-100 pb-[20px]">
                <div>
                  <p className="font-[amma3] text-gray-900 text-[16px] mb-[4px]">Express Shipping</p>
                  <p className="font-[amma3] text-gray-500 text-[14px]">Delivery within 2–3 business days</p>
                </div>
                <span className="font-[amma4] text-gray-900 text-[14px] uppercase tracking-[3px]">₹150</span>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Free Shipping
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
              We offer complimentary standard shipping on all orders above ₹2,000. The free shipping benefit is automatically applied at checkout once your cart total meets the threshold. This offer is valid for domestic orders only and cannot be combined with other promotional codes.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              International Shipping
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] mb-[16px]">
              We currently ship to select international destinations. International shipping rates are calculated at checkout based on destination and weight. Please note that customs duties and import taxes may apply and are the responsibility of the recipient.
            </p>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
              Delivery times for international orders typically range from 7–14 business days, depending on location and customs processing.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Order Tracking
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] mb-[16px]">
              Once your order has been dispatched, you will receive a confirmation email with tracking details. You can monitor the status of your shipment at any time through your account's order history.
            </p>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
              Simply log in to your account, navigate to "My Orders," and select the relevant order to view real-time tracking updates. If you have any issues with your shipment, our support team is available to assist.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
