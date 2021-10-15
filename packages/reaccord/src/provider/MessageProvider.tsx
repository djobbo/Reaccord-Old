import { Client, MessageEmbed } from "discord.js"
import { createContext, ReactNode, useContext } from "react"

interface MessageContext {
    messageId?: string
    client?: Client | null
}

const messageContext = createContext<MessageContext>({
    messageId: "",
})

export const useMessage = () => useContext(messageContext)

interface Props extends MessageContext {
    children: ReactNode
}

export const MessageProvider = ({ children, messageId, client }: Props) => (
    <messageContext.Provider value={{ messageId, client }}>
        {children}
    </messageContext.Provider>
)
