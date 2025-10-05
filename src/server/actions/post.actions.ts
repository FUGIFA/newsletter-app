"use server";

import { PostHelper, PostScheduler } from "@/server/post";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getStr } from "@/server/utils";
import prisma from "@/server/prisma";

export async function createPost(formData: FormData) {
  const data = PostHelper.initFromFormData(formData);

  const post = await prisma.post.create({ data });

  await PostScheduler.schedule(post.id, data.publishAt ?? null);

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePost(formData: FormData) {
  const id = getStr(formData, "id");
  if (!id) throw new Error("Post ID is required");

  const existing = await prisma.post.findUnique({
    where: { id },
    select: { id: true, published: true, publishedAt: true },
  });
  if (!existing) throw new Error("Post not found");

  const data = PostHelper.initFromFormData(formData);

  await prisma.post.update({
    where: { id },
    data,
  });

  await PostScheduler.schedule(id, data.publishAt ?? null);

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!post) throw new Error("Post not found");

  await prisma.post.delete({ where: { id } });

  PostScheduler.cancel(id);

  revalidatePath("/admin/posts");
}
