import { Card, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

export type Feature = {
  readonly emoji: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
};

export function FeatureCard({ emoji, title, description, href }: Feature) {
  return (
    <Card withBorder radius="lg" p="lg">
      <Stack gap="xs">
        <div className="text-2xl" aria-hidden>
          {emoji}
        </div>
        <Title order={3}>
          <Link href={href} className="no-underline hover:underline">
            {title}
          </Link>
        </Title>
        <Text c="dimmed" size="sm">
          {description}
        </Text>
      </Stack>
    </Card>
  );
}