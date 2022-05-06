import { MailAdapter } from "../adapters/mailadaptar";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: "BUG" | "IDEA" | "OTHER";
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Attribute type is required");
    }

    if (["BUG", "IDEA", "OTHER"].indexOf(type) === -1) {
      throw new Error(
        "Attribute type is invalid. It must be one of: BUG, IDEA, OTHER"
      );
    }

    if (!comment) {
      throw new Error("Attribute comment is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format");
    }

    await this.feedbacksRepository.create({ type, comment, screenshot });

    await this.mailAdapter.sendMail({
      subject: "New Feedback received",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Feedback type: ${type}</p>`,
        `<p>Comment: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : ``,
        "</div>",
      ].join("\n"),
    });
  }
}
