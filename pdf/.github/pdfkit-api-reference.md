# PDFKit API Reference & Analysis

## Overview
PDFKit is a JavaScript PDF generation library that works in both Node.js and the browser. It provides a comprehensive API for creating PDF documents programmatically with vector graphics, text, images, and more.

---

## Installation & Setup

### Node.js Installation
```bash
npm install pdfkit
```

### Basic Document Creation
```javascript
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a new document
const doc = new PDFDocument();

// Pipe to a file or HTTP response
doc.pipe(fs.createWriteStream('output.pdf'));

// Add content...
doc.text('Hello World!');

// Finalize the PDF
doc.end();
```

### Browser Usage
Requires module bundler (Browserify/Webpack) or standalone build:
```javascript
const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');

const doc = new PDFDocument();
const stream = doc.pipe(blobStream());

// Add content...

doc.end();
stream.on('finish', function() {
  const blob = stream.toBlob('application/pdf');
  const url = stream.toBlobURL('application/pdf');
  // Use blob or URL
});
```

---

## Document Configuration

### Constructor Options
```javascript
const doc = new PDFDocument({
  // Page settings
  size: 'letter',              // or [width, height] in points, or 'A4', 'legal', etc.
  layout: 'portrait',          // or 'landscape'
  margin: 50,                  // uniform margin (points)
  margins: {                   // individual margins
    top: 50,
    bottom: 50,
    left: 72,
    right: 72
  },
  
  // Font settings
  font: 'Helvetica',          // default font
  fontSize: 12,               // default font size
  
  // Buffering
  bufferPages: true,          // enable page buffering for later access
  autoFirstPage: true,        // automatically create first page
  
  // Metadata
  info: {
    Title: 'Document Title',
    Author: 'Author Name',
    Subject: 'Subject',
    Keywords: 'keyword1, keyword2',
    CreationDate: new Date(),
    ModDate: new Date()
  },
  
  // Security
  userPassword: 'user123',    // password to open
  ownerPassword: 'owner123',  // password for permissions
  permissions: {
    printing: 'highResolution',
    modifying: true,
    copying: true,
    annotating: true
  },
  
  // PDF version and standards
  pdfVersion: '1.7',          // '1.3', '1.4', '1.5', '1.6', '1.7', '1.7ext3'
  subset: 'PDF/A-1b',         // PDF/A conformance
  tagged: true                // for PDF/A-1a
});
```

---

## Page Management

### Adding Pages
```javascript
// Add new page with default settings
doc.addPage();

// Add page with custom settings
doc.addPage({
  size: 'legal',
  layout: 'landscape',
  margin: 50,
  margins: {top: 50, bottom: 50, left: 72, right: 72}
});

// Add page with different margins (supports units)
doc.addPage({
  margin: '2in'    // supports: em, in, px, cm, mm, pc, ex, ch, rem, vw, vmin, vmax, %, pt
});
```

### Page Events
```javascript
// Execute code when page is added
doc.on('pageAdded', () => {
  doc.text('Page Header');
});
```

### Buffered Pages (for page numbers, headers, etc.)
```javascript
const doc = new PDFDocument({ bufferPages: true });

// Add content...
doc.addPage();
doc.addPage();

// Get range of buffered pages
const range = doc.bufferedPageRange(); // { start: 0, count: 3 }

// Switch to previous pages to add content
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  doc.text(`Page ${i + 1} of ${range.count}`, 50, 750);
}

// Flush manually (or doc.end() does it automatically)
doc.flushPages();
doc.end();
```

---

## Text API

### Basic Text
```javascript
// Simple text at current position
doc.text('Hello World!');

// Text at specific position
doc.text('Hello World!', 100, 100);

// Move cursor
doc.moveDown(2);    // Move down 2 lines
doc.moveUp(1);      // Move up 1 line
```

### Text Styling Options
```javascript
doc.text('Styled text', {
  // Layout
  width: 410,                    // text width for wrapping
  height: 100,                   // max height (clipping)
  align: 'left',                 // 'left', 'center', 'right', 'justify'
  lineBreak: true,               // enable/disable line wrapping
  
  // Columns
  columns: 3,                    // number of columns
  columnGap: 15,                 // space between columns
  
  // Spacing
  indent: 20,                    // indent first line
  indentAllLines: false,         // indent all lines
  paragraphGap: 10,              // space between paragraphs
  lineGap: 5,                    // space between lines
  wordSpacing: 5,                // space between words
  characterSpacing: 2,           // space between characters
  
  // Effects
  rotation: 45,                  // rotation in degrees
  ellipsis: true,                // add ellipsis if text too long
  underline: true,               // underline text
  strike: true,                  // strikethrough text
  oblique: 15,                   // slant angle or true
  
  // Styling
  fill: true,                    // fill text (default true)
  stroke: false,                 // stroke text outline
  horizontalScaling: 100,        // scale text width (percentage)
  baseline: 'middle',            // text baseline alignment
  
  // Rich text continuation
  continued: true,               // continue from previous text call
  
  // Links
  link: 'http://example.com',    // create hyperlink
  goTo: 'anchor-name',           // internal link to destination
  destination: 'anchor-name',    // create anchor/destination
  
  // OpenType features
  features: ['liga', 'dlig']     // OpenType feature tags
});
```

