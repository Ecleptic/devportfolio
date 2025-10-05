#!/usr/bin/env node
// Script to sync resume.json data TO Sanity CMS
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { client } from './sanity-client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RESUME_JSON_PATH = join(__dirname, '../resume.json');
const RESUME_DOCUMENT_ID = 'resume-data'; // Single document ID

async function syncJsonToSanity() {
  console.log('🔄 Starting sync: resume.json → Sanity...\n');

  try {
    // Read resume.json
    console.log('📖 Reading resume.json...');
    const resumeData = JSON.parse(readFileSync(RESUME_JSON_PATH, 'utf-8'));
    console.log('✓ Resume data loaded\n');

    // Check if document exists
    console.log('🔍 Checking for existing Sanity document...');
    const existingDoc = await client.getDocument(RESUME_DOCUMENT_ID).catch(() => null);

    // Prepare the document
    const sanityDoc = {
      _id: RESUME_DOCUMENT_ID,
      _type: 'resume',
      ...resumeData,
    };

    if (existingDoc) {
      console.log('📝 Updating existing document...');
      const result = await client
        .patch(RESUME_DOCUMENT_ID)
        .set(resumeData)
        .commit();
      console.log('✓ Document updated successfully');
      console.log(`   Document ID: ${result._id}`);
      console.log(`   Updated at: ${result._updatedAt}\n`);
    } else {
      console.log('📝 Creating new document...');
      const result = await client.create(sanityDoc);
      console.log('✓ Document created successfully');
      console.log(`   Document ID: ${result._id}`);
      console.log(`   Created at: ${result._createdAt}\n`);
    }

    console.log('✅ Sync complete! Your resume data is now in Sanity.');
    console.log('🌐 View it at: http://localhost:3333/studio/structure/resume');
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    if (error.statusCode === 401) {
      console.error('\n⚠️  Authentication error. Make sure SANITY_API_TOKEN is set in sanity-studio/.env.local');
      console.error('   Generate a token at: https://www.sanity.io/manage/project/qet8gm0s/api');
    }
    process.exit(1);
  }
}

// Run the sync
syncJsonToSanity();
