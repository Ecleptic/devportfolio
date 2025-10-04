# Resume Generator

Automatically generate a professional PDF resume from structured JSON data using PDFKit.

## Features

- ✅ **Professional Layout** - Clean, modern single-page resume design
- ✅ **Programmatic Generation** - Generate from `resume.json`
- ✅ **Customizable Colors** - Matches your portfolio brand colors
- ✅ **Split-Color Name** - "Cameron" in blue, "Green" in green
- ✅ **Structured Sections** - Header, Skills, Experience, Education, Volunteer
- ✅ **Auto-formatting** - Dates, bullet points, and spacing handled automatically
- ✅ **PDF Metadata** - Includes author, title, and keywords for searchability
- ✅ **CLI Support** - `--output` flag for custom output paths
- ✅ **Smart Paths** - Works from any directory, resolves paths intelligently
- ✅ **Auto-creates Directories** - No need to manually create output folders

## Quick Start

### 1. Install Dependencies

```bash
cd pdf
npm install
```

### 2. Generate Resume

```bash
# Generate to default location (pdf/output/)
npm run generate

# Or run script directly
node generate-resume.js

# Generate to custom location
node generate-resume.js --output /path/to/Resume.pdf

# From Next.js project (integrated)
cd ../nextjs
npm run generate-pdf              # Outputs to nextjs/public/Resume.pdf
```

The generated PDF will be saved to:
- **Default**: `pdf/output/Cameron_Green_Resume.pdf`
- **Custom**: Whatever path you specify with `--output`

## Usage

### Basic Usage (Default Output)

```bash
node generate-resume.js
```
Output: `pdf/output/Cameron_Green_Resume.pdf`

### Custom Output Path

```bash
node generate-resume.js --output ../nextjs/public/Resume.pdf
```
Output: `nextjs/public/Resume.pdf`

### Integrated with Next.js

The Next.js project automatically calls this script before builds:

```json
{
  "scripts": {
    "generate-pdf": "node ../pdf/generate-resume.js --output public/Resume.pdf",
    "predev": "npm run generate-pdf",
    "prebuild": "npm run generate-pdf"
  }
}
```

## Structure

```
devportfolio/
├── resume.json                    # Resume data (edit this)
└── pdf/                           # Resume generator folder
    ├── generate-resume.js         # Generator script with CLI support
    ├── package.json               # Dependencies
    ├── RESUME_GENERATOR.md        # This file
    ├── .github/
    │   └── pdfkit-api-reference.md
    └── output/                    # Default output directory
        └── Cameron_Green_Resume.pdf
```

## Customization

### Edit Resume Data

Modify `../resume.json` (in the parent directory) to update your resume content:

- **basics** - Name, title, email, summary, profiles
- **work.jobs[]** - Work experience with highlights
- **education.schools[]** - Degrees and schools
- **skills.skills[]** - Categorized technical skills
- **volunteer.volunteer[]** - Community service
- **projects.projects[]** - Notable projects (optional section)

**Hidden Flags:**
- `"hidden": "all"` - Exclude from both site and PDF
- `"hidden": "resume"` - Exclude from PDF only
- `"hidden": "site"` - Exclude from website only

### Customize Colors

Edit the `COLORS` object in `generate-resume.js`:

```javascript
const COLORS = {
  primary: '#01487a',      // Main brand color (dark blue)
  secondary: '#0293f8',    // Accent color (light blue)
  text: '#374054',         // Body text (dark gray)
  lightText: '#5c6770',    // Secondary text (medium gray)
  line: '#dcd9d9',         // Divider lines (light gray)
  white: '#ffffff'
};
```

### Adjust Layout

Modify margins, font sizes, and spacing in the generator script:

```javascript
const doc = new PDFDocument({
  size: 'letter',
  margins: {
    top: 40,
    bottom: 40,
    left: 50,
    right: 50
  }
});
```

## Sections Included

### 1. Header
- Name with split-color styling ("Cameron" blue, "Green" green)
- Title/Position
- Contact info (email, website, LinkedIn, GitHub)
- Professional summary (optional - currently commented out to save space)

