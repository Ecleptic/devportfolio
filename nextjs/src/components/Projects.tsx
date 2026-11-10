import type { ResumeData } from '../types/resume';
import { shouldShowItem } from '../types/resume';

interface ProjectsProps {
  projects: ResumeData['projects'];
  imageFilenames: string[];
}

export default function Projects({ projects, imageFilenames }: ProjectsProps) {
  const visibleProjects = projects.projects.filter((project) => shouldShowItem(project.hidden));
  // Resolve CMS filenames against real assets so case differences work on Linux hosts.
  const imagesByName = new Map(
    imageFilenames.map((filename) => [filename.toLowerCase(), filename])
  );

  if (visibleProjects.length === 0) {
    return null;
  }

  return (
    <div id="projects" className="background-alt">
      <h2 className="heading">Projects</h2>
      <div className="container">
        <div className="row">
          {visibleProjects.map((project) => {
            const imageFilename = project.image
              ? imagesByName.get(project.image.toLowerCase())
              : undefined;
            const hasImage = !!imageFilename;
            const projectLinks = [
              {
                label: 'View Project',
                url:
                  project.links?.website ||
                  (project.url !== project.links?.github ? project.url : undefined),
              },
              { label: 'View on GitHub', url: project.links?.github },
              { label: 'App Store', url: project.links?.ios },
              { label: 'Google Play', url: project.links?.android },
              { label: 'CodePen', url: project.links?.codepen },
            ].filter(
              (link, index, links) =>
                link.url && links.findIndex((candidate) => candidate.url === link.url) === index
            );
            // Use project name as key (more stable than index)
            const projectKey = project.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <div
                key={projectKey}
                className={`project shadow-large ${!hasImage ? 'no-image' : ''}`}
              >
                <div className="project-image">
                  {hasImage && <img src={`/images/${imageFilename}`} alt={project.name} />}
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  {projectLinks.length > 0 && (
                    <div className="project-links">
                      {projectLinks.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${link.label}: ${project.name}`}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
