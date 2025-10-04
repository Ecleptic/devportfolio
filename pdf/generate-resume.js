#!/usr/bin/env node

/**
 * Resume Generator using PDFKit
 * Generates a professional PDF resume from resume.json
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Load resume data from parent directory
const resumeData = require('../resume.json');

// Output paths
const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'Cameron_Green_Resume.pdf');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// Color scheme
const COLORS = {
  primary: '#01487a',      // Dark blue from your portfolio
  secondary: '#0293f8',    // Light blue accent
  text: '#374054',         // Dark gray for text
  lightText: '#5c6770',    // Medium gray
  line: '#dcd9d9',         // Light gray for lines
  white: '#ffffff'
};

// Create PDF document
const doc = new PDFDocument({
  size: 'letter',
  margins: {
    top: 40,
    bottom: 40,
    left: 50,
    right: 50
  },
  info: {
    Title: `${resumeData.basics.name} - Resume`,
    Author: resumeData.basics.name,
    Subject: 'Professional Resume',
    Keywords: 'resume, software engineer, full stack developer'
  }
});

// Pipe to file
doc.pipe(fs.createWriteStream(OUTPUT_FILE));

// Utility functions
function formatDate(dateStr) {
  if (dateStr === 'Present') return 'Present';
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

function drawHorizontalLine(y, color = COLORS.line, lineWidth = 0.5) {
  doc.save()
     .strokeColor(color)
     .lineWidth(lineWidth)
     .moveTo(50, y)
     .lineTo(562, y)
     .stroke()
     .restore();
}

function addSectionHeader(title) {
  doc.moveDown(0.8); // Padding top (increased)
  
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .fillColor(COLORS.primary)
     .text(title.toUpperCase(), { continued: false });
  
  drawHorizontalLine(doc.y + 3, COLORS.primary, 1.5);
  doc.moveDown(0.5); // Padding bottom (increased)
}

function addBulletPoint(text, indent = 85) {
  const bulletY = doc.y + 2;
  doc.fontSize(9)
     .font('Helvetica')
     .fillColor(COLORS.lightText)
     .text('•', indent - 15, bulletY)
     .text(text, indent, bulletY, {
       width: 512 - indent,
       align: 'left',
       lineGap: -1
     });
  doc.moveDown(0.1);
}

// ============================
// HEADER SECTION
// ============================
function renderHeader() {
  const { basics } = resumeData;
  
  // Name - Split "Cameron Green" to color "Green" green
  const nameParts = basics.name.split(' ');
  const firstName = nameParts.slice(0, -1).join(' '); // Everything except last word
  const lastName = nameParts[nameParts.length - 1]; // Last word
  
  // Calculate widths for centered alignment
  doc.fontSize(24).font('Helvetica-Bold');
  const firstNameWidth = doc.widthOfString(firstName.toUpperCase() + ' ');
  const lastNameWidth = doc.widthOfString(lastName.toUpperCase());
  const totalWidth = firstNameWidth + lastNameWidth;
  const startX = (doc.page.width - totalWidth) / 2;
  
  const nameY = doc.y;
  
  // Render first name in blue
  doc.fillColor(COLORS.primary)
     .text(firstName.toUpperCase() + ' ', startX, nameY, { continued: false, lineBreak: false });
  
  // Render last name in green on same line
  const lastNameY = nameY; // Use same Y position
  doc.fillColor('#74D463')
     .text(lastName.toUpperCase(), startX + firstNameWidth, lastNameY, { continued: false });
  
  // Reset cursor position to left margin and move down properly
  doc.x = 50; // Reset X to left margin
  doc.y = nameY + doc.currentLineHeight();
  doc.moveDown(0.5);
  
  // Title
  doc.fontSize(12)
     .font('Helvetica')
     .fillColor(COLORS.secondary)
     .text(basics.label, { align: 'center' });
  
  doc.moveDown(0.3);
  
  // Contact information
  const contactInfo = [];
  if (basics.email) contactInfo.push(basics.email);
  if (basics.website) contactInfo.push(basics.website.replace('https://', ''));
  
  basics.profiles.forEach(profile => {
    if (profile.network === 'GitHub') {
      contactInfo.push(`GitHub: ${profile.username}`);
    } else if (profile.network === 'LinkedIn') {
      contactInfo.push(`LinkedIn: linkedin.com/in/${profile.username}`);
    }
  });
  
  doc.fontSize(9)
     .font('Helvetica')
     .fillColor(COLORS.text)
     .text(contactInfo.join(' | '), { align: 'center' });
  
  doc.moveDown(0.5);
  
  // Summary (skip to save space - can add back if needed)
  // if (basics.summary) {
  //   doc.fontSize(9)
  //      .font('Helvetica')
  //      .fillColor(COLORS.lightText)
  //      .text(basics.summary, {
  //        align: 'justify',
  //        width: 512,
  //        lineGap: -1
  //      });
  // }
  
  doc.moveDown(0.4); // Reduced spacing before first section
}

// ============================
// WORK EXPERIENCE SECTION
// ============================
function renderExperience() {
  // Skip if work section is hidden for resume
  if (resumeData.work.hidden === 'resume' || resumeData.work.hidden === 'all') return;
  
  addSectionHeader('Professional Experience');
  
  // Filter out hidden jobs from the jobs array
  const visibleJobs = resumeData.work.jobs.filter(job => job.hidden !== 'all' && job.hidden !== 'resume');
  
  visibleJobs.forEach((job, index) => {
    // Position title - explicitly set x position to left margin
    doc.fontSize(11)
       .font('Helvetica-Bold')
       .fillColor(COLORS.text)
       .text(job.position, 50, doc.y, { continued: false });
    
    // Company (left) and dates (right) on same line
    const startDate = formatDate(job.startDate);
    const endDate = formatDate(job.endDate);
    const dateRange = `${startDate} - ${endDate}`;
    
    const currentY = doc.y;
    
    // Company name on left
    doc.fontSize(10)
       .font('Helvetica-Bold')
       .fillColor(COLORS.primary)
       .text(job.company, 50, currentY);
    
    // Date range on right
    doc.fontSize(10)
       .font('Helvetica')
       .fillColor(COLORS.lightText)
       .text(dateRange, 50, currentY, {
         width: 512,
         align: 'right'
       });
    
    doc.moveDown(0.2);
    
    // Summary (skip to save space)
    // if (job.summary) {
    //   doc.fontSize(9)
    //      .font('Helvetica')
    //      .fillColor(COLORS.lightText)
    //      .text(job.summary, {
    //        width: 512,
    //        align: 'left',
    //        lineGap: -1
    //      });
    //   doc.moveDown(0.1);
    // }
    
    // Highlights
    if (job.highlights && job.highlights.length > 0) {
      job.highlights.forEach(highlight => {
        addBulletPoint(highlight);
      });
    }
    
    // Add space between jobs (but not after last one)
    if (index < visibleJobs.length - 1) {
      doc.moveDown(0.4);
    }
  });
  
  doc.moveDown(0.6);
}

// ============================
// EDUCATION SECTION
// ============================
function renderEducation() {
  // Skip if education section is hidden for resume
  if (resumeData.education.hidden === 'resume' || resumeData.education.hidden === 'all') return;
  
  addSectionHeader('Education');
  
  resumeData.education.schools.forEach((edu, index) => {
    // Degree
    doc.fontSize(10)
       .font('Helvetica-Bold')
       .fillColor(COLORS.text)
       .text(edu.studyType, { continued: true })
       .font('Helvetica')
       .text(` in ${edu.area}`, { continued: false });
    
    // Institution and dates
    const endYear = edu.endDate ? (edu.endDate.length === 4 ? edu.endDate : edu.endDate.split('-')[0]) : '';
    const startYear = edu.startDate ? edu.startDate.split('-')[0] : '';
    const dateRange = startYear ? `${startYear} - ${endYear}` : `Graduated ${endYear}`;
    
    doc.fontSize(9)
       .font('Helvetica-Bold')
       .fillColor(COLORS.primary)
       .text(edu.institution, { continued: true })
       .font('Helvetica')
       .fillColor(COLORS.lightText)
       .text(` | ${dateRange}`, { continued: false });
    
    // Skip description to save space
    
    // Add space between education entries
    if (index < resumeData.education.schools.length - 1) {
      doc.moveDown(0.3);
    }
  });
  
  doc.moveDown(0.6);
}

// ============================
// SKILLS SECTION
// ============================
function renderSkills() {
  // Skip if skills section is hidden for resume
  if (resumeData.skills.hidden === 'resume' || resumeData.skills.hidden === 'all') return;
  
  addSectionHeader('Technical Skills');
  
  resumeData.skills.skills.forEach(skillCategory => {
    doc.fontSize(9)
       .font('Helvetica-Bold')
       .fillColor(COLORS.text)
       .text(`${skillCategory.name}: `, { continued: true })
       .font('Helvetica')
       .fillColor(COLORS.lightText)
       .text(skillCategory.keywords.join(', '), { continued: false });
    
    doc.moveDown(0.2);
  });
  
  doc.moveDown(0.4);
}

// ============================
// VOLUNTEER SECTION
// ============================
function renderVolunteer() {
  // Skip if volunteer section is hidden for resume
  if (!resumeData.volunteer || 
      resumeData.volunteer.hidden === 'resume' || 
      resumeData.volunteer.hidden === 'all' ||
      !resumeData.volunteer.volunteer ||
      resumeData.volunteer.volunteer.length === 0) return;
  
  addSectionHeader('Volunteer & Community Service');
  
  resumeData.volunteer.volunteer.forEach((vol, index) => {
    doc.fontSize(10)
       .font('Helvetica-Bold')
       .fillColor(COLORS.text)
       .text(vol.position, { continued: false });
    
    doc.fontSize(9)
       .font('Helvetica')
       .fillColor(COLORS.primary)
       .text(vol.organization, { continued: false });
    
    if (vol.summary) {
      doc.moveDown(0.1);
      doc.fontSize(9)
         .font('Helvetica')
         .fillColor(COLORS.lightText)
         .text(vol.summary, {
           width: 512,
           align: 'left',
           lineGap: -1
         });
    }
    
    if (index < resumeData.volunteer.volunteer.length - 1) {
      doc.moveDown(0.3);
    }
  });
  
  doc.moveDown(0.5);
}

// ============================
// PROJECTS SECTION (Optional - can be added to separate page)
// ============================
function renderProjects() {
  if (!resumeData.projects || resumeData.projects.length === 0) return;
  
  // Check if we need a new page
  if (doc.y > 650) {
    doc.addPage();
  }
  
  addSectionHeader('Notable Projects');
  
  // Only show first 3-4 most important projects
  const topProjects = resumeData.projects.slice(0, 4);
  
  topProjects.forEach((project, index) => {
    doc.fontSize(11)
       .font('Helvetica-Bold')
       .fillColor(COLORS.text)
       .text(project.name, { continued: false });
    
    doc.moveDown(0.2);
    doc.fontSize(10)
       .font('Helvetica')
       .fillColor(COLORS.lightText)
       .text(project.description, {
         width: 512,
         align: 'left'
       });
    
    if (project.highlights && project.highlights.length > 0) {
      doc.moveDown(0.2);
      project.highlights.slice(0, 2).forEach(highlight => {
        addBulletPoint(highlight);
      });
    }
    
    if (index < topProjects.length - 1) {
      doc.moveDown(0.6);
    }
  });
}

// ============================
// GENERATE RESUME
// ============================
console.log('🎨 Generating resume PDF...');

try {
  renderHeader();
  renderSkills();      // Skills first
  renderExperience();  // Then work experience
  // Skip education and volunteer sections
  // renderProjects(); // Uncomment to include projects
  
  // Finalize PDF
  doc.end();
  
  console.log(`✅ Resume generated successfully!`);
  console.log(`📄 Output: ${OUTPUT_FILE}`);
} catch (error) {
  console.error('❌ Error generating resume:', error);
  process.exit(1);
}
