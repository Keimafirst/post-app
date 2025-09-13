'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"

/**
 * name: ボタン名
 * title: ダイアログタイトル
 * message: 注意喚起メッセージ
 * onContinue: ボタン押下時の処理
 */
type Props = {
    name: string,
    title: string,
    message: string,
    onContinue: () => void
}

export function MyAlertDialog({ name, title, message, onContinue }: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">{name}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {message}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}