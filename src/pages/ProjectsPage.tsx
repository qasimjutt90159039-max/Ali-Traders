import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Eye, MapPin, SlidersHorizontal, Info, Sparkles } from 'lucide-react';
import { INITIAL_PROJECTS } from '../data/initialData';
import { Project } from '../types';

export const ProjectsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [loading, setLoading] = useState<boolean>(false);

  // Sync category param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Fetch from backend API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/projects');
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProjects(json.data);
        }
      } catch (err) {
        console.warn('Using local initial projects:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const categories = [
    'All',
    'Residential',
    'Commercial',
    'Bedroom',
    'Living Room',
    'Modern',
    'Wall Design'
  ];

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-24 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="border-b border-[#30497D]/20 pb-10">
          <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
            DESIGN PORTFOLIO
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#253C6D] mt-2 tracking-tight">
            Curated Spaces &amp; Interior Concepts
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mt-3 font-light leading-relaxed">
            Explore our curated interior design concepts, surface gallery, and spatial plans. Each study reflects our commitment to spatial balance, lighting layers, and architectural joinery.
          </p>

          {/* Transparent demo label note */}
          <div className="mt-6 p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-[#253C6D] flex items-start gap-2.5 max-w-3xl">
            <Info className="w-4 h-4 text-[#F2842F] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Portfolio Transparency Note:</span> Projects displayed below feature representative architectural interior concept visualizations and design paradigms developed for residences and commercial spaces in Lahore.
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-3.5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#253C6D] px-2">
            <SlidersHorizontal className="w-4 h-4 text-[#F2842F]" />
            <span>Category:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#253C6D] text-[#F2842F] shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-black border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-500 px-2 font-mono">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
          </div>
        </div>
      </section>

      {/* Project Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200 p-8">
            <p className="text-base text-gray-600">No projects found in category "{selectedCategory}".</p>
            <button
              onClick={() => handleCategoryChange('All')}
              className="mt-4 px-4 py-2 bg-[#253C6D] text-white text-xs font-semibold rounded"
            >
              Reset to All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200/90 shadow-sm hover:border-[#30497D] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image container with hover reveal */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-900">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#253C6D]/80 via-transparent to-transparent opacity-50 group-hover:opacity-75 transition-opacity" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#253C6D]/95 text-[#F2842F] text-[11px] font-bold rounded uppercase tracking-wider backdrop-blur-sm">
                        {project.category}
                      </span>
                      {project.isDemo && (
                        <span className="px-2 py-0.5 bg-black/60 text-gray-300 text-[10px] rounded backdrop-blur-sm">
                          Concept Demo
                        </span>
                      )}
                    </div>

                    {/* Location badge */}
                    {project.location && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-gray-200 font-medium bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                        <MapPin className="w-3 h-3 text-[#F2842F]" />
                        <span>{project.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="text-[11px] font-semibold text-[#455B8A] uppercase tracking-wider">
                      {project.designStyle || 'Contemporary Interior'}
                    </div>
                    <h2 className="text-xl font-serif font-bold text-[#253C6D] mt-1 group-hover:text-[#F2842F] transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2.5 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="px-6 pb-6 pt-0">
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to={`/projects/${project.id}`}
                      id={`view-project-btn-${project.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#253C6D] group-hover:text-[#F2842F] transition-colors"
                    >
                      <Eye className="w-4 h-4 text-[#F2842F]" />
                      <span>View Project Details</span>
                    </Link>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#F2842F] transform group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
