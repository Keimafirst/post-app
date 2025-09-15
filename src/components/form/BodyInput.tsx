'use client'

import { FieldError, UseFormRegister } from "react-hook-form"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { PostFormData } from "@/lib/validation/postSchema"

// コンポーネントのProps定義
type Props = {
    register: UseFormRegister<PostFormData>
    error?: FieldError
    outLineStyle: string
}

// 本文入力フィールドのコンポーネント
export default function BodyInput({ register, error, outLineStyle }: Props) {
    return (
        <div className={outLineStyle}>
            <Label htmlFor="body" className="whitespace-nowrap text-lg ">Description</Label>
            <Textarea
                className={`w-full h-[80] ${error ? "border-red-500" : "border-gray-300"}`}
                id="body"
                placeholder="Enter Body"
                {...register("body")}
            />
            <span className="block text-sm min-h-[20px] text-red-500 mt-1">
                {error?.message ?? ""}
            </span>
        </div>
    )
}