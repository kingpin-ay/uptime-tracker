import db from "../connection/db";
import { usersTable, monitorsTable, checksTable, pingsTable, alertsTable } from "./schema";
import { eq } from "drizzle-orm";

// Define a type for User (simplified, adjust as needed)
export interface User {
  id?: number;
  name: string;
  age: number;
  email: string;
  passwordHash: string;
  githubId?: string | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
  tier: "free" | "paid";
}

// Define a type for Monitor
export interface Monitor {
  id?: number;
  userId: number | null;
  name: string;
  type: string;
  url: string;
  method: string;
  intervalMinutes: number;
  expectedStatusCodes: any; // jsonb, can be number[] or similar
  headers: any; // jsonb, can be Record<string, string>
  pingUrl: string;
  expectedPingIntervalMinutes: number;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

// Define a type for Check
export interface Check {
  id?: number;
  monitorId: number | null;
  timestamp: Date;
  statusCode: number;
  responseTimeMs: number;
  success: boolean;
  errorMessage?: string | null;
}

// Define a type for Alert
export interface Alert {
  id?: number;
  monitorId: number | null;
  triggeredAt: Date;
  resolvedAt?: Date | null;
  acknowledgedAt?: Date | null;
  acknowledgmentNote?: string | null;
  type: string;
  details: any; // jsonb, can be Record<string, any>
}

// Create a new user
export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  try {
    const result = await db.insert(usersTable).values(user).returning();
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to create user: " + error.message);
    }
    throw error;
  }
}

// Get user by ID
export async function getUserById(id: number): Promise<User | null> {
  try {
    const result = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return result[0] || null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to get user: " + error.message);
    }
    throw error;
  }
}

// Get all users
export async function getAllUsers(): Promise<User[]> {
  try {
    return await db.select().from(usersTable);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to get users: " + error.message);
    }
    throw error;
  }
}

// Update user by ID
export async function updateUser(id: number, updates: Omit<Partial<User>, 'createdAt' | 'updatedAt'>): Promise<User | null> {
  try {
    const result = await db.update(usersTable).set(updates).where(eq(usersTable.id, id)).returning();
    return result[0] || null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to update user: " + error.message);
    }
    throw error;
  }
}

// Delete user by ID
export async function deleteUser(id: number): Promise<boolean> {
  try {
    await db.delete(usersTable).where(eq(usersTable.id, id));
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to delete user: " + error.message);
    }
    throw error;
  }
}

// Create a new monitor
export async function createMonitor(monitor: Omit<Monitor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Monitor> {
  try {
    const result = await db.insert(monitorsTable).values(monitor).returning();
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to create monitor: " + error.message);
    }
    throw error;
  }
}

// Get monitor by ID
export async function getMonitorById(id: number): Promise<Monitor | null> {
  try {
    const result = await db.select().from(monitorsTable).where(eq(monitorsTable.id, id));
    return result[0] || null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to get monitor: " + error.message);
    }
    throw error;
  }
}

// Get all monitors
export async function getAllMonitors(): Promise<Monitor[]> {
  try {
    return await db.select().from(monitorsTable);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to get monitors: " + error.message);
    }
    throw error;
  }
}

// Update monitor by ID
export async function updateMonitor(id: number, updates: Omit<Partial<Monitor>, 'createdAt' | 'updatedAt'>): Promise<Monitor | null> {
  try {
    const result = await db.update(monitorsTable).set(updates).where(eq(monitorsTable.id, id)).returning();
    return result[0] || null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to update monitor: " + error.message);
    }
    throw error;
  }
}

// Delete monitor by ID
export async function deleteMonitor(id: number): Promise<boolean> {
  try {
    await db.delete(monitorsTable).where(eq(monitorsTable.id, id));
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to delete monitor: " + error.message);
    }
    throw error;
  }
}

// Create a new check
export async function createCheck(check: Omit<Check, 'id'>): Promise<Check> {
  try {
    check.timestamp = new Date(check.timestamp);
    const result = await db.insert(checksTable).values(check).returning();
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to create check: " + error.message);
    }
    throw error;
  }
}

// Get check by ID
export async function getCheckById(id: number): Promise<Check | null> {
  try {
    const result = await db.select().from(checksTable).where(eq(checksTable.id, id));
    return result[0] || null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to get check: " + error.message);
    }
    throw error;
  }
}

// Get all checks
export async function getAllChecks(): Promise<Check[]> {
  try {
    return await db.select().from(checksTable);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to get checks: " + error.message);
    }
    throw error;
  }
}

// Update check by ID
export async function updateCheck(id: number, updates: Partial<Omit<Check, 'id'>>): Promise<Check | null> {
  try {
    const result = await db.update(checksTable).set(updates).where(eq(checksTable.id, id)).returning();
    return result[0] || null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to update check: " + error.message);
    }
    throw error;
  }
}

// Delete check by ID
export async function deleteCheck(id: number): Promise<boolean> {
  try {
    await db.delete(checksTable).where(eq(checksTable.id, id));
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to delete check: " + error.message);
    }
    throw error;
  }
}

// Create a new alert
export async function createAlert(alert: Omit<Alert, 'id'>): Promise<Alert> {
  try {
    alert.triggeredAt = new Date(alert.triggeredAt);
    if (alert.resolvedAt) alert.resolvedAt = new Date(alert.resolvedAt);
    if (alert.acknowledgedAt) alert.acknowledgedAt = new Date(alert.acknowledgedAt);
    const result = await db.insert(alertsTable).values(alert).returning();
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to create alert: " + error.message);
    }
    throw error;
  }
}

// Get alert by ID
export async function getAlertById(id: number): Promise<Alert | null> {
  try {
    const result = await db.select().from(alertsTable).where(eq(alertsTable.id, id));
    return result[0] || null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to get alert: " + error.message);
    }
    throw error;
  }
}

// Get all alerts
export async function getAllAlerts(): Promise<Alert[]> {
  try {
    return await db.select().from(alertsTable);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to get alerts: " + error.message);
    }
    throw error;
  }
}

// Update alert by ID
export async function updateAlert(id: number, updates: Partial<Omit<Alert, 'id'>>): Promise<Alert | null> {
  try {
    if (updates.triggeredAt) updates.triggeredAt = new Date(updates.triggeredAt);
    if (updates.resolvedAt) updates.resolvedAt = new Date(updates.resolvedAt);
    if (updates.acknowledgedAt) updates.acknowledgedAt = new Date(updates.acknowledgedAt);
    const result = await db.update(alertsTable).set(updates).where(eq(alertsTable.id, id)).returning();
    return result[0] || null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to update alert: " + error.message);
    }
    throw error;
  }
}

// Delete alert by ID
export async function deleteAlert(id: number): Promise<boolean> {
  try {
    await db.delete(alertsTable).where(eq(alertsTable.id, id));
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to delete alert: " + error.message);
    }
    throw error;
  }
}
