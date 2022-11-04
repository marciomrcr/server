import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Márcio Rodrigues",
      email: "marinho@gmail.´com",
      avatarUrl: "https://github.com/marciomrcr.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Bolão 01",
      code: "BOL001",
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-04T16:05:53.449Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "DE",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-04T16:05:53.449Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",
      guesses: {
        create: {
          firstTeamPoint: 2,
          secondTeamPoint: 0,
          participants: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}
main();
