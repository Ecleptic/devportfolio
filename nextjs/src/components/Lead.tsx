import type { ResumeData } from '../types/resume';
import { FaChevronDown } from 'react-icons/fa';

interface LeadProps {
  basics: ResumeData['basics'];
}

export default function Lead({ basics }: LeadProps) {
  return (
    <div id="lead">
      <div id="lead-content">
        <h1>{basics.name}</h1>
        <h2>{basics.label}</h2>
        <a href="/Resume.pdf" className="btn-rounded-white">
          View Resume
        </a>
      </div>

      <div id="lead-overlay"></div>

      <div id="lead-down">
        <span>
          <FaChevronDown aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
