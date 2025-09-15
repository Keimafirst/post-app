import { PostFormData } from "../validation/postSchema";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

/**
 * POSTテーブルを更新します。
 * @param data フォーム内の更新データ
 * @returns 更新後のPostデータをJSON形式で返します
 */
export async function updatePost(data: PostFormData) {
  const response = await fetch(`${BASE_URL}/api/posts/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log("レスポンスステータス：", response.status);
    throw new Error("データ更新に失敗しました");
  }
  return response.json();
}

/**
 * POSTテーブルを全件取得します。
 * @returns 取得結果のPostデータをJSON形式で返します
 */
export async function getPosts() {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    console.log("レスポンスステータス:", res.status);
    throw new Error("データ取得に失敗しました");
  }
  return res.json();
}

/**
 * POSTテーブルを登録します。
 * @param data 登録データ
 */
export async function insertPost(data: PostFormData) {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    body: JSON.stringify(data),
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    console.log("レスポンスステータス:", res.status);
    throw new Error("データ登録に失敗しました");
  }
  return res.json();
}

/**
 * POSTテーブルからデータを削除します。
 * @param id 削除対象のid
 * @returns
 */
export async function deletePost(id: number) {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
  if (!res.ok) {
    console.log("レスポンスステータス:", res.status);
    throw new Error("データ削除に失敗しました");
  }
  return res.json();
}
