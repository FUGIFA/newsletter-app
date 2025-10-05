import { AspectRatio, Card, Container, Image, SimpleGrid, Text } from '@mantine/core';
import classes from '@/styles/article-card.module.css';
import prisma from "@/server/prisma";

export default async function ArticlesCardsGrid() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
  });

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 0, sm: 'md' }}>
        {posts.map((article) => (
          <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card}>
            <AspectRatio ratio={1920 / 1080}>
              <Image src={article.imageUrl} radius="md" />
            </AspectRatio>
            <Text className={classes.date}>{article.publishedAt?.toLocaleDateString() ?? "No date"}</Text>
            <Text className={classes.title}>{article.title}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}