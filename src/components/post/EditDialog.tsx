'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { TitleInput } from "../form/TitleInput"
import BodyInput from "../form/BodyInput"

type EditDialogProps = {
    open: boolean
    setOpen: (val: boolean) => void
}

export function EditDialog({ open, setOpen }: EditDialogProps) {

    // フォーム送信時にPOSTデータを更新する
    const onsubmit = () => {
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]" onInteractOutside={(event) => { event.preventDefault() }}>
                <form onSubmit={onsubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <TitleInput outLineStyle="flex flex-col w-full gap-3" />
                        <BodyInput outLineStyle="grid gap-3" />
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
