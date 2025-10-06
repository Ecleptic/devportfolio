/**
 * Netlify Function: Sanity Webhook Middleware
 * 
 * This function receives webhooks from Sanity and triggers the GitHub Action
 * to sync resume.json from Sanity CMS.
 */

export default async (req, context) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Get the GitHub token from environment variables
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (!githubToken) {
      console.error('GITHUB_TOKEN not configured');
      return new Response('Server configuration error', { status: 500 });
    }

    // Trigger GitHub Action via repository_dispatch
    const githubResponse = await fetch(
      'https://api.github.com/repos/Ecleptic/devportfolio/dispatches',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${githubToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'sanity-update',
          client_payload: {
            sanity_project: 'qet8gm0s',
            dataset: 'production',
            timestamp: new Date().toISOString(),
          },
        }),
      }
    );

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error('GitHub API error:', githubResponse.status, errorText);
      return new Response(
        `GitHub API error: ${githubResponse.status}`,
        { status: 500 }
      );
    }

    console.log('Successfully triggered GitHub Action');
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'GitHub Action triggered successfully' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in sanity-webhook function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
