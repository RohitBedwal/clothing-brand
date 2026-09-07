import { useState } from 'react';
import NavBar2 from '../components/NavBar2';

const faqSections = [
  {
    title: 'Orders',
    items: [
      {
        question: 'How do I place an order?',
        answer:
          'Browse our collection, select your size and preferred options, and add items to your cart. Proceed to checkout where you can enter your shipping details and complete payment. You will receive an order confirmation email immediately.',
      },
      {
        question: 'Can I modify or cancel my order after placing it?',
        answer:
          "We process orders quickly, but if your order hasn't been shipped yet, we may be able to make changes. Contact us at hello@echostudio.in with your order number and we will do our best to assist you.",
      },
      {
        question: "I didn't receive an order confirmation. What should I do?",
        answer:
          "Check your spam or junk folder first. If it's not there, contact our support team with your name and email address used during checkout, and we'll resend the confirmation.",
      },
    ],
  },
  {
    title: 'Shipping',
    items: [
      {
        question: 'Do you ship internationally?',
        answer:
          'Yes, we ship worldwide. International orders are delivered within 7–14 business days depending on your location. Shipping charges are calculated at checkout based on destination and order weight.',
      },
      {
        question: 'How long does domestic shipping take?',
        answer:
          'Domestic orders within India are typically delivered within 3–7 business days. Express shipping options are available at checkout for an additional fee.',
      },
      {
        question: 'How can I track my order?',
        answer:
          'Once your order ships, you will receive an email with a tracking number and link. You can also log into your account and view the order status under "My Orders."',
      },
    ],
  },
  {
    title: 'Returns & Exchanges',
    items: [
      {
        question: 'What is your return policy?',
        answer:
          'We offer a 14-day return window from the date of delivery. Items must be unworn, unwashed, and in their original packaging with all tags attached. Sale items are final sale and cannot be returned.',
      },
      {
        question: 'How do I initiate a return or exchange?',
        answer:
          'Email us at hello@echostudio.in with your order number and reason for return. Our team will provide you with a return authorization and shipping instructions within 24 hours.',
      },
      {
        question: 'When will I receive my refund?',
        answer:
          'Refunds are processed within 5–7 business days after we receive and inspect your returned items. The amount will be credited to your original payment method.',
      },
    ],
  },
  {
    title: 'Payments',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit/debit cards (Visa, MasterCard, American Express), UPI, net banking, and popular wallets. All transactions are processed through secure, encrypted gateways.',
      },
      {
        question: 'Is my payment information secure?',
        answer:
          'Absolutely. We use industry-standard SSL encryption and do not store your card details on our servers. All payment processing is handled by certified, PCI-compliant payment providers.',
      },
      {
        question: 'Do you offer cash on delivery?',
        answer:
          'Cash on delivery is available for select domestic orders. You can check availability during checkout by entering your pin code.',
      },
    ],
  },
  {
    title: 'Sizes & Fit',
    items: [
      {
        question: 'How do I find my size?',
        answer:
          'Each product page includes a detailed size guide with measurements in both inches and centimeters. We recommend measuring yourself and comparing with our chart for the best fit.',
      },
      {
        question: "What if I'm between sizes?",
        answer:
          "Our pieces are designed with a modern, relaxed fit. If you're between sizes, we generally recommend sizing up for a comfortable drape or sizing down for a more tailored look. Product descriptions include specific fit notes.",
      },
      {
        question: 'Do your pieces run true to size?',
        answer:
          'Most of our pieces run true to our size chart. However, certain styles may fit differently due to their design. Each product page notes whether the fit is true to size, oversized, or slim.',
      },
    ],
  },
  {
    title: 'Custom Orders',
    items: [
      {
        question: 'Do you accept custom or bespoke orders?',
        answer:
          'Yes, we offer custom orders for select pieces. This includes fabric selection, color customization, and size modifications. Custom orders take 4–6 weeks to complete and require a 50% advance payment.',
      },
      {
        question: 'Can I request a piece from a past collection?',
        answer:
          "Some discontinued items may be available on a made-to-order basis. Contact us with the specific piece you're interested in and we'll let you know if it can be recreated.",
      },
    ],
  },
];

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-[24px] text-left group"
      >
        <span className="font-[amma3] text-[15px] text-gray-900 pr-[20px] group-hover:text-gray-500 transition-colors duration-200">
          {question}
        </span>
        <i
          className={`ri-add-line text-[18px] text-gray-400 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-45' : ''
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? '300px' : '0px' }}
      >
        <p className="font-[amma3] text-[14px] leading-[1.9] text-gray-500 pb-[24px]">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (sectionTitle, itemIndex) => {
    const key = `${sectionTitle}-${itemIndex}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white min-h-screen">
      <NavBar2 />

      <div className="pt-[110px] pb-[80px] max-w-[1000px] mx-auto px-[30px] max-md:px-[16px]">
        {/* Header */}
        <div className="mb-[60px]">
          <p className="font-[amma3] text-[12px] tracking-[4px] uppercase text-gray-500 mb-[16px]">
            Help Center
          </p>
          <h1 className="font-[amma4] text-[48px] max-md:text-[32px] tracking-[3px] uppercase text-gray-900 mb-[20px] leading-[1.1]">
            Frequently Asked Questions
          </h1>
          <div className="w-[60px] h-[1px] bg-gray-900 mb-[24px]" />
          <p className="font-[amma3] text-[16px] leading-[1.8] text-gray-500 max-w-[500px]">
            Find answers to common questions about orders, shipping, returns, and more.
            Can't find what you're looking for? Contact us directly.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-[60px]">
          {faqSections.map((section) => (
            <div key={section.title}>
              <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[8px]">
                {section.title}
              </h2>
              <div className="w-[40px] h-[1px] bg-gray-900 mb-[20px]" />
              <div>
                {section.items.map((item, index) => {
                  const key = `${section.title}-${index}`;
                  return (
                    <AccordionItem
                      key={key}
                      question={item.question}
                      answer={item.answer}
                      isOpen={!!openItems[key]}
                      onToggle={() => toggleItem(section.title, index)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="border-t border-gray-200 mt-[80px] pt-[60px] text-center">
          <p className="font-[amma3] text-[12px] tracking-[4px] uppercase text-gray-400 mb-[16px]">
            Still Have Questions?
          </p>
          <h2 className="font-[amma4] text-[24px] tracking-[3px] uppercase text-gray-900 mb-[20px]">
            We&apos;re Here to Help
          </h2>
          <p className="font-[amma3] text-[15px] text-gray-500 mb-[30px] max-w-[400px] mx-auto">
            Our support team is available Monday through Saturday, 10AM to 7PM IST.
          </p>
          <a
            href="/contact"
            className="inline-block font-[amma3] text-[13px] tracking-[3px] uppercase border border-gray-900 text-gray-900 px-[40px] py-[16px] hover:bg-gray-900 hover:text-white transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
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
