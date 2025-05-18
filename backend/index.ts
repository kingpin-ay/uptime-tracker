import express from "express";
import session from "express-session";
import passport from "passport";
import "./src/lib/passport";
import { register } from "./src/controller/auth.controller";
import { env } from "./src/lib/env";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set to true if using HTTPS
  })
);
app.use(passport.initialize());
app.use(passport.session());

// In-memory store for refresh tokens (for demo; use DB/Redis in production)
const refreshTokens = new Map<string, { userId: number; expires: number }>();

function generateRefreshToken(userId: number) {
  const token = crypto.randomBytes(40).toString("hex");
  // 7 days expiry
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  refreshTokens.set(token, { userId, expires });
  return token;
}

function verifyRefreshToken(token: string) {
  const data = refreshTokens.get(token);
  if (!data) return null;
  if (data.expires < Date.now()) {
    refreshTokens.delete(token);
    return null;
  }
  return data.userId;
}

app.get("/", (req, res) => {
  res.send("Uptime Tracker Backend is running!");
});

// Registration endpoint
app.post("/api/register", async (req, res) => {
  await register(req, res);
});

// Login endpoint (passport local strategy)
app.post(
  "/api/auth/login",
  passport.authenticate("local"),
  (req: express.Request, res: express.Response): void => {
    const user = req.user as any;
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Generate refresh token
    const refreshToken = generateRefreshToken(user.id);
    res.json({ message: "Login successful", user, token, refreshToken });
  }
);

// Refresh token endpoint
app.post("/api/auth/refresh", (req: express.Request, res: express.Response): void => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).json({ error: "Missing refresh token" });
    return;
  }
  const userId = verifyRefreshToken(refreshToken);
  if (!userId) {
    res.status(401).json({ error: "Invalid or expired refresh token" });
    return;
  }
  // Issue new JWT
  const token = jwt.sign(
    { id: userId },
    env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});

// GitHub OAuth callback endpoint
app.get(
  "/api/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req: express.Request, res: express.Response): void => {
    const user = req.user as any;
    if (!user) {
      res.redirect("/login?error=oauth");
      return;
    }
    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Redirect to frontend with token (or set cookie, etc.)
    res.redirect(`/dashboard?token=${token}`);
  }
);

// Logout endpoint (blacklist refresh token)
app.post("/api/auth/logout", (req: express.Request, res: express.Response): void => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).json({ error: "Missing refresh token" });
    return;
  }
  if (refreshTokens.has(refreshToken)) {
    refreshTokens.delete(refreshToken);
    res.json({ message: "Logged out successfully" });
  } else {
    res.status(400).json({ error: "Invalid refresh token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
