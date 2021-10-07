import { APIMessageComponentEmoji } from "discord-api-types/v9"
import { ReactNode, Key, FC } from "react"
export * from "./nodes"

export type IntrinsicElement =
    | "Embed"
    | "Author"
    | "Color"
    | "Desc"
    | "Field"
    | "Footer"
    | "Image"
    | "Timestamp"
    | "Title"
    | "Url"
    | "InteractionRow"
    | "Button"
    | "LinkButton"
    | "Select"
    | "Option"
    | "Text"
    | "Br"
    | "Span"
    | "Link"
    | "Code"

type ReaccordNodeComponent<Props> = FC<Props>

export interface EmbedProps {
    children?: ReactNode
}
export declare const Embed: ReaccordNodeComponent<EmbedProps>

export interface AuthorProps {
    children?: ReactNode
    iconURL?: string
    url?: string
}
export declare const Author: ReaccordNodeComponent<AuthorProps>
export interface ColorProps {
    hex: string
}
export declare const Color: ReaccordNodeComponent<ColorProps>
export interface DescProps {
    children?: ReactNode
}
export declare const Desc: ReaccordNodeComponent<DescProps>

export interface FieldProps {
    children?: ReactNode
    title: ReactNode
    inline?: boolean
}
export declare const Field: ReaccordNodeComponent<FieldProps>

export interface FooterProps {
    children?: ReactNode
    iconUrl?: string
}
export declare const Footer: ReaccordNodeComponent<FooterProps>

export interface ImageProps {
    url: string
}
export declare const Image: ReaccordNodeComponent<ImageProps>

export interface TimestampProps {
    timestamp: number | Date
}
export declare const Timestamp: ReaccordNodeComponent<TimestampProps>
export interface TitleProps {
    children?: ReactNode
}
export declare const Title: ReaccordNodeComponent<TitleProps>

// underline / crossed
export interface UrlProps {
    href: string
}
export declare const Url: ReaccordNodeComponent<UrlProps>

// Text Nodes
export interface TextProps {
    children?: ReactNode
}
export declare const Text: ReaccordNodeComponent<TextProps>
export interface BrProps {}
export declare const Br: ReaccordNodeComponent<BrProps>

export interface SpanProps {
    children?: ReactNode
    bold?: boolean
    italic?: boolean
}
export declare const Span: ReaccordNodeComponent<SpanProps>

export interface LinkProps {
    href: string
    children?: ReactNode
}
export declare const Link: ReaccordNodeComponent<LinkProps>

export interface CodeProps {
    lang: string
    children?: ReactNode
}
export declare const Code: ReaccordNodeComponent<CodeProps>

// Interaction Nodes
export interface InteractionRowProps {
    children?: ReactNode
}
export declare const InteractionRow: ReaccordNodeComponent<InteractionRowProps>

export interface ButtonPropsBase {
    children?: ReactNode
    emoji?: APIMessageComponentEmoji
    disabled?: boolean
}

export interface ButtonProps extends ButtonPropsBase {
    style?: "Primary" | "Secondary" | "Success" | "Danger"
    customId: string
    onClick?: (message: unknown) => void
    options?: []
}
export declare const Button: ReaccordNodeComponent<ButtonProps>

export interface LinkButtonProps extends ButtonPropsBase {
    href: string
}
export declare const LinkButton: ReaccordNodeComponent<LinkButtonProps>

export interface SelectProps {
    children?: ReactNode
    customId: string
    placeholder: ReactNode
    minValues?: number
    maxValues?: number
    disabled?: boolean
}
export declare const Select: ReaccordNodeComponent<SelectProps>

export interface OptionProps {
    children?: ReactNode
    value: string
    description?: string
    emoji?: APIMessageComponentEmoji
    default?: boolean
}
export declare const Option: ReaccordNodeComponent<OptionProps>
