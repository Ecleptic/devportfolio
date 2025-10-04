export interface ResumeData {
  basics: {
    name: string;
    label: string;
    email: string;
    website: string;
    summary: string;
    profiles: Array<{
      network: string;
      username: string;
      url: string;
    }>;
  };
  work: {
    hidden?: string;
    jobs: Array<{
      company: string;
      position: string;
      website?: string;
      startDate: string;
      endDate: string;
      summary: string;
      highlights: string[];
      hidden?: string;
    }>;
  };
  education: {
    hidden?: string;
    schools: Array<{
      institution: string;
      area: string;
      studyType: string;
      startDate?: string;
      endDate: string;
      description: string;
      hidden?: string;
    }>;
  };
  volunteer: {
    hidden?: string;
    volunteer: Array<{
      organization: string;
      position: string;
      summary: string;
      hidden?: string;
    }>;
  };
  skills: {
    hidden?: string;
    skills: Array<{
      name: string;
      keywords: string[];
    }>;
  };
  projects: {
    hidden?: string;
    projects: Array<{
      name: string;
      description: string;
      highlights?: string[];
      url?: string;
      image?: string; // Optional image filename
      links?: {
        website?: string;
        github?: string;
        codepen?: string;
        android?: string;
        ios?: string;
      };
      hidden?: string;
    }>;
  };
}

export function shouldShowSection(hidden?: string): boolean {
  return hidden !== 'all' && hidden !== 'site';
}

export function shouldShowItem(hidden?: string): boolean {
  return hidden !== 'all' && hidden !== 'site';
}
