import { MessageActionRow, MessageEmbed } from "discord.js"
import { FC, ReactNode } from "react"

export * from "./nodes"

export type ReaccordNodeComponent<Props> = FC<Props>

export declare const EmbedWrapper: ReaccordNodeComponent<{
    embed: MessageEmbed
}>

export declare const ActionRowWrapper: ReaccordNodeComponent<{
    actionRow: MessageActionRow
}>

export declare const Text: ReaccordNodeComponent<{
    children: ReactNode
}>

export declare const Br: ReaccordNodeComponent<{}>

export declare const Span: ReaccordNodeComponent<{
    children?: ReactNode
    bold?: boolean
    italic?: boolean
}>

export declare const Link: ReaccordNodeComponent<{
    href: string
    children?: ReactNode
}>

export declare const Code: ReaccordNodeComponent<{
    lang: string
    children?: ReactNode
}>
