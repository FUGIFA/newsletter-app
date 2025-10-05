import Link from "next/link";
import {
  Anchor,
  Button,
  Title,
  Badge,
  Group,
  Stack,
  Card,
  Text,
} from "@mantine/core";

export type AdminPostCard = {
  readonly post: {
    published: boolean;
    content: string | null;
    title: string;
    id: string;
    authorId: string;
  };
};

export function AdminPostCard({ post }: AdminPostCard) {
  return (
    <Card key={post.id} withBorder radius="lg" p="lg">
      <Group justify="space-between" align="flex-start">
        <Stack gap={4}>
          <Title order={3}>
            <Anchor component={Link} href={`/posts/${post.id}`} underline="hover">
              {post.title || "Untitled"}
            </Anchor>
          </Title>
          <Text size="sm" c="dimmed" lineClamp={3}>
            {post.content && post.content.trim().length > 0 ? post.content : "No content"}
          </Text>
        </Stack>

        <Badge
          variant="light"
          color={post.published ? "green" : "yellow"}
          radius="sm"
        >
          {post.published ? "Published" : "Draft"}
        </Badge>
      </Group>

      <Group justify="space-between" mt="md">
        <Text size="xs" c="dimmed">
          <Text span fw={500}>Author:</Text>{" "}
          {post.authorId ?? "—"}
        </Text>

        <Button
          component={Link}
          href={`/admin/posts/${post.id}`}
          variant="subtle"
          size="compact-sm"
        >
          Edit
        </Button>
      </Group>
    </Card>
  );
}

export type NoPostsCard = {
  readonly filter?: string;
  readonly status?: "all" | "published" | "draft";
};

export function NoPostsCard({ filter, status }: NoPostsCard) {
  return (
    <Card withBorder radius="lg" p="xl">
      <Stack align="center" gap="xs">
        <Text size="lg">No posts match your filters.</Text>
        <Text c="dimmed" size="sm">
          Try clearing the search or create a new post.
        </Text>
        <Group mt="xs">
          <Button component={Link} href="/posts/new">
            Create a post
          </Button>
          {(filter || status !== "all") && (
            <Button component={Link} href="/posts" variant="default">
              Clear filters
            </Button>
          )}
        </Group>
      </Stack>
    </Card>
  );
}