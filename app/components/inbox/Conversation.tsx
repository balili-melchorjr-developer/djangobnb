'use client'

import { useRouter } from "next/navigation"

import { ConversationType } from "@/app/inbox/page"
import React from "react"

interface ConversationProps {
    conversation: ConversationType,
    userId: string
}


const Conversation: React.FC<ConversationProps>= ({
    conversation,
    userId
}) => {

    const router = useRouter()

    const otherUser = conversation.users.find((user) => user.id != userId)

    return (
        <div className="cursor-pointer px-6 py-4 border border-gray-400 rounded-xl">
            <p className="mb-6 text-xl">{otherUser?.name}</p>

            <p 
                onClick={() => router.push(`/inbox/${conversation.id}`)}
                className="text-airbnb-dark"
            >Go to Conversation</p>
        </div>
    )
}

export default Conversation