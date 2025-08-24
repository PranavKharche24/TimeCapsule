# Time Capsule - Cross-Platform Build & Deploy

This project supports deployment on multiple platforms and environments.

## Quick Start

### Prerequisites
- Node.js 18+ (recommended: use nvm/n for version management)
- npm or yarn package manager
- Git

### Installation (Cross-Platform)

#### Windows
```powershell
# Using PowerShell
git clone https://github.com/PranavKharche24/TimeCapsule.git
cd TimeCapsule
npm install
```

#### Linux/macOS
```bash
# Using terminal
git clone https://github.com/PranavKharche24/TimeCapsule.git
cd TimeCapsule
npm install
```

### Development Mode
```bash
# Start development server
npm run dev:frontend

# Access at http://localhost:5173
```

## Environment Configuration

### For Development
Copy `.env.example` to `.env.local`:
```bash
# Windows
copy .env.example .env.local

# Linux/macOS
cp .env.example .env.local
```

### For Production
Set these environment variables in your deployment platform:
```
VITE_API_BASE_URL=https://your-backend-api.com
VITE_APP_ENV=production
```

## Build Commands

### Frontend Only (for static hosting)
```bash
npm run build:frontend
```

### Full Stack (if using backend)
```bash
npm run build
```

### Vercel Deployment
```bash
npm run build:vercel
```

## Deployment Options

### 1. Vercel (Recommended for Frontend)
- Connect GitHub repository to Vercel
- Vercel will auto-detect Vite framework
- Environment variables set in Vercel dashboard
- Automatic deployments on git push

### 2. Netlify
```bash
npm run build:frontend
# Deploy dist/public folder
```

### 3. GitHub Pages
```bash
npm install -g gh-pages
npm run build:frontend
npx gh-pages -d dist/public
```

### 4. Docker (Universal)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:frontend
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### 5. Static File Hosting
Upload `dist/public` contents to:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Any static file host

## Cross-Platform Scripts

All npm scripts work on Windows, Linux, and macOS:
- `npm run dev:frontend` - Development server
- `npm run build:frontend` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Code linting
- `npm run check` - Type checking

## Environment-Specific Notes

### Windows
- Uses PowerShell/CMD
- Paths automatically normalized
- Works with WSL2

### Linux/macOS
- Uses bash/zsh
- Native Unix tools
- Better performance on Docker

### Cross-Platform Tools Used
- `cross-env` for environment variables
- Vite for universal build system
- Node.js for consistent runtime

## Troubleshooting

### Permission Issues (Linux/macOS)
```bash
sudo chown -R $USER:$GROUP ~/.npm
```

### Windows Path Issues
Use Git Bash or enable Windows Subsystem for Linux (WSL2)

### Node Version Issues
```bash
# Check version
node --version

# Should be 18+
# Use nvm to manage versions:
# Windows: nvm-windows
# Linux/macOS: nvm
```

## Production Checklist

- [ ] Environment variables configured
- [ ] Build completes without errors
- [ ] All routes work (SPA routing configured)
- [ ] Static assets load correctly
- [ ] HTTPS enabled in production
- [ ] Error monitoring setup (optional)

## Support

This project is designed to work universally across:
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Ubuntu 20.04+ LTS
- ✅ Debian 10+
- ✅ CentOS 8+
- ✅ Docker containers
- ✅ CI/CD pipelines

For platform-specific issues, check the GitHub Issues tab.
