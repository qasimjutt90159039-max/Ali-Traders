import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Eye, Phone, Sparkles, Info } from 'lucide-react';
import { INITIAL_PROJECTS, BUSINESS_INFO } from '../data/initialData';
import { Project } from '../types';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        // Try backend API first
        const res = await fetch(`/api/projects/${id}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setProject(json.data);
            setSelectedGalleryImage(json.data.images[0]);
            fetchRelated(json.data.category, json.data.id);
            return;
          }
        }
      } catch (e) {
        console.warn('API error, falling back to local list:', e);
      }

      // Local fallback
      const found = INITIAL_PROJECTS.find(p => p.id === id || p._id === id);
      if (found) {
        setProject(found);
        setSelectedGalleryImage(found.images[0]);
        fetchRelated(found.category, found.id);
      } else {
        setProject(null);
      }
      setLoading(false);
    };

    const fetchRelated = (category: string, currentId: string) => {
      const rel = INITIAL_PROJECTS.filter(p => p.id !== currentId && p.category === category);
      setRelatedProjects(rel.length > 0 ? rel : INITIAL_PROJECTS.filter(p => p.id !== currentId).slice(0, 3));
      setLoading(false);
    };

    fetchProjectDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] pt-28 pb-20 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-[#253C6D] border-t-[#F2842F] rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-500 font-mono">Loading architectural project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 text-center bg-white p-12 rounded-lg border border-gray-200">
          <h1 className="text-2xl font-serif font-bold text-[#253C6D]">Project Not Found</h1>
          <p className="text-sm text-gray-600 mt-2">
            The project you requested could not be located in our portfolio records.
          </p>
          <div className="mt-6">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#253C6D] text-white text-xs font-semibold rounded"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-20 pb-20">
      {/* Breadcrumb & Navigation Bar */}
      <div className="bg-white border-b border-gray-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 font-bold text-[#253C6D] hover:text-[#F2842F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-500">
            <span>Portfolio</span>
            <span>/</span>
            <span className="text-[#253C6D] font-medium">{project.category}</span>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-xl bg-gray-950">
          <img
            src={selectedGalleryImage || project.images[0]}
            alt={project.title}
            className="w-full h-[380px] sm:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#253C6D]/90 via-transparent to-black/30" />

          {/* Overlay Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-4xl space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-[#F2842F] text-white text-xs font-bold rounded uppercase tracking-wider">
                {project.category}
              </span>
              {project.isDemo && (
                <span className="px-2.5 py-1 bg-black/60 text-gray-200 text-xs rounded backdrop-blur-sm">
                  Conceptual Study &amp; Visualization
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              {project.title}
            </h1>

            {project.location && (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-[#F2842F]" />
                <span>{project.location}</span>
                {project.designStyle && (
                  <>
                    <span className="mx-1">•</span>
                    <span>Style: {project.designStyle}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {project.images.length > 1 && (
          <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedGalleryImage(img)}
                className={`relative w-24 h-16 sm:w-28 sm:h-20 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                  selectedGalleryImage === img
                    ? 'border-[#F2842F] shadow-md scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Design Concept & Description */}
          <div className="lg:col-span-8 space-y-10">
            {/* Design Concept Card */}
            {project.concept && (
              <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm border-l-4 border-l-[#F2842F]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#253C6D] mb-1.5">
                  Design Concept &amp; Spatial Philosophy
                </h3>
                <p className="text-base text-gray-800 font-serif italic leading-relaxed">
                  "{project.concept}"
                </p>
              </div>
            )}

            {/* Description */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#253C6D]">
                Project Narrative &amp; Execution Strategy
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {project.description}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our architectural team evaluated lighting levels, ceiling reveals, and custom millwork detailing to establish an uninterrupted flow between functional work areas and resting zones. Surfaces were selected for tactile longevity, acoustical control, and harmony with Lahore’s climate.
              </p>
            </div>

            {/* Design Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-serif font-bold text-[#253C6D] mb-4">
                  Key Architectural &amp; Design Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded bg-[#F7F8FA] border border-gray-100">
                      <CheckCircle2 className="w-4 h-4 text-[#F2842F] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visual Gallery Grid */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#253C6D]">
                Spatial Imagery Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((img, idx) => (
                  <div key={idx} className="relative rounded-lg overflow-hidden group h-60 border border-gray-200">
                    <img
                      src={img}
                      alt={`${project.title} view ${idx + 1}`}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => setSelectedGalleryImage(img)}
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="text-xs font-semibold text-white bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm">
                        Click to Focus
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Project Metadata & Consultation CTA */}
          <div className="lg:col-span-4 space-y-6">
            {/* Project Specifications Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#253C6D] border-b border-gray-100 pb-3">
                Project Specifications
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-gray-500 block">Category</span>
                  <span className="font-semibold text-[#253C6D] text-sm">{project.category}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Location</span>
                  <span className="font-semibold text-gray-800">{project.location || 'Lahore, Pakistan'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Design Style</span>
                  <span className="font-semibold text-gray-800">{project.designStyle || 'Contemporary'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Studio</span>
                  <span className="font-semibold text-[#253C6D]">Ali Jan Traders &amp; Interiors</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Classification</span>
                  <span className="font-semibold text-gray-700">
                    {project.isDemo ? 'Curated Concept Study' : 'Completed Project'}
                  </span>
                </div>
              </div>
            </div>

            {/* Consultation Action Card */}
            <div className="bg-[#253C6D] text-white p-6 rounded-lg shadow-md space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#F2842F] uppercase">
                COMMISSION A SIMILAR SPACE
              </span>
              <h3 className="text-lg font-serif font-bold">
                Inspired by this aesthetic?
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Discuss custom space planning, material swatches, and execution with our team at Beadon Road, Garhi Shahu, Lahore.
              </p>

              <div className="pt-2 flex flex-col gap-2.5">
                <Link
                  to={`/contact?project=${encodeURIComponent(project.title)}`}
                  className="w-full py-2.5 px-4 bg-[#F2842F] hover:bg-[#e07524] text-white text-xs font-semibold rounded text-center transition-colors shadow"
                >
                  Request Consultation on this Style
                </Link>

                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="w-full py-2.5 px-4 bg-[#30497D] hover:bg-[#455B8A] text-white text-xs font-semibold rounded text-center transition-colors border border-[#455B8A] flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F2842F]" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-[#253C6D]">
              Explore Related Spaces
            </h2>
            <Link
              to="/projects"
              className="text-xs font-bold text-[#253C6D] hover:text-[#F2842F] flex items-center gap-1"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.slice(0, 3).map((rel) => (
              <Link
                key={rel.id}
                to={`/projects/${rel.id}`}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:border-[#30497D] hover:shadow-md transition-all"
              >
                <div className="h-48 overflow-hidden bg-gray-900">
                  <img
                    src={rel.images[0]}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-[#F2842F] uppercase">
                    {rel.category}
                  </span>
                  <h3 className="text-sm font-serif font-bold text-[#253C6D] group-hover:text-[#F2842F] transition-colors mt-0.5 line-clamp-1">
                    {rel.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
