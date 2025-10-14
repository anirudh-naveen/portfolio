#!/usr/bin/env sh

set -e

npm run build

cd dist

# Add SPA fallback and disable Jekyll for GitHub Pages
cp index.html 404.html
touch .nojekyll

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:anirudh-naveen/Website.git main:gh-pages

cd -