### Line Wrapping Example
```javascript
const lorem = 'Lorem ipsum dolor sit amet...';

doc.fontSize(12);
doc.text(lorem, {
  width: 410,
  align: 'justify',
  indent: 20,
  paragraphGap: 10
});
```

### Rich Text (Style Changes Mid-Paragraph)
```javascript
doc.fillColor('green')
   .text('This is green, ', { continued: true })
   .fillColor('red')
   .text('and this is red.', { continued: false });
```

### Lists
```javascript
// Simple list
doc.list(['Item 1', 'Item 2', 'Item 3']);

// Nested list
doc.list([
  'Item 1',
  ['Subitem 1', 'Subitem 2'],
  'Item 2'
], 100, 100, {
  bulletRadius: 3,
  textIndent: 20,
  bulletIndent: 10
});
```

### Text Measurements
```javascript
// Get dimensions before rendering
const width = doc.widthOfString('Hello World');
const height = doc.heightOfString('Hello World', { width: 200 });
const bounds = doc.boundsOfString('Hello World', 100, 100, { width: 200 });
// bounds = { x, y, width, height }
```

---

## Fonts

### Standard PDF Fonts (Built-in)
```javascript
// These fonts are always available (no embedding needed)
doc.font('Courier');
doc.font('Courier-Bold');
doc.font('Courier-Oblique');
doc.font('Courier-BoldOblique');
doc.font('Helvetica');            // Default
doc.font('Helvetica-Bold');
doc.font('Helvetica-Oblique');
doc.font('Helvetica-BoldOblique');
doc.font('Times-Roman');
doc.font('Times-Bold');
doc.font('Times-Italic');
doc.font('Times-BoldItalic');
doc.font('Symbol');
doc.font('ZapfDingbats');
```

### Custom Fonts (Embedded)
```javascript
// Load TrueType (.ttf), OpenType (.otf), WOFF, WOFF2
doc.font('path/to/font.ttf');

// Load from Buffer
const fontBuffer = fs.readFileSync('font.ttf');
doc.font(fontBuffer);

// TrueType Collection (.ttc) - specify font name
doc.font('fonts/Chalkboard.ttc', 'Chalkboard-Bold');

// Register font for reuse
doc.registerFont('MyFont', 'fonts/CustomFont.ttf');
doc.font('MyFont');
```

### Font Size
```javascript
doc.fontSize(18);        // Set size
doc.fontSize(24).text('Large Text');  // Chainable
```

---

## Vector Graphics

### Basic Path Drawing
```javascript
// Start at point
doc.moveTo(0, 20);

// Draw lines
doc.lineTo(100, 160);

// Quadratic curves (1 control point)
doc.quadraticCurveTo(130, 200, 150, 120);

// Bezier curves (2 control points)
doc.bezierCurveTo(190, -40, 200, 200, 300, 150);

// Complete the path
doc.stroke();           // outline
doc.fill('red');        // fill
doc.fillAndStroke('red', 'blue');  // both
```

### SVG Path Syntax
```javascript
doc.path('M 0,20 L 100,160 Q 130,200 150,120 C 190,-40 200,200 300,150')
   .stroke();
```

### Shape Helpers
```javascript
// Rectangle
doc.rect(x, y, width, height);

// Rounded rectangle
doc.roundedRect(x, y, width, height, cornerRadius);

// Ellipse
doc.ellipse(centerX, centerY, radiusX, radiusY);

// Circle
doc.circle(centerX, centerY, radius);

// Polygon (variable points)
doc.polygon([100, 0], [50, 100], [150, 100]);
```

