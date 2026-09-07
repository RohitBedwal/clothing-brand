import NavBar2 from '../components/NavBar2'

const sizes = [
  { size: 'XS', bust: '30–32', waist: '24–26', hip: '34–36', shoulder: '14–14.5' },
  { size: 'S', bust: '33–35', waist: '27–29', hip: '37–39', shoulder: '14.5–15' },
  { size: 'M', bust: '36–38', waist: '30–32', hip: '40–42', shoulder: '15–15.5' },
  { size: 'L', bust: '39–41', waist: '33–35', hip: '43–45', shoulder: '15.5–16' },
  { size: 'XL', bust: '42–44', waist: '36–38', hip: '46–48', shoulder: '16–16.5' },
  { size: 'XXL', bust: '45–47', waist: '39–41', hip: '49–51', shoulder: '16.5–17' },
]

export default function SizeGuidePage() {
  return (
    <div className="bg-white min-h-screen">
      <NavBar2 />
      <main className="pt-[110px] pb-[80px] max-w-[1000px] mx-auto px-[30px] max-md:px-[16px]">
        <h1 className="font-[amma4] text-[40px] max-md:text-[28px] tracking-[4px] uppercase text-gray-900 mb-[12px]">
          Size Guide
        </h1>
        <p className="font-[amma3] text-[14px] text-gray-500 mb-[60px] border-b border-gray-200 pb-[30px]">
          Find the perfect fit for your order
        </p>

        <div className="overflow-x-auto mb-[60px]">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="font-[amma4] text-[13px] tracking-[3px] uppercase text-gray-900 text-left py-[16px] pr-[24px]">
                  Size
                </th>
                <th className="font-[amma4] text-[13px] tracking-[3px] uppercase text-gray-900 text-left py-[16px] pr-[24px]">
                  Bust
                </th>
                <th className="font-[amma4] text-[13px] tracking-[3px] uppercase text-gray-900 text-left py-[16px] pr-[24px]">
                  Waist
                </th>
                <th className="font-[amma4] text-[13px] tracking-[3px] uppercase text-gray-900 text-left py-[16px] pr-[24px]">
                  Hip
                </th>
                <th className="font-[amma4] text-[13px] tracking-[3px] uppercase text-gray-900 text-left py-[16px]">
                  Shoulder
                </th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((row, i) => (
                <tr
                  key={row.size}
                  className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}
                >
                  <td className="font-[amma4] text-[15px] tracking-[2px] text-gray-900 py-[16px] pr-[24px]">
                    {row.size}
                  </td>
                  <td className="font-[amma3] text-[15px] text-gray-600 py-[16px] pr-[24px]">
                    {row.bust}"
                  </td>
                  <td className="font-[amma3] text-[15px] text-gray-600 py-[16px] pr-[24px]">
                    {row.waist}"
                  </td>
                  <td className="font-[amma3] text-[15px] text-gray-600 py-[16px] pr-[24px]">
                    {row.hip}"
                  </td>
                  <td className="font-[amma3] text-[15px] text-gray-600 py-[16px]">
                    {row.shoulder}"
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-[amma3] text-[14px] leading-[1.8] text-gray-500 mb-[50px] italic">
          All measurements are in inches. If you're between sizes, we recommend sizing up for a more comfortable fit.
        </p>

        <div className="border-t border-gray-200 pt-[50px]">
          <h2 className="font-[amma4] text-[18px] tracking-[3px] uppercase text-gray-900 mb-[20px]">
            How to Measure
          </h2>
          <div className="space-y-[24px]">
            <div className="flex gap-[12px] items-start">
              <span className="font-[amma4] text-[13px] tracking-[2px] uppercase text-gray-900 min-w-[70px] pt-[2px]">
                Bust
              </span>
              <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
                Measure around the fullest part of your chest, keeping the tape level and snug but not tight.
              </p>
            </div>
            <div className="flex gap-[12px] items-start">
              <span className="font-[amma4] text-[13px] tracking-[2px] uppercase text-gray-900 min-w-[70px] pt-[2px]">
                Waist
              </span>
              <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
                Measure around the narrowest part of your natural waistline, typically just above the belly button.
              </p>
            </div>
            <div className="flex gap-[12px] items-start">
              <span className="font-[amma4] text-[13px] tracking-[2px] uppercase text-gray-900 min-w-[70px] pt-[2px]">
                Hip
              </span>
              <p className="font-[amma3] text-[15px] leading-[1.8] text-gray-600">
                Measure around the widest part of your hips and buttocks, keeping the tape horizontal.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
