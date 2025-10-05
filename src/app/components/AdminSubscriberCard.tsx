"use client";

import { Card, Group, Stack, Text, Badge, Button } from "@mantine/core";
import Link from "next/link";

type SubscriberCardProps = {
  readonly subscriber: {
    id: string;
    email: string;
    name: string | null;
    confirmedAt: Date | null;
    createdAt: Date;
  };
};

export function AdminSubscriberCard({ subscriber }: SubscriberCardProps) {
  const isConfirmed = Boolean(subscriber.confirmedAt);

  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" align="start">
        <Stack gap={2}>
          <Group gap="xs">
            <Text fw={600}>{subscriber.email}</Text>
            <Badge variant={isConfirmed ? "light" : "outline"} color={isConfirmed ? "green" : "gray"}>
              {isConfirmed ? "Confirmed" : "Unconfirmed"}
            </Badge>
          </Group>
          {subscriber.name && (
            <Text c="dimmed" size="sm">
              {subscriber.name}
            </Text>
          )}
          <Text c="dimmed" size="xs">
            Joined {new Date(subscriber.createdAt).toLocaleString()}
          </Text>
        </Stack>

        <Group gap="xs">
          <Button
            variant="default"
            size="xs"
            onClick={() => window.alert("Coming Soon!")}
          >
            View
          </Button>
          <Button
            size="xs"
            onClick={() => window.alert("Coming Soon!")}
          >
            Edit
          </Button>
        </Group>
      </Group>
    </Card>
  );
}

type NoProps = {
  readonly filter: string;
  readonly status: "all" | "confirmed" | "unconfirmed";
};

export function NoSubscribersCard({ filter, status }: NoProps) {
  const hasFilter = filter || status !== "all";
  return (
    <Card withBorder radius="md" p="lg">
      <Stack gap="xs">
        <Text fw={600}>No subscribers</Text>
        {hasFilter ? (
          <Text c="dimmed" size="sm">
            Try adjusting your filters or{" "}
            <Text
              component={Link}
              href="/admin/subscribers"
              inherit
              td="underline"
            >
              reset them
            </Text>
            .
          </Text>
        ) : (
          <Text c="dimmed" size="sm">
            Get started by{" "}
            <Text
              component={Link}
              href="/admin/subscribers/new"
              inherit
              td="underline"
            >
              adding a subscriber
            </Text>
            .
          </Text>
        )}
      </Stack>
    </Card>
  );
}
