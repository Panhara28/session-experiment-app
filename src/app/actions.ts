import { getIronSession } from "iron-session";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { defaultSession, SessionData, sessionOptions, sleep } from "./lib";
import { v4 as uuidv4 } from 'uuid';

// Expiration time in milliseconds (e.g., 30 minutes)

const SESSION_TIMEOUT = 30 * 60 * 1000;

export async function getSession(shouldSleep = true) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const userIp = headers().get("x-forwarded-for") || headers().get("remote-addr"); // Get user's IP address
  const userAgent = headers().get("user-agent"); // Get user's browser user agent
  const currentTime = Date.now();

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.username = defaultSession.username;
    session.userIp = userIp;
    session.userAgent = userAgent;
    session.timestamp = currentTime;
  } else {
    // Check if session is expired based on timestamp
    if (currentTime - session.timestamp > SESSION_TIMEOUT) {
      return { validation: false, message: "Session validation failed. Please log in again." }
    }

    // Check if the session is being reused on a different IP or browser
    if (session.userIp !== userIp || session.userAgent !== userAgent) {
      // If different IP or user agent, destroy session
      // await session.destroy();
      return { validation: false, message: "Session validation failed. Please log in again." }
    }
  }

  if (shouldSleep) {
    // simulate looking up the user in db
    await sleep(250);
  }

  return session;
}

export async function logout() {
  "use server";

  // false => no db call for logout
  const session: any = await getSession(false);
  session.destroy();
  revalidatePath("/");
}

export async function login(formData: FormData) {
  "use server";

  const session: any = await getSession();

  session.username = (formData.get("username") as string) ?? "No username";
  session.isLoggedIn = true;
  session.userIp = headers().get("x-forwarded-for") || headers().get("remote-addr"); // Store the login IP
  session.userAgent = headers().get("user-agent"); // Store the browser info
  session.timestamp = Date.now();
  const localSessionToken = uuidv4();
  session.localSessionToken = localSessionToken;
  await session.save();
  revalidatePath("/");
}
