import { createModeAction } from "@/server/actions/modes";

export default function ModesPage() {
  return (
    <main>
      <h1>Modes</h1>

      <form action={createModeAction}>
        <label htmlFor="name">Mode name</label>
        <input id="name" name="name" />

        <button type="submit">Create Mode</button>
      </form>
    </main>
  );
}
