import { SubscriberForm } from "@/components/SubscriberForm";
import { Container, Title, Text } from "@mantine/core";

export type SubscribeResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

export default function SubscribePage() {
  return (
    <Container size="sm" py="xl">
      <Title order={1} mb="xs">
        Subscribe Now!
      </Title>
      <Text c="dimmed" mb="lg">
        Join the list and get new posts as soon as they're published.
      </Text>
      <SubscriberForm />
    </Container>
  );
}