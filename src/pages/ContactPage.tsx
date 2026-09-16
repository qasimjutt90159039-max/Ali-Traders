import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, MapPin, Clock, Send, MessageCircle, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/initialData';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const preselectedProject = searchParams.get('project') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: preselectedService || 'Residential Interiors',
    projectType: preselectedProject ? `Regarding Project: ${preselectedProject}` : '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverFeedback, setServerFeedback] = useState<string>('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Contact phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.service) {
      errs.service = 'Please select an interior design service';
    }
    if (!formData.projectType.trim()) {
      errs.projectType = 'Please describe or select your project type (e.g. 1-Kanal Villa, 2-Bed Flat, Office)';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please share your design requirements or project message';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters describing your space';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setServerFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitStatus('success');
        setServerFeedback(data.message || 'Consultation request sent successfully!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: 'Residential Interiors',
          projectType: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setServerFeedback(data.error || 'Failed to submit consultation request. Please call us directly.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setServerFeedback('Network connection error. Please try again or call us at +92 321 4055675.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-24 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="border-b border-[#30497D]/20 pb-10">
          <span className="text-xs font-bold tracking-widest text-[#F2842F] uppercase">
            CONTACT &amp; CONSULTATION
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#253C6D] mt-2 tracking-tight">
            Discuss Your Interior Vision
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mt-3 font-light leading-relaxed">
            Connect with Ali Jan Traders &amp; Interiors to schedule an on-site consultation, inquire about architectural joinery, or discuss custom space planning in Lahore.
          </p>
        </div>
      </section>

      {/* Main Grid: Form & Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg p-7 sm:p-10 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-[#253C6D] mb-1">
                Consultation Request Form
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                Fill out the form below and our design team will get back to you to coordinate a meeting.
              </p>

              {/* Status Alert */}
              {submitStatus === 'success' && (
                <div className="p-4 mb-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-800">Request Sent Successfully</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">{serverFeedback}</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 mb-6 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-rose-800">Submission Error</h4>
                    <p className="text-xs text-rose-700 mt-0.5">{serverFeedback}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#253C6D] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Tariq Mehmood"
                    className={`w-full px-4 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-[#30497D] transition-colors ${
                      errors.name ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-[#F7F8FA] focus:bg-white'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Phone & Email (2 columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#253C6D] mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 0000000"
                      className={`w-full px-4 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-[#30497D] transition-colors ${
                        errors.phone ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-[#F7F8FA] focus:bg-white'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#253C6D] mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      className={`w-full px-4 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-[#30497D] transition-colors ${
                        errors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-[#F7F8FA] focus:bg-white'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Service Required & Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-[#253C6D] mb-1.5">
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-[#30497D] transition-colors ${
                        errors.service ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-[#F7F8FA] focus:bg-white'
                      }`}
                    >
                      {SERVICES_DATA.map(s => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Complete Home Interior">Complete Home Interior</option>
                      <option value="Commercial Office Fit-out">Commercial Office Fit-out</option>
                      <option value="Other Consultation">Other Custom Consultation</option>
                    </select>
                    {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-xs font-bold uppercase tracking-wider text-[#253C6D] mb-1.5">
                      Project Type &amp; Scale <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      placeholder="e.g. 1-Kanal Villa / DHA Flat"
                      className={`w-full px-4 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-[#30497D] transition-colors ${
                        errors.projectType ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-[#F7F8FA] focus:bg-white'
                      }`}
                    />
                    {errors.projectType && <p className="text-xs text-red-500 mt-1">{errors.projectType}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#253C6D] mb-1.5">
                    Project Details &amp; Spatial Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your space, approximate timeline, aesthetic preferences, and budget expectations..."
                    className={`w-full px-4 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-[#30497D] transition-colors ${
                      errors.message ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-[#F7F8FA] focus:bg-white'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="submit-consultation-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#F2842F] hover:bg-[#e07524] active:scale-[0.99] text-white text-sm font-semibold rounded shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Consultation Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Consultation Request</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Direct Contact & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-[#253C6D] text-white rounded-lg p-7 shadow-md space-y-6 architectural-grid-dark">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#F2842F] uppercase">
                  DIRECT CONTACT
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  Ali Jan Traders &amp; Interiors
                </h3>
              </div>

              <div className="space-y-4 text-sm">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  id="contact-page-phone-link"
                  className="flex items-start gap-3 text-gray-200 hover:text-white group p-3 rounded bg-[#30497D]/60 border border-[#455B8A]/40 transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#F2842F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-300 block">Phone Consultation:</span>
                    <span className="font-bold text-base text-white group-hover:text-[#F2842F] transition-colors">
                      {BUSINESS_INFO.phone}
                    </span>
                    <span className="text-[11px] text-gray-400 block mt-0.5">Click to call directly</span>
                  </div>
                </a>

                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-page-whatsapp-link"
                  className="flex items-center justify-between p-3.5 rounded bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 transition-colors text-white"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    <div>
                      <span className="text-xs font-semibold block">WhatsApp Instant Inquiry</span>
                      <span className="text-[11px] text-gray-300">{BUSINESS_INFO.phone}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#25D366] underline">Chat on WhatsApp</span>
                </a>

                <div className="flex items-start gap-3 p-3 text-gray-200">
                  <MapPin className="w-5 h-5 text-[#F2842F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-300 block">Physical Studio Address:</span>
                    <span className="text-xs text-white font-medium leading-relaxed block mt-0.5">
                      {BUSINESS_INFO.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 text-gray-200">
                  <Clock className="w-5 h-5 text-[#F2842F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-300 block">Operating Hours:</span>
                    <span className="text-xs text-white font-medium block mt-0.5">
                      {BUSINESS_INFO.workingHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Visiting Guidelines */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm text-xs text-gray-600 space-y-2">
              <h4 className="font-bold text-[#253C6D] uppercase tracking-wider">
                Planning Your Studio Visit
              </h4>
              <p className="leading-relaxed">
                We welcome clients to our Beadon Road studio in Garhi Shahu, Lahore to view wood veneer swatches, fluted wall panels, and portfolio drawings. We recommend contacting us ahead of time so our design lead can dedicate uninterrupted time to your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16" id="location-map">
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-serif font-bold text-[#253C6D]">
                Our Location in Lahore
              </h3>
              <p className="text-xs text-gray-500">
                Beadon Rd, Victoria Park Garhi Shahu, Lahore, Pakistan
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Beadon+Rd+Victoria+Park+Garhi+Shahu+Lahore+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#F2842F] hover:underline"
            >
              Open in Google Maps &rarr;
            </a>
          </div>

          {/* Embedded Google Map iframe */}
          <div className="w-full h-80 sm:h-96 bg-gray-100 relative">
            <iframe
              title="Ali Jan Traders & Interiors Location Map - Beadon Road Garhi Shahu Lahore"
              src="https://maps.google.com/maps?q=Beadon+Rd,+Victoria+Park+Garhi+Shahu,+Lahore,+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
};
