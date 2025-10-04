# Resume Generator

Automatically generate a professional PDF resume from structured JSON data using PDFKit.

## Features

- ✅ **Professional Layout** - Clean, modern resume design
- ✅ **Programmatic Generation** - Generate from `resume.json`
- ✅ **Customizable Colors** - Matches your portfolio brand colors
- ✅ **Structured Sections** - Header, Experience, Education, Skills, Volunteer
- ✅ **Auto-formatting** - Dates, bullet points, and spacing handled automatically
- ✅ **PDF Metadata** - Includes author, title, and keywords

## Quick Start

### 1. Install Dependencies

```bash
cd pdf
npm install
```

### 2. Generate Resume

```bash
npm run generate
```

The generated PDF will be saved to: `pdf/output/Cameron_Green_Resume.pdf`

## Structure

```
devportfolio/
├── resume.json                    # Resume data (edit this)
└── pdf/                           # Resume generator folder
    ├── generate-resume.js         # Generator script
    ├── package.json               # Dependencies
    ├── RESUME_GENERATOR.md        # Documentation
    ├── .github/
    │   └── pdfkit-api-reference.md
    └── output/                    # Generated PDFs
        └── Cameron_Green_Resume.pdf
```

## Customization

### Edit Resume Data

Modify `../resume.json` (in the parent directory) to update your resume content:

- **basics** - Name, title, email, summary, profiles
- **work** - Work experience with highlights
- **education** - Degrees and schools
- **skills** - Categorized technical skills
- **volunteer** - Community service
- **projects** - Notable projects (optional)

### Customize Colors

Edit the `COLORS` object in `generate-resume.js`:

```javascript
const COLORS = {
  primary: '#01487a',      // Main brand color
  secondary: '#0293f8',    // Accent color
  text: '#374054',         // Body text
  lightText: '#5c6770',    // Secondary text
  line: '#dcd9d9',         // Divider lines
  white: '#ffffff'
};
```

### Adjust Layout

Modify margins, font sizes, and spacing in the generator script:

```javascript
const doc = new PDFDocument({
  size: 'letter',
  margins: {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
  }
});
```

## Sections Included

### 1. Header
- Name (large, bold)
- Title/Position
- Contact info (email, website, LinkedIn, GitHub)
- Professional summary

### 2. Professional Experience
- Position and company
- Date range
- Summary
- Bullet point highlights

### 3. Education
- Degree and field
- Institution
- Dates
- Description

### 4. Technical Skills
- Categorized skills (Frontend, Backend, Database, etc.)
- Comma-separated keywords

### 5. Volunteer & Community Service
- Position/Achievement
- Organization
- Description

### 6. Projects (Optional)
Uncomment in `generate-resume.js` to include notable projects.

## PDF Features

- **Page Size**: US Letter (8.5" x 11")
- **Fonts**: Helvetica family (built-in PDF fonts)
- **Colors**: Matching portfolio brand
- **Links**: Clickable email, website (future enhancement)
- **Metadata**: Searchable PDF with author and keywords

## Tips

### Keep It One Page
- Be concise in descriptions
- Focus on most recent/relevant experience
- Use bullet points effectively

### Update Regularly
1. Edit `resume.json`
2. Run `npm run generate`
3. Review `output/Cameron_Green_Resume.pdf`

**Create Multiple Versions:**
- Create `resume-frontend.json`, `resume-backend.json`, etc. in parent directory
- Modify script to accept filename parameter

## Troubleshooting

### "Cannot find module 'pdfkit'"
Run `npm install` to install dependencies.

### Output directory missing
The script automatically creates the `output/` directory.

### Font issues
PDFKit uses built-in PDF fonts (Helvetica family) which work everywhere.
For custom fonts, see PDFKit documentation on font embedding.

## Future Enhancements

- [ ] Add clickable links to email, website, profiles
- [ ] Support multiple resume templates
- [ ] Command-line arguments for customization
- [ ] Add project section toggle
- [ ] Generate multiple versions (1-page, 2-page, detailed)
- [ ] Export to other formats (HTML, Markdown)
- [ ] Add profile photo option
- [ ] Include QR code for digital portfolio

## Dependencies

- **pdfkit** (^0.15.0) - PDF generation library

## License

MIT

## Author

Cameron Green
- GitHub: [@Ecleptic](https://github.com/Ecleptic)
- Website: [camerongreens.com](https://camerongreens.com)
