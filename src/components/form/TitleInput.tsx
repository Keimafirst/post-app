'use client'

import { FieldError, UseFormRegister } from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { PostFormData } from "@/lib/validation/postSchema"
// コンポーネントのProps定義
type Props = {
    register: UseFormRegister<PostFormData>
    error?: FieldError
    outLineStyle: string
}
// タイトル入力フィールドのコンポーネント
export function TitleInput({ register, error, outLineStyle }: Props) {
    return (
        <div className={outLineStyle}>
            <Label htmlFor="title" className="whitespace-nowrap text-lg">Title</Label>
            <Input
                className={`w-full border rounded px-2 py-1 ${error ? "border-red-500" : "border-gray-300"
                    }`}
                id="title"
                type="text"
                placeholder="Enter Title"
                {...register("title")}
            />
            <span className="block text-sm min-h-[20px] text-red-500 mt-1">
                {error?.message ?? ""}
            </span>
        </div>
    )
}