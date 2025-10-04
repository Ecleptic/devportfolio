# Project Structure Summary

## ✅ Current Organization

Your project is now cleanly organized with the following structure:

```
devportfolio/
├── resume.json                    # ⭐ Single source of truth for all resume data
├── .gitignore                     # Git ignore rules
├── README.md                      # Project overview and documentation
├── update-resume.sh               # 🚀 One-command resume update script
│
├── .github/                       # GitHub Copilot reference files
│   └── copilot-instructions.md    # Portfolio design system reference
│
├── html/                          # 🌐 Portfolio Website
│   ├── index.html                 # Main portfolio page
│   ├── package.json               # Website dependencies
│   ├── gulpfile.js                # Gulp build configuration
│   ├── README.md                  # Website documentation
│   │
│   ├── scss/styles.scss           # Source SCSS (edit this)
│   ├── css/styles.css             # Compiled CSS (auto-generated)
│   │
│   ├── js/scripts.js              # Source JavaScript (edit this)
│   ├── js/scripts.min.js          # Minified JS (auto-generated)
│   │
│   ├── assets/Resume.pdf          # Resume PDF for website download
│   ├── images/                    # Website images
│   └── libs/                      # Third-party libraries (Font Awesome)
│
└── pdf/                           # 📄 PDF Resume Generator
    ├── generate-resume.js         # PDF generator script
    ├── package.json               # Generator dependencies
    ├── RESUME_GENERATOR.md        # Generator documentation
    │
    ├── .github/
    │   └── pdfkit-api-reference.md # PDFKit API documentation
    │
    └── output/                    # Generated PDFs
        └── Cameron_Green_Resume.pdf
```

## 🎯 Key Files

| File | Purpose | Edit? |
|------|---------|-------|
| `resume.json` | Resume data (single source of truth) | ✅ YES |
| `html/index.html` | Portfolio website content | ✅ YES |
| `html/scss/styles.scss` | Website styles (source) | ✅ YES |
| `html/js/scripts.js` | Website scripts (source) | ✅ YES |
| `pdf/generate-resume.js` | PDF generator | ✅ YES (for customization) |
| `html/css/styles.css` | Compiled CSS | ❌ NO (auto-generated) |
| `html/js/scripts.min.js` | Minified JS | ❌ NO (auto-generated) |
| `pdf/output/*.pdf` | Generated PDFs | ❌ NO (auto-generated) |

## 🚀 Common Commands

### Generate Resume PDF
```bash
cd pdf
npm run generate
```

### Update Everything (Generate + Copy to Website)
```bash
./update-resume.sh
```

### Website Development
```bash
cd html
npm run watch    # Auto-compile SCSS and JS on save
```

### Deploy to GitHub Pages
```bash
cd html
# Commit and push to GitHub
# GitHub Pages will automatically deploy from html/ folder
```

## 📝 Typical Workflow

### When You Update Your Resume:

1. **Edit `resume.json`**
   ```bash
   vim resume.json  # or use any editor
   ```

2. **Generate PDF and update website**
   ```bash
   ./update-resume.sh
   ```

3. **Update website HTML** (if needed)
   ```bash
   vim html/index.html
   ```

4. **Test locally**
   ```bash
   cd html
   open index.html
   ```

5. **Commit and deploy**
   ```bash
   git add .
   git commit -m "Update resume"
   git push origin master
   ```

## 🎨 Customization Points

### Resume Data
- **File:** `resume.json`
- **What:** Personal info, experience, education, skills, projects
- **Format:** JSON Resume schema

### PDF Styling
- **File:** `pdf/generate-resume.js`
- **What:** Colors, fonts, layout, spacing
- **Search for:** `COLORS` object, font sizes, positioning

### Website Styling
- **File:** `html/scss/styles.scss`
- **What:** Colors, fonts, animations, responsive design
- **Search for:** `$base-color`, `$text`, font families

### Website Content
- **File:** `html/index.html`
- **What:** Text content, sections, links, images

## 🔄 Data Flow

```
resume.json (source of truth)
    ↓
    ├→ pdf/generate-resume.js → pdf/output/Cameron_Green_Resume.pdf
    │                               ↓
    │                           html/assets/Resume.pdf (for download)
    │
    └→ (manual sync) → html/index.html (website content)
```

## 🎁 Included Documentation

1. **`README.md`** - This file, project overview
2. **`html/README.md`** - Portfolio website details
3. **`pdf/RESUME_GENERATOR.md`** - PDF generator guide
4. **`pdf/.github/pdfkit-api-reference.md`** - PDFKit API reference
5. **`.github/copilot-instructions.md`** - Design system for Copilot

## 🔮 Future Enhancements

- [ ] Auto-sync `resume.json` to `html/index.html`
- [ ] Multiple PDF templates (1-page, 2-page, detailed)
- [ ] Command-line options for PDF customization
- [ ] Automated deployment pipeline
- [ ] Version control for different resume variants
- [ ] Export to other formats (Markdown, LaTeX, DOCX)

## ✨ Benefits of This Structure

1. **Separation of Concerns** - Website and PDF generator are independent
2. **Single Source of Truth** - `resume.json` contains all data
3. **Easy Updates** - Edit JSON, run script, done
4. **Version Control** - Track changes to resume over time
5. **Flexibility** - Easy to create multiple resume versions
6. **Professional Output** - Both web and PDF look polished

## 📞 Quick Reference

**Generate PDF:** `cd pdf && npm run generate`

**Update Website PDF:** `./update-resume.sh`

**Website Dev:** `cd html && npm run watch`

**Edit Resume Data:** `vim resume.json`

---

**Last Updated:** October 3, 2025
