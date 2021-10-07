import { FC } from "react"
import {
    EmbedProps,
    AuthorProps,
    ColorProps,
    DescProps,
    FieldProps,
    FooterProps,
    ImageProps,
    TimestampProps,
    TitleProps,
    UrlProps,
    TextProps,
    BrProps,
    SpanProps,
    LinkProps,
    CodeProps,
    InteractionRowProps,
    ButtonProps,
    LinkButtonProps,
    SelectProps,
    OptionProps,
} from "./types"
export * from "./nodes"
export * from "./types"

export type ReaccordNodeComponent<Props> = FC<Props>

// Embed Nodes
export declare const Embed: ReaccordNodeComponent<EmbedProps>
export declare const Author: ReaccordNodeComponent<AuthorProps>
export declare const Color: ReaccordNodeComponent<ColorProps>
export declare const Desc: ReaccordNodeComponent<DescProps>
export declare const Field: ReaccordNodeComponent<FieldProps>
export declare const Footer: ReaccordNodeComponent<FooterProps>
export declare const Image: ReaccordNodeComponent<ImageProps>
export declare const Timestamp: ReaccordNodeComponent<TimestampProps>
export declare const Title: ReaccordNodeComponent<TitleProps>
export declare const Url: ReaccordNodeComponent<UrlProps>

// Text Nodes
export declare const Text: ReaccordNodeComponent<TextProps>
export declare const Br: ReaccordNodeComponent<BrProps>
export declare const Span: ReaccordNodeComponent<SpanProps>
export declare const Link: ReaccordNodeComponent<LinkProps>
export declare const Code: ReaccordNodeComponent<CodeProps>

// Interaction Nodes
export declare const InteractionRow: ReaccordNodeComponent<InteractionRowProps>
export declare const Button: ReaccordNodeComponent<ButtonProps>
export declare const LinkButton: ReaccordNodeComponent<LinkButtonProps>
export declare const Select: ReaccordNodeComponent<SelectProps>
export declare const Option: ReaccordNodeComponent<OptionProps>
