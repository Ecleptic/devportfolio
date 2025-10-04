# Quick Start Guide

## 📁 Your Project Structure

```
devportfolio/
├── resume.json          ← Edit this for resume updates
├── update-resume.sh     ← Run this to generate PDF
├── html/                ← Portfolio website
└── pdf/                 ← PDF generator
```

## ⚡ Quick Commands

### Update Your Resume (Most Common)
```bash
# 1. Edit resume data
vim resume.json

# 2. Generate PDF and update website
./update-resume.sh
```

### Work on Portfolio Website
```bash
cd html
npm run watch    # Auto-compile on changes
```

### Generate PDF Only
```bash
cd pdf
npm run generate
```

## 📝 What to Edit

| When you want to... | Edit this file... |
|---------------------|-------------------|
| Update work experience | `resume.json` → work section |
| Add new skills | `resume.json` → skills section |
| Change website colors | `html/scss/styles.scss` → $base-color |
| Change PDF colors | `pdf/generate-resume.js` → COLORS |
| Update website content | `html/index.html` |
| Modify PDF layout | `pdf/generate-resume.js` |

## 🎯 Common Tasks

### I got a new job
1. Edit `resume.json` → add to `work` array
2. Run `./update-resume.sh`
3. Update `html/index.html` → experience section
4. Commit and push

### I learned a new skill
1. Edit `resume.json` → add to `skills` array
2. Run `./update-resume.sh`
3. Update `html/index.html` → skills section
4. Commit and push

### I want to change colors
**Website:**
- Edit `html/scss/styles.scss`
- Change `$base-color` variable
- Run `npm run watch` in html/ folder

**PDF:**
- Edit `pdf/generate-resume.js`
- Change `COLORS` object
- Run `npm run generate` in pdf/ folder

### I built a new project
1. Edit `resume.json` → add to `projects` array
2. Edit `html/index.html` → add project card
3. Add project image to `html/images/`
4. Run `./update-resume.sh`

## 📚 Documentation

- **Project Overview:** `README.md`
- **Structure Details:** `PROJECT_STRUCTURE.md`
- **Website Docs:** `html/README.md`
- **PDF Generator:** `pdf/RESUME_GENERATOR.md`
- **PDFKit API:** `pdf/.github/pdfkit-api-reference.md`
- **Design System:** `.github/copilot-instructions.md`

## 🆘 Troubleshooting

**PDF not generating?**
```bash
cd pdf
npm install
npm run generate
```

**Website styles not updating?**
```bash
cd html
npm install
npm run watch
```

**Command not found?**
```bash
chmod +x update-resume.sh
./update-resume.sh
```

## 🎨 File Locations

**Your Resume PDF:**
- Generated: `pdf/output/Cameron_Green_Resume.pdf`
- Website copy: `html/assets/Resume.pdf`

**Website Files:**
- Live site: `html/index.html`
- Styles (edit): `html/scss/styles.scss`
- Styles (compiled): `html/css/styles.css`
- Scripts (edit): `html/js/scripts.js`
- Scripts (compiled): `html/js/scripts.min.js`

## 🚀 Deployment

```bash
# From html/ directory
git add .
git commit -m "Update resume"
git push origin master

# GitHub Pages will auto-deploy
# Your site: https://ecleptic.github.io/devportfolio/
```

---

**Need more help?** Check the full docs in README.md or PROJECT_STRUCTURE.md
