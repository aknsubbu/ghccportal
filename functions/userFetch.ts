"use server";

import { currentUser } from "@clerk/nextjs/server";

export async function userFetch() {
  const user = await currentUser();

  return user;
}