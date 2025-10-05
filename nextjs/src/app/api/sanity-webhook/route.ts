import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET || '';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_REPO = process.env.GITHUB_REPO || 'Ecleptic/devportfolio';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'master';

/**
 * Sanity Webhook Handler
 * 
 * This endpoint receives webhooks from Sanity when the resume document is updated.
 * It fetches the updated data, writes it to resume.json, and commits to GitHub.
 * This triggers a Netlify deployment automatically.
 */

// Verify webhook signature
function verifySignature(body: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.warn('⚠️  SANITY_WEBHOOK_SECRET not configured');
    return false;
  }

  const hash = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  return `sha256=${hash}` === signature;
}

// Fetch resume data from Sanity
async function fetchResumeFromSanity() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qet8gm0s';
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const query = encodeURIComponent('*[_id == "resume-data"][0]');
  
  const url = `https://${projectId}.api.sanity.io/v2024-10-05/data/query/${dataset}?query=${query}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Sanity API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (!data.result) {
    throw new Error('No resume document found in Sanity');
  }
  
  // Remove Sanity metadata
  const { _id, _type, _rev, _createdAt, _updatedAt, ...resumeData } = data.result;
  
  return resumeData;
}

// Commit to GitHub
async function commitToGitHub(resumeJson: any) {
  const [owner, repo] = GITHUB_REPO.split('/');
  const path = 'resume.json';
  const message = 'Update resume from Sanity Studio';
  
  // Get current file SHA
  const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${GITHUB_BRANCH}`;
  const getFileResponse = await fetch(getFileUrl, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!getFileResponse.ok) {
    throw new Error(`GitHub API error (get file): ${getFileResponse.statusText}`);
  }
  
  const fileData = await getFileResponse.json();
  const currentSha = fileData.sha;
  
  // Update file
  const content = Buffer.from(JSON.stringify(resumeJson, null, 2) + '\n').toString('base64');
  
  const updateUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const updateResponse = await fetch(updateUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content,
      sha: currentSha,
      branch: GITHUB_BRANCH,
    }),
  });
  
  if (!updateResponse.ok) {
    const errorData = await updateResponse.json();
    throw new Error(`GitHub API error (update): ${JSON.stringify(errorData)}`);
  }
  
  return await updateResponse.json();
}

// Main webhook handler
export async function POST(request: NextRequest) {
  console.log('📥 Received Sanity webhook');
  
  try {
    // Get request body
    const body = await request.text();
    const signature = request.headers.get('sanity-webhook-signature') || '';
    
    // Verify signature
    if (!verifySignature(body, signature)) {
      console.error('❌ Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    console.log('✓ Webhook signature verified');
    
    // Check required environment variables
    if (!GITHUB_TOKEN) {
      console.error('❌ GITHUB_TOKEN not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Fetch updated data from Sanity
    console.log('📖 Fetching resume data from Sanity...');
    const resumeData = await fetchResumeFromSanity();
    console.log('✓ Resume data fetched');
    
    // Commit to GitHub
    console.log('📝 Committing to GitHub...');
    const commitResult = await commitToGitHub(resumeData);
    console.log('✓ Committed to GitHub:', commitResult.commit.sha);
    
    return NextResponse.json({
      success: true,
      message: 'Resume updated and committed to GitHub',
      commit: commitResult.commit.sha,
    });
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    
    return NextResponse.json(
      { 
        error: 'Webhook processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Sanity webhook endpoint is running',
    configured: {
      webhookSecret: !!WEBHOOK_SECRET,
      githubToken: !!GITHUB_TOKEN,
      githubRepo: GITHUB_REPO,
      githubBranch: GITHUB_BRANCH,
    },
  });
}
