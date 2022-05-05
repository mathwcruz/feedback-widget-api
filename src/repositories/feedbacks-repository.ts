export interface FeedbackCreateData {
  type: "BUG" | "IDEA" | "OTHER";
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}
