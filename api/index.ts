// Vercel Serverless entry for Express using serverless-http
import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let initialized = false as boolean;
let handler: any;

function log(message: string) {
  const ts = new Date().toISOString();
  console.log(`${ts} [vercel] ${message}`);
}

async function init() {
  if (initialized) return;
  // Only register API routes for serverless, no static/client here
  await registerRoutes(app);
  handler = serverless(app as any);
  initialized = true;
  log('Serverless API initialized');
}

export default async function vercelHandler(req: VercelRequest, res: VercelResponse) {
  await init();
  return handler(req as any, res as any);
}
