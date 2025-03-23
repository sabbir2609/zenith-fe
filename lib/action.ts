"use server";

import { cookies } from "next/headers";

// Get the access token from the cookies
export async function getCookies() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access");
  return accessToken?.value || null;
}
