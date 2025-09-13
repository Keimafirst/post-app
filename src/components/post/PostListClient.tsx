'use client'

import dayjs from "dayjs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect, useState } from "react"
import { EditDialog } from "./EditDialog"
import { MyAlertDialog } from "../common/MyAlertDialog"
import { Post } from "@/types/Post"

export default function PostListClient() {
    const [posts, setPosts] = useState<Post[]>([])
    const [openDialogId, setOpenDialogId] = useState<number | null>(null)
    // 削除ダイアログに渡す処理 TODO
    const handleDel = (id: number) => {
    }

    // 表データ取得
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const baseurl = process.env.NEXT_PUBLIC_API_BASE
                const res = await fetch(`${baseurl}/api/posts`, {
                    method: "GET",
                    cache: "no-store",
                })
                if (!res.ok) {
                    console.error("レスポンスステータス:", res.status)
                    throw new Error("データ取得に失敗しました")
                }
                const data = await res.json()
                setPosts(data)
            } catch (error) {
                console.error("投稿取得エラー:", error)
            }
        }

        fetchPosts()
    }, [])

    return (
        <div className="w-[750px] mx-auto mt-10 border rounded max-h-[500px]">
            <Table className="w-full table-fixed">
                <TableHeader className="sticky top-0 z-10 bg-gray-100">
                    <TableRow>
                        <TableHead className="w-[150px] px-4 py-2">Title</TableHead>
                        <TableHead className="w-[250px] px-4 py-2">Description</TableHead>
                        <TableHead className="w-[150px] px-4 py-2">updatedAt</TableHead>
                        <TableHead className="w-[70px] px-4 py-2 ">update</TableHead>
                        <TableHead className="w-[70px] px-4 py-2 ">delte</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
            <div className="max-h-[500px]  overflow-auto">
                <Table className="w-full table-fixed ">
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id} className="even:bg-indigo-100 odd:bg-white">
                                <TableCell className="w-[150px] truncate overflow-hidden whitespace-nowarp px-4 py-2 font-medium">{post.title}</TableCell>
                                <TableCell className="w-[250px] truncate overflow-hidden whitespace-nowarp px-4 py-2">{post.body}</TableCell>
                                <TableCell className="w-[150px] px-4 py-2">
                                    {dayjs(post.updatedAt).format('YYYY-MM-DD HH:mm')}
                                </TableCell>
                                <TableCell className="w-[70px] px-4 py-2">
                                    <EditDialog
                                        open={openDialogId === post.id}
                                        setOpen={(value: boolean) => {
                                            setOpenDialogId(value ? post.id : null)
                                        }}
                                    />
                                </TableCell>
                                <TableCell className="w-[70px] px-4 py-2">
                                    <MyAlertDialog
                                        name="Del"
                                        title="削除してもよろしいでしょうか？"
                                        message="この操作は取り消せません。"
                                        onContinue={() => handleDel(post.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}