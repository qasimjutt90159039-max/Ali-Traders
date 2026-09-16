import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Trash2, Edit3, LogOut, CheckCircle, AlertCircle, RefreshCw, Layers, MessageSquare, ExternalLink, X } from 'lucide-react';
import { Project, ContactRequest } from '../types';

export const AdminPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('alijan_admin_token'));
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tabs: 'requests' | 'projects'
  const [activeTab, setActiveTab] = useState<'requests' | 'projects'>('requests');

  // Requests state
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Project modal / form state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Residential' as Project['category'],
    description: '',
    concept: '',
    location: 'Lahore, Pakistan',
    designStyle: 'Contemporary',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    highlights: 'Custom millwork\nRecessed architectural cove lighting\nNatural stone textures',
    isDemo: true
  });
  const [savingProject, setSavingProject] = useState(false);

  // Feedback notification
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        setToken(data.token);
        localStorage.setItem('alijan_admin_token', data.token);
        setPassword('');
        showNotification('success', 'Logged in successfully as Administrator.');
      } else {
        setLoginError(data.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      setLoginError('Server connection error. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('alijan_admin_token');
    showNotification('success', 'Logged out of admin portal.');
  };

  // Fetch Consultation Requests
  const fetchRequests = async () => {
    if (!token) return;
    setLoadingRequests(true);
    try {
      const res = await fetch('/api/contact', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRequests(data.data || []);
      } else if (res.status === 401 || res.status === 403) {
        handleLogout();
      }
    } catch (err) {
      console.warn('Error fetching requests:', err);
    } finally {
      setLoadingRequests(false);
    }
  };

  // Delete Request
  const handleDeleteRequest = async (id: string | undefined) => {
    if (!id || !token) return;
    if (!window.confirm('Are you sure you want to delete this consultation submission?')) return;

    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRequests(prev => prev.filter(r => r._id !== id));
        showNotification('success', 'Consultation request deleted successfully.');
      } else {
        showNotification('error', data.error || 'Failed to delete submission');
      }
    } catch (err) {
      showNotification('error', 'Network error deleting submission');
    }
  };

  // Fetch Projects
  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects(data.data || []);
      }
    } catch (err) {
      console.warn('Error fetching projects:', err);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRequests();
      fetchProjects();
    }
  }, [token]);

  // Open Project Modal for Add or Edit
  const openProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title,
        category: proj.category,
        description: proj.description,
        concept: proj.concept || '',
        location: proj.location || 'Lahore, Pakistan',
        designStyle: proj.designStyle || 'Contemporary',
        imageUrl: proj.images && proj.images.length > 0 ? proj.images[0] : '',
        highlights: proj.highlights ? proj.highlights.join('\n') : '',
        isDemo: proj.isDemo !== undefined ? proj.isDemo : false
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        category: 'Residential',
        description: '',
        concept: '',
        location: 'Lahore, Pakistan',
        designStyle: 'Contemporary',
        imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        highlights: 'Custom timber paneling\nRecessed architectural cove lighting\nNatural travertine stone',
        isDemo: true
      });
    }
    setIsProjectModalOpen(true);
  };

  // Save Project (POST or PUT)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!projectForm.title.trim() || !projectForm.description.trim()) {
      showNotification('error', 'Project title and description are required.');
      return;
    }

    setSavingProject(true);
    const payload = {
      title: projectForm.title.trim(),
      category: projectForm.category,
      description: projectForm.description.trim(),
      concept: projectForm.concept.trim(),
      location: projectForm.location.trim(),
      designStyle: projectForm.designStyle.trim(),
      images: [projectForm.imageUrl.trim() || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'],
      highlights: projectForm.highlights.split('\n').map(h => h.trim()).filter(Boolean),
      isDemo: projectForm.isDemo
    };

    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('success', editingProject ? 'Project updated successfully.' : 'Project published successfully.');
        setIsProjectModalOpen(false);
        fetchProjects();
      } else {
        showNotification('error', data.error || 'Failed to save project.');
      }
    } catch (err) {
      showNotification('error', 'Network error saving project.');
    } finally {
      setSavingProject(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to permanently delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('success', 'Project removed from database.');
        fetchProjects();
      } else {
        showNotification('error', data.error || 'Failed to delete project.');
      }
    } catch (err) {
      showNotification('error', 'Network error deleting project.');
    }
  };

  // If not authenticated, render Login Screen
  if (!token) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] pt-28 pb-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#253C6D] text-[#F2842F] flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#253C6D]">
              Admin Management Portal
            </h1>
            <p className="text-xs text-gray-500">
              Ali Jan Traders &amp; Interiors • Secure Workspace
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#253C6D] mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#30497D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#253C6D] mb-1">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
                className="w-full px-3.5 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#30497D]"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Default credentials: <code className="text-[#253C6D] bg-gray-100 px-1 py-0.5 rounded">admin / admin123</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-[#253C6D] hover:bg-[#30497D] text-white text-sm font-semibold rounded shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Access Management Portal</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-24 pb-20">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-20 right-6 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2.5 text-xs font-semibold ${
          notification.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Admin Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#253C6D] text-[#F2842F] flex items-center justify-center font-bold">
              AJ
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-[#253C6D]">
                Ali Jan Traders &amp; Interiors Admin
              </h1>
              <p className="text-xs text-gray-500">
                Studio Management: Consultation Requests &amp; Architectural Projects
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { fetchRequests(); fetchProjects(); }}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-black border border-gray-200 rounded flex items-center gap-1.5 hover:bg-gray-50"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Data</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-t-md transition-colors flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'bg-[#253C6D] text-[#F2842F]'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consultation Requests ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-t-md transition-colors flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-[#253C6D] text-[#F2842F]'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Project Management ({projects.length})</span>
          </button>
        </div>
      </section>

      {/* TAB 1: CONSULTATION REQUESTS */}
      {activeTab === 'requests' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#253C6D]">
                Received Inquiries &amp; Consultations
              </h2>
              <span className="text-xs text-gray-500 font-mono">
                {requests.length} Submissions Logged
              </span>
            </div>

            {loadingRequests ? (
              <div className="p-12 text-center text-xs text-gray-500 font-mono">
                Loading submissions...
              </div>
            ) : requests.length === 0 ? (
              <div className="p-12 text-center text-sm text-gray-500">
                No consultation requests found in the database.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EEF1F5] text-[#253C6D] uppercase font-bold tracking-wider border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Service &amp; Project Type</th>
                      <th className="py-3 px-4">Message / Requirements</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {requests.map((req) => (
                      <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-[#253C6D]">
                          {req.name}
                        </td>
                        <td className="py-3.5 px-4 space-y-0.5">
                          <a href={`tel:${req.phone}`} className="text-blue-600 hover:underline block font-mono">
                            {req.phone}
                          </a>
                          <span className="text-gray-500">{req.email}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 bg-[#EEF1F5] text-[#253C6D] font-bold rounded">
                            {req.service}
                          </span>
                          <span className="block text-gray-500 mt-1">{req.projectType}</span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs text-gray-700 leading-relaxed">
                          {req.message}
                        </td>
                        <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap font-mono">
                          {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'Recent'}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteRequest(req._id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete Submission"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 2: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#253C6D]">
                Architectural Portfolio Projects
              </h2>
              <button
                onClick={() => openProjectModal()}
                className="px-4 py-2 bg-[#F2842F] hover:bg-[#e07524] text-white text-xs font-semibold rounded shadow flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {loadingProjects ? (
              <div className="p-12 text-center text-xs text-gray-500 font-mono">
                Loading projects...
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-16 rounded overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <img src={proj.images[0]} alt={proj.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#253C6D] text-white">
                            {proj.category}
                          </span>
                          {proj.isDemo && (
                            <span className="text-[10px] text-gray-500 font-mono">
                              (Concept Demo)
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-serif font-bold text-[#253C6D] mt-1">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-1">{proj.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <a
                        href={`/projects/${proj.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded"
                        title="Preview Project"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => openProjectModal(proj)}
                        className="p-2 text-[#253C6D] hover:bg-blue-50 rounded"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* PROJECT ADD / EDIT MODAL */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative my-8">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-[#253C6D]">
              {editingProject ? 'Edit Architectural Project' : 'Create New Project'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. Modern Minimalist Villa"
                    className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-[#30497D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={e => setProjectForm({ ...projectForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-[#30497D]"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Modern">Modern</option>
                    <option value="Wall Design">Wall Design</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={projectForm.location}
                    onChange={e => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="e.g. Gulberg, Lahore"
                    className="w-full px-3 py-2 border rounded text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Design Style
                  </label>
                  <input
                    type="text"
                    value={projectForm.designStyle}
                    onChange={e => setProjectForm({ ...projectForm, designStyle: e.target.value })}
                    placeholder="e.g. Scandinavian Warmth"
                    className="w-full px-3 py-2 border rounded text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Primary Image URL (Unsplash or direct asset)
                </label>
                <input
                  type="url"
                  value={projectForm.imageUrl}
                  onChange={e => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Design Concept Statement
                </label>
                <input
                  type="text"
                  value={projectForm.concept}
                  onChange={e => setProjectForm({ ...projectForm, concept: e.target.value })}
                  placeholder="e.g. Spatial purity through monolithic travertine and concealed lighting"
                  className="w-full px-3 py-2 border rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Detailed Project Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.description}
                  onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Detailed architectural scope and materials..."
                  className="w-full px-3 py-2 border rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Highlights (One per line)
                </label>
                <textarea
                  rows={2}
                  value={projectForm.highlights}
                  onChange={e => setProjectForm({ ...projectForm, highlights: e.target.value })}
                  placeholder="Feature 1&#10;Feature 2"
                  className="w-full px-3 py-2 border rounded text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDemoCheckbox"
                  checked={projectForm.isDemo}
                  onChange={e => setProjectForm({ ...projectForm, isDemo: e.target.checked })}
                  className="rounded border-gray-300 text-[#F2842F] focus:ring-[#F2842F]"
                />
                <label htmlFor="isDemoCheckbox" className="text-xs text-gray-700 cursor-pointer">
                  Mark as Concept / Demo Study (Maintains honest transparency for unphotographed sites)
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 border text-xs font-semibold rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProject}
                  className="px-5 py-2 bg-[#253C6D] hover:bg-[#30497D] text-white text-xs font-semibold rounded shadow cursor-pointer disabled:opacity-50"
                >
                  {savingProject ? 'Saving...' : editingProject ? 'Update Project' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
