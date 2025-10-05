"use client";

import { createSubscriber } from "@/actions/subscriber.actions";
import Link from "next/link";
import {
  TextInput,
  Divider,
  Button,
  Group,
  Stack,
} from "@mantine/core";


export type SubscriberFormValues = {
  email?: string;
  name?: string;
};

type Props = {
  readonly initialValues?: SubscriberFormValues;
};

export function SubscriberForm({ initialValues }: Props) {
  return (
    <form action={createSubscriber}>
      <Stack gap="md">
        <TextInput
          name="email"
          label="Email"
          placeholder="Email"
          required
          maw={640}
          defaultValue={initialValues?.email ?? ""}
        />

        <TextInput
          name="name"
          label="Name"
          placeholder="Name"
          maw={640}
          defaultValue={initialValues?.name ?? ""}
        />

        <Divider />

        <Group justify="space-between">
          <Button component={Link} href="/" variant="subtle">
            Cancel
          </Button>

          <Group>
            <Button type="submit" variant="default">
              Subscribe
            </Button>
          </Group>
        </Group>
      </Stack>
    </form>
  );
}
