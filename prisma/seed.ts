import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

type SeedPost = {
  title: string;
  content?: string | null;
  excerpt?: string | null;
  imageUrl?: string | null;
  published?: boolean;
  publishAt?: Date | null;
};

type SeedUser = {
  name: string;
  email: string;
  posts: SeedPost[];
};

const users: SeedUser[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: [
      {
        title: "Join the Prisma Discord",
        content: "Come hang out with us → https://pris.ly/discord",
        excerpt: "Our community is active 24/7—get help, share tips, and connect.",
        imageUrl: "https://picsum.photos/seed/prisma-discord/1200/630",
        published: true,
      },
      {
        title: "Prisma on YouTube",
        content: "Watch tutorials and talks → https://pris.ly/youtube",
        excerpt: "Deep dives, quick tips, and product updates.",
        imageUrl: "https://picsum.photos/seed/prisma-youtube/1200/630",
        publishAt: (() => {
          const d = new Date();
          d.setDate(d.getDate() + 1);
          d.setHours(10, 0, 0, 0);
          return d;
        })(),
      },
    ],
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    posts: [
      {
        title: "Follow Prisma on Twitter",
        content: "News and threads → https://www.twitter.com/prisma",
        excerpt: "Stay in the loop with the latest updates.",
        imageUrl: "https://picsum.photos/seed/prisma-twitter/1200/630",
        published: true,
      },
    ],
  },
];

const subscribers = [
  { email: "alice@prisma.io", name: "Alice", confirmedAt: new Date() },
  { email: "li@example.com", name: "Li", confirmedAt: new Date() },
  { email: "pending@example.com", name: "Pending Patty", confirmedAt: null },
];

export async function main() {
  await prisma.subscriber.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  for (const u of users) {
    await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        posts: {
          create: u.posts.map((p) => ({
            title: p.title,
            content: p.content ?? null,
            excerpt: p.excerpt ?? null,
            imageUrl: p.imageUrl ?? null,
            published: !!p.published,
            publishedAt: p.published ? new Date() : null,
            publishAt: p.publishAt ?? null,
          })),
        },
      },
    });
  }

  await prisma.subscriber.createMany({
    data: subscribers.map((s) => ({
      email: s.email,
      name: s.name,
      confirmedAt: s.confirmedAt,
    })),
    skipDuplicates: true,
  });

  console.log("Seed complete ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
