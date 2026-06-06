"use server";

import { prisma } from "@/lib/prisma";

export async function createModeAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    return { ok: false, error: "Name is required" };
  }

  await prisma.mode.create({
    data: {
      name,
    },
  });

  return { ok: true };
}
