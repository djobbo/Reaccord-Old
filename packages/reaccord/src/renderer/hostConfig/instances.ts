import { Interaction } from "discord.js"
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
} from "../nodes"
import {
    APIButtonComponent,
    APISelectMenuComponent,
    APISelectMenuOption,
} from "discord-api-types/v9"

type PropsWithType<
    Type extends IntrinsicElement = IntrinsicElement,
    Props = {},
> = Props & {
    type: Type
}

type AuthorInstance = PropsWithType<"Author", AuthorProps>
type BrInstance = PropsWithType<"Br", BrProps>
type ButtonInstance = PropsWithType<
    "Button",
    ButtonProps & { listener?: (interaction: Interaction) => void }
>
type CodeInstance = PropsWithType<"Code", CodeProps>
type ColorInstance = PropsWithType<"Color", ColorProps>
type DescInstance = PropsWithType<"Desc", DescProps>
type FieldInstance = PropsWithType<"Field", FieldProps>
type FooterInstance = PropsWithType<"Footer", FooterProps>
type ImageInstance = PropsWithType<"Image", ImageProps>
type LinkInstance = PropsWithType<"Link", LinkProps>
type LinkButtonInstance = PropsWithType<"LinkButton", LinkButtonProps>
type OptionInstance = PropsWithType<"Option", OptionProps>
type SelectInstance = PropsWithType<
    "Select",
    SelectProps & {
        options: APISelectMenuOption[]
        listener?: (interaction: Interaction) => void
    }
>
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
    { components: (APIButtonComponent | APISelectMenuComponent)[] }
>
export type TextInstance = PropsWithType<"Text", { text: { content: string } }>

export type ParentInstance =
    | EmbedInstance
    | InteractionRowInstance
    | TextInstance
    | SelectInstance

export type Instance = ChildInstance | ParentInstance
