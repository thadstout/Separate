# Biblical Separation Guide

A simple static web app for Netlify. It answers open-ended teen questions about biblical separation using a restricted framework and online KJV Bible lookup links/API calls.

## Why this version should deploy cleanly

- No build step
- No package.json needed
- No bundled Bible JSON file
- No serverless functions required
- Works as plain HTML, CSS, and JavaScript

## Deploy to Netlify from GitHub

1. Create a new GitHub repository.
2. Upload these files into the root of the repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `netlify.toml`
3. In Netlify, choose **Add new site → Import an existing project**.
4. Pick the GitHub repository.
5. Leave build command blank.
6. Set publish directory to `.`
7. Deploy.

## Important limits

This version does not use a paid AI API. It uses a rule-based answer engine so it can deploy as a static Netlify app without secret keys. It can later be upgraded to use a Netlify Function and an AI provider if desired.
