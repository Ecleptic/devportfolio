# Dev Portfolio Project

Personal portfolio website and resume generator for Cameron Green.

## Project Structure

```
devportfolio/
├── resume.json                    # Single source of truth for resume data
├── html/                          # Portfolio website
│   ├── index.html                 # Main portfolio page
│   ├── scss/styles.scss           # Source styles
│   ├── js/scripts.js              # Source JavaScript
│   ├── gulpfile.js                # Build system
│   ├── package.json               # Website dependencies
│   └── assets/Resume.pdf          # Resume PDF for download
└── pdf/                           # Resume generator
    ├── generate-resume.js         # PDF generator script
    ├── package.json               # Generator dependencies
    ├── RESUME_GENERATOR.md        # Generator documentation
    ├── .github/
    │   └── pdfkit-api-reference.md
    └── output/                    # Generated PDFs
        └── Cameron_Green_Resume.pdf
```

## Components

### 1. Resume Data (`resume.json`)
Central data file containing:
- Basic information (name, email, website)
- Work experience
- Education
- Skills
- Volunteer work
- Projects
- Social profiles

**This is the single source of truth** - edit this file to update both the website and PDF resume.

### 2. Portfolio Website (`html/`)
Static single-page portfolio built with:
- HTML5, SCSS, JavaScript (jQuery)
- Bootstrap grid system
- Font Awesome icons
- Gulp build system

**Quick Start:**
```bash
cd html
npm install
npm run watch    # Development mode with auto-compilation
```

See `html/README.md` for detailed documentation.

### 3. PDF Resume Generator (`pdf/`)
Automated PDF resume generation using PDFKit:
- Reads from `resume.json`
- Generates professional PDF resume
- Customizable styling and layout

**Quick Start:**
```bash
cd pdf
npm install
npm run generate    # Creates output/Cameron_Green_Resume.pdf
```

See `pdf/RESUME_GENERATOR.md` for detailed documentation.

## Workflow

### Update Your Information

1. **Edit `resume.json`** with your latest info
2. **Update Portfolio Website:**
   - Edit `html/index.html` to reflect changes
   - Or automate this process (future enhancement)
3. **Generate PDF Resume:**
   ```bash
   cd pdf
   npm run generate
   ```
4. **Copy PDF to website:**
   ```bash
   cp pdf/output/Cameron_Green_Resume.pdf html/assets/Resume.pdf
   ```

### Development

**Website Development:**
```bash
cd html
npm run watch    # Auto-compile SCSS and JS on changes
```

**Resume Generation:**
```bash
cd pdf
npm run generate    # Generate PDF from resume.json
```

## Features

### Portfolio Website
- ✅ Responsive design
- ✅ Smooth scrolling navigation
- ✅ Timeline experience section
- ✅ Project showcase with "View More"
- ✅ Skills cloud
- ✅ Contact form (Formspree)
- ✅ Social media links
- ✅ Easter egg (Konami code)

### Resume Generator
- ✅ Professional PDF layout
- ✅ Auto-formatted dates and bullets
- ✅ Customizable colors and styling
- ✅ Single command generation
- ✅ PDF metadata for SEO

## Future Enhancements

- [ ] Sync `resume.json` → `html/index.html` automatically
- [ ] Multiple resume templates
- [ ] Command-line options for PDF generator
- [ ] Clickable links in PDF
- [ ] Generate both 1-page and detailed versions
- [ ] CI/CD pipeline for automatic deployment

## Technologies

**Portfolio:**
- HTML5, CSS3/SCSS, JavaScript
- Bootstrap Grid
- Font Awesome
- Gulp, Babel, Sass

**Resume Generator:**
- Node.js
- PDFKit
- JSON-based data structure

## Documentation

- `html/README.md` - Portfolio website documentation
- `pdf/RESUME_GENERATOR.md` - Resume generator documentation
- `pdf/.github/pdfkit-api-reference.md` - PDFKit API reference
- `.github/copilot-instructions.md` - Portfolio design system reference

## Author

**Cameron Green**
- Website: [camerongreens.com](https://camerongreens.com)
- GitHub: [@Ecleptic](https://github.com/Ecleptic)
- LinkedIn: [cameron-k-green](https://www.linkedin.com/in/cameron-k-green/)

## License

MIT
