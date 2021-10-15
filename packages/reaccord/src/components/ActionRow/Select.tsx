import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
} from "react"
import { useActionRow } from "./ActionRow"
import { MessageSelectMenu, SelectMenuInteraction } from "discord.js"
import { useMessage } from "../../provider/MessageProvider"
import {
    getMultipleSelectListener,
    getSingleSelectListener,
} from "../../listeners"

interface SelectContext {
    select: MessageSelectMenu
}

const selectContext = createContext<SelectContext>({
    select: new MessageSelectMenu(),
})

export const useSelect = () => useContext(selectContext)

export interface SelectPropsBase {
    children?: ReactNode
    customId: string
    placeholder: ReactNode
    minValues?: number
    maxValues?: number
    disabled?: boolean
    single?: boolean
}

export interface SelectPropsSingle extends SelectPropsBase {
    single: true
    maxValues?: 1
    onChange?: (value: string, interaction: SelectMenuInteraction) => void
}

export interface SelectPropsMultiple extends SelectPropsBase {
    single?: false
    maxValues?: number
    onChange?: (values: string[], interaction: SelectMenuInteraction) => void
}

export type SelectProps = SelectPropsSingle | SelectPropsMultiple

export const Select = ({
    children,
    disabled = false,
    customId,
    ...props
}: SelectProps) => {
    const selectRef = useRef<{ select: MessageSelectMenu | null }>({
        select: null,
    })
    const { messageId, client } = useMessage()
    const { actionRow } = useActionRow()

    if (!selectRef.current.select) {
        selectRef.current.select = new MessageSelectMenu()
        actionRow.components.push(selectRef.current.select)
    }

    selectRef.current.select.setCustomId(customId).setDisabled(disabled)

    useEffect(() => {
        if (!messageId || !client) return

        const listener = props.single
            ? getSingleSelectListener(messageId, customId, props.onChange)
            : getMultipleSelectListener(messageId, customId, props.onChange)

        client.on("interactionCreate", listener)

        return () => {
            client.removeListener("interactionCreate", listener)
        }
    }, [props.onChange])

    return (
        <selectContext.Provider value={{ select: selectRef.current.select }}>
            {children}
        </selectContext.Provider>
    )
}
