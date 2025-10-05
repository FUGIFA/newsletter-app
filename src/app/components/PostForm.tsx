"use client";

import { updatePost, createPost } from "@/actions/post.actions";
import { DateTimePicker } from "@mantine/dates";
import { toDateOrNull } from "@/server/utils";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  NativeSelect,
  TextInput,
  Textarea,
  Divider,
  Button,
  Group,
  Stack,
  Box,
} from "@mantine/core";

export type Option = { value: string; label: string };

const imageUrlOptions: Option[] = [
  { value: "https://picsum.photos/seed/forest/1200/630", label: "Forest" },
  { value: "https://picsum.photos/seed/mountains/1200/630", label: "Mountains" },
  { value: "https://picsum.photos/seed/city/1200/630", label: "City" },
  { value: "https://picsum.photos/seed/beach/1200/630", label: "Beach" },
  { value: "https://picsum.photos/seed/space/1200/630", label: "Space" },
  { value: "https://picsum.photos/seed/flowers/1200/630", label: "Flowers" },
  { value: "https://picsum.photos/seed/abstract/1200/630", label: "Abstract" },
  { value: "https://picsum.photos/seed/night/1200/630", label: "Night" },
  { value: "https://picsum.photos/seed/animals/1200/630", label: "Animals" },
];

export type PostFormValues = {
  id?: string;
  title?: string;
  authorId?: string;
  excerpt?: string;
  content?: string;
  imageUrl?: string;
  publishAt?: Date | string | null;
};

type Props = {
  readonly authorOptions: Option[];
  readonly initialValues?: PostFormValues;
  readonly isEdit?: boolean;
};

export function PostForm({
  authorOptions,
  initialValues,
  isEdit = false,
}: Props) {
  const initialPublishAt = useMemo(() => {
    return toDateOrNull(initialValues?.publishAt ?? null)
  }, [initialValues?.publishAt]);

  const [publishAt, setPublishAt] = useState<Date | null>(initialPublishAt);
  const computedMinDate = initialPublishAt ? undefined : new Date();

  return (
    <form action={isEdit ? updatePost : createPost}>
      <Stack gap="md">
        {initialValues?.id ? (
          <input type="hidden" name="id" value={initialValues.id} />
        ) : null}

        <TextInput
          name="title"
          label="Title"
          placeholder="Amazing post title"
          required
          maw={640}
          defaultValue={initialValues?.title ?? ""}
        />

        <NativeSelect
          name="authorId"
          label="Author"
          data={authorOptions}
          required
          maw={360}
          defaultValue={initialValues?.authorId ?? ""}
        />

        <Textarea
          name="excerpt"
          label="Excerpt"
          description="Short summary shown in lists and previews."
          placeholder="Optional short blurb…"
          autosize
          minRows={2}
          maxLength={280}
          defaultValue={initialValues?.excerpt ?? ""}
        />

        <Textarea
          name="content"
          label="Content"
          placeholder="Write your post content here…"
          autosize
          minRows={8}
          defaultValue={initialValues?.content ?? ""}
        />

        <NativeSelect
          name="imageUrl"
          label="Image URL"
          data={imageUrlOptions}
          required
          maw={640}
          defaultValue={initialValues?.imageUrl ?? ""}
        />

        <Box>
          <DateTimePicker
            label="Schedule publish at (optional)"
            placeholder="Pick date & time"
            value={publishAt}
            minDate={computedMinDate}
            onChange={(value) => setPublishAt(value ? new Date(value) : null)}
            popoverProps={{ withinPortal: true }}
            clearable
          />
          {/* Submit ISO string via hidden input so the server action can read it reliably */}
          <input
            type="hidden"
            name="publishAt"
            value={publishAt ? publishAt.toISOString() : ""}
          />
        </Box>

        <Divider />

        <Group justify="space-between">
          <Button component={Link} href="/admin/posts" variant="subtle">
            Cancel
          </Button>

          <Group>
            <Button type="submit" variant="default">
              {!isEdit ? "Save draft" : "Save"}
            </Button>
          </Group>
        </Group>
      </Stack>
    </form>
  );
}
