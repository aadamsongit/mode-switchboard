import { prisma } from "@/lib/prisma";
import { createModeAction } from "@/server/actions/modes";

export default async function ModesPage() {
  const modes = await prisma.mode.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1>Modes</h1>

      <form action={createModeAction}>
        <input name="name" placeholder="Developer / Code" />
        <button type="submit">Create Mode</button>
      </form>

      <ul>
        {modes.map((mode) => (
          <li key={mode.id}>{mode.name}</li>
        ))}
      </ul>
    </main>
  );
}
