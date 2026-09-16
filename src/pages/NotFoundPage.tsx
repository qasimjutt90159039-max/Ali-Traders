import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#253C6D] text-white pt-24 pb-20 flex items-center justify-center px-4 architectural-grid-dark">
      <div className="max-w-md w-full text-center space-y-6 bg-[#30497D]/60 p-8 sm:p-12 rounded-lg border border-[#455B8A]/40 shadow-2xl backdrop-blur-sm">
        <div className="w-16 h-16 rounded bg-[#253C6D] border border-[#F2842F] text-[#F2842F] flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 stroke-[1.8]" />
        </div>

        <div className="space-y-2">
          <div className="font-mono text-sm font-bold text-[#F2842F] tracking-widest uppercase">
            404 • ELEVATION VOID
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-gray-300 font-light leading-relaxed">
            The space you're looking for doesn't seem to exist.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            id="back-to-home-btn"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F2842F] hover:bg-[#e07524] text-white text-sm font-semibold rounded shadow transition-all active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="text-[11px] text-gray-400 font-mono pt-4 border-t border-[#455B8A]/30">
          Ali Jan Traders &amp; Interiors • Beadon Road, Lahore
        </div>
      </div>
    </div>
  );
};
