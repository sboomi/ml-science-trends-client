import { Prisma, PrismaClient } from '../src/generated/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    password: 'YzhJmNtkPmJ5efA5',
    predictionHistory: {
      create: [
        {
          request: 'Join the Prisma Slack',
          topPredictions: {
            create: [
              { topicList: 'fezgre,tgrgtrdo,ergqgrg' },
              { topicList: 'ioghro,rgmshuiruh,rtghiprhg,erfqehog' },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    password: 'dCsefPyop9RAB7qo',
    predictionHistory: {
      create: [
        {
          request: 'Follow Prisma on Twitter',
          topPredictions: {
            create: [
              { topicList: 'fezgre,tgrgtrdo,ergqgrg' },
              { topicList: 'ioghro,rgmshuiruh,rtghiprhg,erfqehog' },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password: 'myshXmiEk7Lhg9Pa',
    predictionHistory: {
      create: [
        {
          request: 'Ask a question about Prisma on GitHub',
          topPredictions: {
            create: [
              { topicList: 'fezgre,tgrgtrdo,ergqgrg' },
              { topicList: 'ioghro,rgmshuiruh,rtghiprhg,erfqehog' },
            ],
          },
        },
        {
          request: 'Prisma on YouTube',
          topPredictions: {
            create: [
              { topicList: 'fezgre,tgrgtrdo,ergqgrg' },
              { topicList: 'ioghro,rgmshuiruh,rtghiprhg,erfqehog' },
            ],
          },
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
