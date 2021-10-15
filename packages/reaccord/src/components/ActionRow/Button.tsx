import { ReactNode, useEffect, useRef } from "react"
import { useActionRow } from "./ActionRow"
import {
    ButtonInteraction,
    EmojiIdentifierResolvable,
    MessageButton,
    MessageButtonStyleResolvable,
} from "discord.js"
import { parseTextNode } from "../../lib"

export interface PropsBase {
    children?: ReactNode
    emoji?: EmojiIdentifierResolvable
    disabled?: boolean
}

export interface ButtonProps extends PropsBase {
    style?: MessageButtonStyleResolvable
    customId: string
    onClick?: (interaction: ButtonInteraction) => void
}

export interface LinkProps extends PropsBase {
    href: string
}

export const Button = ({
    children,
    disabled = false,
    emoji,
    customId,
    onClick,
    style,
}: ButtonProps) => {
    const buttonRef = useRef<{ button: MessageButton | null }>({ button: null })
    const { actionRow } = useActionRow()

    if (!buttonRef.current.button) {
        buttonRef.current.button = new MessageButton()
        actionRow.components.push(buttonRef.current.button)
    }

    buttonRef.current.button
        .setCustomId(customId)
        .setDisabled(disabled)
        .setLabel(parseTextNode(children))

    if (style) buttonRef.current.button.setStyle(style)

    if (emoji) buttonRef.current.button.setEmoji(emoji)

    useEffect(() => {
        //TODO: Do smth with onClick
        return () => {
            // Clear onClick
        }
    }, [])

    return null
}

export const LinkButton = ({
    children,
    disabled = false,
    emoji,
    href,
}: LinkProps) => {
    const buttonRef = useRef<{ button: MessageButton | null }>({ button: null })
    const { actionRow } = useActionRow()

    if (!buttonRef.current.button) {
        buttonRef.current.button = new MessageButton()
        actionRow.components.push(buttonRef.current.button)
    }

    buttonRef.current.button
        .setDisabled(disabled)
        .setLabel(parseTextNode(children))
        .setStyle("LINK")
        .setURL(href)

    if (emoji) buttonRef.current.button.setEmoji(emoji)

    return null
}
