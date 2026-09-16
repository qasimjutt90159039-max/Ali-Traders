import mongoose, { Schema, Document } from 'mongoose';

export interface IContactRequest extends Document {
  name: string;
  phone: string;
  email: string;
  service: string;
  projectType: string;
  message: string;
  status: 'New' | 'In Review' | 'Contacted' | 'Closed';
  createdAt: Date;
}

const ContactRequestSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Please provide a valid contact phone number'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  service: {
    type: String,
    required: [true, 'Please select the service required'],
    trim: true
  },
  projectType: {
    type: String,
    required: [true, 'Please specify the project type'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please enter project details or your message'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['New', 'In Review', 'Contacted', 'Closed'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const ContactRequestModel: mongoose.Model<IContactRequest> = (mongoose.models.ContactRequest as any) || mongoose.model<IContactRequest>('ContactRequest', ContactRequestSchema);
