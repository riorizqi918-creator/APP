import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

const ADMIN_COOKIE = "pth_admin";
const GUEST_TOKEN_COOKIE = "pth_guest_token";

function isCookieSecure() {
  return process.env.COOKIE_SECURE === "true";
}

export function isAdminAuthenticated() {
  return cookies().get(ADMIN_COOKIE)?.value === "1";
}

export function requireAdmin() {
  if (!isAdminAuthenticated()) {
    redirect("/admin");
  }
}

export function setAdminSession() {
  cookies().set(ADMIN_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: isCookieSecure(),
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export function clearAdminSession() {
  cookies().delete(ADMIN_COOKIE);
}

export const USER_EMAIL_COOKIE = "pth_user_email";

export function setUserEmailSession(email: string) {
  cookies().set(USER_EMAIL_COOKIE, email, {
    httpOnly: true,
    sameSite: "lax",
    secure: isCookieSecure(),
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function getUserEmailSession() {
  return cookies().get(USER_EMAIL_COOKIE)?.value ?? null;
}

export function getGuestTokenSession() {
  return cookies().get(GUEST_TOKEN_COOKIE)?.value ?? null;
}

export function ensureGuestTokenSession() {
  const existing = getGuestTokenSession();

  if (existing) {
    return existing;
  }

  const token = randomUUID();

  cookies().set(GUEST_TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isCookieSecure(),
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return token;
}
