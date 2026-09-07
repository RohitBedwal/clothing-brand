import NavBar2 from '../components/NavBar2';

const values = [
  {
    title: 'Craftsmanship',
    description:
      'Every piece is meticulously constructed by skilled artisans who bring decades of expertise to each stitch, cut, and finish. We believe in slow fashion — garments made with care, built to endure.',
    icon: 'ri-scissors-cut-line',
  },
  {
    title: 'Sustainability',
    description:
      'We source responsibly, produce thoughtfully, and package consciously. From organic textiles to recyclable materials, every decision is made with the planet in mind.',
    icon: 'ri-leaf-line',
  },
  {
    title: 'Innovation',
    description:
      'We push boundaries without abandoning tradition. Our design process blends heritage techniques with modern technology to create pieces that feel timeless yet unmistakably current.',
    icon: 'ri-lightbulb-line',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <NavBar2 />

      <div className="pt-[110px] pb-[80px] max-w-[1000px] mx-auto px-[30px] max-md:px-[16px]">
        {/* Hero */}
        <div className="mb-[80px]">
          <p className="font-[amma3] text-[12px] tracking-[4px] uppercase text-gray-500 mb-[16px]">
            Est. 2019 — Mumbai
          </p>
          <h1 className="font-[amma4] text-[48px] max-md:text-[32px] tracking-[3px] uppercase text-gray-900 mb-[30px] leading-[1.1]">
            Our Story
          </h1>
          <div className="w-[60px] h-[1px] bg-gray-900 mb-[30px]" />
          <p className="font-[amma3] text-[16px] leading-[1.8] text-gray-600 max-w-[600px]">
            Echo Studio was born from a belief that luxury should be felt in every thread — not
            just seen on a label. We create pieces for people who value substance over spectacle.
          </p>
        </div>

        {/* Brand Story */}
        <div className="grid grid-cols-[1fr_1fr] max-md:grid-cols-1 gap-[60px] mb-[100px]">
          <div>
            <div className="bg-gray-100 aspect-[4/5] mb-[30px]" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-[amma4] text-[24px] tracking-[3px] uppercase text-gray-900 mb-[24px]">
              The Beginning
            </h2>
            <div className="w-[40px] h-[1px] bg-gray-900 mb-[24px]" />
            <p className="font-[amma3] text-[15px] leading-[1.9] text-gray-600 mb-[20px]">
              Echo Studio started in a small studio in Mumbai with a single idea: fashion should be
              personal, purposeful, and uncompromising. What began as a one-person operation has grown
              into a collective of designers, craftspeople, and dreamers united by a shared vision.
            </p>
            <p className="font-[amma3] text-[15px] leading-[1.9] text-gray-600">
              We design for the conscious individual — someone who asks where their clothes come from,
              who made them, and what they stand for. Every collection is a conversation between
              heritage craft and contemporary life.
            </p>
          </div>
        </div>

        {/* Second Story Block */}
        <div className="grid grid-cols-[1fr_1fr] max-md:grid-cols-1 gap-[60px] mb-[100px]">
          <div className="flex flex-col justify-center max-md:order-2">
            <h2 className="font-[amma4] text-[24px] tracking-[3px] uppercase text-gray-900 mb-[24px]">
              Growing Forward
            </h2>
            <div className="w-[40px] h-[1px] bg-gray-900 mb-[24px]" />
            <p className="font-[amma3] text-[15px] leading-[1.9] text-gray-600 mb-[20px]">
              Today, Echo Studio serves a global community of individuals who refuse to choose between
              style and ethics. Our collections span ready-to-wear, accessories, and limited-edition
              collaborations — each piece telling its own story.
            </p>
            <p className="font-[amma3] text-[15px] leading-[1.9] text-gray-600">
              We remain rooted in Mumbai, drawing inspiration from its energy, diversity, and
              relentless spirit. But our reach extends far beyond — because good design has no
              borders.
            </p>
          </div>
          <div className="max-md:order-1">
            <div className="bg-gray-100 aspect-[4/5]" />
          </div>
        </div>

        {/* Our Philosophy */}
        <div className="mb-[100px]">
          <p className="font-[amma3] text-[12px] tracking-[4px] uppercase text-gray-500 mb-[16px]">
            What Guides Us
          </p>
          <h2 className="font-[amma4] text-[36px] max-md:text-[28px] tracking-[3px] uppercase text-gray-900 mb-[20px]">
            Our Philosophy
          </h2>
          <div className="w-[60px] h-[1px] bg-gray-900 mb-[60px]" />

          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-[40px]">
            {values.map((value) => (
              <div key={value.title}>
                <i className={`${value.icon} text-[28px] text-gray-900 mb-[20px] block`} />
                <h3 className="font-[amma4] text-[16px] tracking-[3px] uppercase text-gray-900 mb-[16px]">
                  {value.title}
                </h3>
                <p className="font-[amma3] text-[14px] leading-[1.8] text-gray-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Image Grid */}
        <div className="grid grid-cols-2 gap-[20px] mb-[100px]">
          <div className="bg-gray-100 aspect-[3/4]" />
          <div className="bg-gray-100 aspect-[3/4] mt-[40px]" />
        </div>

        {/* Our Mission */}
        <div className="border-t border-gray-200 pt-[80px]">
          <p className="font-[amma3] text-[12px] tracking-[4px] uppercase text-gray-500 mb-[16px]">
            Looking Ahead
          </p>
          <h2 className="font-[amma4] text-[36px] max-md:text-[28px] tracking-[3px] uppercase text-gray-900 mb-[20px]">
            Our Mission
          </h2>
          <div className="w-[60px] h-[1px] bg-gray-900 mb-[30px]" />
          <p className="font-[amma3] text-[16px] leading-[1.9] text-gray-600 max-w-[700px] mb-[20px]">
            To redefine modern fashion by proving that luxury, sustainability, and authenticity can
            coexist — without compromise. We are here to create garments that respect the hands that
            make them, the people who wear them, and the world we all share.
          </p>
          <p className="font-[amma3] text-[16px] leading-[1.9] text-gray-600 max-w-[700px]">
            Every stitch is a statement. Every collection, a chapter. And the story is far from over.
          </p>
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
