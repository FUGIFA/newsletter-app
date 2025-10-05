import * as sgMail from "@sendgrid/mail";

type EmailType = "Welcome" | "NewPost";

export default class EmailService {
  private readonly fromEmail: string;
  private readonly appName: string;
  private readonly siteUrl: string;

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
    this.fromEmail = process.env.FROM_EMAIL || "";
    this.appName = process.env.APP_NAME || "Newsletter Demo";
    this.siteUrl = process.env.SITE_URL || "#";
  }

  async send(to: string, type: EmailType) {
    const { subject, text, html } = this.getContent(type);

    try {
      const msg = {
        to,
        from: this.fromEmail,
        subject,
        text,
        html,
        categories: [type],
      };

      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Some lovely GPT generated content
  private getContent(type: EmailType) {
    switch (type) {
      case "Welcome": {
        const subject = `Welcome to ${this.appName}! 🎉`;
        const preHeader = `Thanks for subscribing to ${this.appName}.`;
        const text =
          `Hi there,\n\n` +
          `Thanks for subscribing to ${this.appName}! You'll get an email whenever we publish something new.\n\n` +
          `You can visit us anytime at ${this.siteUrl}.\n\n` +
          `— The ${this.appName} team`;
        const html = this.baseHtml({
          heading: `Welcome to ${this.appName}!`,
          body: `Thanks for subscribing. You'll get an email whenever we publish something new.`,
          ctaLabel: "Visit the site",
          ctaHref: this.siteUrl,
          preHeader,
        });
        return { subject, text, html };
      }

      case "NewPost": {
        const subject = `New post just dropped on ${this.appName}`;
        const preHeader = `We just published something new—check it out.`;
        const text =
          `Hi there,\n\n` +
          `Good news: there's a new post on ${this.appName}.\n\n` +
          `Read the latest here: ${this.siteUrl}\n\n` +
          `— The ${this.appName} team`;
        const html = this.baseHtml({
          heading: `New post is live`,
          body: `We just published something new. Tap below to read the latest.`,
          ctaLabel: "Read the latest",
          ctaHref: this.siteUrl,
          preHeader,
        });
        return { subject, text, html };
      }
    }
  }

  // Some lovely GPT generated HTML
  private baseHtml(opts: {
    heading: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    preHeader?: string;
  }) {
    const { heading, body, ctaLabel, ctaHref, preHeader = "" } = opts;

    return `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${this.escape(heading)}</title>
    <style>
      /* basic dark mode friendliness */
      @media (prefers-color-scheme: dark) {
        body { background:#0b0b0b !important; color:#eaeaea !important; }
        .card { background:#141414 !important; border-color:#2a2a2a !important; }
        .btn { background:#2563eb !important; color:#ffffff !important; }
      }
      a { text-decoration:none; }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#f6f7f9;">
    <!-- preHeader (hidden in most clients) -->
    <div style="display:none;opacity:0;visibility:hidden;height:0;width:0;overflow:hidden;mso-hide:all;">
      ${this.escape(preHeader)}
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" style="padding:24px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;">
            <tr>
              <td class="card" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:28px;">
                <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;font-weight:700;">
                  ${this.escape(heading)}
                </h1>
                <p style="margin:0 0 20px;font-size:16px;line-height:1.6;">
                  ${this.escape(body)}
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td>
                      <a class="btn" href="${ctaHref}"
                        style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 18px;border-radius:8px;font-weight:600;">
                        ${this.escape(ctaLabel)}
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:24px 0 0;color:#6b7280;font-size:12px;line-height:1.5;">
                  You're receiving this because you subscribed to ${this.escape(
                    this.appName
                  )}.
                  <br/>If this wasn't you, you can safely ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:16px 6px;color:#9ca3af;font-size:12px;">
                &copy; ${new Date().getFullYear()} ${this.escape(this.appName)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
  }

  private escape(str: string) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}
