'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { TitleInput } from "../form/TitleInput"
import BodyInput from "../form/BodyInput"
import { PostFormData, postSchema } from "@/lib/validation/postSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"

type EditDialogProps = {
    initialData?: PostFormData
    open: boolean
    setOpen: (val: boolean) => void
    onUpdate: (data: PostFormData) => Promise<void>
}

// 投稿編集用ダイアログコンポーネント
export function EditDialog({ initialData, open, setOpen, onUpdate }: EditDialogProps) {

    // React Hook Formの初期化（Zodスキーマによるバリデーションを適用）
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PostFormData>({ resolver: zodResolver(postSchema) })

    // ダイアログが開いたときに初期データでフォームをリセット
    useEffect(() => {
        // ダイアログが開いたらフォームを初期化
        if (open && initialData) {
            reset(initialData)
        }
    }, [open, initialData, reset])

    // フォーム送信時にPOSTデータを更新する
    const onsubmit = async (data: PostFormData) => {
        await onUpdate(data)
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]" onInteractOutside={(event) => { event.preventDefault() }}>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <TitleInput register={register} error={errors?.title} outLineStyle="flex flex-col w-full gap-3" />
                        <BodyInput register={register} error={errors?.body} outLineStyle="grid gap-3" />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
