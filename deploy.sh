#!/bin/sh

# Simple GitHub Pages deployment script
# Usage: sh deploy.sh

echo "Building site..."
npm run build

echo "Preparing dist folder..."
cd dist

# Add SPA fallback and disable Jekyll
cp index.html 404.html
touch .nojekyll

echo "Deploying to gh-pages branch..."
rm -rf .git
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy to GitHub Pages"

git remote add origin git@github.com:anirudh-naveen/Website.git 2>/dev/null || true
git push -f origin gh-pages

cd ..

echo ""
echo "✓ Deployment complete!"
echo "Your site should be available at: https://anirudh-naveen.github.io/Website/"
echo ""
echo "Note: Make sure GitHub Pages is configured in Settings > Pages > Source: gh-pages branch"