### Styling
```javascript
// Line properties
doc.lineWidth(5);
doc.lineCap('round');        // 'butt', 'round', 'square'
doc.lineJoin('round');       // 'miter', 'round', 'bevel'
doc.miterLimit(10);
doc.dash(5, { space: 10, phase: 0 });
doc.undash();                // make solid again

// Colors (RGB array, CMYK array, hex, or CSS color names)
doc.fillColor('red');
doc.fillColor('#FF0000');
doc.fillColor([255, 0, 0]);
doc.strokeColor('#000000');

// Opacity
doc.opacity(0.5);            // both fill and stroke
doc.fillOpacity(0.8);
doc.strokeOpacity(0.8);

// Shortcuts in fill/stroke methods
doc.circle(100, 50, 50)
   .fillAndStroke('red', '#900');
```

### Gradients
```javascript
// Linear gradient
const grad = doc.linearGradient(x1, y1, x2, y2);
grad.stop(0, 'green')
    .stop(0.5, 'yellow')
    .stop(1, 'red');
doc.rect(0, 0, 100, 100).fill(grad);

// Radial gradient
const radGrad = doc.radialGradient(x1, y1, r1, x2, y2, r2);
radGrad.stop(0, 'orange', 0)    // color, opacity
       .stop(1, 'orange', 1);
doc.circle(100, 100, 50).fill(radGrad);
```

### Transformations
```javascript
// Translate (move origin)
doc.translate(x, y);

// Rotate (degrees)
doc.rotate(angle, { origin: [x, y] });

// Scale (factor, optionally with origin)
doc.scale(factor, { origin: [x, y] });

// Manual transformation matrix
doc.transform(a, b, c, d, e, f);
```

### Save/Restore State
```javascript
doc.save();              // Push graphics state onto stack
// Make changes...
doc.fillColor('red');
doc.restore();           // Pop state from stack (color reverts)
```

### Clipping
```javascript
doc.circle(100, 100, 100)
   .clip();              // Everything outside is hidden

// Draw within clip region
doc.rect(0, 0, 200, 200).fill('blue');

// To unclip, use save/restore
doc.save();
doc.circle(100, 100, 100).clip();
// ... clipped drawing ...
doc.restore();           // Clipping removed
```

### Winding Rules
```javascript
doc.path('...')
   .fill('non-zero');    // Default winding rule
   
doc.path('...')
   .fill('even-odd');    // Alternative winding rule
```

---

## Images

### Adding Images
```javascript
// Formats: JPEG, PNG
// Source: path, Buffer, or data URI

// Full size at current position
doc.image('path/to/image.jpg');

// At specific position
doc.image('path/to/image.jpg', x, y);

// With sizing options
doc.image('path/to/image.jpg', x, y, {
  width: 300,              // scale to width (proportional)
  height: 200,             // scale to height (proportional)
  scale: 0.5,              // scale by factor
  fit: [100, 100],         // fit within dimensions (proportional)
  cover: [200, 200],       // cover dimensions (proportional, may crop)
  align: 'center',         // 'left', 'center', 'right' (with fit/cover)
  valign: 'center',        // 'top', 'center', 'bottom' (with fit/cover)
  
  // Links
  link: 'http://example.com',
  goTo: 'anchor',
  destination: 'anchor',
  
  // EXIF orientation
  ignoreOrientation: false  // respect/ignore JPEG EXIF rotation
});

// From Buffer
const imgBuffer = fs.readFileSync('image.jpg');
doc.image(imgBuffer, x, y, options);

// From data URI
doc.image('data:image/jpeg;base64,...', x, y, options);
```

---

## Annotations & Links

### Hyperlinks
```javascript
// Method 1: via text options
doc.text('Click here', { link: 'http://example.com' });

// Method 2: via annotation
doc.link(x, y, width, height, 'http://example.com');

// Method 3: via image options
doc.image('logo.png', x, y, { link: 'http://example.com' });
```

### Internal Links (Destinations)
```javascript
// Create destination
doc.text('Section 1', { destination: 'section1' });

// Link to destination
doc.text('Go to Section 1', { goTo: 'section1' });

// Or use annotation
doc.goTo(x, y, width, height, 'section1');
```

### Annotations
```javascript
// Note annotation
doc.note(x, y, width, height, 'Note text');

// Highlight
doc.highlight(x, y, width, height);

// Underline
doc.underline(x, y, width, height);

// Strike out
doc.strike(x, y, width, height);
```

---

## Document Metadata

### Setting Metadata
```javascript
// At creation
const doc = new PDFDocument({
  info: {
    Title: 'My Resume',
    Author: 'Cameron Green',
    Subject: 'Software Engineer Resume',
    Keywords: 'resume, software, engineer',
    CreationDate: new Date(),
    ModDate: new Date()
  }
});

// After creation
doc.info.Title = 'Updated Title';
doc.info.Author = 'Cameron Green';
```

