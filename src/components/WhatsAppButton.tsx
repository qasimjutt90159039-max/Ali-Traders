import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';

export const WhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* WhatsApp Quick Action Pill */}
      <a
        href={BUSINESS_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-chat-button"
        title="Chat on WhatsApp with Ali Jan Traders & Interiors"
        className="group flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>

      {/* Direct Phone Call Quick Link for mobile */}
      <a
        href={`tel:${BUSINESS_INFO.phoneRaw}`}
        id="mobile-quick-call-button"
        title={`Call ${BUSINESS_INFO.phone}`}
        className="sm:hidden flex items-center justify-center w-11 h-11 bg-[#253C6D] hover:bg-[#30497D] text-white rounded-full shadow-md transition-transform active:scale-95 border border-[#455B8A]"
      >
        <Phone className="w-4 h-4 text-[#F2842F]" />
      </a>
    </div>
  );
};
