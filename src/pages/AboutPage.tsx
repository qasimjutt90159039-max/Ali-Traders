import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Phone, ArrowRight, ShieldCheck, Target, HeartHandshake, Eye, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-24 pb-20">
      {/* 1. ARCHITECTURAL EDITORIAL HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="border-b border-[#30497D]/20 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
                STUDIO PROFILE &amp; PEDIGREE
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#253C6D] tracking-tight">
                About Ali Jan Traders &amp; Interiors
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
                An architectural interior studio rooted on Beadon Road, Victoria Park Garhi Shahu, Lahore—dedicated to crafting refined, durable, and individually articulated interior spaces.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0">
              <div className="text-xs text-gray-500 font-medium">Headquarters</div>
              <div className="text-sm font-bold text-[#253C6D] mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#F2842F]" />
                Lahore, Pakistan
              </div>
              <div className="text-xs text-gray-500 mt-2 font-mono">54000 • Beadon Road</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPLIT NARRATIVE & CORE PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Architectural Imagery Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
                  alt="Interior details craftsmanship"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-5 rounded-lg bg-[#253C6D] text-white space-y-1">
                <div className="text-xs uppercase tracking-wider text-[#F2842F] font-bold font-mono">Location Context</div>
                <div className="text-sm font-semibold">Garhi Shahu, Lahore</div>
                <p className="text-xs text-gray-300 font-light pt-1">
                  Connecting classical Lahore urban aesthetics with international contemporary standards.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80"
                  alt="Textured wall surfaces"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Design Philosophy Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
              DESIGN PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#253C6D] leading-tight">
              Design is Not an Ornament. <br />
              <span className="text-[#30497D]">It is Spatial Integrity.</span>
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              At Ali Jan Traders &amp; Interiors, our design philosophy is anchored in the belief that an interior space must first function flawlessly before it can truly be admired. Whether designing an intimate family residence or an expansive corporate office, we reject superficial trends in favor of disciplined geometry, authentic materials, and enduring balance.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              We approach every floor plan with deep architectural respect. Light, circulation, acoustics, and storage are not treated as secondary considerations—they are the very framework upon which aesthetic finishes are built.
            </p>

            <div className="pt-2 border-l-2 border-[#F2842F] pl-4 italic text-sm text-gray-800">
              "We measure our success not by temporary visual novelty, but by how naturally and comfortably a space supports the daily rhythms of those who live and work within it."
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR APPROACH */}
      <section className="bg-[#253C6D] text-white py-16 sm:py-20 mb-20 architectural-grid-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
              METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
              Our Architectural Approach
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-2">
              How Ali Jan Traders &amp; Interiors approaches each commission with rigour and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-[#30497D]/50 border border-[#455B8A]/40">
              <div className="w-10 h-10 rounded bg-[#253C6D] border border-[#F2842F] flex items-center justify-center text-[#F2842F] mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                Discovery &amp; Scale
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                We begin by conducting thorough dimensional appraisals. We examine natural light orientations, ceiling heights, structural pillars, and traffic patterns before formulating design sketches.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#30497D]/50 border border-[#455B8A]/40">
              <div className="w-10 h-10 rounded bg-[#253C6D] border border-[#F2842F] flex items-center justify-center text-[#F2842F] mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                Material Authenticity
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                We prioritize tactile permanence. From natural timber veneers and textured plasters to fluted acoustic panels and engineered stones, we select materials that age gracefully over time.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#30497D]/50 border border-[#455B8A]/40">
              <div className="w-10 h-10 rounded bg-[#253C6D] border border-[#F2842F] flex items-center justify-center text-[#F2842F] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                Disciplined Execution
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                A design is only as good as its physical translation. We supervise craftsmen, inspect joinery seams, verify lighting angles, and ensure every detail adheres strictly to the approved plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE VALUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
            ETHOS &amp; PRINCIPLES
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#253C6D] mt-2">
            What We Value
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Honesty & Transparency',
              desc: 'Direct communication regarding material costs, design feasibility, timeline projections, and realistic budgets.'
            },
            {
              title: 'Client Collaboration',
              desc: 'We never impose arbitrary aesthetic dogmas. Your personal routines and tastes steer every creative decision.'
            },
            {
              title: 'Long-Term Durability',
              desc: 'Designing spaces and specifying fixtures that resist wear, accommodate family growth, and retain value.'
            },
            {
              title: 'Lahore Context',
              desc: 'Sensitivity to local heat, cross-ventilation, dust control, and architectural character in Punjab.'
            }
          ].map((val) => (
            <div
              key={val.title}
              className="bg-white p-6 rounded-lg border border-gray-200/90 shadow-sm hover:border-[#30497D] transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-[#F2842F] mb-4" />
              <h3 className="text-base font-serif font-bold text-[#253C6D] mb-2">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SERVICE COMMITMENT & CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-8 sm:p-12 border border-gray-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
                OUR COMMITMENT TO YOU
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#253C6D]">
                Personalized Attention for Every Square Foot
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Whether you are refreshing a single room or commissioning a full residential or commercial layout, Ali Jan Traders &amp; Interiors provides dedicated advisory, detailed planning, and honest craftsmanship.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-[#253C6D]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2842F]" />
                  Direct Consultation
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2842F]" />
                  Clear Specifications
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2842F]" />
                  Lahore Studio Visits
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/contact"
                id="about-cta-consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F2842F] hover:bg-[#e07524] text-white text-sm font-semibold rounded shadow transition-all text-center"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#253C6D] hover:bg-[#30497D] text-white text-sm font-semibold rounded transition-all text-center"
              >
                <Phone className="w-4 h-4 text-[#F2842F]" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
