import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profilePicture: text("profile_picture"),
  emailVerified: boolean("email_verified").default(false),
  role: text("role").default("user"),
  settings: jsonb("settings"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

export const capsules = pgTable("capsules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  creatorId: varchar("creator_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: jsonb("content").notNull(), // Rich content with text, media, etc.
  deliveryDate: timestamp("delivery_date").notNull(),
  isPublic: boolean("is_public").default(false),
  isSealed: boolean("is_sealed").default(false),
  recipients: text("recipients").array(), // Array of email addresses
  aiReflectionEnabled: boolean("ai_reflection_enabled").default(false),
  status: text("status", { enum: ["draft", "scheduled", "delivered"] }).default("draft"),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
  deliveredAt: timestamp("delivered_at"),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type", { enum: ["capsule_delivered", "capsule_reminder", "community_interaction"] }).notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  relatedCapsuleId: varchar("related_capsule_id").references(() => capsules.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const capsuleLikes = pgTable("capsule_likes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  capsuleId: varchar("capsule_id").notNull().references(() => capsules.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const aiReflections = pgTable("ai_reflections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  capsuleId: varchar("capsule_id").notNull().references(() => capsules.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCapsuleSchema = createInsertSchema(capsules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deliveredAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCapsule = z.infer<typeof insertCapsuleSchema>;
export type Capsule = typeof capsules.$inferSelect;

export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;

export type CapsuleLike = typeof capsuleLikes.$inferSelect;
export type AIReflection = typeof aiReflections.$inferSelect;
