import { SessionOptions } from "iron-session";

export interface SessionData {
  username: string;
  isLoggedIn: boolean;
  userIp: string | null;
  userAgent: string | null;
  timestamp: number;
}

export const defaultSession: SessionData = {
  username: "",
  isLoggedIn: false,
  userIp: "",
  userAgent: "",
  timestamp: 0,
};

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "cookieToken",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: true,
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