### 2. Technical Skills
- Categorized skills (Frontend, Backend, Database, DevOps, etc.)
- Comma-separated keywords
- **Rendered first** for immediate impact

### 3. Professional Experience
- Position title (bold)
- Company name (left) and date range (right) on same line
- Summary (optional - currently commented out)
- Bullet point highlights

### 4. Education (Optional)
- Degree and field
- Institution and dates
- Description (optional)

### 5. Volunteer & Community Service (Optional)
- Position/Achievement
- Organization
- Description

### 6. Projects (Optional)
Uncomment the `renderProjects()` function call to include notable projects.

## PDF Features

- **Page Size**: US Letter (8.5" x 11")
- **Target**: Single page for maximum impact
- **Fonts**: Helvetica family (built-in PDF fonts, universally supported)
- **Colors**: Matching portfolio brand colors
- **Metadata**: Searchable PDF with author, title, and keywords
- **Tight Spacing**: Optimized line gaps for compact layout

## Command-Line Interface

### Arguments

- `--output <path>` - Specify custom output path

### Examples

```bash
# Default output
node generate-resume.js
# → pdf/output/Cameron_Green_Resume.pdf

# Custom output (relative path)
node generate-resume.js --output ../public/Resume.pdf
# → Resolves relative to current working directory

# Custom output (absolute path)
node generate-resume.js --output /Users/you/Documents/Resume.pdf
# → Uses absolute path as-is

# From different directory
cd ../nextjs
node ../pdf/generate-resume.js --output public/Resume.pdf
# → Works correctly from any directory
```

## Tips

### Keep It One Page
- Be concise in descriptions
- Focus on most recent/relevant experience
- Use bullet points effectively
- Comment out optional sections if needed

### Update Workflow
1. Edit `../resume.json` with latest information
2. Run generator:
   ```bash
   node generate-resume.js
   ```
3. Review `output/Cameron_Green_Resume.pdf`
4. If integrated with Next.js, just run `npm run dev` or `npm run build`

### Create Multiple Versions
You can create specialized resumes for different roles:

```bash
# Create role-specific resume files
cp ../resume.json ../resume-frontend.json
cp ../resume.json ../resume-devops.json

# Modify generate-resume.js to accept input file parameter
# Then generate different versions:
node generate-resume.js --input ../resume-frontend.json --output frontend-resume.pdf
node generate-resume.js --input ../resume-devops.json --output devops-resume.pdf
```

## Troubleshooting

### "Cannot find module 'pdfkit'"
```bash
cd pdf
npm install
```

### "Cannot find module '../resume.json'"
Make sure you're running from the correct directory and `resume.json` exists in the parent directory.

### Font issues
PDFKit uses built-in PDF fonts (Helvetica family) which work everywhere.
For custom fonts, see [PDFKit documentation](http://pdfkit.org/) on font embedding.

### Output directory doesn't exist
The script automatically creates directories with `{ recursive: true }`. If you see errors, check write permissions.

## Integration with Build Systems

### npm pre-hooks (Next.js example)

```json
{
  "scripts": {
    "generate-pdf": "node ../pdf/generate-resume.js --output public/Resume.pdf",
    "predev": "npm run generate-pdf",
    "prebuild": "npm run generate-pdf"
  }
}
```

npm automatically runs `predev` before `dev` and `prebuild` before `build`.

### Netlify Build

Netlify configuration in `nextjs/netlify.toml`:

```toml
[build]
  command = "cd ../pdf && npm install && cd ../nextjs && npm run build"
```

The `prebuild` hook in `package.json` handles PDF generation automatically.

### GitHub Actions

```yaml
- name: Generate Resume PDF
  run: |
    cd pdf
    npm install
    node generate-resume.js --output ../nextjs/public/Resume.pdf
```

## Dependencies

- **pdfkit** (^0.15.0) - PDF generation library

## License

MIT

## Author

Cameron Green
- GitHub: [@Ecleptic](https://github.com/Ecleptic)
- Website: [camerongreens.com](https://camerongreens.com)

---

**Generate beautiful resumes from JSON! 📄✨**
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
