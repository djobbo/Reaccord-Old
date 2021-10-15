import { MessageActionRow } from "discord.js"
import { createContext, ReactNode, useContext, useRef, useState } from "react"
import { ActionRowWrapper } from "../../renderer/nodes"

interface ActionRowContext {
    actionRow: MessageActionRow
}

const actionRowContext = createContext<ActionRowContext>({
    actionRow: new MessageActionRow(),
})

export const useActionRow = () => useContext(actionRowContext)

interface Props {
    children: ReactNode
}

export const ActionRow = ({ children }: Props) => {
    const actionRowRef = useRef<{ actionRow: MessageActionRow }>({
        actionRow: new MessageActionRow(),
    })

    return (
        <actionRowContext.Provider
            value={{ actionRow: actionRowRef.current.actionRow }}
        >
            <ActionRowWrapper actionRow={actionRowRef.current.actionRow} />
            {children}
        </actionRowContext.Provider>
    )
}
