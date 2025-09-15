import z from "zod";

// 投稿データのバリデーションスキーマを定義
export const postSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(1, "必須項目です")
    .max(30, "30文字以内で入力してください"),
  body: z
    .string()
    .min(1, "必須項目です")
    .max(150, "150文字以内で入力してください"),
});

export type PostFormData = z.infer<typeof postSchema>;
