import { useSelect } from "./Select"
import { parseTextNode } from "../../lib"
import { ReactNode, useRef } from "react"
import { MessageSelectOption } from "discord.js"
import { APIPartialEmoji } from "discord-api-types"

interface Props {
    children?: ReactNode
    value: string
    description?: ReactNode
    emoji?: Partial<APIPartialEmoji>
    selected?: boolean
}

export const Option = ({
    children,
    value,
    description,
    emoji,
    selected,
}: Props) => {
    const optionRef = useRef<{ option: MessageSelectOption | null }>({
        option: null,
    })
    const { select } = useSelect()

    if (!optionRef.current.option) {
        optionRef.current.option = {
            default: false,
            description: "",
            emoji: null,
            label: "",
            value: "",
        }
        select.options.push(optionRef.current.option)
    }

    optionRef.current.option.default = selected ?? false
    optionRef.current.option.description = parseTextNode(description)
    optionRef.current.option.emoji = emoji
        ? {
              id: emoji.id ?? null,
              name: emoji.name ?? null,
              animated: emoji.animated,
          }
        : null
    optionRef.current.option.label = parseTextNode(children)
    optionRef.current.option.value = value

    return null
}
