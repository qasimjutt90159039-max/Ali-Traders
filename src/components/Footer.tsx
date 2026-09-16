import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Compass, Clock, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-[#253C6D] text-white border-t border-[#30497D]">
      {/* Upper footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-[#30497D] border border-[#455B8A] flex items-center justify-center text-[#F2842F]">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-serif tracking-tight font-bold text-lg text-white">
                ALI JAN TRADERS &amp; INTERIORS
              </span>
            </div>
            
            <p className="text-[#F2842F] text-xs uppercase tracking-widest font-semibold">
              {BUSINESS_INFO.tagline}
            </p>
            
            <p className="text-sm text-gray-300 leading-relaxed pr-4">
              Providing thoughtful interior design, smart spatial planning, and tailored surface solutions for residential and commercial environments throughout Lahore, Pakistan.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded bg-[#30497D]/70 text-gray-200 border border-[#455B8A]/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Operating Studio: Garhi Shahu, Lahore
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F2842F] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Design Services */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F2842F] mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/services#residential-interiors" className="hover:text-white transition-colors">Residential Interiors</Link>
              </li>
              <li>
                <Link to="/services#commercial-interiors" className="hover:text-white transition-colors">Commercial Interiors</Link>
              </li>
              <li>
                <Link to="/services#space-planning" className="hover:text-white transition-colors">Architectural Space Planning</Link>
              </li>
              <li>
                <Link to="/services#interior-styling" className="hover:text-white transition-colors">Interior Styling &amp; Materials</Link>
              </li>
              <li>
                <Link to="/services#wall-surface-design" className="hover:text-white transition-colors">Wall &amp; Surface Treatments</Link>
              </li>
              <li>
                <Link to="/services#custom-interior-solutions" className="hover:text-white transition-colors">Custom Interior Solutions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F2842F] mb-4">
              Direct Contact
            </h4>
            
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-start gap-3 text-sm text-gray-200 hover:text-white group"
            >
              <Phone className="w-4 h-4 text-[#F2842F] shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-white group-hover:text-[#F2842F] transition-colors">
                  {BUSINESS_INFO.phone}
                </span>
                <span className="text-xs text-gray-400">Direct Calls &amp; Inquiries</span>
              </div>
            </a>

            <div className="flex items-start gap-3 text-sm text-gray-200">
              <MapPin className="w-4 h-4 text-[#F2842F] shrink-0 mt-0.5" />
              <div className="text-xs text-gray-300 leading-relaxed">
                Beadon Rd, Victoria Park Garhi Shahu, Lahore, 54000, Pakistan
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-200">
              <Clock className="w-4 h-4 text-[#F2842F] shrink-0 mt-0.5" />
              <div className="text-xs text-gray-300">
                {BUSINESS_INFO.workingHours}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#30497D] hover:bg-[#455B8A] text-white text-xs font-medium rounded transition-colors"
              >
                Chat on WhatsApp
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F2842F]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#30497D] bg-[#1d3056] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© 2026 Ali Jan Traders &amp; Interiors. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-gray-400">Lahore, Punjab, Pakistan</span>
            <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
