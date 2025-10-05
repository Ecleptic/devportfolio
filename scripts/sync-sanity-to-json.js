#!/usr/bin/env node
// Script to sync Sanity CMS data BACK to resume.json
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { client } from './sanity-client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RESUME_JSON_PATH = join(__dirname, '../resume.json');
const RESUME_DOCUMENT_ID = 'resume-data';

async function syncSanityToJson() {
  console.log('🔄 Starting sync: Sanity → resume.json...\n');

  try {
    // Fetch the resume document from Sanity
    console.log('📖 Fetching data from Sanity...');
    const sanityDoc = await client.getDocument(RESUME_DOCUMENT_ID);

    if (!sanityDoc) {
      console.error('❌ No resume document found in Sanity.');
      console.error('   Run sync-json-to-sanity.js first to create the initial document.');
      process.exit(1);
    }

    console.log('✓ Data fetched from Sanity\n');

    // Remove Sanity metadata fields
    const { _id, _type, _rev, _createdAt, _updatedAt, ...resumeData } = sanityDoc;

    // Write to resume.json with pretty formatting
    console.log('📝 Writing to resume.json...');
    writeFileSync(
      RESUME_JSON_PATH,
      JSON.stringify(resumeData, null, 2) + '\n',
      'utf-8'
    );
    console.log('✓ resume.json updated successfully\n');

    console.log('✅ Sync complete! Your resume.json has been updated with Sanity data.');
    console.log('📊 Summary:');
    console.log(`   - Jobs: ${resumeData.work?.jobs?.length || 0}`);
    console.log(`   - Projects: ${resumeData.projects?.projects?.length || 0}`);
    console.log(`   - Skills: ${resumeData.skills?.skills?.length || 0}`);
    console.log(`   - Education: ${resumeData.education?.schools?.length || 0}\n`);

    console.log('⚠️  Next steps:');
    console.log('   1. Review the changes in resume.json');
    console.log('   2. Commit to Git: git add resume.json && git commit -m "Update resume from Sanity"');
    console.log('   3. Push to trigger Netlify deployment: git push');
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    if (error.statusCode === 404) {
      console.error('\n⚠️  Document not found. Run sync-json-to-sanity.js first.');
    }
    process.exit(1);
  }
}

// Run the sync
syncSanityToJson();
