import type { ResumeData } from '../types/resume';
import { shouldShowItem } from '../types/resume';

interface EducationProps {
  education: ResumeData['education'];
}

export default function Education({ education }: EducationProps) {
  const visibleSchools = education.schools.filter((school) =>
    shouldShowItem(school.hidden)
  );

  if (visibleSchools.length === 0) return null;

  return (
    <div id="education">
      <h2 className="heading">Education</h2>
      {visibleSchools.map((school, index) => (
        <div key={index} className="education-block">
          <h3>{school.institution}</h3>
          <span className="education-date">
            {school.startDate
              ? `${school.startDate.split('-')[0]} - ${school.endDate}`
              : school.endDate}
          </span>
          <h4>
            {school.studyType} in {school.area}
          </h4>
          {school.description && <p>{school.description}</p>}
        </div>
      ))}
    </div>
  );
}
