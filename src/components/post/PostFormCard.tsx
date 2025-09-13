'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import PostFormClient from "./PostFormClient"

export default function PostFormCard() {
    return (
        <Card className="w-[500] ml-30">
            <CardHeader className="space-y-1">
                <CardTitle className="text-xl">POST APP</CardTitle>
                <CardDescription className="text-lg">Title (max 30 characters)</CardDescription>
                <CardDescription className="text-lg">Description (max 150 characters)</CardDescription>
            </CardHeader>
            <CardContent>
                <PostFormClient />
            </CardContent>
        </Card>
    )
}