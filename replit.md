# Overview

This is a Time Capsule web application that allows users to create, schedule, and manage time-locked messages for future delivery. The platform features a modern React frontend with TypeScript, a Node.js/Express backend, and PostgreSQL database with Drizzle ORM. Users can create multimedia time capsules with rich content (text, images, audio, video), schedule them for future delivery, share them publicly in a community timeline, and receive notifications when capsules unlock.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development/build tooling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand for global state with persistence, TanStack Query for server state and caching
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Theme System**: Dark/light mode support with CSS custom properties and theme provider

## Backend Architecture
- **Runtime**: Node.js with Express framework and TypeScript
- **Development**: tsx for TypeScript execution in development mode
- **Build**: esbuild for production bundling with ESM format
- **Session Management**: Express sessions with PostgreSQL storage using connect-pg-simple
- **API Design**: RESTful endpoints with /api prefix, centralized error handling middleware

## Database Design
- **ORM**: Drizzle with PostgreSQL dialect for type-safe database operations
- **Schema**: Four main tables - users, capsules, notifications, and capsule_likes
- **Key Features**: UUID primary keys, JSONB for rich content storage, timestamp tracking, cascade deletions
- **Migrations**: Drizzle-kit for schema migrations stored in ./migrations directory

## Authentication & Authorization
- **Strategy**: Session-based authentication (no JWT implementation visible)
- **User Model**: Username/email/password with optional profile information
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

## Rich Content System
- **Content Storage**: JSONB format supporting text, media files, and formatting metadata
- **Media Support**: Image, audio, video, and document uploads with progress tracking
- **Rich Text**: Formatting support for bold, italic, underline, links, headings, and lists
- **Audio Recording**: Browser-based audio recording capabilities

## Real-time Features
- **UI Updates**: Live countdown timers for capsule delivery dates
- **Notifications**: System for capsule delivery alerts and community interactions
- **Visual Effects**: Temporal particle animations and TVA-themed clock component

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: @tanstack/react-query for server state, wouter for routing
- **Form & Validation**: react-hook-form with @hookform/resolvers and zod for type-safe validation
- **UI Components**: @radix-ui component primitives, lucide-react for icons

## Database & Backend
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: drizzle-orm and drizzle-zod for database operations and schema validation
- **Session Storage**: connect-pg-simple for PostgreSQL session storage

## Styling & Design
- **CSS Framework**: tailwindcss with autoprefixer for styling
- **Component Library**: shadcn/ui component system with class-variance-authority
- **Animations**: CSS-based animations with Tailwind utilities

## Development Tools
- **Build Tools**: vite with @vitejs/plugin-react, esbuild for production builds
- **Development**: @replit/vite-plugin-runtime-error-modal and @replit/vite-plugin-cartographer for Replit integration
- **Fonts**: Google Fonts integration for Inter, Geist, Architects Daughter, DM Sans, and Fira Code

## Media & File Handling
- **Rich Text**: Planned integration for rich text editing (editor not yet implemented)
- **File Uploads**: Browser-native file handling with drag-and-drop support
- **Media Processing**: Client-side media preview and upload progress tracking

# Recent Changes (August 21, 2025)

## Frontend Independence & Backend Preparation
- **Complete Frontend Separation**: Prepared frontend for independent deployment with remote backend integration
- **API Layer**: Created comprehensive API client (`client/src/lib/api.ts`) with all backend endpoints configured
- **Documentation**: Added `FRONTEND_DEPLOYMENT_GUIDE.md` and `BUILD_AND_DEPLOY.md` with complete integration instructions
- **Clock Component Fix**: Resolved Miss Minutes clock glitches by simplifying design and removing problematic visual elements
- **Production Ready**: Frontend is now fully prepared for deployment to any hosting platform (Netlify, Vercel, AWS, etc.)

## Authentication System
- **Demo Mode**: Implemented working authentication forms with local storage persistence
- **Backend Ready**: Forms prepared for easy integration with real authentication APIs
- **TVA Theming**: All authentication components follow consistent Loki/TVA design language

## Community Section Enhancement
- **Consistent Theming**: Fixed Community page to match TVA orange/amber color scheme throughout
- **Interactive Elements**: Added proper hover states and visual feedback
- **Data Structure**: Prepared for real backend data with proper TypeScript interfaces