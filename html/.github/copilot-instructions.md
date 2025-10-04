# Dev Portfolio - Copilot Reference Guide

## Project Overview
**Template:** Dev Portfolio Template by Ryan Fitzgerald
**Version:** 1.2.2
**Type:** Single-page static portfolio website
**Author:** Cameron Green
**Tech Stack:** HTML5, SCSS/Sass, JavaScript (jQuery), Gulp, Bootstrap Grid

## Architecture & Build System

### Build Tools
- **Gulp 4.0.2** - Task runner for automation
- **Babel** - JavaScript transpilation (@babel/core, @babel/preset-env)
- **Sass Compiler** (gulp-sass 4.0.2) - SCSS to CSS compilation
- **Uglify** (gulp-uglify 3.0.2) - JavaScript minification
- **Autoprefixer** (gulp-autoprefixer 7.0.1) - CSS vendor prefixes

### Gulp Tasks
```javascript
gulp.task('scripts') // Compiles js/scripts.js → js/scripts.min.js
gulp.task('styles')  // Compiles scss/styles.scss → css/styles.css
gulp.task('watch')   // Watches for changes in JS and SCSS files
```

### File Structure
```
html/
├── index.html              (Main HTML file)
├── gulpfile.js            (Build configuration)
├── package.json           (Dependencies)
├── scss/styles.scss       (Source SCSS - EDIT THIS)
├── css/styles.css         (Compiled CSS - AUTO-GENERATED)
├── js/scripts.js          (Source JavaScript - EDIT THIS)
├── js/scripts.min.js      (Minified JS - AUTO-GENERATED)
├── images/                (Project images & backgrounds)
├── assets/Resume.pdf      (Resume file)
└── libs/font-awesome/     (Icon library)
```

## Design System & Styling

### Color Variables (SCSS)
Located in `scss/styles.scss` lines 1-58:

```scss
// Primary Colors
$base-color: #01487a;           // Main brand color (dark blue)
$base-color-hover: darken($base-color, 10%);  // Darkened on hover

// Background Colors
$background: #fff;              // White background
$background-alt: #f2f2f5;       // Light gray alternate sections

// Border Colors
$border: #dcd9d9;               // Light gray borders

// Text Colors
$heading: #374054;              // Dark gray headings
$text: #5c6770;                 // Medium gray body text

// Custom Brand Colors
$dFuelDark: #0a233b;
$dFuelLight: #0073c7;
$gladiatorsDark: #3a155c;
$outlawsLight: #91ca61;
```

### SCSS Mixins
```scss
@mixin transition($duration: 0.5s, $func: ease, $property: all)
@mixin placeholder  // Cross-browser placeholder styling
```

### Global CSS Classes
```scss
.shadow              // Subtle box shadow
.shadow-large        // More prominent box shadow
.btn-rounded-white   // White rounded button with hover effect
.background-alt      // Light gray background (#f2f2f5)
.heading            // Section heading with underline accent
.no-scroll          // Header link without smooth scroll
.sticky             // Fixed header variant
.no-image           // Project without image (full width)
```

### Typography
- **Font:** 'Lato' (300, 400, 700, 900 weights)
- **Base Size:** 16px
- **Heading Font Weight:** 300 (light)
- **Icon Library:** Font Awesome 4.x

## Page Sections & Layout

### 1. Header Navigation
- **Position:** Absolute top, animated dropdown
- **Structure:** Horizontal navigation with inline-block list items
- **Features:**
  - Smooth scroll animation to sections
  - Mobile hamburger menu
  - Optional sticky variant (add `.sticky` class)
  - Custom logo images (pachimari.svg)
  - 6rem padding left/right

### 2. Lead Section (Hero)
- **ID:** `#lead`
- **Height:** 100vh (min: 500px, max: 1080px)
- **Background:** `images/lead-bg.jpg` with overlay
- **Overlay:** `rgba($base-color-hover, 0.8)` - dark blue at 80% opacity
- **Content:**
  - H1: Name (5em, uppercase, white, 900 weight)
  - H2: Title (2.25em, light blue accent)
  - Resume button (`.btn-rounded-white`)
- **Down Arrow:** Animated pulsating chevron (1.5s ease infinite)

### 3. About Section
- **ID:** `#about`
- **Layout:** Bootstrap grid (col-md-4 for heading, col-md-8 for content)
- **Padding:** 75px 15px
- **Border:** 1px solid bottom

### 4. Experience Section
- **ID:** `#experience`
- **Background:** `.background-alt` (light gray)
- **Timeline System:**
  - Vertical timeline with icons
  - Data attribute: `data-date="September 2015 – September 2016"`
  - Left side: dates (260px width, right-aligned)
  - Center: vertical line (3px, $base-color) at 303px from left
  - Icons: 50px circles with Font Awesome map markers
  - Content: Right side cards with h3, h4, p tags
  - Max width: 1000px centered

