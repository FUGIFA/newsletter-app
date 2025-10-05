import { PostForm } from "@/app/components/PostForm";
import { IoAlertCircleSharp } from "react-icons/io5";
import prisma from "@/server/prisma";
import {
  Container,
  Divider,
  Title,
  Stack,
  Alert,
  Text,
} from "@mantine/core";

export default async function PostPage({ params }: { params: { id: string } }) {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, email: true },
  });

  const authorOptions = users.map((u) => ({
    value: u.id,
    label: u.name ? `${u.name} — ${u.email}` : u.email,
  }));

  const id = await params.id;
  const post = await prisma.post.findUnique({
    where: { id },
    select: { id: true, title: true, content: true, excerpt: true, imageUrl: true, authorId: true, publishAt: true, published: true, publishedAt: true },
  });

  return (
    <Container size="lg" py="lg">
      <Stack gap="xs" mb="md">
        <Title order={1}>Create post</Title>
        <Text c="dimmed" size="sm">Fill in the details and publish now or save as draft.</Text>
      </Stack>

      <Divider mb="lg" />

      {authorOptions.length === 0 ? (
        <Alert icon={<IoAlertCircleSharp size={16} />} color="yellow" title="No users found" variant="light">
          You need at least one <code>User</code> in the database to assign as the author.
        </Alert>
      ) : (
        <PostForm
          authorOptions={authorOptions}
          isEdit={true}
          initialValues={{
            id: post?.id,
            title: post?.title,
            authorId: post?.authorId,
            excerpt: post?.excerpt ?? "",
            content: post?.content ?? "",
            imageUrl: post?.imageUrl ?? "",
            publishAt: post?.publishAt,
          }}
        />
      )}
    </Container>
  );
}
