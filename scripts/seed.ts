import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const mode = await prisma.mode.create({
    data: {
      name: "Developer",
    },
  });

  console.log(mode);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
