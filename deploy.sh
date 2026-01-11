#!/usr/bin/env sh

set -e

echo "Building site..."
npm run build

cd dist

# Add SPA fallback and disable Jekyll for GitHub Pages
cp index.html 404.html
touch .nojekyll

# Fix favicon path to use absolute path with base URL
# This ensures favicon loads correctly when 404.html is served from subdirectories
if command -v sed >/dev/null 2>&1; then
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS uses BSD sed
    sed -i '' 's|href="\./favicon|href="/Website/favicon|g' index.html
    sed -i '' 's|href="\./favicon|href="/Website/favicon|g' 404.html
  else
    # Linux uses GNU sed
    sed -i 's|href="\./favicon|href="/Website/favicon|g' index.html
    sed -i 's|href="\./favicon|href="/Website/favicon|g' 404.html
  fi
  echo "Fixed favicon paths"
fi

echo "Removing old git repository if it exists..."
rm -rf .git

echo "Initializing git repository..."
git init
git checkout -b gh-pages
git add -A
git commit -m 'deploy' || (echo "Warning: Nothing to commit (files unchanged)" && git commit --allow-empty -m 'deploy')

echo "Pushing to gh-pages branch..."
git remote add origin git@github.com:anirudh-naveen/Website.git || true
git push -f origin gh-pages

cd -

echo "Deployment complete! Your site should be available at:"
echo "https://anirudh-naveen.github.io/Website/"