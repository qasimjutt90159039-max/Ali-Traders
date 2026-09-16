import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('[Database] MONGODB_URI not set. Running with built-in resilient storage.');
    return false;
  }

  if (isConnected) {
    return true;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = !!conn.connections[0].readyState;
    console.log(`[Database] MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn('[Database] MongoDB connection error, falling back to resilient storage:', (error as Error).message);
    isConnected = false;
    return false;
  }
}

export function isDbConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}
