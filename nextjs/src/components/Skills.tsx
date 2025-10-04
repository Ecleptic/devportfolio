import type { ResumeData } from '../types/resume';

interface SkillsProps {
  skills: ResumeData['skills'];
}

export default function Skills({ skills }: SkillsProps) {
  // Flatten all keywords from all skill categories into a single array
  const allSkills = skills.skills.flatMap((skillCategory) => skillCategory.keywords);
  
  // Remove duplicates (in case a skill appears in multiple categories)
  const uniqueSkills = Array.from(new Set(allSkills));

  return (
    <div id="skills" className="background-alt">
      <h2 className="heading">Skills</h2>
      <ul>
        {uniqueSkills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
