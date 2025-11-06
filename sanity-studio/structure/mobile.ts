import { StructureBuilder } from 'sanity/structure';

/**
 * Mobile-friendly structure for Sanity Studio
 * Organizes content in a clear, hierarchical way that's easy to navigate on mobile devices
 */
export const mobileStructure = (S: StructureBuilder) =>
  S.list()
    .title('Resume Portfolio')
    .items([
      // Single resume document with organized sections
      S.listItem()
        .title('Resume Data')
        .icon(() => '📄')
        .child(
          S.document()
            .schemaType('resume')
            .documentId('resume')
            .title('Resume')
            .views([
              // Default form view
              S.view.form(),
            ])
        ),

      // Divider for better visual separation on mobile
      S.divider(),

      // Quick access sections for mobile editing
      S.listItem()
        .title('Quick Edit')
        .icon(() => '⚡')
        .child(
          S.list()
            .title('Quick Edit Sections')
            .items([
              S.listItem()
                .title('Basic Info')
                .icon(() => '👤')
                .child(
                  S.document()
                    .schemaType('resume')
                    .documentId('resume')
                    .title('Basic Information')
                    .views([
                      S.view.form().id('basics'),
                    ])
                ),
              S.listItem()
                .title('Work Experience')
                .icon(() => '💼')
                .child(
                  S.document()
                    .schemaType('resume')
                    .documentId('resume')
                    .title('Work Experience')
                    .views([
                      S.view.form().id('work'),
                    ])
                ),
              S.listItem()
                .title('Education')
                .icon(() => '🎓')
                .child(
                  S.document()
                    .schemaType('resume')
                    .documentId('resume')
                    .title('Education')
                    .views([
                      S.view.form().id('education'),
                    ])
                ),
              S.listItem()
                .title('Home Lab')
                .icon(() => '🖥️')
                .child(
                  S.document()
                    .schemaType('resume')
                    .documentId('resume')
                    .title('Home Lab Infrastructure')
                    .views([
                      S.view.form().id('homelab'),
                    ])
                ),
              S.listItem()
                .title('Projects')
                .icon(() => '🚀')
                .child(
                  S.document()
                    .schemaType('resume')
                    .documentId('resume')
                    .title('Projects')
                    .views([
                      S.view.form().id('projects'),
                    ])
                ),
              S.listItem()
                .title('Skills')
                .icon(() => '⚙️')
                .child(
                  S.document()
                    .schemaType('resume')
                    .documentId('resume')
                    .title('Skills')
                    .views([
                      S.view.form().id('skills'),
                    ])
                ),
              S.listItem()
                .title('Volunteer')
                .icon(() => '🤝')
                .child(
                  S.document()
                    .schemaType('resume')
                    .documentId('resume')
                    .title('Volunteer Experience')
                    .views([
                      S.view.form().id('volunteer'),
                    ])
                ),
              S.listItem()
                .title('SEO & Metadata')
                .icon(() => '🔍')
                .child(
                  S.document()
                    .schemaType('resume')
                    .documentId('resume')
                    .title('Site Metadata')
                    .views([
                      S.view.form().id('metadata'),
                    ])
                ),
            ])
        ),
    ]);
