import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { Button, Group, Text } from "@mantine/core";
import Link from "next/link";

export type Pagination = {
  readonly page: number;
  readonly totalPages: number;
};

export function Pagination({ page, totalPages }: Pagination) {
  return (
    <>
      {totalPages > 1 && (
        <Group justify="space-between" mt="lg">
          <Button
            component={Link}
            href={`/posts?page=${page - 1}`}
            variant="default"
            disabled={page <= 1}
          >
            <FaLongArrowAltLeft /> Prev
          </Button>

          <Text c="dimmed" size="sm">
            Page {page} of {totalPages}
          </Text>

          <Button
            component={Link}
            href={`/posts?page=${page + 1}`}
            variant="default"
            disabled={page >= totalPages}
          >
            Next <FaLongArrowAltRight />
          </Button>
        </Group>
      )}
    </>
  );
}