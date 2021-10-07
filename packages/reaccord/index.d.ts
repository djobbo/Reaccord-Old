import { APIMessageComponentEmoji } from "discord-api-types/v9"
import { ReactNode, Key, FC } from "react"
export * from "./lib/Reaccord"

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
    | "Row"
    | "Button"
    | "LinkButton"
    | "Select"
    | "Option"
    | "Text"
    | "Br"
    | "Span"
    | "Link"
    | "Code"

interface ButtonBase {
    children?: ReactNode
    emoji?: APIMessageComponentEmoji
    disabled?: boolean
}

interface Button extends ButtonBase {
    style: "Primary" | "Secondary" | "Success" | "Danger"
    customId: string
    onClick?: (message: unknown) => void
}

interface Link extends ButtonBase {
    style: "Link"
    url: string
}

type ReaccordNodeComponent<Props> = FC<Props>

interface EmbedProps {
    children?: ReactNode
}
export const Embed: ReaccordNodeComponent<EmbedProps>

interface AuthorProps {
    children?: ReactNode
    iconURL?: string
    url?: string
}
export const Author: ReaccordNodeComponent<AuthorProps>
interface ColorProps {
    hex: string
}
export const Color: ReaccordNodeComponent<ColorProps>
interface DescProps {
    children?: ReactNode
}
export const Desc: ReaccordNodeComponent<DescProps>

interface FieldProps {
    children?: ReactNode
    title: ReactNode
    inline?: boolean
}
export const Field: ReaccordNodeComponent<FieldProps>

interface FooterProps {
    children?: ReactNode
    iconUrl?: string
}
export const Footer: ReaccordNodeComponent<FooterProps>

interface ImageProps {
    url: string
}
export const Image: ReaccordNodeComponent<ImageProps>

interface TimestampProps {
    timestamp: number | Date
}
export const Timestamp: ReaccordNodeComponent<TimestampProps>
interface TitleProps {
    children?: ReactNode
}
export const Title: ReaccordNodeComponent<TitleProps>

// underline / crossed
interface UrlProps {
    href: string
}
export const Url: ReaccordNodeComponent<UrlProps>

// Text Nodes
interface TextProps {
    children?: ReactNode
}
export const Text: ReaccordNodeComponent<TextProps>
interface BrProps {}
export const Br: ReaccordNodeComponent<BrProps>

interface SpanProps {
    children?: ReactNode
    bold?: boolean
    italic?: boolean
}
export const Span: ReaccordNodeComponent<SpanProps>

interface LinkProps {
    href: string
    children?: ReactNode
}
export const Link: ReaccordNodeComponent<LinkProps>

interface CodeProps {
    lang: string
    children?: ReactNode
}
export const Code: ReaccordNodeComponent<CodeProps>

// Interaction Nodes
interface RowProps {
    children?: ReactNode
}
export const Row: ReaccordNodeComponent<RowProps>

interface ButtonPropsBase {
    children?: ReactNode
    emoji?: APIMessageComponentEmoji
    disabled?: boolean
}

interface ButtonProps extends ButtonPropsBase {
    style?: "Primary" | "Secondary" | "Success" | "Danger"
    customId: string
    onClick?: (message: unknown) => void
    options?: []
}
export const Button: ReaccordNodeComponent<ButtonProps>

interface LinkButtonProps extends ButtonPropsBase {
    href: string
}
export const LinkButton: ReaccordNodeComponent<LinkButtonProps>

interface SelectProps {
    children?: ReactNode
    customId: string
    placeholder: ReactNode
    minValues?: number
    maxValues?: number
    disabled?: boolean
}
export const Select: ReaccordNodeComponent<SelectProps>

interface OptionProps {
    children?: ReactNode
    value: string
    description?: string
    emoji?: APIMessageComponentEmoji
    default?: boolean
}
export const Option: ReaccordNodeComponent<OptionProps>

// declare global {
// 	namespace JSX {
// 		interface IntrinsicElements {
// 			// Embed Nodes
// 			Embed: Keyed<{
// 				children?: ReactNode;
// 			}>;
// 			Author: Keyed<{
// 				children?: ReactNode;
// 				iconURL?: string;
// 				url?: string;
// 			}>;
// 			Color: Keyed<{ hex: string }>;
// 			Desc: Keyed<{ children?: ReactNode }>;
// 			Field: Keyed<{
// 				children?: ReactNode;
// 				title: ReactNode;
// 				inline?: boolean;
// 			}>;
// 			Footer: Keyed<{ children?: ReactNode; iconUrl?: string }>;
// 			Image: Keyed<{ url: string }>;
// 			Timestamp: Keyed<{ timestamp: number | Date }>;
// 			Title: Keyed<{ children?: ReactNode }>;
// 			// underline / crossed
// 			Url: Keyed<{ href: string }>;

// 			// Interaction Nodes
// 			Row: Keyed<{ children?: ReactNode }>;
// 			Button: Keyed<Button | Link>;
// 			Select: Keyed<{
// 				children?: ReactNode;
// 				customId: string;
// 				placeholder: ReactNode;
// 				minValues?: number;
// 				maxValues?: number;
// 				disabled?: boolean;
// 			}>;
// 			Option: Keyed<{
// 				children?: ReactNode;
// 				value: string;
// 				description?: string;
// 				emoji?: APIMessageComponentEmoji;
// 				default?: boolean;
// 			}>;

// 			// Text Nodes
// 			Text: Keyed<{ children?: ReactNode }>;
// 			Br: Keyed<Record<string, never>>;
// 			Span: Keyed<{
// 				children?: ReactNode;
// 				bold?: boolean;
// 				italic?: boolean;
// 			}>;
// 			Link: Keyed<{ href: string; children?: ReactNode }>;
// 			Code: Keyed<{ lang: string; children?: ReactNode }>;
// 		}
// 	}
// }
