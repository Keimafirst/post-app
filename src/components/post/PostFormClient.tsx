'use client'

import BodyInput from "../form/BodyInput"
import { TitleInput } from "../form/TitleInput"
import { Button } from "../ui/button"
import { CardFooter } from "../ui/card"

export default function PostFormClient() {
    const onSubmit = () => {
        console.log("登録データ:")
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-4">
                <TitleInput outLineStyle="flex flex-col w-full gap-1" />
                <BodyInput outLineStyle="items-center gap-2" />
            </div>

            <CardFooter className="flex flex-col justify-center mt-6">
                <Button type="submit" className="w-[200]">POST
                </Button>
            </CardFooter>
        </form>
    )
}