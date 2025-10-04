import fs from 'fs';
import path from 'path';
import Header from '../components/Header';
import Lead from '../components/Lead';
import About from '../components/About';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Volunteer from '../components/Volunteer';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { ResumeData, shouldShowSection } from '../types/resume';
import ScrollEffects from '../components/ScrollEffects';

export default function Home() {
  // Read resume.json at build time
  const resumePath = path.join(process.cwd(), '..', 'resume.json');
  const resumeData: ResumeData = JSON.parse(fs.readFileSync(resumePath, 'utf8'));

  return (
    <>
      <Header />
      <main>
        <Lead basics={resumeData.basics} />
        <About basics={resumeData.basics} />
        {shouldShowSection(resumeData.work.hidden) && <Experience work={resumeData.work} />}
        {shouldShowSection(resumeData.projects.hidden) && <Projects projects={resumeData.projects} />}
        {shouldShowSection(resumeData.education.hidden) && <Education education={resumeData.education} />}
        {shouldShowSection(resumeData.volunteer.hidden) && <Volunteer volunteer={resumeData.volunteer} />}
        {shouldShowSection(resumeData.skills.hidden) && <Skills skills={resumeData.skills} />}
        <Contact basics={resumeData.basics} />
      </main>
      <Footer basics={resumeData.basics} />
      <ScrollEffects />
    </>
  );
}
