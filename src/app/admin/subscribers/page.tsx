import { AdminSubscriberCard, NoSubscribersCard } from "@/components/AdminSubscriberCard";
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
  readonly status?: "all" | "confirmed" | "unconfirmed";
  readonly page?: string;
};

export default async function SubscribersPage({
  searchParams,
}: {
  readonly searchParams?: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const filter = typeof params?.filter === "string" ? params.filter : "";
  const status = params?.status || "all";

  const where: Prisma.SubscriberWhereInput = {};

  if (status === "confirmed") where.NOT = { confirmedAt: null };
  if (status === "unconfirmed") where.confirmedAt = null;

  if (filter) {
    where.OR = [
      { email: { contains: filter, mode: "insensitive" } },
      { name: { contains: filter, mode: "insensitive" } },
    ];
  }

  const [total, subscribers] = await Promise.all([
    prisma.subscriber.count({ where }),
    prisma.subscriber.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        confirmedAt: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <Container size="lg" py="lg">
      <Group justify="space-between" align="flex-end" mb="md">
        <Stack gap={2}>
          <Title order={1}>Subscribers</Title>
          <Text c="dimmed" size="sm">
            {total === 0 ? "No subscribers found" : `Total subscribers: ${total}`}
          </Text>
        </Stack>

        <form action="/admin/subscribers" method="get">
          <Group wrap="nowrap" gap="sm" align="flex-end">
            <TextInput
              label="Search"
              placeholder="Search email or name…"
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
                { value: "confirmed", label: "Confirmed" },
                { value: "unconfirmed", label: "Unconfirmed" },
              ]}
              maw={180}
            />
            <Button type="submit" variant="default">
              Apply
            </Button>
            {(filter || status !== "all") && (
              <Button component={Link} href="/admin/subscribers" variant="subtle">
                Reset
              </Button>
            )}
          </Group>
        </form>
      </Group>

      <Divider mb="lg" />

      {subscribers.length === 0 ? (
        <NoSubscribersCard filter={filter} status={status} />
      ) : (
        <Stack gap="md">
          {subscribers.map((s) => (
            <AdminSubscriberCard key={s.id} subscriber={s} />
          ))}
        </Stack>
      )}
    </Container>
  );
}
