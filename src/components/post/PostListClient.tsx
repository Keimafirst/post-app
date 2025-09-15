'use client'

import dayjs from "dayjs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useState } from "react"
import { EditDialog } from "./EditDialog"
import { MyAlertDialog } from "../common/MyAlertDialog"
import { Post } from "@/types/Post"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deletePost, getPosts, updatePost } from "@/lib/api/post"
import { PostFormData } from "@/lib/validation/postSchema"

export default function PostListClient() {
    const [openDialogId, setOpenDialogId] = useState<number | null>(null)
    const { data: posts = [], isLoading, error } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: getPosts
    })
    const queryClient = useQueryClient();

    // 更新処理
    const updateMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            console.log("更新成功")
        },
        onError: (error: unknown) => {
            console.error("更新失敗", error)
        }
    })
    // 削除処理
    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            console.log("削除成功")
        },
        onError: (error: unknown) => {
            console.error("削除失敗", error)
        }
    })
    // 編集画面に渡す処理
    const handleUpdate = async (updatedData: PostFormData) => {
        updateMutation.mutate(updatedData)
    }
    // 削除ダイアログに渡す処理
    const handleDel = (id: number) => {
        deleteMutation.mutate(id)
    }
    if (isLoading || error) {
        return (
            <div className="w-[750px] mx-auto mt-10 border rounded max-h-[300px]">
                {isLoading && <span className="text-gray-500 text-lg">読み込み中...</span>}
                {error && <span className="text-red-500 text-lg">エラーが発生しました</span>}
            </div>
        )
    }
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
                                        onUpdate={handleUpdate}
                                        open={openDialogId === post.id}
                                        setOpen={(value: boolean) => {
                                            setOpenDialogId(value ? post.id : null)
                                        }}
                                        initialData={{ id: post.id, title: post.title, body: post.body }} />
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