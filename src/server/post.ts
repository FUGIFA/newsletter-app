import { getBool, getDate, getStr, toDateOrNull } from "./utils";
import EmailService from "@/server/email-service";
import schedule from "node-schedule";
import prisma from "@/server/prisma";

export class PostHelper {
  static initFromFormData(formData: FormData) {
    const title = getStr(formData, "title") ?? "";
    const content = getStr(formData, "content");
    const excerpt = getStr(formData, "excerpt");
    const imageUrl = getStr(formData, "imageUrl");
    const authorId = getStr(formData, "authorId") ?? "";
    const published = getBool(formData, "published");
    const publishAt = getDate(formData, "publishAt");
    const publishedAt = getDate(formData, "publishedAt");

    return {
      title,
      content,
      excerpt,
      imageUrl,
      authorId,
      published,
      publishAt,
      publishedAt,
    };
  }
}

export class PostScheduler {
  public static async schedule(
    postId: string,
    publishAt: Date | string | null
  ) {
    this.cancel(postId);

    const schedulerDate = toDateOrNull(publishAt);

    const shouldRemove = await this.handleRemove(schedulerDate, postId);
    if (shouldRemove) {
      return;
    }

    await this.handleUpsert(postId, schedulerDate);
    // We Know it's not null here due to the handleRemove check
    await this.handleScheduling(postId, schedulerDate as Date);
  }

  public static cancel(postId: string) {
    const existing = schedule.scheduledJobs[postId];
    if (existing) {
      existing.cancel();
    }
  }

  public static async restoreScheduledJobs() {
    const now = new Date();

    const jobs = await prisma.scheduledJob.findMany({
      where: { status: "scheduled" },
    });

    for (const job of jobs) {
      if (job.runAt <= now) {
        // If the job is already past, run it immediately
        schedule.scheduleJob(
          job.postId,
          new Date(now.getTime() + 1000),
          async () => {
            await prisma.post.update({
              where: { id: job.postId },
              data: { published: true, publishedAt: new Date() },
            });
            await prisma.scheduledJob.update({
              where: { postId: job.postId },
              data: { status: "executed", executedAt: new Date() },
            });
          }
        );
        continue;
      }

      schedule.scheduleJob(job.postId, job.runAt, async () => {
        await prisma.post.update({
          where: { id: job.postId },
          data: { published: true, publishedAt: new Date() },
        });
        await prisma.scheduledJob.update({
          where: { postId: job.postId },
          data: { status: "executed", executedAt: new Date() },
        });
      });
    }
  }

  private static async handleRemove(
    schedulerDate: Date | null,
    postId: string
  ) {
    try {
      if (!schedulerDate) {
        await prisma.scheduledJob.update({
          where: { postId },
          data: { status: "cancelled" },
        });
        await prisma.scheduledJob.delete({ where: { postId } });
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  private static async handleUpsert(
    postId: string,
    schedulerDate: Date | null
  ) {
    try {
      await prisma.scheduledJob.upsert({
        where: { postId },
        update: {
          runAt: schedulerDate as Date,
          status: "scheduled",
          executedAt: null,
        },
        create: {
          postId,
          runAt: schedulerDate as Date,
          status: "scheduled",
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  private static async handleScheduling(postId: string, schedulerDate: Date) {
    schedule.scheduleJob(postId, schedulerDate, async () => {
      try {
        await prisma.post.update({
          where: { id: postId },
          data: { published: true, publishedAt: new Date() },
        });

        await prisma.scheduledJob.update({
          where: { postId },
          data: { status: "executed", executedAt: new Date() },
        });
        await this.handleEmailing();
      } catch (err) {
        await prisma.scheduledJob.update({
          where: { postId },
          data: { status: "failed" },
        });
        throw err;
      }
    });
  }

  private static async handleEmailing() {
    const subscribers = await prisma.subscriber.findMany();
    const emailService = new EmailService();
    for (const subscriber of subscribers) {
      await emailService.send(subscriber.email, "NewPost");
    }
  }
}
