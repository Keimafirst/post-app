'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import BodyInput from "../form/BodyInput"
import { TitleInput } from "../form/TitleInput"
import { Button } from "../ui/button"
import { CardFooter } from "../ui/card"
import { useForm } from "react-hook-form"
import { PostFormData, postSchema } from "@/lib/validation/postSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { insertPost } from "@/lib/api/post"

// 投稿データをAPIに送信する非同期関数（insertPostは外部API呼び出し）
const psotArticle = async (data: PostFormData) => {
    const res = await insertPost(data)
    return res.data
}

export default function PostFormClient() {
    // フォーム管理初期化
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PostFormData>({ resolver: zodResolver(postSchema) });
    const queryClient = useQueryClient();
    // 投稿処理のMutation設定：成功時に投稿一覧キャッシュを無効化して再取得
    const { mutate, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: psotArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            reset();
        }
    })
    // フォーム送信時の処理：バリデーション済みデータをmutate関数に渡す
    const onSubmit = async (data: PostFormData) => {
        console.log("登録データ:", data)
        mutate(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
                <TitleInput register={register} error={errors?.title} outLineStyle="flex flex-col w-full gap-1" />
                <BodyInput register={register} error={errors?.body} outLineStyle="items-center gap-2" />
            </div>

            <CardFooter className="flex flex-col justify-center mt-6">
                <Button type="submit" className="w-[200]">
                    {isPending ? 'POSTING...' : 'POST'}
                </Button>
                {isError && <span className="text-red-500">エラー: {error?.message}</span>}
                {isSuccess && <span className="text-green-500">投稿に成功しました！</span>}
            </CardFooter>
        </form>
    )
}