**JavaScript Timeline Generator:**
- Wraps user divs in `.vtimeline-point > .vtimeline-block > .vtimeline-content`
- Auto-generates icons and date displays
- Found in `js/scripts.js` lines 58-91

### 5. Projects Section
- **ID:** `#projects`
- **Layout:** Max-width 900px cards
- **Structure:**
  ```html
  <div class="project shadow-large">
    <div class="project-image">300x300px image</div>
    <div class="project-info">Content vertically centered</div>
  </div>
  ```
- **Variants:**
  - Standard: Image left, info right
  - `.no-image`: Full width content, no image
- **"View More" Feature:**
  - Hidden projects in `#more-projects`
  - Trigger: `#view-more-projects` link
  - JavaScript fade-in animation

### 6. Education Section
- **ID:** `#education`
- **Block Structure:**
  ```html
  <div class="education-block">
    <h3>School Name</h3>
    <span class="education-date">Date Range</span>
    <h4>Degree</h4>
    <p>Description</p>
  </div>
  ```
- **Max Width:** 700px
- **Border:** 1px solid, left-aligned text

### 7. Skills Section
- **ID:** `#skills`
- **Layout:** Unordered list with inline-block items
- **Style:** "Skill Cloud" appearance
- **Item Styling:**
  - Background: `darken($background-alt, 5%)`
  - Padding: 5px 10px
  - Margin: 7px
  - Font-size: 1.2em
  - No list bullets

### 8. Contact Section
- **ID:** `#contact`
- **Background:** $base-color (blue)
- **Form Service:** Formspree integration
- **Styling:**
  - Input/Textarea: Dark blue background, white text
  - Button: White background, blue text, shadow on hover
  - Max width: 500px centered
  - Textarea: 150px height, no resize

### 9. Optional Section
- **Class:** `.optional-section`
- **Use Cases:** Certifications, hobbies, volunteering
- **Blocks:** `.optional-section-block` (same styling as education)
- **Border:** Top border (1px solid)

### 10. Footer
- **Layout:** 3-column Bootstrap grid
  - Left: Copyright
  - Center: "Back to top" button
  - Right: Social media icons
- **Social Icons:** Font Awesome with hover color change

## Responsive Breakpoints

### Small Devices (≤480px)
- Lead h1: 1.5em
- Lead h2: 1em
- Button: 0.9em, smaller padding

### Tablet (≤768px)
- **Header:** Fixed position, full-height mobile menu
- **Mobile Menu:** Activated via hamburger icon
- **Lead h1:** 2em
- **Lead h2:** 1.3em
- **Projects:** Images hidden, full-width content
- **Footer:** Centered layout

### Medium (≤992px)
- **Lead:** Auto height (not 100vh)
- **Lead h1:** 3em
- **Lead h2:** 1.75em
- **About:** Centered text

### Timeline Collapse (≤750px)
- Timeline line moves to left (23px)
- Dates below icons (70px left margin)
- Content left-aligned

## JavaScript Features

### Dependencies
- jQuery 1.12.4 (loaded via CDN)

### Core Functionality

1. **Smooth Scroll Navigation**
   - Animates scroll to section anchors
   - Variable speed based on distance
   - Closes mobile menu after navigation

2. **Mobile Menu Toggle**
   - Open: `#mobile-menu-open` adds `.active` to header & body
   - Close: `#mobile-menu-close` removes `.active`

3. **Timeline Generation**
   - Auto-wraps `#experience-timeline > div` elements
   - Adds icons, dates, and structural classes

4. **Back to Top**
   - `#to-top` button scrolls to top in 500ms

5. **Lead Down Arrow**
   - Scrolls to next section after hero

6. **View More Projects**
   - Fade out trigger, fade in hidden projects

### Easter Egg: Konami Code
Located in `js/scripts.js` lines 112-134:
- **Code:** Up, Up, Down, Down, Left, Right, Left, Right, B, A
- **Effect:** Shows `#hireMeSnowflakeDiv` with animated "HIRE ME" text
- Console log: "Psstt... try the konami code!"

## Custom Features

### Snowflake Animation
Located in SCSS lines 945-1139:
- **Animations:** `snowflakes-fall` (10s) + `snowflakes-shake` (3s)
- **20 snowflakes** with staggered delays (nth-of-type selectors)
- **Black text outline** via multiple text-shadows
- **Z-index:** 9999 (top layer)
- **Usage:** Hidden by default, activated via Konami code

### Custom Styling Additions
1. Header images (pachi.svg) with 5rem dimensions
2. Google Analytics integration (UA-78289721-2)
3. CNAME file for custom domain
4. Favicon configuration

## Animation Details

### Header Drop-in
```scss
@keyframes dropHeader {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(0); }
}
// Duration: 0.75s, ease timing
```

### Lead Arrow Pulse
```scss
@keyframes pulsate {
  0%   { transform: scale(1, 1); }
  50%  { transform: scale(1.2, 1.2); }
  100% { transform: scale(1, 1); }
}
// Duration: 1.5s, ease, infinite
```

