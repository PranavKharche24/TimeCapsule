# Time Capsule Frontend - Backend Integration Specification

## Overview
This document describes how the Time Capsule frontend expects to interact with a backend, including required API endpoints, data models, and integration steps. It is intended for backend engineers to implement a compatible backend for this frontend.

---

## 1. API Endpoints Required

### Authentication
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login
- `POST /api/auth/logout` — Logout
- `GET /api/auth/user` — Get current user profile
- `PUT /api/auth/user/profile` — Update user profile

### Capsules
- `GET /api/capsules` — List user's capsules
- `POST /api/capsules` — Create capsule
- `GET /api/capsules/:id` — Get capsule by ID
- `PUT /api/capsules/:id` — Update capsule
- `DELETE /api/capsules/:id` — Delete capsule
- `GET /api/capsules/public` — List public capsules
- `POST /api/capsules/:id/like` — Like/unlike capsule

### Notifications
- `GET /api/notifications` — List user notifications
- `PUT /api/notifications/:id/read` — Mark notification as read
- `POST /api/notifications/mark-all-read` — Mark all as read

### Media Uploads
- `POST /api/upload/image` — Upload image
- `POST /api/upload/audio` — Upload audio
- `POST /api/upload/video` — Upload video
- `POST /api/upload/document` — Upload document

---

## 2. Data Models

### User
```ts
interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
}
```

### Capsule
```ts
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

### Notification
```ts
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

---

## 3. Backend Implementation Requirements

- JWT or session-based authentication
- CRUD for capsules
- Scheduled delivery system
- Public/private capsule settings
- File storage for media uploads
- Notification system (email + in-app)
- Community features (public timeline, likes)

---

## 4. Database Schema Example (PostgreSQL/MySQL)

```sql
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

---

## 5. Integration Steps

1. Set `VITE_API_BASE_URL` in frontend `.env` to backend URL
2. Ensure backend implements all endpoints above
3. Support CORS for frontend domain
4. Return JSON responses matching data models
5. Support JWT authentication (Bearer token)
6. Handle file uploads via multipart/form-data

---

## 6. Security & Performance
- Validate all inputs
- Scan uploaded files
- Use HTTPS
- Implement rate limiting
- Optimize media delivery (CDN recommended)

---

## 7. Testing
- Test all endpoints with frontend
- Provide error messages in JSON
- Support pagination for lists

---

## 8. References
- See `client/src/lib/api.ts` for API usage
- See `FRONTEND_DEPLOYMENT_GUIDE.md` for more details

---

**Contact frontend engineer for any clarifications.**
