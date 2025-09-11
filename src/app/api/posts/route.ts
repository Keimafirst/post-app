import { prisma } from "@/lib/prisma";
import { Post } from "@/types/Post";
import { NextResponse } from "next/server";

/**
 * 投稿テーブルを全検索します。
 * @returns 全投稿データのJSONレスポンス
 */
export async function GET() {
  const posts: Post[] = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(posts);
}

/**
 * 投稿テーブルに登録します。
 * @param req 投稿テーブルデータ
 * @returns 登録された投稿データのJSONレスポンス
 */
export async function POST(req: Request) {
  const body = await req.json();
  const post: Post = await prisma.post.create({ data: body });
  return NextResponse.json(post);
}
