import type { ResumeData } from '../types/resume';
import { shouldShowItem } from '../types/resume';

interface VolunteerProps {
  volunteer: ResumeData['volunteer'];
}

export default function Volunteer({ volunteer }: VolunteerProps) {
  const visibleVolunteer = volunteer.volunteer.filter((vol) =>
    shouldShowItem(vol.hidden)
  );

  if (visibleVolunteer.length === 0) return null;

  return (
    <div id="volunteer" className="optional-section background-alt">
      <h2 className="heading">Volunteer and Community Service</h2>
      {visibleVolunteer.map((vol, index) => (
        <div key={index} className="optional-section-block">
          <h3>{vol.organization}</h3>
          {vol.position && <h4>{vol.position}</h4>}
          {vol.summary && <p>{vol.summary}</p>}
        </div>
      ))}
    </div>
  );
}
