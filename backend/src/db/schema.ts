import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const tiers = pgEnum("tiers", ["free", "paid"]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
  githubId: varchar({ length: 255 }),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  tier: tiers("free").notNull(),
});

export const monitorsTable = pgTable("monitors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => usersTable.id),
  name: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
  method: varchar({ length: 255 }).notNull(),
  intervalMinutes: integer().notNull(),
  expectedStatusCodes: jsonb().notNull(),
  headers: jsonb().notNull(),
  pingUrl: varchar({ length: 255 }).notNull(),
  expectedPingIntervalMinutes: integer().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const checksTable = pgTable("checks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  monitorId: integer().references(() => monitorsTable.id),
  timestamp: timestamp().notNull(),
  statusCode: integer().notNull(),
  responseTimeMs: integer().notNull(),
  success: boolean().notNull(),
  errorMessage: varchar({ length: 255 }),
});

export const pingsTable = pgTable("pings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  monitorId: integer().references(() => monitorsTable.id),
  timestamp: timestamp().notNull(),
});

export const alertsTable = pgTable("alerts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  monitorId: integer().references(() => monitorsTable.id),
  triggeredAt: timestamp().notNull(),
  resolvedAt: timestamp(),
  acknowledgedAt: timestamp(),
  acknowledgmentNote: varchar({ length: 255 }),
  type: varchar({ length: 255 }).notNull(),
  details: jsonb().notNull(),
});