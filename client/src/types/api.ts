// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
  timestamp?: string;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// User types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  settings: UserSettings;
  stats: UserStats;
}

export interface UserSettings {
  emailNotifications: boolean;
  reminderNotifications: boolean;
  publicProfile: boolean;
  communityContributions: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface UserStats {
  totalCapsules: number;
  scheduledCapsules: number;
  deliveredCapsules: number;
  draftCapsules: number;
  longestWait?: string;
  averageWait?: string;
  totalLikes?: number;
  totalComments?: number;
}

// Capsule types
export interface Capsule {
  id: string;
  creatorId: string;
  title: string;
  content: CapsuleContent;
  deliveryDate?: string;
  isPublic: boolean;
  isSealed: boolean;
  recipients: string[];
  aiReflectionEnabled: boolean;
  status: 'draft' | 'scheduled' | 'delivered';
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
  likes?: number;
  comments?: number;
}

export interface CapsuleContent {
  text?: string;
  media?: MediaFile[];
  formatting?: ContentFormatting;
}

export interface ContentFormatting {
  bold?: TextRange[];
  italic?: TextRange[];
  underline?: TextRange[];
  links?: LinkRange[];
}

export interface TextRange {
  start: number;
  end: number;
}

export interface LinkRange extends TextRange {
  url: string;
}

export interface MediaFile {
  id: string;
  type: 'image' | 'audio' | 'video' | 'document';
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  thumbnail?: string;
  duration?: number; // for audio/video
}

// Capsule creation/update requests
export interface CreateCapsuleRequest {
  title: string;
  content: CapsuleContent;
  deliveryDate?: string;
  recipients?: string[];
  isPublic?: boolean;
  aiReflectionEnabled?: boolean;
  status?: 'draft' | 'scheduled';
}

export interface UpdateCapsuleRequest {
  title?: string;
  content?: CapsuleContent;
  deliveryDate?: string;
  recipients?: string[];
  isPublic?: boolean;
  aiReflectionEnabled?: boolean;
}

// Community types
export interface PublicCapsule extends Omit<Capsule, 'recipients'> {
  creator: {
    id: string;
    username: string;
    profilePicture?: string;
  };
  preview: string;
  unlockDate: string;
  isLocked: boolean;
  likes: number;
  comments: number;
  userHasLiked?: boolean;
}

export interface CapsuleComment {
  id: string;
  capsuleId: string;
  userId: string;
  user: {
    username: string;
    profilePicture?: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'capsule_delivered' | 'capsule_reminder' | 'community_interaction';
  title: string;
  message: string;
  isRead: boolean;
  relatedCapsuleId?: string;
  createdAt: string;
  metadata?: NotificationMetadata;
}

export interface NotificationMetadata {
  capsuleTitle?: string;
  interactionType?: 'like' | 'comment';
  interactionUser?: string;
  reminderType?: 'day_before' | 'hour_before' | 'unlocked';
}

// File upload types
export interface FileUploadResponse {
  id: string;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  thumbnail?: string;
}

export interface UploadProgress {
  fileId: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

// Search and filter types
export interface CapsuleFilters {
  status?: 'draft' | 'scheduled' | 'delivered' | 'all';
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  isPublic?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'deliveryDate' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface CommunityFilters {
  search?: string;
  unlockStatus?: 'locked' | 'unlocked' | 'all';
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: 'unlockDate' | 'createdAt' | 'likes';
  sortOrder?: 'asc' | 'desc';
}

// AI Reflection types
export interface AIReflection {
  id: string;
  capsuleId: string;
  content: string;
  insights: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  keywords: string[];
  createdAt: string;
}

// Real-time updates
export interface RealtimeEvent {
  type: 'notification' | 'capsule_delivered' | 'community_interaction';
  data: any;
  timestamp: string;
}

// Analytics types (if needed for admin/premium features)
export interface CapsuleAnalytics {
  capsuleId: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;
  peakEngagementTime?: string;
}

// Batch operations
export interface BatchOperation {
  action: 'delete' | 'seal' | 'update_delivery_date';
  capsuleIds: string[];
  data?: any;
}

export interface BatchOperationResult {
  successful: string[];
  failed: Array<{
    id: string;
    error: string;
  }>;
}

// Export types for external APIs or integrations
export interface ExportRequest {
  format: 'json' | 'pdf' | 'html';
  capsuleIds?: string[];
  includeMedia?: boolean;
  includeComments?: boolean;
}

export interface ExportResult {
  downloadUrl: string;
  expiresAt: string;
  size: number;
  format: string;
}

// Webhook types (for integrations)
export interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  signature: string;
}

export interface WebhookConfig {
  url: string;
  events: string[];
  secret: string;
  active: boolean;
}