---

## Security & Encryption

### Password Protection
```javascript
const doc = new PDFDocument({
  userPassword: 'user123',      // Required to open
  ownerPassword: 'owner456',    // Full access
  permissions: {
    printing: 'highResolution', // or 'lowResolution'
    modifying: true,
    copying: true,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true
  },
  pdfVersion: '1.7'            // Higher version = better encryption
});
```

Encryption levels by PDF version:
- `1.3`: 40-bit RC4
- `1.4`: 128-bit RC4
- `1.5`: 128-bit RC4
- `1.6`: 128-bit AES
- `1.7`: 128-bit AES
- `1.7ext3`: 256-bit AES

---

## Advanced Features

### Outlines (Bookmarks)
```javascript
doc.outline.addItem('Chapter 1', {
  destination: 'chapter1'
});
```

### Attachments
```javascript
doc.file('path/to/attachment.pdf', {
  name: 'Attachment.pdf',
  description: 'Supporting document'
});
```

### Forms
PDFKit supports interactive form fields (text, checkbox, radio, etc.)

### Tables
Can be built manually with rectangles and text positioning, or use helper libraries.

### PDF/A Standard
```javascript
const doc = new PDFDocument({
  subset: 'PDF/A-1b',    // or 'PDF/A-1a', 'PDF/A-2b', 'PDF/A-3a', etc.
  pdfVersion: '1.4',     // minimum version for PDF/A-1
  tagged: true           // required for level A conformance
});
```

---

## Best Practices

### Method Chaining
```javascript
doc.fontSize(18)
   .fillColor('blue')
   .text('Chained methods')
   .moveDown()
   .fontSize(12)
   .text('More text');
```

### Memory Management
- Use streams (pipe) to avoid loading entire PDF in memory
- For large documents, don't buffer all pages unless necessary

### Performance
- Register fonts once, use multiple times
- Reuse gradient objects
- Minimize save/restore calls

---

## Can PDFKit Recreate Your Resume?

### ✅ **YES, Absolutely!** PDFKit is perfect for resume generation.

### Required Features (All Supported):
1. ✅ **Text Formatting** - Multiple fonts, sizes, colors, bold/italic
2. ✅ **Layout Control** - Precise positioning, columns, margins
3. ✅ **Sections** - Headers, work experience, education, skills
4. ✅ **Lists** - Bullet points for experience and skills
5. ✅ **Styling** - Lines, borders, background colors
6. ✅ **Links** - Email, phone, LinkedIn, GitHub hyperlinks
7. ✅ **Professional Look** - Full control over design
8. ✅ **Metadata** - Author, title, keywords for SEO

### Advantages for Resume Generation:
- **Programmatic** - Generate from JSON data automatically
- **Consistent** - Same layout every time
- **Maintainable** - Update JSON, regenerate PDF
- **Customizable** - Easy to create multiple templates
- **No Dependencies** - Pure JavaScript, no external tools
- **Dynamic** - Can generate personalized resumes on-the-fly

### Implementation Strategy:

```javascript
const PDFDocument = require('pdfkit');
const fs = require('fs');
const resume = require('./resume.json');

function generateResume(data) {
  const doc = new PDFDocument({
    size: 'letter',
    margin: 50,
    info: {
      Title: `${data.basics.name} - Resume`,
      Author: data.basics.name
    }
  });
  
  doc.pipe(fs.createWriteStream('resume.pdf'));
  
  // Header
  doc.fontSize(24)
     .font('Helvetica-Bold')
     .text(data.basics.name, { align: 'center' });
     
  doc.fontSize(14)
     .font('Helvetica')
     .fillColor('blue')
     .text(data.basics.label, { align: 'center', link: data.basics.website });
  
  // Work Experience
  doc.moveDown(2)
     .fontSize(16)
     .fillColor('black')
     .font('Helvetica-Bold')
     .text('Experience');
     
  doc.moveTo(50, doc.y)
     .lineTo(562, doc.y)
     .stroke();
  
  data.work.forEach(job => {
    doc.moveDown()
       .fontSize(12)
       .font('Helvetica-Bold')
       .text(job.position);
    // ... more formatting
  });
  
  // Skills
  // Education
  // etc.
  
  doc.end();
}

generateResume(resume);
```

### Next Steps:
1. ✅ JSON resume data (already created)
2. Create resume template function
3. Style sections (header, experience, education, skills)
4. Add professional formatting
5. Generate PDF from JSON

**Verdict: PDFKit is an excellent choice for your resume generator!**
