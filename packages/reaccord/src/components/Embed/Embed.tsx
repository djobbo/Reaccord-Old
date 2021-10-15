import { MessageEmbed } from "discord.js"
import { createContext, ReactNode, useContext, useRef, useState } from "react"
import { EmbedWrapper } from "../../renderer/nodes"

interface EmbedContext {
    embed: MessageEmbed
}

const embedContext = createContext<EmbedContext>({
    embed: new MessageEmbed(),
})

export const useEmbed = () => useContext(embedContext)

interface Props {
    children: ReactNode
}

export const Embed = ({ children }: Props) => {
    const embedRef = useRef<{ embed: MessageEmbed }>({
        embed: new MessageEmbed(),
    })

    return (
        <embedContext.Provider value={{ embed: embedRef.current.embed }}>
            <EmbedWrapper embed={embedRef.current.embed} />
            {children}
        </embedContext.Provider>
    )
}
