/**
 * 投稿モデル
 */
export interface Post {
  /** 投稿ID（主キー） */
  id: number;

  /** タイトル */
  title: string;

  /** 本文 */
  body: string;

  /** 作成日時 */
  createdAt: Date;

  /** 更新日時 */
  updatedAt: Date;
}
