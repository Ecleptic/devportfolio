#!/bin/bash

# Resume Update Script
# Generates PDF resume and copies it to the website assets folder

set -e

echo "📝 Generating PDF resume from resume.json..."
cd pdf
npm run generate

echo ""
echo "📋 Copying PDF to website assets..."
cp output/Cameron_Green_Resume.pdf ../html/assets/Resume.pdf

echo ""
echo "✅ Done!"
echo "📄 PDF generated at: pdf/output/Cameron_Green_Resume.pdf"
echo "🌐 Website PDF updated at: html/assets/Resume.pdf"
echo ""
echo "Next steps:"
echo "  1. Review the generated PDF"
echo "  2. Update html/index.html if needed"
echo "  3. Test the website locally"
echo "  4. Deploy changes"
