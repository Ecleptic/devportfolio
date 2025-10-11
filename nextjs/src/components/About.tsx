import type { ResumeData } from '../types/resume';

interface AboutProps {
  basics: ResumeData['basics'];
}

export default function About({ basics }: AboutProps) {
  // Split on double newlines to get paragraphs, filter out empty ones
  const paragraphs = basics.summary
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2 className="heading">About Me</h2>
          </div>
          <div className="col-md-8">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
