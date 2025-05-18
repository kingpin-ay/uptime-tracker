import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as GitHubStrategy,
  Profile as GitHubProfile,
} from "passport-github2";
import {
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  User,
} from "../db/queries";
import bcrypt from "bcrypt";
import { env } from "./env";
import { VerifyCallback } from "passport-oauth2";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await getUserByEmail(email);
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: GitHubProfile,
      done: VerifyCallback
    ) => {
      try {
        // Try to find user by githubId
        let user = null;
        if (profile.id) {
          // Try to find by githubId
          const allEmails = profile.emails || [];
          const email = allEmails.length > 0 ? allEmails[0].value : null;
          // Try to find by email first
          if (email) {
            user = await getUserByEmail(email);
            if (user) {
              // Link GitHub ID if not already linked
              if (!user.githubId) {
                user = await updateUser(user.id!, { githubId: profile.id });
              }
              if (user) {
                done(null, user);
              } else {
                done(null, false);
              }
            }
          }
          // If not found by email, try to find by githubId
          // (Assume you have a getUserByGithubId if needed, or filter all users)
          // For now, fallback to create new user
          const newUser: Omit<User, "id" | "createdAt" | "updatedAt"> = {
            name: profile.displayName || profile.username || "GitHub User",
            age: 0, // Unknown, can be updated later
            email: email || `github_${profile.id}@noemail.local`,
            passwordHash: "", // Not used for GitHub users
            githubId: profile.id,
            tier: "free",
          };
          user = await createUser(newUser);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false, { message: "User creation failed." });
          }
        }
        return done(null, false, { message: "No GitHub profile ID." });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await getUserById(id);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err);
  }
});

export default passport;
