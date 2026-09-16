import { isDbConnected } from '../config/db';
import { ProjectModel } from '../models/Project';
import { ContactRequestModel } from '../models/ContactRequest';
import { INITIAL_PROJECTS } from '../../src/data/initialData';
import { Project, ContactRequest } from '../../src/types';

// In-memory persistent fallback store
let memoryProjects: Project[] = JSON.parse(JSON.stringify(INITIAL_PROJECTS));
let memoryContactRequests: ContactRequest[] = [
  {
    _id: 'seed-req-1',
    name: 'Tariq Mehmood',
    phone: '+92 300 1234567',
    email: 'tariq.mehmood@example.com',
    service: 'Residential Interiors',
    projectType: 'Full Villa Renovation',
    message: 'We are planning a 1-kanal home interior renovation in Gulberg III, Lahore. Looking for space planning and custom woodwork.',
    status: 'In Review',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    _id: 'seed-req-2',
    name: 'Amina Farooq',
    phone: '+92 321 9876543',
    email: 'amina.design@example.com',
    service: 'Wall & Surface Design',
    projectType: 'Feature Walls for Formal Drawing Room',
    message: 'Interested in fluted timber panels and warm cove lighting for our newly built home in DHA Phase 5.',
    status: 'New',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

export async function getProjects(): Promise<Project[]> {
  if (isDbConnected()) {
    try {
      const docs = await ProjectModel.find().sort({ createdAt: -1 }).lean();
      if (docs.length > 0) {
        return docs.map((doc: any) => ({
          _id: doc._id.toString(),
          id: doc.id || doc._id.toString(),
          title: doc.title,
          category: doc.category,
          description: doc.description,
          concept: doc.concept,
          images: doc.images,
          location: doc.location,
          designStyle: doc.designStyle,
          highlights: doc.highlights || [],
          isDemo: doc.isDemo,
          createdAt: doc.createdAt?.toISOString()
        }));
      }
    } catch (err) {
      console.warn('Mongoose query failed, using fallback memory:', (err as Error).message);
    }
  }
  return memoryProjects;
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (isDbConnected()) {
    try {
      const doc: any = await (ProjectModel as any).findOne({ id }).lean() || await (ProjectModel as any).findById(id).lean();
      if (doc) {
        return {
          _id: doc._id.toString(),
          id: doc.id || doc._id.toString(),
          title: doc.title,
          category: doc.category,
          description: doc.description,
          concept: doc.concept,
          images: doc.images,
          location: doc.location,
          designStyle: doc.designStyle,
          highlights: doc.highlights || [],
          isDemo: doc.isDemo,
          createdAt: doc.createdAt?.toISOString()
        };
      }
    } catch (err) {
      console.warn('Mongoose query by id failed, using fallback memory:', (err as Error).message);
    }
  }
  return memoryProjects.find(p => p.id === id || p._id === id) || null;
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  const newId = data.id || (data.title ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4) : 'project-' + Date.now());
  const projectObj: Project = {
    id: newId,
    title: data.title || 'Untitled Project',
    category: (data.category as any) || 'Residential',
    description: data.description || '',
    concept: data.concept || '',
    images: data.images && data.images.length > 0 ? data.images : ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'],
    location: data.location || 'Lahore, Pakistan',
    designStyle: data.designStyle || 'Contemporary',
    highlights: data.highlights || [],
    isDemo: data.isDemo !== undefined ? data.isDemo : false,
    createdAt: new Date().toISOString()
  };

  if (isDbConnected()) {
    try {
      const doc = await ProjectModel.create(projectObj);
      return {
        _id: doc._id.toString(),
        ...projectObj
      };
    } catch (err) {
      console.warn('Mongoose create failed, saving to memory:', (err as Error).message);
    }
  }

  const saved = { ...projectObj, _id: 'mem-' + Date.now() };
  memoryProjects.unshift(saved);
  return saved;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
  if (isDbConnected()) {
    try {
      const updated: any = await (ProjectModel as any).findOneAndUpdate(
        { $or: [{ id }, { _id: id }] },
        { $set: data },
        { new: true }
      ).lean();
      if (updated) {
        return {
          _id: updated._id.toString(),
          id: updated.id,
          title: updated.title,
          category: updated.category,
          description: updated.description,
          concept: updated.concept,
          images: updated.images,
          location: updated.location,
          designStyle: updated.designStyle,
          highlights: updated.highlights,
          isDemo: updated.isDemo,
          createdAt: updated.createdAt?.toISOString()
        };
      }
    } catch (err) {
      console.warn('Mongoose update failed, using memory:', (err as Error).message);
    }
  }

  const idx = memoryProjects.findIndex(p => p.id === id || p._id === id);
  if (idx !== -1) {
    memoryProjects[idx] = { ...memoryProjects[idx], ...data };
    return memoryProjects[idx];
  }
  return null;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (isDbConnected()) {
    try {
      const res = await ProjectModel.deleteOne({ $or: [{ id }, { _id: id }] });
      if (res.deletedCount && res.deletedCount > 0) return true;
    } catch (err) {
      console.warn('Mongoose delete failed, fallback memory:', (err as Error).message);
    }
  }

  const initialLen = memoryProjects.length;
  memoryProjects = memoryProjects.filter(p => p.id !== id && p._id !== id);
  return memoryProjects.length < initialLen;
}

export async function createContactRequest(data: {
  name: string;
  phone: string;
  email: string;
  service: string;
  projectType: string;
  message: string;
}): Promise<ContactRequest> {
  const newReq: ContactRequest = {
    ...data,
    status: 'New',
    createdAt: new Date().toISOString()
  };

  if (isDbConnected()) {
    try {
      const doc = await ContactRequestModel.create(newReq);
      return {
        _id: doc._id.toString(),
        ...newReq
      };
    } catch (err) {
      console.warn('Mongoose save contact failed, fallback to memory:', (err as Error).message);
    }
  }

  const saved = { ...newReq, _id: 'req-' + Date.now() };
  memoryContactRequests.unshift(saved);
  return saved;
}

export async function getContactRequests(): Promise<ContactRequest[]> {
  if (isDbConnected()) {
    try {
      const docs = await ContactRequestModel.find().sort({ createdAt: -1 }).lean();
      if (docs.length > 0) {
        return docs.map((d: any) => ({
          _id: d._id.toString(),
          name: d.name,
          phone: d.phone,
          email: d.email,
          service: d.service,
          projectType: d.projectType,
          message: d.message,
          status: d.status,
          createdAt: d.createdAt?.toISOString()
        }));
      }
    } catch (err) {
      console.warn('Mongoose get contacts failed, fallback to memory:', (err as Error).message);
    }
  }
  return memoryContactRequests;
}

export async function deleteContactRequest(id: string): Promise<boolean> {
  if (isDbConnected()) {
    try {
      const res = await ContactRequestModel.deleteOne({ _id: id });
      if (res.deletedCount && res.deletedCount > 0) return true;
    } catch (err) {
      console.warn('Mongoose delete contact failed, fallback to memory:', (err as Error).message);
    }
  }

  const initialLen = memoryContactRequests.length;
  memoryContactRequests = memoryContactRequests.filter(r => r._id !== id);
  return memoryContactRequests.length < initialLen;
}
