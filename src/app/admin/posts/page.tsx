import { AdminPostCard, NoPostsCard } from "@/components/AdminPostCard";
import { Prisma } from "@/generated/prisma";
import prisma from "@/server/prisma";
import Link from "next/link";
import {
  TextInput,
  Container,
  Divider,
  Select,
  Button,
  Title,
  Group,
  Stack,
  Text,
} from "@mantine/core";

type SearchParams = {
  readonly filter?: string;
  readonly status?: "all" | "published" | "draft";
  readonly page?: string;
};

export default async function Posts({
  searchParams,
}: {
  readonly searchParams?: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const filter = typeof params?.filter === "string" ? params.filter : "";
  const status = params?.status || "all";

  const where: Prisma.PostWhereInput = {};
  if (status !== "all") where.published = status === "published";
  if (filter) {
    where.OR = [
      { title: { contains: filter, mode: "insensitive" } },
      { content: { contains: filter, mode: "insensitive" } },
    ];
  }

  const [total, posts] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where,
      orderBy: { id: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        authorId: true,
      },
    }),
  ]);

  return (
    <Container size="lg" py="lg">
      <Group justify="space-between" align="flex-end" mb="md">
        <Stack gap={2}>
          <Title order={1}>Posts</Title>
          <Text c="dimmed" size="sm">
            {total === 0 ? "No posts found" : `Total posts: ${total}`}
          </Text>
        </Stack>

        <form action="/admin/posts" method="get">
          <Group wrap="nowrap" gap="sm" align="flex-end">
            <TextInput
              label="Search"
              placeholder="Search title or content…"
              name="filter"
              defaultValue={filter}
              maw={260}
            />
            <Select
              label="Status"
              name="status"
              defaultValue={status}
              data={[
                { value: "all", label: "All" },
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
              ]}
              maw={160}
            />
            <Button type="submit" variant="default">
              Apply
            </Button>
            {(filter || status !== "all") && (
              <Button
                component={Link}
                href="/posts"
                variant="subtle"
              >
                Reset
              </Button>
            )}
            <Button component={Link} href="/admin/posts/new" variant="default">
              Create a post
            </Button>
          </Group>
        </form>
      </Group>

      <Divider mb="lg" />

      {posts.length === 0 ? (
        <NoPostsCard filter={filter} status={status} />
      ) : (
        <Stack gap="md">
          {posts.map((post) => (
            <AdminPostCard key={post.id} post={post} />
          ))}
        </Stack>
      )}
    </Container>
  );
}
