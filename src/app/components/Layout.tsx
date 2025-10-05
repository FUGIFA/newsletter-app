"use client";

import { FaGithub, FaHome } from "react-icons/fa";
import React, { ReactNode } from "react";
import {
  ActionIcon,
  AppShell,
  Tooltip,
  Group,
  Title,
  Paper,
  Box,
} from "@mantine/core";

interface LayoutProps {
  readonly children: ReactNode;
  readonly title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <AppShell
      header={{ height: 64 }}
      padding="md"
      className="bg-[var(--mantine-color-body)]"
    >
      <AppShell.Header className="border-0 shadow-sm bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:bg-[rgb(22_22_26_/_0.5)]">
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <ActionIcon
              variant="subtle"
              component="a"
              href="/"
              aria-label="Home"
              size="lg"
            >
              <FaHome size={18} />
            </ActionIcon>
            <Title order={4} className="tracking-tight">
              {title}
            </Title>
          </Group>
          <Group gap="xs">
            <Tooltip label="Project repo" withArrow>
              <ActionIcon variant="subtle" component="a" href="https://github.com/FUGIFA" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Box className="mx-auto w-full max-w-4xl">
          <Paper withBorder radius="lg" p="lg" className="shadow-sm bg-white dark:bg-[var(--mantine-color-dark-7)]">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {children}
            </div>
          </Paper>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
