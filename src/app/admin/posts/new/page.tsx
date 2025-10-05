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

export default async function NewPostPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, email: true },
  });

  const authorOptions = users.map((u) => ({
    value: u.id,
    label: u.name ? `${u.name} — ${u.email}` : u.email,
  }));

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
        <PostForm authorOptions={authorOptions} />
      )}
    </Container>
  );
}
