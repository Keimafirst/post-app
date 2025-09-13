'use client'

import PostFormCard from "@/components/post/PostFormCard"
import PostListClient from "@/components/post/PostListClient"

export default function ClientLayout() {
    return (
        <div className="flex flex-row items-center justify-start min-h-screen bg-blue-200 pt-12">
            <PostFormCard />
            <PostListClient />
        </div >
    )
}