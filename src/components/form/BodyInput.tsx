'use client'

import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
type Props = {
    outLineStyle: string
}
export default function BodyInput({ outLineStyle }: Props) {
    return (
        <div className={outLineStyle}>
            <Label htmlFor="body" className="whitespace-nowrap text-lg ">Description</Label>
            <Textarea
                id="body"
                placeholder="enter"
            />
        </div>
    )
}