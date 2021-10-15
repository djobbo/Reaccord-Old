import { MessageEmbed } from "discord.js"
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react"
import { EmbedWrapper } from "../../renderer/nodes"

interface EmbedContext {
    embed: MessageEmbed
    setEmbed: Dispatch<SetStateAction<MessageEmbed>>
}

const embedContext = createContext<EmbedContext>({
    embed: new MessageEmbed(),
    setEmbed: () => {},
})

export const useEmbed = () => useContext(embedContext)

interface Props {
    children: ReactNode
}

export const Embed = ({ children }: Props) => {
    const [embed, setEmbed] = useState(new MessageEmbed())

    return (
        <embedContext.Provider value={{ embed, setEmbed }}>
            <EmbedWrapper embed={embed} />
            {children}
        </embedContext.Provider>
    )
}
