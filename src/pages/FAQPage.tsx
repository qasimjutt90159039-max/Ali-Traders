import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Phone, MessageCircle, ArrowRight, HelpCircle, Compass } from 'lucide-react';
import { FAQ_DATA, BUSINESS_INFO } from '../data/initialData';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-24 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="border-b border-[#30497D]/20 pb-10">
          <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#253C6D] mt-2 tracking-tight">
            Interior Design &amp; Project Inquiries
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mt-3 font-light leading-relaxed">
            Find clear answers regarding our scope of work, residential and commercial design services, consultation process, and Lahore studio location.
          </p>
        </div>
      </section>

      {/* Main Content: Accordion + Quick Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FAQ Accordion */}
          <div className="lg:col-span-8 space-y-4" id="faq-accordion-container">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  id={`faq-item-${index}`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all shadow-sm hover:border-[#30497D]/40"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-gray-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-serif font-bold text-[#253C6D] pr-2">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-[#253C6D] text-white rotate-180' : 'bg-[#EEF1F5] text-[#253C6D]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-[#F7F8FA]/60">
                      <p className="pt-2">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Inquire / Direct Contact Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#253C6D] text-white rounded-lg p-7 shadow-md space-y-5 architectural-grid-dark">
              <div className="w-10 h-10 rounded bg-[#30497D] border border-[#F2842F] flex items-center justify-center text-[#F2842F]">
                <HelpCircle className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold">Have a specific question?</h3>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  Every space and project scope is distinct. Speak directly with Ali Jan Traders &amp; Interiors about your project requirements in Lahore.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="w-full py-3 px-4 bg-[#F2842F] hover:bg-[#e07524] text-white text-xs font-semibold rounded text-center transition-colors shadow flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>

                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#30497D] hover:bg-[#455B8A] text-white text-xs font-semibold rounded text-center transition-colors border border-[#455B8A] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>

                <Link
                  to="/contact"
                  className="w-full py-3 px-4 bg-transparent hover:bg-white/10 text-white text-xs font-semibold rounded text-center transition-colors border border-white/20 flex items-center justify-center gap-2"
                >
                  <span>Request Full Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F2842F]" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm text-xs text-gray-600 space-y-2">
              <div className="font-bold text-[#253C6D] uppercase tracking-wider">
                Lahore Office Address
              </div>
              <p className="leading-relaxed">
                ALI JAN TRADERS &amp; Interior Design, Beadon Rd, Victoria Park Garhi Shahu, Lahore, 54000, Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