### Button Transitions
- Default transition: 0.5s ease all
- Hover effects on links and buttons
- Shadow depth changes on hover

## Development Workflow

### Initial Setup
```bash
npm install          # Install dependencies
```

### Development
```bash
npm run watch        # OR: gulp watch
# Watches scss/styles.scss → compiles to css/styles.css
# Watches js/scripts.js → transpiles/minifies to js/scripts.min.js
```

### File Editing Rules
- ✅ **EDIT:** `scss/styles.scss`, `js/scripts.js`, `index.html`
- ❌ **DON'T EDIT:** `css/styles.css`, `js/scripts.min.js` (auto-generated)

### Making Style Changes
1. Edit `scss/styles.scss`
2. Gulp watch auto-compiles to `css/styles.css`
3. Changes immediately visible in browser

### Making JS Changes
1. Edit `js/scripts.js`
2. Gulp watch transpiles and minifies to `js/scripts.min.js`
3. Refresh browser to see changes

## Content Customization Guide

### Changing Colors
Edit variables in `scss/styles.scss` lines 38-56:
```scss
$base-color: #YOUR_COLOR;  // Main brand color
```
All accent colors, buttons, and highlights update automatically.

### Adding New Sections
1. Copy section HTML structure from README.md
2. Add corresponding navigation link in header
3. Styling automatically inherits from existing classes

### Adding Projects
```html
<div class="project shadow-large">
  <div class="project-image">
    <img src="images/your-image.png" />
  </div>
  <div class="project-info">
    <h3>Project Name</h3>
    <p>Description</p>
    <a href="#">View Project</a>
  </div>
</div>
```

### Experience Timeline
Simply add div with `data-date` attribute:
```html
<div id="experience-timeline">
  <div data-date="Month Year – Month Year">
    <h3>Company</h3>
    <h4>Job Title</h4>
    <p>Description</p>
  </div>
</div>
```
JavaScript auto-generates all timeline visuals.

## Best Practices

### Performance
- Images optimized before upload
- CSS and JS minified in production
- Single-page architecture (no route changes)
- Font Awesome loaded from local libs folder

### Accessibility
- Semantic HTML5 structure
- ARIA labels on icons
- Focus states on interactive elements
- Alt text on images

### Browser Support
- Modern browsers (ES6 via Babel)
- IE support via Bootstrap grid and autoprefixer
- Graceful degradation for no-JS scenario

### Maintenance
- Keep dependencies updated regularly
- Test responsive breakpoints after style changes
- Validate HTML and check console for errors
- Test mobile menu functionality on small screens

## Common Modifications

### Sticky Header
Add `.sticky` class to `<header>`:
```html
<header class="sticky">
```

### External Links in Nav
Add `.no-scroll` class to prevent smooth scroll:
```html
<li><a href="https://external.com" class="no-scroll">Link</a></li>
```

### Auto-Download Resume
```html
<a href="assets/Resume.pdf" download="resume.pdf" class="btn-rounded-white">
  Download Resume
</a>
```

### Project Without Image
Add `.no-image` class:
```html
<div class="project no-image">
  <div class="project-info">
    <!-- Content -->
  </div>
</div>
```

## Technical Notes

### Bootstrap Grid
- Uses Bootstrap grid system (col-sm, col-md classes)
- Only includes `css/bootstrap.min.css` (not full framework)
- Provides responsive column layout

### Font Awesome 4.x
- Icons via `<i>` tags with `fa fa-icon-name` classes
- Examples: `fa-github`, `fa-linkedin`, `fa-chevron-down`
- Local files in `libs/font-awesome/`

### jQuery Usage
- Minimal jQuery usage for DOM manipulation
- Smooth scroll calculations
- Animation triggers
- Could be refactored to vanilla JS in future

### Form Handling
- Uses Formspree service (no backend needed)
- Action URL: `https://formspree.io/YOUR_EMAIL`
- Hidden `_subject` field for email subject line
- `_replyto` field for user's email

## Git & Deployment

### Repository
- Owner: Ecleptic
- Repo: devportfolio
- Branch: master

### Deployment Files
- `CNAME` - Custom domain configuration
- `index.html` - Entry point
- All assets in respective folders

### GitHub Pages Ready
- Static site, no build step required for hosting
- Can deploy `css`, `images`, `js`, `libs`, `assets`, and `index.html`

## Version History Notes

### v1.2.2 (Current)
- Updated dependencies and gulpfile
- Modern Gulp 4.0 syntax

### v1.2.1
- Added `.no-image` class for projects

### v1.2.0
- "Show More Projects" feature
- Optional sections support

### v1.1.x
- Sticky header option
- External link support
- Mobile menu improvements

---

**Last Updated:** October 3, 2025
**Reference Created For:** GitHub Copilot Context
