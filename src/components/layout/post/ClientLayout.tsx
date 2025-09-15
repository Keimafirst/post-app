'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostFormCard from "@/components/post/PostFormCard"
import PostListClient from "@/components/post/PostListClient"
import { useState } from "react"

export default function ClientLayout() {
    // QueryClientのインスタンスを一度だけ生成（再レンダリング時に再生成されないようuseStateを使用）
    const [queryClient] = useState(() => new QueryClient());
    return (
        <div className="flex flex-row items-center justify-start min-h-screen bg-blue-200 pt-12">
            <QueryClientProvider client={queryClient} >
                {/* 入力エリアの表示 */}
                <PostFormCard />
                {/* 投稿一覧の表示 */}
                <PostListClient />
            </QueryClientProvider>
        </div >
    )
}