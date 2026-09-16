import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectModel extends Document {
  id: string;
  title: string;
  category: string;
  description: string;
  concept?: string;
  images: string[];
  location?: string;
  designStyle?: string;
  highlights: string[];
  isDemo: boolean;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Residential', 'Commercial', 'Bedroom', 'Living Room', 'Modern', 'Wall Design']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  concept: {
    type: String,
    trim: true
  },
  images: {
    type: [String],
    validate: [(val: string[]) => val.length > 0, 'At least one image is required']
  },
  location: {
    type: String,
    trim: true
  },
  designStyle: {
    type: String,
    trim: true
  },
  highlights: {
    type: [String],
    default: []
  },
  isDemo: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const ProjectModel: mongoose.Model<IProjectModel> = (mongoose.models.Project as any) || mongoose.model<IProjectModel>('Project', ProjectSchema);
