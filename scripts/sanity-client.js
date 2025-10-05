// Sanity client configuration
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from sanity-studio/.env.local
dotenv.config({ path: join(__dirname, '../sanity-studio/.env.local') });

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || 'production';
const apiVersion = '2024-10-05';
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error('Missing SANITY_STUDIO_PROJECT_ID or SANITY_PROJECT_ID in environment');
}

if (!token) {
  console.warn('⚠️  Warning: No SANITY_API_TOKEN found. Read-only operations will work, but writes will fail.');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // Use CDN for read operations in production
});

export const config = {
  projectId,
  dataset,
  apiVersion,
};

console.log(`✓ Sanity client configured for project: ${projectId}, dataset: ${dataset}`);
