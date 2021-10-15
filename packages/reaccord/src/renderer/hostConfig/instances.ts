import { MessageActionRow, MessageEmbed } from "discord.js"
import * as IntrinsicElements from "../nodes/nodes"

export type IntrinsicElement = keyof typeof IntrinsicElements

type PropsWithType<Type extends IntrinsicElement, Props> = Props & {
    type: Type
}

type EmbedInstance = PropsWithType<"EmbedWrapper", { embed: MessageEmbed }>

type TextInstance = PropsWithType<"Text", { text: { content: string } }>

type ActionRowInstance = PropsWithType<
    "ActionRowWrapper",
    { actionRow: MessageActionRow }
>

export type WrapperInstance = EmbedInstance | TextInstance | ActionRowInstance
