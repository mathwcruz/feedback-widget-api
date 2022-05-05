import nodemailer from "nodemailer";

import { MailAdapter, SendMailData } from "../adapters/mailadaptar";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b953263f9669cf",
    pass: "5f8d33b3defcee",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Feedget team <hello@feedget.com>",
      to: "Matheus da Cruz <matheus@gmail.com>",
      subject,
      html: body,
    });
  }
}
