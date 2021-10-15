import { Client, MessageOptions, TextBasedChannels } from "discord.js"
import { ReactNode } from "react"
import { MessageProvider } from "../provider/MessageProvider"
import { renderMessage } from "../renderer"

export const sendMessage = async (
    messageElement: ReactNode,
    channel: TextBasedChannels,
    client?: Client | null,
    maxAge: number = 15 * 60 * 1000,
) => {
    let msg = await channel.send("Loading") //TODO: change message

    renderMessage(
        <MessageProvider messageId={msg.id} client={client}>
            {messageElement}
        </MessageProvider>,
        {
            client,
            onUpdate: async (message) => {
                const content: MessageOptions = {
                    content: message.text.content || undefined,
                    embeds: message.embeds,
                    components: message.components,
                }

                if (msg) msg.edit(content)
                else msg = await channel.send(content)
            },
            maxAge,
            messageId: msg.id,
        },
    )
}
