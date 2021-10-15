import { Client, MessageActionRow, MessageEmbed } from "discord.js"

export interface HostContest {}

export interface MessageContent {
    embeds: MessageEmbed[]
    components: MessageActionRow[]
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
