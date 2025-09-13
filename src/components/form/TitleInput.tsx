'use client'

import { Input } from "../ui/input"
import { Label } from "../ui/label"

type Props = {
    outLineStyle: string
}
export function TitleInput({ outLineStyle }: Props) {
    return (
        <div className={outLineStyle}>
            <Label htmlFor="title" className="whitespace-nowrap text-lg">Title</Label>
            <Input
                id="title"
                type="text"
                placeholder="enter"
            />
        </div>
    )
}