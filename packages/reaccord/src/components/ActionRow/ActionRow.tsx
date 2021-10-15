import { APIActionRowComponent } from "discord-api-types"
import { MessageActionRow, MessageEmbed } from "discord.js"
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react"
import { ActionRowWrapper } from "../../renderer/nodes"

interface ActionRowContext {
    actionRow: MessageActionRow
    setActionRow: Dispatch<SetStateAction<MessageActionRow>>
}

const actionRowContext = createContext<ActionRowContext>({
    actionRow: new MessageActionRow(),
    setActionRow: () => {},
})

export const useActionRow = () => useContext(actionRowContext)

interface Props {
    children: ReactNode
}

export const ActionRow = ({ children }: Props) => {
    const [actionRow, setActionRow] = useState(new MessageActionRow())

    return (
        <actionRowContext.Provider value={{ actionRow, setActionRow }}>
            <ActionRowWrapper actionRow={actionRow} />
            {children}
        </actionRowContext.Provider>
    )
}
