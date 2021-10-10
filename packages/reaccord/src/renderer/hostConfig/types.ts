import { Channel, Client } from "discord.js"

export interface HostContest {}

export interface MessageContent {
    embeds: unknown[]
    components: unknown[]
    text: { content: string }
}

export type NotifyFunction = (message: MessageContent) => Promise<void>

export interface Container {
    client?: Client | null
    onUpdate?: NotifyFunction
    content: MessageContent
    maxAge?: number
    messageId?: string
}
