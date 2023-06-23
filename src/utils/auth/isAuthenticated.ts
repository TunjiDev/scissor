import { getSession } from "next-auth/react";

export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}
