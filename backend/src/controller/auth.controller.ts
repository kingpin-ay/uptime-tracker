import { Request, Response } from "express";
import { getAllUsers } from "../db/queries";
import { createUser } from "../db/queries";
import bcrypt from "bcrypt";

export async function register(
  req: Request,
  res: Response
): Promise<Response<any>> {
  const { email, password, name, age } = req.body;
  if (!email || !password || !name || !age) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    // Check for existing user
    const users = await getAllUsers();
    if (users.some((u) => u.email === email)) {
      return res.status(409).json({ error: "Email already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({
      email,
      passwordHash,
      name,
      age,
      tier: "free",
    });
    return res.status(201).json({
      message: "User registered",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Registration failed",
      details: error instanceof Error ? error.message : error,
    });
  }
}

export async function login(
  req: Request,
  res: Response
): Promise<Response<any>> {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }
  try {
    const users = await getAllUsers();
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // For now, just return user info (no JWT yet)
    return res.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Login failed",
      details: error instanceof Error ? error.message : error,
    });
  }
}
