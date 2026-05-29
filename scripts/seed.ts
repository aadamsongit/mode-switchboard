import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

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
