import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { resume } from './schemas/resume';

export default defineConfig({
  name: 'default',
  title: 'Resume Portfolio CMS',

  projectId: 'qet8gm0s',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: [resume],
  },

  // Configure the Studio for mobile editing
  studio: {
    components: {},
  },

  // Add authentication providers
  auth: {
    mode: 'append',
    redirectOnSingle: false,
    providers: [
      // Google and GitHub OAuth will be configured in Sanity dashboard
    ],
  },
});
