import type { ResumeData } from '../types/resume';
import { shouldShowItem } from '../types/resume';
import { IoLocationOutline } from 'react-icons/io5';

interface ExperienceProps {
  work: ResumeData['work'];
}

function formatDate(dateString: string): string {
  if (dateString === 'Present') return 'Present';
  const [year, month] = dateString.split('-');
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

export default function Experience({ work }: ExperienceProps) {
  const visibleJobs = work.jobs.filter((job) => shouldShowItem(job.hidden));

  return (
    <div id="experience" className="background-alt">
      <h2 className="heading">Experience</h2>
      <div id="experience-timeline">
        {visibleJobs.map((job, index) => (
          <div key={index} className="vtimeline-point">
            <div className="vtimeline-icon">
              <IoLocationOutline aria-hidden="true" />
            </div>
            <div className="vtimeline-date">
              {formatDate(job.startDate)} - {formatDate(job.endDate)}
            </div>
            <div className="vtimeline-content">
              <h3>{job.company}</h3>
              <h4>{job.position}</h4>
              {job.summary && <p>{job.summary}</p>}
              {job.highlights && job.highlights.length > 0 && (
                <ul>
                  {job.highlights.map((highlight, hIndex) => (
                    <li key={hIndex}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
