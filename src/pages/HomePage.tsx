import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Phone,
  Compass,
  CheckCircle2,
  Home,
  Building2,
  Palette,
  Layers,
  Sliders,
  ChevronRight,
  Eye,
  MapPin,
  Sparkles
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA, INITIAL_PROJECTS } from '../data/initialData';
import { Project } from '../types';

export const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch live projects from backend API
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data);
        }
      } catch (err) {
        console.warn('Using local seed projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const showcaseCategories = [
    'All',
    'Residential',
    'Living Room',
    'Bedroom',
    'Commercial',
    'Modern',
    'Wall Design'
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects.slice(0, 6)
    : projects.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  // Service icons mapping
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-6 h-6 text-[#F2842F]" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-[#F2842F]" />;
      case 'Palette': return <Palette className="w-6 h-6 text-[#F2842F]" />;
      case 'Compass': return <Compass className="w-6 h-6 text-[#F2842F]" />;
      case 'Layers': return <Layers className="w-6 h-6 text-[#F2842F]" />;
      case 'Sliders': return <Sliders className="w-6 h-6 text-[#F2842F]" />;
      default: return <Compass className="w-6 h-6 text-[#F2842F]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#253C6D] text-white overflow-hidden architectural-grid-dark">
        {/* Subtle architectural framing accents */}
        <div className="absolute top-8 left-8 hidden lg:flex items-center gap-2 text-[10px] tracking-widest text-[#455B8A] uppercase font-mono">
          <span className="w-2 h-2 border border-[#F2842F]"></span>
          <span>EST. LAHORE • 31.5546° N, 74.3411° E</span>
        </div>
        <div className="absolute top-8 right-8 hidden lg:flex items-center gap-2 text-[10px] tracking-widest text-[#455B8A] uppercase font-mono">
          <span>ALI JAN TRADERS &amp; INTERIORS</span>
          <span className="w-2 h-2 border border-[#F2842F]"></span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 lg:pr-6">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#30497D]/70 border border-[#455B8A]/60 text-xs font-semibold tracking-wider uppercase text-[#F2842F]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INTERIOR DESIGN &amp; DECOR</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                Spaces Designed to <br className="hidden sm:inline" />
                <span className="text-[#F2842F] italic">Feel Like Home</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl font-light">
                Ali Jan Traders &amp; Interiors creates refined, functional and beautiful interior spaces tailored to the lifestyle, personality and vision of every client in Lahore.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/projects"
                  id="hero-btn-projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F2842F] hover:bg-[#e07524] text-white text-sm font-semibold tracking-wide rounded transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  <span>Explore Our Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  id="hero-btn-consultation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#30497D] hover:bg-[#455B8A] text-white text-sm font-semibold tracking-wide rounded border border-[#455B8A] transition-all active:scale-[0.98]"
                >
                  <span>Get a Consultation</span>
                </Link>
              </div>

              {/* Local Trust Badges */}
              <div className="pt-8 border-t border-[#30497D] grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">Location</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Garhi Shahu, Lahore</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">Specialty</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Bespoke Interiors</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">Execution</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Turnkey &amp; Styling</div>
                </div>
              </div>
            </div>

            {/* Right Architectural Imagery */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Architectural frame accent */}
                <div className="absolute -top-4 -left-4 w-28 h-28 border-t-2 border-l-2 border-[#F2842F]/60 -z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-28 h-28 border-b-2 border-r-2 border-[#F2842F]/60 -z-0"></div>

                <div className="relative rounded-lg overflow-hidden border border-[#30497D] shadow-2xl bg-[#30497D]">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                    alt="Refined contemporary interior designed by Ali Jan Traders & Interiors"
                    className="w-full h-[420px] sm:h-[480px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#253C6D]/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Architectural Tag */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#253C6D]/90 backdrop-blur-md rounded border border-[#455B8A]/40 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold tracking-wider text-[#F2842F] uppercase">
                        Architectural Interior
                      </div>
                      <div className="text-xs text-white font-medium">
                        Linear Wood &amp; Travertine Suite
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-300 font-mono px-2 py-1 rounded bg-[#30497D]">
                      Lahore Studio
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION (SPLIT LAYOUT) */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#EEF1F5]" id="home-intro-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Interior Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-lg overflow-hidden shadow-xl border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                  alt="Living room spatial interior design by Ali Jan Traders"
                  className="w-full h-[440px] sm:h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded shadow-sm border border-gray-200">
                  <span className="text-[11px] font-bold text-[#253C6D] uppercase tracking-wider">
                    Beadon Road • Garhi Shahu
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Thoughtful Design Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
                PHILOSOPHY &amp; CRAFTSMANSHIP
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#253C6D] leading-tight">
                Thoughtful Design. <br />
                <span className="text-[#30497D]">Timeless Spaces.</span>
              </h2>

              <p className="text-gray-600 leading-relaxed text-base">
                At Ali Jan Traders &amp; Interiors, we believe that an interior should never simply be a showpiece—it must be an organic extension of those who inhabit it. Located on Beadon Road in Garhi Shahu, Lahore, our studio combines architectural discipline with genuine everyday comfort.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { title: 'Functionality', desc: 'Spaces organized for effortless movement, storage, and daily utility.' },
                  { title: 'Comfort', desc: 'Ergonomic seating, warm lighting, and acoustic peace.' },
                  { title: 'Style', desc: 'Balanced aesthetics honoring both modern minimalism and Lahore elegance.' },
                  { title: 'Quality', desc: 'Durable joinery, premium wall claddings, and long-lasting finishes.' },
                  { title: 'Detail', desc: 'Precision in every joint, shadow gap, lighting reveal, and texture.' }
                ].map((item, idx) => (
                  <div
                    key={item.title}
                    className={`p-3.5 rounded-lg border border-gray-100 bg-[#F7F8FA] hover:border-[#30497D]/30 transition-colors ${
                      idx === 4 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F2842F]" />
                      <h4 className="text-sm font-bold text-[#253C6D]">{item.title}</h4>
                    </div>
                    <p className="text-xs text-gray-600 pl-3.5 leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  id="intro-discover-story"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#253C6D] hover:text-[#F2842F] group transition-colors"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#F2842F]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW */}
      <section className="py-20 lg:py-24 bg-[#F7F8FA]" id="home-services-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
              EXPERTISE &amp; DISCIPLINES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#253C6D] mt-2">
              Design Services Built Around Your Space
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              Comprehensive interior solutions from preliminary 2D space planning to custom bespoke surface engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group bg-white rounded-lg p-7 border border-gray-200/80 hover:border-[#30497D] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-[#EEF1F5] flex items-center justify-center group-hover:bg-[#253C6D] transition-colors mb-5">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#253C6D] group-hover:text-[#30497D] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2.5 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to={`/services#${service.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#253C6D] group-hover:text-[#F2842F] transition-colors"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#F2842F]" />
                  </Link>
                  <span className="text-[11px] font-mono text-gray-400">0{SERVICES_DATA.indexOf(service) + 1}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#253C6D] hover:bg-[#30497D] text-white text-sm font-semibold rounded transition-colors"
            >
              <span>Explore All Detailed Services</span>
              <ArrowRight className="w-4 h-4 text-[#F2842F]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (EDITORIAL LAYOUT) */}
      <section className="py-20 lg:py-24 bg-[#253C6D] text-white relative architectural-grid-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header Column */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
                THE ALI JAN STANDARD
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                Why Choose <br />
                Ali Jan Traders &amp; Interiors?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                We combine creative ambition with pragmatic project governance. You receive thoughtful design recommendations that respect your daily habits, material permanence, and investment parameters.
              </p>
              
              <div className="p-4 rounded bg-[#30497D]/50 border border-[#455B8A]/40 text-xs text-gray-200">
                <span className="font-semibold text-[#F2842F] block mb-1">Direct Consultation Guarantee</span>
                Speak directly with qualified interior designers who assess your exact room dimensions and spatial aspirations.
              </div>
            </div>

            {/* Right Editorial Pillar Cards */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  number: '01',
                  title: 'Personalized Design',
                  desc: 'Every project is planned according to the client’s unique needs, family requirements, spatial scale, and aesthetic preferences without repetitive cookie-cutter layouts.'
                },
                {
                  number: '02',
                  title: 'Practical Creativity',
                  desc: 'We design visually captivating rooms that remain effortlessly functional, comfortable for daily routines, easy to maintain, and welcoming to guests.'
                },
                {
                  number: '03',
                  title: 'Attention to Detail',
                  desc: 'Every material selection, joinery junction, ambient cove fixture, color temperature, and surface texture is rigorously evaluated before installation.'
                },
                {
                  number: '04',
                  title: 'Professional Approach',
                  desc: 'Transparent timelines, clear documentation, responsive communication, and organized step-by-step project planning from first draft to completion.'
                },
                {
                  number: '05',
                  title: 'Local Understanding',
                  desc: 'Rooted in Lahore, we understand local architectural styles, regional weather considerations, dust resistance, and domestic living cultures across Punjab.'
                }
              ].map((pillar) => (
                <div
                  key={pillar.number}
                  className="p-6 rounded-lg bg-[#30497D]/60 border border-[#455B8A]/40 hover:bg-[#30497D] hover:border-[#F2842F]/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm font-bold text-[#F2842F] group-hover:text-white transition-colors pt-0.5">
                      {pillar.number}
                    </span>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#F2842F] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROJECT SHOWCASE */}
      <section className="py-20 lg:py-24 bg-white" id="home-project-showcase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
                PORTFOLIO GALLERY
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#253C6D] mt-1.5">
                Curated Design Showcase
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                *Conceptual interior design visualizations &amp; curated showcase concepts for Lahore residences and commercial spaces.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {showcaseCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#253C6D] text-[#F2842F]'
                      : 'bg-[#EEF1F5] text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="group bg-[#F7F8FA] rounded-lg overflow-hidden border border-gray-200 hover:border-[#30497D] hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Container with Hover Effect */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-900">
                  <img
                    src={proj.images[0]}
                    alt={proj.title}
                    className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#253C6D]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#253C6D]/90 text-[#F2842F] text-[11px] font-bold rounded uppercase tracking-wider backdrop-blur-sm">
                      {proj.category}
                    </span>
                    {proj.isDemo && (
                      <span className="px-2 py-0.5 bg-black/60 text-gray-300 text-[10px] rounded backdrop-blur-sm">
                        Concept Demo
                      </span>
                    )}
                  </div>

                  {/* Location Pin */}
                  {proj.location && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-gray-200 font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      <MapPin className="w-3 h-3 text-[#F2842F]" />
                      <span>{proj.location}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#253C6D] group-hover:text-[#F2842F] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-200/80 flex items-center justify-between">
                    <Link
                      to={`/projects/${proj.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#253C6D] group-hover:text-[#F2842F] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#F2842F]" />
                      <span>View Project Details</span>
                    </Link>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#F2842F] transform group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#30497D] hover:bg-[#253C6D] text-white text-sm font-semibold rounded transition-colors"
            >
              <span>View Full Project Gallery</span>
              <ArrowRight className="w-4 h-4 text-[#F2842F]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PROCESS (4-STEP TIMELINE) */}
      <section className="py-20 lg:py-24 bg-[#EEF1F5]/60 border-t border-b border-gray-200" id="home-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
              STRUCTURED METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#253C6D] mt-2">
              Our 4-Step Design Process
            </h2>
            <p className="text-gray-600 text-sm mt-3">
              A transparent, organized journey from preliminary space appraisal to final handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: '01',
                title: 'Consultation',
                subtitle: 'Discovery & Brief',
                desc: 'We meet to understand your lifestyle, aesthetic aspirations, space constraints, and investment range.'
              },
              {
                step: '02',
                title: 'Concept & Planning',
                subtitle: 'Layouts & Palettes',
                desc: 'Development of 2D floor plans, spatial zoning, mood boards, material swatches, and lighting schematics.'
              },
              {
                step: '03',
                title: 'Design & Execution',
                subtitle: 'Craft & Fabrication',
                desc: 'Careful coordination of joinery, wall paneling, surface textures, ceiling diffusers, and electrical layouts.'
              },
              {
                step: '04',
                title: 'Final Touches',
                subtitle: 'Styling & Handover',
                desc: 'Placement of curated furniture, artwork, soft furnishings, lighting calibration, and final walkthrough.'
              }
            ].map((item, index) => (
              <div
                key={item.step}
                className="bg-white p-7 rounded-lg border border-gray-200 relative group hover:border-[#30497D] hover:shadow-md transition-all"
              >
                <div className="text-2xl font-mono font-bold text-[#F2842F] mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-serif font-bold text-[#253C6D]">
                  {item.title}
                </h3>
                <div className="text-xs font-medium text-[#455B8A] uppercase tracking-wider mt-0.5">
                  {item.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-20 lg:py-24 bg-[#253C6D] text-white relative overflow-hidden" id="home-cta">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#30497D] text-[#F2842F] text-xs font-bold uppercase tracking-widest border border-[#455B8A]">
            GET IN TOUCH WITH OUR LAHORE STUDIO
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Let's Create a Space Worth Coming Home To.
          </h2>

          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Have an interior project in mind? Talk to Ali Jan Traders &amp; Interiors and discuss your space, ideas and requirements.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              id="cta-call-phone-button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#F2842F] hover:bg-[#e07524] text-white text-base font-semibold rounded shadow-lg transition-all active:scale-[0.98]"
            >
              <Phone className="w-5 h-5 text-white" />
              <span>Call {BUSINESS_INFO.phone}</span>
            </a>

            <Link
              to="/contact"
              id="cta-request-consultation-button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#30497D] hover:bg-[#455B8A] text-white text-base font-semibold rounded border border-[#455B8A] transition-all active:scale-[0.98]"
            >
              <span>Request a Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#F2842F]" />
            </Link>
          </div>

          <div className="pt-6 text-xs text-gray-400">
            Address: Beadon Rd, Victoria Park Garhi Shahu, Lahore, 54000, Pakistan
          </div>
        </div>
      </section>
    </div>
  );
};
