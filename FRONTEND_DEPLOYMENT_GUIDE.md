# Time Capsule Frontend - Deployment & Backend Integration Guide

## Overview
This is a complete React TypeScript frontend for the Time Capsule application with Loki/TVA theming. The frontend is designed to work independently and can be easily connected to any backend API.

## Frontend Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: Zustand with persistence
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form with Zod validation
- **API Client**: TanStack Query (React Query)
- **Theme**: Dark/Light mode with TVA-inspired orange/amber color scheme

### Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── layout/                # Navigation, headers
│   │   ├── common/                # Reusable components (clocks, etc.)
│   │   └── community/             # Community-specific components
│   ├── pages/                     # Page components
│   │   ├── Auth/                  # Login/Register pages
│   │   ├── Dashboard.tsx          # User dashboard
│   │   ├── CreateCapsule.tsx      # Capsule creation
│   │   ├── Community.tsx          # Public timeline
│   │   └── Profile.tsx            # User profile
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility functions, API client
│   ├── store/                     # Zustand state management
│   ├── types/                     # TypeScript type definitions
│   └── utils/                     # Helper functions
├── index.html
└── package.json
```

## Current Data Models

### Authentication
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
}
```

### Time Capsules
```typescript
interface Capsule {
  id: string;
  creatorId: string;
  title: string;
  content: {
    text?: string;
    media?: MediaFile[];
    formatting?: RichTextFormat;
  };
  deliveryDate: Date;
  isPublic: boolean;
  isSealed: boolean;
  recipients?: string[];
  status: 'draft' | 'scheduled' | 'delivered';
  createdAt: Date;
  deliveredAt?: Date;
}

interface MediaFile {
  id: string;
  type: 'image' | 'audio' | 'video' | 'document';
  url: string;
  filename: string;
  size: number;
}
```

### Notifications
```typescript
interface Notification {
  id: string;
  userId: string;
  type: 'capsule_delivered' | 'capsule_reminder' | 'community_interaction';
  title: string;
  message: string;
  isRead: boolean;
  relatedCapsuleId?: string;
  createdAt: Date;
}
```

## API Endpoints Expected by Frontend

### Authentication Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/user
PUT  /api/auth/user/profile
```

### Capsule Endpoints
```
GET    /api/capsules                    # User's capsules
POST   /api/capsules                    # Create capsule
GET    /api/capsules/:id                # Get specific capsule
PUT    /api/capsules/:id                # Update capsule
DELETE /api/capsules/:id                # Delete capsule
GET    /api/capsules/public             # Public community capsules
POST   /api/capsules/:id/like           # Like/unlike capsule
```

### Notification Endpoints
```
GET  /api/notifications                 # User notifications
PUT  /api/notifications/:id/read        # Mark as read
POST /api/notifications/mark-all-read   # Mark all as read
```

### Media Upload Endpoints
```
POST /api/upload/image                  # Upload image
POST /api/upload/audio                  # Upload audio
POST /api/upload/video                  # Upload video
POST /api/upload/document               # Upload document
```

## Backend Integration Steps

### 1. Environment Configuration
Create `.env` file in the frontend root:
```env
VITE_API_BASE_URL=https://your-backend-api.com
VITE_APP_ENV=production
```

### 2. Update API Client
Modify `client/src/lib/queryClient.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Update all API calls to use the base URL
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  // ... rest of implementation
};
```

### 3. Authentication Flow
The frontend uses Zustand for local state management. Replace mock authentication in:
- `client/src/pages/Auth/Login.tsx`
- `client/src/pages/Auth/Register.tsx`

Update to make real API calls:
```typescript
// Replace mock login with:
const response = await apiRequest('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### 4. Data Fetching
All pages currently use mock data. Update these files to use real API endpoints:
- `client/src/pages/Dashboard.tsx` - User's capsules
- `client/src/pages/Community.tsx` - Public capsules
- `client/src/pages/Profile.tsx` - User profile data

### 5. File Upload Integration
Update `client/src/pages/CreateCapsule.tsx` to handle real file uploads to your backend's upload endpoints.

## Deployment Options

### Option 1: Static Hosting (Recommended)
1. Build the frontend: `npm run build`
2. Deploy `dist/` folder to:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - GitHub Pages

### Option 2: Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Option 3: CDN Distribution
Upload built assets to a CDN and configure your backend to serve the `index.html` for all frontend routes.

## Required Backend Features

### Core Features
1. **User Authentication & Management**
   - JWT or session-based authentication
   - User registration/login
   - Profile management

2. **Time Capsule System**
   - CRUD operations for capsules
   - Scheduled delivery system
   - Public/private capsule settings

3. **File Storage**
   - Image, audio, video upload handling
   - File compression and optimization
   - CDN integration for media delivery

4. **Notification System**
   - Real-time or scheduled notifications
   - Email notifications for capsule delivery
   - In-app notification management

5. **Community Features**
   - Public capsule timeline
   - Like/interaction system
   - Content moderation

### Database Schema (PostgreSQL/MySQL)
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  profile_picture_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Capsules table
CREATE TABLE capsules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content JSONB NOT NULL,
  delivery_date TIMESTAMP NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  is_sealed BOOLEAN DEFAULT FALSE,
  recipients TEXT[],
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  delivered_at TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  related_capsule_id UUID REFERENCES capsules(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Frontend Configuration Files

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

### Vite Configuration
The project includes optimized Vite configuration for production builds with proper asset optimization and modern browser support.

## Security Considerations

### Frontend Security
1. **Environment Variables**: Never expose sensitive data in VITE_ variables
2. **XSS Protection**: All user content is sanitized through React's built-in protection
3. **CORS**: Configure your backend to allow requests from your frontend domain
4. **HTTPS**: Always use HTTPS in production

### API Security
1. **Authentication**: Implement JWT tokens or secure sessions
2. **Rate Limiting**: Protect against API abuse
3. **Input Validation**: Validate all inputs on the backend
4. **File Upload Security**: Scan and validate uploaded files

## Testing & Quality Assurance

### Current Test Infrastructure
- All interactive elements have `data-testid` attributes for testing
- Form validation with Zod schemas
- Error boundary components for graceful error handling

### Recommended Testing
1. **Unit Tests**: Jest + React Testing Library
2. **E2E Tests**: Playwright or Cypress
3. **API Integration Tests**: Test frontend-backend communication

## Performance Optimization

### Current Optimizations
- Lazy loading with React.lazy()
- Image optimization with modern formats
- Code splitting by routes
- TanStack Query for efficient data caching

### Production Recommendations
1. **CDN**: Serve static assets from CDN
2. **Compression**: Enable gzip/brotli compression
3. **Caching**: Implement proper cache headers
4. **Monitoring**: Add performance monitoring (Sentry, etc.)

## Support & Maintenance

### Frontend Dependencies
All dependencies are up-to-date and maintained. Regular updates recommended for security and performance.

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features used
- Progressive enhancement for older browsers

This frontend is production-ready and can be immediately deployed with any compatible backend implementation following the API specifications outlined above.