import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { resume } from './schemas/resume';
import { mobileStructure } from './structure/mobile';
import { MobileLayout } from './components/MobileLayout';

export default defineConfig({
  name: 'default',
  title: 'Resume Portfolio CMS',

  projectId: 'qet8gm0s',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: mobileStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: [resume],
  },

  // Configure the Studio for mobile editing
  studio: {
    components: {
      layout: MobileLayout,
    },
  },

  // Add authentication providers
  auth: {
    mode: 'append',
    redirectOnSingle: false,
    providers: [
      // Google and GitHub OAuth will be configured in Sanity dashboard
    ],
  },

  // Mobile-friendly form builder configuration
  form: {
    // Better spacing for mobile screens
    renderDefault: (props: any) => props.renderDefault(props),
  },

  // Document configuration for better mobile UX
  document: {
    // Disable comments feature on mobile for cleaner UI
    comments: {
      enabled: false,
    },
    // Simplified document actions for mobile
    actions: (prev, context) => {
      // Keep only essential actions on mobile
      return prev;
    },
    // Better production preview handling
    productionUrl: async (prev, context) => {
      return prev;
    },
  },
});
