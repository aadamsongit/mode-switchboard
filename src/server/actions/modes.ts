"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createModeAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();

  if (!name) return;

  await prisma.mode.create({
    data: { name },
  });

  revalidatePath("/modes");
}
