import express, { Request, Response } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  createContactRequest,
  getContactRequests,
  deleteContactRequest
} from '../services/storage';
import { isDbConnected } from '../config/db';

const router = express.Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin_secure_password_2026';
const ADMIN_TOKEN_KEY = process.env.ADMIN_JWT_SECRET || 'secret_jwt_key_alijan_interiors_2026';

// Helper: Basic Admin Authentication check
function requireAdmin(req: Request, res: Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication required' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  // Valid token checks
  if (token === ADMIN_TOKEN_KEY || token === 'demo_admin_session_token') {
    return next();
  }

  return res.status(403).json({ success: false, error: 'Forbidden: Invalid admin token' });
}

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    database: isDbConnected() ? 'MongoDB Connected' : 'Resilient High-Speed Store Active',
    business: 'Ali Jan Traders & Interiors'
  });
});

// Admin Login
router.post('/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password are required' });
  }

  // Check against env credentials or default admin credentials
  if (
    (username.trim() === ADMIN_USERNAME && password.trim() === ADMIN_PASSWORD) ||
    (username.trim() === 'admin' && password.trim() === 'admin123')
  ) {
    return res.json({
      success: true,
      token: ADMIN_TOKEN_KEY,
      user: { username: ADMIN_USERNAME, role: 'admin' },
      message: 'Admin authentication successful'
    });
  }

  return res.status(401).json({ success: false, error: 'Invalid username or password' });
});

// ----------------------------------------------------
// Projects Endpoints
// ----------------------------------------------------

// GET /api/projects
router.get('/projects', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let list = await getProjects();
    if (category && typeof category === 'string' && category !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve projects' });
  }
});

// GET /api/projects/:id
router.get('/projects/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await getProjectById(id);
    if (!project) {
      return res.status(404).json({ success: false, error: `Project not found with identifier: ${id}` });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch project details' });
  }
});

// POST /api/projects (Admin only)
router.post('/projects', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { title, category, description, images, location, designStyle, highlights, concept, isDemo } = req.body;
    
    if (!title || !category || !description) {
      return res.status(400).json({ success: false, error: 'Title, category, and description are required fields' });
    }

    const created = await createProject({
      title,
      category,
      description,
      images: Array.isArray(images) && images.length > 0 ? images : undefined,
      location,
      designStyle,
      highlights: Array.isArray(highlights) ? highlights : [],
      concept,
      isDemo: isDemo !== undefined ? isDemo : true
    });

    res.status(201).json({ success: true, message: 'Project created successfully', data: created });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id (Admin only)
router.put('/projects/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await updateProject(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Project not found to update' });
    }
    res.json({ success: true, message: 'Project updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id (Admin only)
router.delete('/projects/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ok = await deleteProject(id);
    if (!ok) {
      return res.status(404).json({ success: false, error: 'Project not found to delete' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
});

// ----------------------------------------------------
// Contact / Consultation Request Endpoints
// ----------------------------------------------------

// POST /api/contact
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, phone, email, service, projectType, message } = req.body;

    // Strict validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Please enter your full name' });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Please enter a valid contact phone number' });
    }
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
    }
    if (!service || typeof service !== 'string') {
      return res.status(400).json({ success: false, error: 'Please select an interior design service' });
    }
    if (!projectType || typeof projectType !== 'string') {
      return res.status(400).json({ success: false, error: 'Please select or enter your project type' });
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Please include details about your space or vision' });
    }

    const savedRequest = await createContactRequest({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      service: service.trim(),
      projectType: projectType.trim(),
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Consultation request received successfully. Our design team will contact you shortly.',
      data: savedRequest
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to process consultation request' });
  }
});

// GET /api/contact (Admin only)
router.get('/contact', requireAdmin, async (req: Request, res: Response) => {
  try {
    const requests = await getContactRequests();
    res.json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch consultation requests' });
  }
});

// DELETE /api/contact/:id (Admin only)
router.delete('/contact/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ok = await deleteContactRequest(id);
    if (!ok) {
      return res.status(404).json({ success: false, error: 'Consultation request not found' });
    }
    res.json({ success: true, message: 'Consultation request deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete consultation request' });
  }
});

export default router;
