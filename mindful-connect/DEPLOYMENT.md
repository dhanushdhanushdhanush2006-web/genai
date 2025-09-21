# Deployment Guide for MindfulConnect

This guide covers various deployment options for the MindfulConnect platform.

## 🚀 Quick Deployment Options

### 1. Vercel (Recommended)

Vercel provides the easiest deployment for Next.js applications.

#### Steps:
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your repository
   - Deploy automatically

3. **Environment Variables (Optional)**
   - Add environment variables in Vercel dashboard
   - Set `NEXT_PUBLIC_GEMINI_API_KEY` for full AI functionality
   - Set Firebase config variables if needed

#### Vercel Configuration
Create `vercel.json` in root directory:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### 2. Netlify

#### Steps:
1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`

3. **Configure Redirects**
   Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```

### 3. GitHub Pages

#### Steps:
1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d out"
     }
   }
   ```

3. **Configure Next.js for Static Export**
   Update `next.config.js`:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   
   module.exports = nextConfig
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

### 4. Firebase Hosting

#### Steps:
1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🔧 Environment Configuration

### Demo Mode (Default)
The application runs in demo mode by default with no configuration needed.

### Full Functionality
For complete features, set these environment variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

## 📱 PWA Configuration

The app is configured as a Progressive Web App (PWA) for mobile installation.

### PWA Features:
- Offline capability
- App-like experience
- Mobile installation
- Push notifications (when configured)

### PWA Files:
- `public/manifest.json` - App manifest
- `public/sw.js` - Service worker
- `public/icons/` - App icons

## 🌐 Custom Domain

### Vercel Custom Domain:
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain
5. Configure DNS records

### Netlify Custom Domain:
1. Go to Netlify dashboard
2. Select your site
3. Go to Domain settings
4. Add custom domain
5. Configure DNS

## 🔒 Security Considerations

### Environment Variables:
- Never commit API keys to repository
- Use platform-specific environment variable settings
- Rotate API keys regularly

### HTTPS:
- All deployment platforms provide HTTPS by default
- Ensure all external API calls use HTTPS

### Content Security Policy:
Add CSP headers for enhanced security:
```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
```

## 📊 Performance Optimization

### Build Optimization:
```bash
# Analyze bundle size
npm run build
npm run analyze
```

### Image Optimization:
- Use Next.js Image component
- Optimize images before deployment
- Use WebP format when possible

### Caching:
- Configure proper cache headers
- Use CDN for static assets
- Implement service worker caching

## 🐛 Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_`
   - Restart development server after changes
   - Check platform-specific variable settings

3. **PWA Not Installing**
   - Check manifest.json validity
   - Ensure HTTPS is enabled
   - Verify service worker registration

### Debug Commands:
```bash
# Check build output
npm run build

# Analyze bundle
npm run analyze

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting issues
npm run lint
```

## 📈 Monitoring

### Analytics:
- Google Analytics integration
- Vercel Analytics (if using Vercel)
- Custom event tracking for user interactions

### Error Monitoring:
- Sentry integration for error tracking
- Console error monitoring
- Performance monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions Example:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🌍 Global Deployment

### Multi-Region Deployment:
- Use CDN for global content delivery
- Consider regional API endpoints
- Optimize for Indian users with Mumbai/Delhi regions

### Localization:
- Configure proper language routing
- Use regional domains if needed
- Optimize for Indian internet speeds

---

For more help with deployment, check the platform-specific documentation or open an issue in the repository.
