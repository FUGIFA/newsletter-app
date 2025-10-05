import { NextRequest } from "next/server";
import prisma from "@/server/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        title: true,
        content: true,
        excerpt: true,
        imageUrl: true,
        published: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      return Response.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return Response.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return Response.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
