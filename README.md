# 🚀 Time Capsule - Universal Deployment Ready

A futuristic Time Capsule application with TVA/Loki theming, built with React, TypeScript, and Vite. **Ready for production deployment on any platform!**

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux%20%7C%20macOS-blue)
![Node](https://img.shields.io/badge/node-18%2B-green)

## ✨ Features

- 🎨 **TVA-Inspired Design** - Dark/light theme with orange/amber accents
- ⏰ **Time Capsule System** - Create, schedule, and deliver digital time capsules
- 🌐 **Community Timeline** - Share public capsules with the community
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔒 **Authentication Ready** - Login/register system prepared for backend
- 📁 **Media Support** - Images, videos, audio, and documents
- 🔔 **Notifications** - In-app notification system
- 🎯 **Production Ready** - Optimized build with security headers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation (Windows/Linux/macOS)

```bash
# Clone the repository
git clone https://github.com/PranavKharche24/TimeCapsule.git
cd TimeCapsule

# Install dependencies
npm install

# Start development server
npm run dev:frontend
```

Access at `http://localhost:5173`

## 🌍 Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```
**Or** connect your GitHub repo at [vercel.com](https://vercel.com)

### 2. Netlify
```bash
npm run build:frontend
# Upload dist/public folder to Netlify
```

### 3. GitHub Pages
```bash
npm install -g gh-pages
npm run build:frontend
npx gh-pages -d dist/public
```

### 4. Docker (Universal)
```bash
docker build -t timecapsule .
docker run -p 3000:80 timecapsule
```

### 5. Static Hosting
```bash
npm run build:frontend
# Upload dist/public contents to any static host
```

## ⚙️ Environment Configuration

### Development
Copy `.env.example` to `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_ENV=development
```

### Production
Set in your deployment platform:
```env
VITE_API_BASE_URL=https://your-backend-api.com
VITE_APP_ENV=production
VITE_APP_NAME=Time Capsule
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev:frontend` | Start development server |
| `npm run build:frontend` | Build for production |
| `npm run build:vercel` | Build for Vercel deployment |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run check` | TypeScript type checking |

## 📁 Project Structure

```
TimeCapsule/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # API client & utilities
│   │   ├── store/         # State management (Zustand)
│   │   ├── types/         # TypeScript types
│   │   └── hooks/         # Custom React hooks
│   └── index.html
├── server/                # Backend (ready for integration)
├── dist/public/           # Built frontend assets
├── vercel.json           # Vercel configuration
├── Dockerfile            # Docker configuration
└── docker-compose.yml    # Docker Compose setup
```

## 🔒 Security Features

- ✅ **CSP Headers** - Content Security Policy
- ✅ **XSS Protection** - Cross-site scripting prevention
- ✅ **CSRF Protection** - Cross-site request forgery protection
- ✅ **Secure Headers** - X-Frame-Options, X-Content-Type-Options
- ✅ **HTTPS Ready** - SSL/TLS support
- ✅ **Input Validation** - Zod schema validation

## 📊 Performance

- ✅ **Code Splitting** - Automatic route-based splitting
- ✅ **Tree Shaking** - Dead code elimination
- ✅ **Asset Optimization** - Image and bundle optimization
- ✅ **Compression** - Gzip/Brotli ready
- ✅ **Modern Bundles** - ES2015+ target
- ✅ **Lazy Loading** - Components loaded on demand

## 🖥️ Cross-Platform Support

| Platform | Status |
|----------|---------|
| Windows 10/11 | ✅ Tested |
| macOS 10.15+ | ✅ Compatible |
| Ubuntu 20.04+ | ✅ Compatible |
| CentOS 8+ | ✅ Compatible |
| Docker | ✅ Included |
| CI/CD | ✅ GitHub Actions |

## 🔗 Backend Integration

Ready for backend integration! See:
- `BACKEND_INTEGRATION_SPEC.md` - API specifications
- `client/src/lib/api.ts` - API client
- `client/src/types/api.ts` - Data models

### Required API Endpoints
- Authentication: `/api/auth/*`
- Capsules: `/api/capsules/*`
- Notifications: `/api/notifications/*`
- Uploads: `/api/upload/*`

## 🎨 Theming

Based on TVA/Loki aesthetic:
- **Primary Colors**: Orange (#FF8C00), Amber (#FFC107)
- **Dark Mode**: Default theme
- **Light Mode**: Available toggle
- **Custom Components**: shadcn/ui with custom styling

## 🧪 Testing

```bash
# Type checking
npm run check

# Linting
npm run lint

# Build test
npm run build:frontend
```

## 🐳 Docker Support

### Build Image
```bash
docker build -t timecapsule .
```

### Run Container
```bash
docker run -p 3000:80 timecapsule
```

### Docker Compose
```bash
docker-compose up -d
```

## 📝 Documentation

- [`VERCEL_DEPLOY.md`](./VERCEL_DEPLOY.md) - Vercel deployment guide
- [`CROSS_PLATFORM_DEPLOY.md`](./CROSS_PLATFORM_DEPLOY.md) - Platform-specific instructions
- [`BACKEND_INTEGRATION_SPEC.md`](./BACKEND_INTEGRATION_SPEC.md) - Backend requirements
- [`BUILD_AND_DEPLOY.md`](./BUILD_AND_DEPLOY.md) - Detailed build instructions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Production Checklist

- [x] ✅ **Cross-platform build scripts**
- [x] ✅ **Environment variable configuration**
- [x] ✅ **Production optimization**
- [x] ✅ **Security headers**
- [x] ✅ **Docker support**
- [x] ✅ **CI/CD pipeline**
- [x] ✅ **Vercel configuration**
- [x] ✅ **Error handling**
- [x] ✅ **TypeScript strict mode**
- [x] ✅ **Responsive design**

## 📞 Support

- 📧 **Issues**: GitHub Issues tab
- 📖 **Documentation**: See docs folder
- 🐛 **Bug Reports**: Use issue templates

---

**Ready for production deployment!** 🚀

Choose your preferred deployment method and launch your Time Capsule app today!
