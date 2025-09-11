import { prisma } from "@/lib/prisma";
import { Post } from "@/types/Post";
import { NextResponse } from "next/server";
type Params = {
  params: Promise<{ id: string }>;
};
/**
 * 投稿テーブルを主キーで検索します。
 * @param _req
 * @param param1 id(PKEY)
 * @returns 投稿データのJSONレスポンス
 */
export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  try {
    const post: Post | null = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      return NextResponse.json({ error: "Posts not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

/**
 * 投稿テーブルを主キーで削除します。
 * @param _req
 * @param param1 id(PKEY)
 * @returns 成功・失敗のJSONレスポンス
 */
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.post.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Delete Success" }, { status: 200 });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

/**
 * 投稿テーブルを主キーで更新します。
 * @param req 更新データ
 * @param param1 更新キー
 * @returns 成功・失敗のJSONレスポンス
 */
export async function PATCH(req: Request, { params }: Params) {
  const body = await req.json();
  const { id } = await params;
  try {
    await prisma.post.update({
      where: { id: Number(id) },
      data: { title: body.title, body: body.body },
    });
    return NextResponse.json({ message: "SUCCESS UPDAET" }, { status: 200 });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
