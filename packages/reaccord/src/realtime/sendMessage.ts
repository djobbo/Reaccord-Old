import { Client, Message, MessageOptions, TextBasedChannels } from "discord.js"
import { ReactNode } from "react"
import { renderMessage } from "../renderer"

export const sendMessage = (
    messageElement: ReactNode,
    channel: TextBasedChannels,
    client?: Client | null,
    maxAge: number = 15 * 60 * 1000,
) => {
    let msg: Message

    renderMessage(
        messageElement,
        client,
        async (message) => {
            const content: MessageOptions = {
                content: message.text.content,
                embeds: message.embeds as any,
                components: message.components.map((row) => ({
                    type: "ACTION_ROW",
                    components: row as any,
                })),
            }

            if (msg) msg.edit(content)
            else msg = await channel.send(content)
        },
        maxAge,
    )
}
