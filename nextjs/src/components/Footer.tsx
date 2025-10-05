import type { ResumeData } from '../types/resume';
import { FaChevronUp, FaGithub, FaLinkedin } from 'react-icons/fa';

interface FooterProps {
  basics: ResumeData['basics'];
}

export default function Footer({ basics }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const github = basics.profiles.find((p) => p.network === 'GitHub');
  const linkedin = basics.profiles.find((p) => p.network === 'LinkedIn');

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-5 copyright">
            <p>Copyright &copy; {currentYear} {basics.name}</p>
          </div>
          <div className="col-sm-2 top">
            <span id="to-top">
              <FaChevronUp aria-hidden="true" />
            </span>
          </div>
          <div className="col-sm-5 social">
            <ul>
              {github && (
                <li>
                  <a href={github.url} target="_blank" rel="noopener noreferrer">
                    <FaGithub aria-hidden="true" />
                  </a>
                </li>
              )}
              {linkedin && (
                <li>
                  <a href={linkedin.url} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin aria-hidden="true" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
