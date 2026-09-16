export interface Project {
  _id?: string;
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Bedroom' | 'Living Room' | 'Modern' | 'Wall Design';
  description: string;
  concept?: string;
  images: string[];
  location?: string;
  designStyle?: string;
  highlights?: string[];
  isDemo?: boolean;
  createdAt?: string;
}

export interface ContactRequest {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  projectType: string;
  message: string;
  status?: 'New' | 'In Review' | 'Contacted' | 'Closed';
  createdAt?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  iconName: string;
  keyFeatures: string[];
  suitableFor: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
