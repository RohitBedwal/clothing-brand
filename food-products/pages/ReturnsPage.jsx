import NavBar2 from '../components/NavBar2'

export default function ReturnsPage() {
  return (
    <div className="bg-white min-h-screen">
      <NavBar2 />
      <main className="pt-[110px] pb-[80px] max-w-[1000px] mx-auto px-[30px] max-md:px-[16px]">
        <h1 className="font-[amma4] text-gray-900 text-[42px] uppercase tracking-[4px] mb-[60px]">
          Returns & Exchanges
        </h1>

        <div className="space-y-[60px]">
          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Return Policy
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] mb-[16px]">
              We want you to be completely satisfied with your purchase. If for any reason you are not, we accept returns within 7 days of delivery. Items must be unworn, unwashed, and in their original condition with all tags attached.
            </p>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
              To be eligible for a return, your item must meet the above criteria. We reserve the right to refuse returns that do not meet these conditions.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              How to Return
            </h2>
            <div className="space-y-[16px]">
              <div className="flex gap-[16px]">
                <span className="font-[amma4] text-gray-400 text-[14px] uppercase tracking-[3px] shrink-0">01</span>
                <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
                  Log in to your account and navigate to "My Orders." Select the order containing the item you wish to return.
                </p>
              </div>
              <div className="flex gap-[16px]">
                <span className="font-[amma4] text-gray-400 text-[14px] uppercase tracking-[3px] shrink-0">02</span>
                <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
                  Select the item and the reason for return. You will receive a return authorization and shipping instructions via email.
                </p>
              </div>
              <div className="flex gap-[16px]">
                <span className="font-[amma4] text-gray-400 text-[14px] uppercase tracking-[3px] shrink-0">03</span>
                <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
                  Pack the item securely in its original packaging and ship it to the address provided. Please note that return shipping costs are the responsibility of the customer.
                </p>
              </div>
              <div className="flex gap-[16px]">
                <span className="font-[amma4] text-gray-400 text-[14px] uppercase tracking-[3px] shrink-0">04</span>
                <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
                  Once we receive and inspect the returned item, we will process your refund or exchange.
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Exchanges
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] mb-[16px]">
              We offer exchanges for items of the same product in a different size or colour, subject to availability. To request an exchange, follow the same process outlined in the "How to Return" section above and indicate your preferred replacement.
            </p>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
              If the desired replacement is not available, we will process a refund to your original payment method.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Refund Process
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] mb-[16px]">
              Refunds are processed within 5–7 business days of receiving the returned item. The refund will be credited to your original payment method. Please allow an additional 3–5 business days for the refund to appear on your statement, depending on your bank or payment provider.
            </p>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8]">
              You will receive an email confirmation once the refund has been processed.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-[40px]">
            <h2 className="font-[amma4] text-gray-900 text-[18px] uppercase tracking-[3px] mb-[24px]">
              Non-Returnable Items
            </h2>
            <p className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] mb-[16px]">
              The following items are final sale and cannot be returned or exchanged:
            </p>
            <ul className="space-y-[8px]">
              <li className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] pl-[16px] relative before:content-['—'] before:absolute before:left-0 before:text-gray-400">
                Custom or personalised orders
              </li>
              <li className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] pl-[16px] relative before:content-['—'] before:absolute before:left-0 before:text-gray-400">
                Items purchased during sale or promotional events
              </li>
              <li className="font-[amma3] text-gray-600 text-[15px] leading-[1.8] pl-[16px] relative before:content-['—'] before:absolute before:left-0 before:text-gray-400">
                Items without original tags attached
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}
