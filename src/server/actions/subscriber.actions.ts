"use server";

import EmailService from "@/server/email-service";
import { redirect } from "next/navigation";
import { getStr } from "@/server/utils";
import prisma from "@/server/prisma";

export async function createSubscriber(formData: FormData) {
  const email = getStr(formData, "email") ?? "";
  const name = getStr(formData, "name") ?? "";

  await prisma.subscriber.create({ data: { email, name } });

  await new EmailService().send(email, "Welcome");

  redirect("/posts");
}
