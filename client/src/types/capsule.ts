import type { User } from './api';

// Core Capsule Types
export interface Capsule {
  id: string;
  creatorId: string;
  title: string;
  content: CapsuleContent;
  deliveryDate: Date | null;
  isPublic: boolean;
  isSealed: boolean;
  recipients: string[];
  aiReflectionEnabled: boolean;
  status: CapsuleStatus;
  createdAt: Date;
  updatedAt: Date;
  deliveredAt?: Date;
  
  // Optional computed fields
  creator?: User;
  likes?: number;
  comments?: number;
  userHasLiked?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

export type CapsuleStatus = 'draft' | 'scheduled' | 'delivered';

export interface CapsuleContent {
  text: string;
  media?: MediaFile[];
  formatting?: ContentFormatting;
  rawContent?: string; // For storing rich editor content
}

export interface ContentFormatting {
  bold?: TextRange[];
  italic?: TextRange[];
  underline?: TextRange[];
  links?: LinkRange[];
  headings?: HeadingRange[];
  lists?: ListRange[];
}

export interface TextRange {
  start: number;
  end: number;
}

export interface LinkRange extends TextRange {
  url: string;
  title?: string;
}

export interface HeadingRange extends TextRange {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ListRange extends TextRange {
  type: 'ordered' | 'unordered';
  items: ListItem[];
}

export interface ListItem {
  text: string;
  level: number;
}

// Media Types
export interface MediaFile {
  id: string;
  type: MediaType;
  filename: string;
  url: string;
  thumbnailUrl?: string;
  size: number;
  mimeType: string;
  duration?: number; // for audio/video files in seconds
  dimensions?: MediaDimensions; // for images/videos
  uploadedAt: Date;
  uploadProgress?: number;
  uploadError?: string;
}

export type MediaType = 'image' | 'audio' | 'video' | 'document';

export interface MediaDimensions {
  width: number;
  height: number;
}

// Capsule Creation and Editing
export interface CreateCapsuleData {
  title: string;
  content: CapsuleContent;
  deliveryDate?: Date;
  recipients?: string[];
  isPublic?: boolean;
  aiReflectionEnabled?: boolean;
}

export interface UpdateCapsuleData {
  title?: string;
  content?: CapsuleContent;
  deliveryDate?: Date;
  recipients?: string[];
  isPublic?: boolean;
  aiReflectionEnabled?: boolean;
}

export interface CapsuleDraft {
  id?: string;
  title: string;
  content: CapsuleContent;
  deliveryDate?: Date;
  recipients: string[];
  isPublic: boolean;
  aiReflectionEnabled: boolean;
  lastSaved?: Date;
  autoSaveEnabled?: boolean;
}

// Capsule Display and UI
export interface CapsuleCardProps {
  capsule: Capsule;
  showActions?: boolean;
  showPreview?: boolean;
  onClick?: (capsule: Capsule) => void;
  onEdit?: (capsule: Capsule) => void;
  onDelete?: (capsule: Capsule) => void;
  onShare?: (capsule: Capsule) => void;
}

export interface CapsuleListProps {
  capsules: Capsule[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  showPagination?: boolean;
  onLoadMore?: () => void;
  onRefresh?: () => void;
}

// Community and Public Capsules
export interface PublicCapsule extends Omit<Capsule, 'recipients' | 'creatorId'> {
  creator: {
    id: string;
    username: string;
    profilePicture?: string;
  };
  preview: string;
  unlockDate: Date;
  isLocked: boolean;
  daysUntilUnlock?: number;
  likes: number;
  comments: number;
  userHasLiked: boolean;
  canInteract: boolean;
}

export interface CommunityTimelineItem {
  capsule: PublicCapsule;
  position: 'left' | 'right';
  index: number;
}

// Filtering and Search
export interface CapsuleFilters {
  status?: CapsuleStatus | 'all';
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  isPublic?: boolean;
  hasMedia?: boolean;
  aiReflectionEnabled?: boolean;
  recipients?: 'self' | 'others' | 'all';
}

export interface CapsuleSortOptions {
  field: 'createdAt' | 'deliveryDate' | 'title' | 'status';
  direction: 'asc' | 'desc';
}

// Capsule Statistics
export interface CapsuleStats {
  total: number;
  byStatus: Record<CapsuleStatus, number>;
  byTimeframe: {
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
  };
  averageWaitTime: number; // in days
  longestWait: number; // in days
  totalRecipients: number;
  publicCapsules: number;
}

// Capsule Interactions
export interface CapsuleLike {
  id: string;
  capsuleId: string;
  userId: string;
  createdAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
  parentId?: string; // for nested comments
  replies?: CapsuleComment[];
  likes?: number;
  userHasLiked?: boolean;
}

export interface CapsuleShare {
  id: string;
  capsuleId: string;
  userId: string;
  shareType: 'link' | 'social' | 'email';
  platform?: string; // social platform if applicable
  createdAt: Date;
}

// AI Reflection
export interface AIReflection {
  id: string;
  capsuleId: string;
  content: string;
  insights: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  keywords: string[];
  themes: string[];
  growthAreas: string[];
  createdAt: Date;
  confidence: number; // 0-1 score
}

// Delivery and Notifications
export interface CapsuleDelivery {
  id: string;
  capsuleId: string;
  recipientEmail: string;
  deliveredAt: Date;
  readAt?: Date;
  deliveryMethod: 'email' | 'in_app';
  deliveryStatus: 'pending' | 'delivered' | 'failed' | 'read';
  failureReason?: string;
}

export interface DeliveryNotification {
  id: string;
  capsuleId: string;
  userId: string;
  type: 'reminder' | 'delivered' | 'unlocked';
  title: string;
  message: string;
  scheduledFor: Date;
  sentAt?: Date;
  readAt?: Date;
  notificationMethod: 'email' | 'push' | 'in_app';
}

// Validation and Constraints
export interface CapsuleValidation {
  titleMinLength: number;
  titleMaxLength: number;
  contentMinLength: number;
  contentMaxLength: number;
  maxRecipients: number;
  maxMediaFiles: number;
  maxFileSize: number; // in bytes
  allowedMediaTypes: MediaType[];
  minDeliveryDelay: number; // in hours
  maxDeliveryDelay: number; // in days
}

// Export and Import
export interface CapsuleExport {
  format: 'json' | 'pdf' | 'html' | 'markdown';
  includeMedia: boolean;
  includeComments: boolean;
  includeAnalytics: boolean;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface CapsuleImport {
  source: 'json' | 'csv' | 'other_platform';
  preserveIds: boolean;
  mergeStrategy: 'skip' | 'overwrite' | 'create_new';
  mappings?: Record<string, string>; // field mappings
}

// Analytics and Insights
export interface CapsuleAnalytics {
  capsuleId: string;
  views: number;
  uniqueViews: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;
  averageReadTime?: number; // in seconds
  peakEngagementTime?: Date;
  demographicData?: {
    ageGroups: Record<string, number>;
    locations: Record<string, number>;
  };
}

// Error Types
export interface CapsuleError {
  code: string;
  message: string;
  field?: string;
  details?: any;
}

export interface CapsuleValidationError extends CapsuleError {
  field: string;
  constraint: string;
  value: any;
}

// Utility Types
export type CapsuleWithoutId = Omit<Capsule, 'id' | 'createdAt' | 'updatedAt'>;
export type CapsulePreview = Pick<Capsule, 'id' | 'title' | 'status' | 'deliveryDate' | 'createdAt'>;
export type CapsuleSummary = Pick<Capsule, 'id' | 'title' | 'status' | 'deliveryDate' | 'recipients' | 'isPublic'>;
