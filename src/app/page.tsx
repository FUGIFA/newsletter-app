import { ColorSchemeToggle } from "@/app/components/ColorSchemeToggle";
import { Feature, FeatureCard } from "@/components/FeatureCard";
import classes from "@/styles/title.module.css";
import Link from "next/link";
import {
  SimpleGrid,
  Container,
  Divider,
  Button,
  Group,
  Stack,
  Title,
  Text,
} from "@mantine/core";

const FEATURES: Feature[] = [
  {
    emoji: "✍️",
    title: "Author posts",
    description: "Create and edit newsletter posts with a clean editor.",
    href: "/info/authoring",
  },
  {
    emoji: "📖",
    title: "Read-only view",
    description: "Browse published posts in a public-friendly layout.",
    href: "/info/reading",
  },
  {
    emoji: "📬",
    title: "Subscribe",
    description: "Let readers opt in to your mailing list.",
    href: "/info/subscribing",
  },
  {
    emoji: "⏰",
    title: "Schedule",
    description: "Pick a future time to publish automatically.",
    href: "/info/scheduling",
  },
  {
    emoji: "📧",
    title: "Email on publish",
    description: "Notify subscribers when a post goes live.",
    href: "/info/emailing",
  },
  {
    emoji: "📄",
    title: "ReadMe",
    description: "ReadMe page for the project.",
    href: "/info/readme",
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* subtle background flourish via Tailwind */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[rgba(255,192,203,0.08)] to-[rgba(255,255,0,0.06)]"
      />
      <Container size="lg" py={64}>
        {/* HERO */}
        <Stack gap="sm" align="center" mt={32} mb={24}>
          <Title className={classes.title} ta="center" mt={40}>
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: "pink", to: "yellow" }}
            >
              Newsletter App
            </Text>
          </Title>
          <Title className={classes.title} ta="center" mt={10}>
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: "pink", to: "yellow" }}
            >
              Timothy van Rooyen
            </Text>
          </Title>
          <Text c="dimmed" size="lg" ta="center" maw={720}>
            A minimal full-stack newsletter app built with Next.js, Prisma,
            Mantine, and Tailwind. Author posts, schedule releases, and notify
            subscribers.
          </Text>

          <Group mt="md">
            <Button
              size="md"
              radius="xl"
              component={Link}
              href="/posts"
              aria-label="View published posts"
            >
              View  posts
            </Button>
            <Button
              size="md"
              radius="xl"
              component={Link}
              href="/subscribe"
              aria-label="Subscribe to the newsletter"
            >
              Subscribe
            </Button>
            <Button
              variant="outline"
              size="md"
              radius="xl"
              component={Link}
              href="/admin/posts"
              aria-label="Manage posts"
            >
              Manage posts
            </Button>
            <Button
              variant="outline"
              size="md"
              radius="xl"
              component={Link}
              href="/admin/subscribers"
              aria-label="View subscribers"
            >
              View Subscribers
            </Button>
          </Group>

          <ColorSchemeToggle />
        </Stack>

        <Divider my="lg" />

        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing="lg"
          mt="lg"
          mb={40}
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}
