# 🚀 GitHub Setup Guide for MindfulConnect

This guide will help you set up the MindfulConnect repository on GitHub and deploy it to various platforms.

## 📋 Prerequisites

- Git installed on your computer
- GitHub account
- Node.js 18+ installed

## 🔧 Step 1: Initialize Git Repository

```bash
# Navigate to your project directory
cd mindful-connect

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: MindfulConnect - AI Mental Health Platform for India"
```

## 🌐 Step 2: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)
```bash
# Install GitHub CLI if not already installed
# Windows: winget install GitHub.cli
# Mac: brew install gh
# Linux: See https://cli.github.com/

# Login to GitHub
gh auth login

# Create repository
gh repo create mindful-connect --public --description "AI Mental Health Platform for India with 18+ regional languages, 3D video calls, and multimedia generation"

# Push to GitHub
git remote add origin https://github.com/yourusername/mindful-connect.git
git branch -M main
git push -u origin main
```

### Option B: Using GitHub Web Interface
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Repository name: `mindful-connect`
4. Description: `AI Mental Health Platform for India with 18+ regional languages, 3D video calls, and multimedia generation`
5. Make it public
6. Don't initialize with README (we already have one)
7. Click "Create repository"

```bash
# Add remote origin
git remote add origin https://github.com/yourusername/mindful-connect.git
git branch -M main
git push -u origin main
```

## 🏷️ Step 3: Add Repository Topics

Add these topics to your GitHub repository for better discoverability:

```
mental-health, ai, india, multilingual, nextjs, react, typescript, 
gemini-ai, firebase, healthcare, social-impact, hackathon, 
google-gen-ai, video-calls, emotion-detection, 3d-avatars
```

## 📝 Step 4: Configure Repository Settings

### Repository Description
```
🇮🇳 AI Mental Health Platform for India - 18+ regional languages, 3D AI video calls, emotion detection, multimedia generation. Built for Google Gen AI Exchange Hackathon.
```

### Website URL
```
https://yourusername.github.io/mindful-connect
```

### Repository Settings
1. Go to Settings tab
2. Enable "Issues" for bug reports
3. Enable "Discussions" for community
4. Enable "Wiki" for documentation
5. Set up branch protection rules for main branch

## 🚀 Step 5: Deploy to GitHub Pages

### Method 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build application
      run: npm run build
      
    - name: Export static files
      run: npm run export
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

### Method 2: Manual Deployment
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build && npm run export",
"deploy": "gh-pages -d out"

# Deploy
npm run deploy
```

## 🔧 Step 6: Configure Next.js for Static Export

Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mindful-connect' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/mindful-connect' : ''
}

module.exports = nextConfig
```

Add export script to `package.json`:
```json
{
  "scripts": {
    "export": "next export"
  }
}
```

## 🌐 Step 7: Alternative Deployment Options

### Vercel (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Deploy automatically
5. Get instant URL: `https://mindful-connect.vercel.app`

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Deploy automatically

## 📊 Step 8: Add Repository Badges

Add these badges to your README.md:

```markdown
![GitHub stars](https://img.shields.io/github/stars/yourusername/mindful-connect?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/mindful-connect?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/mindful-connect)
![GitHub license](https://img.shields.io/github/license/yourusername/mindful-connect)
![Vercel](https://img.shields.io/badge/deployed%20on-vercel-black)
![Next.js](https://img.shields.io/badge/built%20with-Next.js-black)
![TypeScript](https://img.shields.io/badge/built%20with-TypeScript-blue)
```

## 🔒 Step 9: Security Setup

### Dependabot
Create `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### Security Policy
Create `SECURITY.md`:
```markdown
# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please send an email to security@mindfulconnect.com instead of using the issue tracker.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Measures

- All API keys are stored as environment variables
- No sensitive data is stored in the repository
- HTTPS is enforced in production
- Regular dependency updates via Dependabot
```

## 📈 Step 10: Analytics and Monitoring

### GitHub Insights
- Enable repository insights
- Monitor traffic and clones
- Track popular content

### Optional: Google Analytics
Add to your deployment environment variables:
```
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
```

## 🤝 Step 11: Community Setup

### Issue Templates
Create `.github/ISSUE_TEMPLATE/bug_report.md`:
```markdown
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior.

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
```

### Pull Request Template
Create `.github/pull_request_template.md`:
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in demo mode
- [ ] Tested on mobile
- [ ] Tested accessibility

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

## 🎯 Step 12: Final Checklist

- [ ] Repository created on GitHub
- [ ] All files committed and pushed
- [ ] README.md updated with correct URLs
- [ ] Deployment configured (GitHub Pages/Vercel/Netlify)
- [ ] Repository settings configured
- [ ] Topics and description added
- [ ] Security measures in place
- [ ] Community templates created
- [ ] Demo URL working
- [ ] All features tested

## 🌟 Step 13: Promote Your Project

### Hackathon Submission
- Submit to Google Gen AI Exchange Hackathon
- Include demo URL and GitHub repository
- Highlight India-specific features

### Social Media
- Share on LinkedIn, Twitter
- Use hashtags: #MentalHealth #AI #India #GoogleGenAI
- Tag relevant communities

### Communities
- Share in relevant Discord/Slack communities
- Post on Reddit (r/webdev, r/reactjs, r/india)
- Submit to Product Hunt

## 🆘 Troubleshooting

### Common Issues:

1. **Deployment fails**
   - Check Node.js version (18+)
   - Verify build command
   - Check for TypeScript errors

2. **GitHub Pages not working**
   - Enable GitHub Pages in repository settings
   - Check branch and folder settings
   - Verify static export configuration

3. **Environment variables not working**
   - Check variable names (must start with NEXT_PUBLIC_)
   - Verify platform-specific settings
   - Restart deployment after changes

### Getting Help:
- Open an issue in the repository
- Check deployment platform documentation
- Ask in GitHub Discussions

---

🎉 **Congratulations!** Your MindfulConnect platform is now live on GitHub and ready to help people across India with AI-powered mental health support!

**Demo URL**: `https://yourusername.github.io/mindful-connect`
**Repository**: `https://github.com/yourusername/mindful-connect`
