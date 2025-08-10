// api/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';

// ✅ Vercel har request pe ye function run karta hai
export default (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any); // Express ko request/response de do
};


