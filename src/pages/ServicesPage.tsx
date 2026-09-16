import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { SERVICES_DATA, BUSINESS_INFO } from '../data/initialData';

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-24 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="border-b border-[#30497D]/20 pb-12">
          <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
            COMPREHENSIVE CAPABILITIES
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#253C6D] mt-2 tracking-tight">
            Design Services Built Around Your Space
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mt-4 font-light leading-relaxed">
            From strategic 2D space planning to custom bespoke surface engineering and turnkey interior execution, we shape residential and commercial environments throughout Lahore.
          </p>
        </div>
      </section>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {SERVICES_DATA.map((service, index) => {
          const isEven = index % 2 === 1;
          return (
            <article
              key={service.id}
              id={service.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden p-6 sm:p-10 transition-all hover:shadow-md"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? 'lg:grid-flow-dense' : ''}`}>
                {/* Image */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:col-start-7' : ''}`}>
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-inner group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-72 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#253C6D]/90 backdrop-blur-sm text-[#F2842F] text-xs font-mono font-bold rounded">
                      0{index + 1} • SERVICE
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:col-start-1' : ''}`}>
                  <div>
                    <span className="text-xs font-bold tracking-wider text-[#455B8A] uppercase">
                      Ali Jan Traders &amp; Interiors
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#253C6D] mt-1">
                      {service.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 mt-3 leading-relaxed">
                      {service.longDesc}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#253C6D] mb-2.5">
                      Key Features &amp; Scope:
                    </h3>
                    <ul className="space-y-2">
                      {service.keyFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-[#F2842F] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suitable For */}
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#253C6D] mb-2.5">
                      Recommended &amp; Suitable For:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.suitableFor.map((item, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs bg-[#EEF1F5] text-[#253C6D] font-medium rounded border border-gray-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F2842F] hover:bg-[#e07524] text-white text-xs sm:text-sm font-semibold rounded shadow-sm transition-all"
                    >
                      <span>Inquire About {service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-[#253C6D] rounded-lg p-8 sm:p-12 text-white text-center space-y-5 shadow-xl architectural-grid-dark">
          <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
            TAILORED PACKAGES
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white max-w-2xl mx-auto">
            Need a Custom Combination of Services?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
            We adapt our scope to match your exact floor plan, project stage, and budget in Lahore.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#F2842F] hover:bg-[#e07524] text-white text-sm font-semibold rounded shadow transition-all"
            >
              Request Custom Proposal
            </Link>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-6 py-3 bg-[#30497D] hover:bg-[#455B8A] text-white text-sm font-semibold rounded border border-[#455B8A] transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#F2842F]" />
              <span>Call +92 321 4055675</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
