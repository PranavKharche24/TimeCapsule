// API Types for Plan V3 Time Capsule Platform
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  profilePicture?: string | null;
  emailVerified?: boolean;
  role?: string;
  settings?: UserSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  emailNotifications: boolean;
  reminderNotifications: boolean;
  publicProfile: boolean;
  communityContributions: boolean;
  theme: 'light' | 'dark' | 'system';
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Capsule Types based on Plan V3
export interface CapsuleContent {
  text: string;
  media?: MediaFile[];
  formatting?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    links?: Array<{ text: string; url: string }>;
    headings?: Array<{ level: number; text: string }>;
    lists?: Array<{ type: 'ordered' | 'unordered'; items: string[] }>;
  };
}

export interface MediaFile {
  id: string;
  type: 'image' | 'audio' | 'video' | 'document';
  url: string;
  name: string;
  size: number;
  mimeType: string;
  uploadProgress?: number;
}

export interface Capsule {
  id: string;
  creatorId: string;
  title: string;
  content: CapsuleContent;
  deliveryDate: Date;
  isPublic: boolean;
  isSealed: boolean;
  recipients: string[];
  aiReflectionEnabled: boolean;
  status: 'draft' | 'scheduled' | 'delivered';
  createdAt: Date;
  updatedAt: Date;
  deliveredAt?: Date | null;
}

export interface CapsuleDraft {
  title?: string;
  content: Partial<CapsuleContent>;
  deliveryDate?: Date;
  recipients: string[];
  isPublic: boolean;
  aiReflectionEnabled: boolean;
  lastSaved?: Date;
  autoSaveEnabled?: boolean;
}

// Community Features
export interface PublicCapsule extends Omit<Capsule, 'creatorId' | 'recipients'> {
  creator: {
    id: string;
    username: string;
    profilePicture?: string;
  };
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isUnlocked: boolean;
  timeUntilUnlock?: number; // milliseconds
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'capsule_delivered' | 'capsule_reminder' | 'community_interaction';
  title: string;
  message: string;
  isRead: boolean;
  relatedCapsuleId?: string;
  createdAt: Date;
}

// Filter and Sort Types
export interface CapsuleFilters {
  status?: 'all' | 'draft' | 'scheduled' | 'delivered';
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  isPublic?: boolean;
  hasMedia?: boolean;
  aiReflectionEnabled?: boolean;
  recipients?: 'all' | 'self' | 'others';
}

export interface CapsuleSortOptions {
  field: 'createdAt' | 'deliveryDate' | 'title' | 'status';
  direction: 'asc' | 'desc';
}

// Statistics for Dashboard
export interface CapsuleStats {
  total: number;
  byStatus: Record<Capsule['status'], number>;
  totalRecipients: number;
  averageWaitTime: number; // in days
  upcomingDeliveries: number;
  weeklyActivity: Array<{ date: string; count: number }>;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form Validation Types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface CapsuleFormData {
  title: string;
  content: {
    text: string;
  };
  deliveryDate: Date;
  recipients: string[];
  isPublic: boolean;
  aiReflectionEnabled: boolean;
}