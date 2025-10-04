import type { ResumeData } from '../types/resume';
import { shouldShowItem } from '../types/resume';

interface ProjectsProps {
  projects: ResumeData['projects'];
}

export default function Projects({ projects }: ProjectsProps) {
  const visibleProjects = projects.projects.filter((project) =>
    shouldShowItem(project.hidden)
  );

  if (visibleProjects.length === 0) return null;

  return (
    <div id="projects" className="background-alt">
      <h2 className="heading">Projects</h2>
      <div className="container">
        <div className="row">
          {visibleProjects.map((project, index) => {
            const hasImage = !!project.image;
            return (
              <div key={index} className={`project shadow-large ${!hasImage ? 'no-image' : ''}`}>
                <div className="project-image">
                  {hasImage && <img src={`/images/${project.image}`} alt={project.name} />}
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  {project.links && (
                    <div>
                      {project.links.website && (
                        <a href={project.links.website} target="_blank" rel="noopener noreferrer">
                          View Project
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: '10px' }}
                        >
                          View on GitHub
                        </a>
                      )}
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
