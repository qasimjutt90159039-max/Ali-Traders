import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Compass, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#253C6D]/95 backdrop-blur-md shadow-md py-3'
          : 'bg-[#253C6D] py-4'
      } border-b border-[#30497D]/50 text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#F2842F] rounded-sm py-1"
            id="navbar-brand"
          >
            <div className="w-9 h-9 rounded bg-[#30497D] border border-[#455B8A] flex items-center justify-center text-[#F2842F] transition-transform group-hover:scale-105">
              <Compass className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-tight font-bold text-base sm:text-lg leading-tight text-white group-hover:text-[#EEF1F5] transition-colors">
                ALI JAN TRADERS
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-widest text-[#F2842F] uppercase">
                &amp; INTERIORS • LAHORE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" id="desktop-nav-links">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  className={`px-3.5 py-2 text-sm font-medium tracking-wide transition-colors relative rounded-md ${
                    active
                      ? 'text-[#F2842F]'
                      : 'text-gray-200 hover:text-white hover:bg-[#30497D]/50'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0.5 left-3.5 right-3.5 h-0.5 bg-[#F2842F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/admin"
              title="Admin Portal"
              className="text-xs text-gray-300 hover:text-white px-2 py-1 rounded transition-colors flex items-center gap-1 hover:bg-[#30497D]/40"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#F2842F]" />
              <span className="hidden xl:inline">Portal</span>
            </Link>

            <Link
              to="/contact"
              id="navbar-cta-consultation"
              className="inline-flex items-center justify-center px-4 py-2 text-xs lg:text-sm font-semibold tracking-wide text-white bg-[#F2842F] hover:bg-[#e07524] active:scale-[0.98] transition-all rounded shadow-sm hover:shadow"
            >
              Get a Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/contact"
              className="text-xs font-semibold px-2.5 py-1.5 bg-[#F2842F] text-white rounded hover:bg-[#e07524]"
            >
              Consult
            </Link>
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#30497D] focus:outline-none focus:ring-2 focus:ring-[#F2842F]"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drop-down */}
      {isOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden bg-[#253C6D] border-t border-[#30497D] px-4 pt-3 pb-6 space-y-1 shadow-2xl transition-all"
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2.5 rounded text-base font-medium transition-colors ${
                  active
                    ? 'bg-[#30497D] text-[#F2842F] font-semibold pl-4 border-l-2 border-[#F2842F]'
                    : 'text-gray-200 hover:bg-[#30497D]/60 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-4 mt-3 border-t border-[#30497D] flex flex-col gap-2.5">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded bg-[#30497D] text-white hover:bg-[#455B8A] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#F2842F]" />
              Call {BUSINESS_INFO.phone}
            </a>
            <Link
              to="/contact"
              className="flex items-center justify-center w-full py-2.5 text-sm font-semibold rounded bg-[#F2842F] text-white hover:bg-[#e07524] transition-colors"
            >
              Request a Consultation
            </Link>
            <Link
              to="/admin"
              className="text-center text-xs text-gray-400 hover:text-gray-200 py-1"
            >
              Admin Management Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
