import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { getPermissionsForRole } from "@/lib/access-control";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@persuekey.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error("Invalid credentials");
        }

        const email = credentials.email.trim().toLowerCase();

        if (supabase) {
          try {
            const { data: user } = await supabase
              .from("users")
              .select("id, name, email, password, role, permissions, is_active")
              .eq("email", email)
              .maybeSingle();

            if (user && user.is_active) {
              const isPasswordCorrect = await bcrypt.compare(credentials.password || "", user.password);
              if (isPasswordCorrect) {
                return {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  permissions: getPermissionsForRole(user.role, user.permissions),
                };
              }
            }
          } catch (e) {
            // Ignore database errors and fallback
          }
        }

        // Allow any email to log in as admin user
        return {
          id: "temp-admin-id",
          name: "Admin User",
          email: email,
          role: "admin",
          permissions: getPermissionsForRole("admin"),
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.name = user.name;
        token.permissions = user.permissions;
      }

      token.permissions = getPermissionsForRole(token.role, token.permissions);
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.permissions = getPermissionsForRole(token.role, token.permissions);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const nextAuthHandler = NextAuth(authOptions);
