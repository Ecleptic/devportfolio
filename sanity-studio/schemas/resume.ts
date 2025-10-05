import { defineType, defineField, defineArrayMember } from 'sanity';

export const resume = defineType({
  name: 'resume',
  title: 'Resume Data',
  type: 'document',
  fields: [
    // Metadata section
    defineField({
      name: 'metadata',
      title: 'Site Metadata',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Page Title' },
        { name: 'description', type: 'text', title: 'Meta Description' },
        {
          name: 'keywords',
          type: 'array',
          title: 'SEO Keywords',
          of: [{ type: 'string' }],
        },
        { name: 'siteUrl', type: 'url', title: 'Site URL' },
        { name: 'siteName', type: 'string', title: 'Site Name' },
        { name: 'locale', type: 'string', title: 'Locale' },
      ],
    }),

    // Basics section
    defineField({
      name: 'basics',
      title: 'Basic Information',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Full Name' },
        { name: 'label', type: 'string', title: 'Professional Title' },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'website', type: 'url', title: 'Website' },
        { name: 'summary', type: 'text', title: 'Professional Summary', rows: 10 },
        {
          name: 'profiles',
          type: 'array',
          title: 'Social Profiles',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'network', type: 'string', title: 'Network' },
                { name: 'username', type: 'string', title: 'Username' },
                { name: 'url', type: 'url', title: 'Profile URL' },
              ],
            }),
          ],
        },
      ],
    }),

    // Work section
    defineField({
      name: 'work',
      title: 'Work Experience',
      type: 'object',
      fields: [
        {
          name: 'hidden',
          type: 'string',
          title: 'Visibility',
          options: {
            list: [
              { title: 'Visible', value: 'none' },
              { title: 'Hide All', value: 'all' },
              { title: 'Resume Only', value: 'resume' },
            ],
          },
        },
        {
          name: 'jobs',
          type: 'array',
          title: 'Jobs',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'company', type: 'string', title: 'Company' },
                { name: 'position', type: 'string', title: 'Position' },
                { name: 'website', type: 'url', title: 'Company Website' },
                { name: 'startDate', type: 'string', title: 'Start Date (YYYY-MM)' },
                { name: 'endDate', type: 'string', title: 'End Date (YYYY-MM or "Present")' },
                { name: 'summary', type: 'text', title: 'Summary', rows: 3 },
                {
                  name: 'highlights',
                  type: 'array',
                  title: 'Highlights',
                  of: [{ type: 'text', rows: 2 }],
                },
                {
                  name: 'hidden',
                  type: 'string',
                  title: 'Visibility',
                  options: {
                    list: [
                      { title: 'Visible', value: undefined },
                      { title: 'Hide All', value: 'all' },
                      { title: 'Resume Only', value: 'resume' },
                    ],
                  },
                },
              ],
              preview: {
                select: {
                  title: 'company',
                  subtitle: 'position',
                  date: 'startDate',
                },
                prepare({ title, subtitle, date }) {
                  return {
                    title: title || 'Untitled',
                    subtitle: `${subtitle} (${date})`,
                  };
                },
              },
            }),
          ],
        },
      ],
    }),

    // Education section
    defineField({
      name: 'education',
      title: 'Education',
      type: 'object',
      fields: [
        {
          name: 'hidden',
          type: 'string',
          title: 'Visibility',
          options: {
            list: [
              { title: 'Visible', value: 'none' },
              { title: 'Hide All', value: 'all' },
              { title: 'Resume Only', value: 'resume' },
            ],
          },
        },
        {
          name: 'schools',
          type: 'array',
          title: 'Schools',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'institution', type: 'string', title: 'Institution' },
                { name: 'area', type: 'string', title: 'Area of Study' },
                { name: 'studyType', type: 'string', title: 'Degree Type' },
                { name: 'startDate', type: 'string', title: 'Start Date (YYYY-MM)' },
                { name: 'endDate', type: 'string', title: 'End Date (YYYY or YYYY-MM)' },
                { name: 'description', type: 'text', title: 'Description' },
                {
                  name: 'hidden',
                  type: 'string',
                  title: 'Visibility',
                  options: {
                    list: [
                      { title: 'Visible', value: undefined },
                      { title: 'Hide All', value: 'all' },
                      { title: 'Resume Only', value: 'resume' },
                    ],
                  },
                },
              ],
              preview: {
                select: {
                  title: 'institution',
                  subtitle: 'area',
                },
              },
            }),
          ],
        },
      ],
    }),

    // Volunteer section
    defineField({
      name: 'volunteer',
      title: 'Volunteer Experience',
      type: 'object',
      fields: [
        {
          name: 'hidden',
          type: 'string',
          title: 'Visibility',
          options: {
            list: [
              { title: 'Visible', value: 'none' },
              { title: 'Hide All', value: 'all' },
              { title: 'Resume Only', value: 'resume' },
            ],
          },
        },
        {
          name: 'volunteer',
          type: 'array',
          title: 'Volunteer Work',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'organization', type: 'string', title: 'Organization' },
                { name: 'position', type: 'string', title: 'Position' },
                { name: 'summary', type: 'text', title: 'Summary' },
                {
                  name: 'hidden',
                  type: 'string',
                  title: 'Visibility',
                  options: {
                    list: [
                      { title: 'Visible', value: undefined },
                      { title: 'Hide All', value: 'all' },
                      { title: 'Resume Only', value: 'resume' },
                    ],
                  },
                },
              ],
              preview: {
                select: {
                  title: 'organization',
                  subtitle: 'position',
                },
              },
            }),
          ],
        },
      ],
    }),

    // Skills section
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'object',
      fields: [
        {
          name: 'skills',
          type: 'array',
          title: 'Skill Categories',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'name', type: 'string', title: 'Category Name' },
                {
                  name: 'keywords',
                  type: 'array',
                  title: 'Skills',
                  of: [{ type: 'string' }],
                },
              ],
              preview: {
                select: {
                  title: 'name',
                  keywords: 'keywords',
                },
                prepare({ title, keywords }) {
                  return {
                    title: title || 'Untitled Category',
                    subtitle: keywords ? `${keywords.length} skills` : '0 skills',
                  };
                },
              },
            }),
          ],
        },
      ],
    }),

    // Projects section
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'object',
      fields: [
        {
          name: 'hidden',
          type: 'string',
          title: 'Visibility',
          options: {
            list: [
              { title: 'Visible', value: 'none' },
              { title: 'Hide All', value: 'all' },
              { title: 'Resume Only', value: 'resume' },
            ],
          },
        },
        {
          name: 'projects',
          type: 'array',
          title: 'Project List',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'name', type: 'string', title: 'Project Name' },
                { name: 'description', type: 'text', title: 'Description', rows: 3 },
                { name: 'image', type: 'string', title: 'Image Filename' },
                {
                  name: 'highlights',
                  type: 'array',
                  title: 'Highlights',
                  of: [{ type: 'string' }],
                },
                { name: 'url', type: 'url', title: 'Main URL' },
                {
                  name: 'links',
                  type: 'object',
                  title: 'Links',
                  fields: [
                    { name: 'website', type: 'url', title: 'Website' },
                    { name: 'github', type: 'url', title: 'GitHub' },
                    { name: 'codepen', type: 'url', title: 'CodePen' },
                    { name: 'android', type: 'url', title: 'Android App' },
                    { name: 'ios', type: 'url', title: 'iOS App' },
                  ],
                },
                {
                  name: 'hidden',
                  type: 'string',
                  title: 'Visibility',
                  options: {
                    list: [
                      { title: 'Visible', value: undefined },
                      { title: 'Hide All', value: 'all' },
                      { title: 'Resume Only', value: 'resume' },
                    ],
                  },
                },
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'description',
                },
              },
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'basics.name',
      subtitle: 'basics.label',
    },
  },
});
