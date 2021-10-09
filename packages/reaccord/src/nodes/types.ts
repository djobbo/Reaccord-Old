import { ReactNode } from "react"
import { APIMessageComponentEmoji } from "discord-api-types/v9"
import { ButtonInteraction, SelectMenuInteraction } from "discord.js"

// Embed Nodes
export interface EmbedProps {
    children?: ReactNode
}

export interface AuthorProps {
    children?: ReactNode
    iconURL?: string
    url?: string
}

export interface ColorProps {
    hex: string
}

export interface DescProps {
    children?: ReactNode
}

export interface FieldProps {
    children?: ReactNode
    title: ReactNode
    inline?: boolean
}

export interface FooterProps {
    children?: ReactNode
    iconUrl?: string
}

export interface ImageProps {
    url: string
}

export interface TimestampProps {
    timestamp: number | Date
}

export interface TitleProps {
    children?: ReactNode
}

export interface UrlProps {
    href: string
}

// Text Nodes
export interface TextProps {
    children?: ReactNode
}

export interface BrProps {}

export interface SpanProps {
    children?: ReactNode
    bold?: boolean
    italic?: boolean
}

export interface LinkProps {
    href: string
    children?: ReactNode
}

export interface CodeProps {
    lang: string
    children?: ReactNode
}

// Interaction Nodes
export interface InteractionRowProps {
    children?: ReactNode
}

export interface ButtonPropsBase {
    children?: ReactNode
    emoji?: APIMessageComponentEmoji
    disabled?: boolean
}

export interface ButtonProps extends ButtonPropsBase {
    style?: "Primary" | "Secondary" | "Success" | "Danger"
    customId: string
    onClick?: (interaction: ButtonInteraction) => void
    options?: []
}

export interface LinkButtonProps extends ButtonPropsBase {
    href: string
}

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

export interface OptionProps {
    children?: ReactNode
    value: string
    description?: ReactNode
    emoji?: APIMessageComponentEmoji
    selected?: boolean
}

export interface NodeProps {
    Author: AuthorProps
    Br: BrProps
    Button: ButtonProps
    Code: CodeProps
    Color: ColorProps
    Desc: DescProps
    Embed: EmbedProps
    Field: FieldProps
    Footer: FooterProps
    Image: ImageProps
    Link: LinkProps
    LinkButton: LinkButtonProps
    Option: OptionProps
    InteractionRow: InteractionRowProps
    Select: SelectProps
    Span: SpanProps
    Text: TextProps
    Timestamp: TimestampProps
    Title: TitleProps
    Url: UrlProps
}

export type IntrinsicElement = keyof NodeProps
