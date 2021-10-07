import { Client } from "discord.js"
import {
    AuthorProps,
    BrProps,
    ButtonProps,
    CodeProps,
    ColorProps,
    DescProps,
    FieldProps,
    FooterProps,
    ImageProps,
    IntrinsicElement,
    LinkButtonProps,
    LinkProps,
    OptionProps,
    SelectProps,
    SpanProps,
    TimestampProps,
    TitleProps,
    UrlProps,
} from "./nodes"

export interface MessageContent {
    embeds: unknown[]
    components: unknown[]
    text: { content: string }
}

export type NotifyFunction = (message: MessageContent) => Promise<void>

export interface Container {
    client?: Client | null
    notify?: NotifyFunction
    content: MessageContent
}

type PropsWithType<
    Type extends IntrinsicElement = IntrinsicElement,
    Props = {},
> = Props & {
    type: Type
}

type AuthorInstance = PropsWithType<"Author", AuthorProps>
type BrInstance = PropsWithType<"Br", BrProps>
type ButtonInstance = PropsWithType<"Button", ButtonProps>
type CodeInstance = PropsWithType<"Code", CodeProps>
type ColorInstance = PropsWithType<"Color", ColorProps>
type DescInstance = PropsWithType<"Desc", DescProps>
type FieldInstance = PropsWithType<"Field", FieldProps>
type FooterInstance = PropsWithType<"Footer", FooterProps>
type ImageInstance = PropsWithType<"Image", ImageProps>
type LinkInstance = PropsWithType<"Link", LinkProps>
type LinkButtonInstance = PropsWithType<"LinkButton", LinkButtonProps>
type OptionInstance = PropsWithType<"Option", OptionProps>
type SelectInstance = PropsWithType<"Select", SelectProps>
type SpanInstance = PropsWithType<"Span", SpanProps>
type TimestampInstance = PropsWithType<"Timestamp", TimestampProps>
type TitleInstance = PropsWithType<"Title", TitleProps>
type UrlInstance = PropsWithType<"Url", UrlProps>

export type ChildInstance =
    | AuthorInstance
    | BrInstance
    | ButtonInstance
    | CodeInstance
    | ColorInstance
    | DescInstance
    | FieldInstance
    | FooterInstance
    | ImageInstance
    | LinkInstance
    | LinkButtonInstance
    | OptionInstance
    | SelectInstance
    | SpanInstance
    | TimestampInstance
    | TitleInstance
    | UrlInstance

export type TextContentInstance =
    | BrInstance
    | SpanInstance
    | LinkInstance
    | CodeInstance

type EmbedInstance = PropsWithType<
    "Embed",
    {
        embed: {
            title?: string
            fields?: { name: string; value: string }[]
        }
    }
>
type InteractionRowInstance = PropsWithType<
    "InteractionRow",
    { components: unknown[] }
>
export type TextInstance = PropsWithType<"Text", { text: { content: string } }>

export type ParentInstance =
    | EmbedInstance
    | InteractionRowInstance
    | TextInstance

export type Instance = ChildInstance | ParentInstance
