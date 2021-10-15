import { Client, MessageActionRow, MessageEmbed } from "discord.js"
import { parseTextNode } from "../lib"

import * as IntrinsicElements from "./nodes/nodes"

type IntrinsicElement = keyof typeof IntrinsicElements

export interface HostContest {}

export interface MessageContent {
    embeds: MessageEmbed[]
    components: MessageActionRow[]
    text: { content: string }
}

export type NotifyFunction = (message: MessageContent) => Promise<void>

export interface Container {
    client?: Client | null
    onUpdate?: NotifyFunction
    content: MessageContent
    maxAge?: number
    messageId?: string
}

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

interface PayloadBase {
    type: IntrinsicElement
}
interface EmbedWrapperPayload extends PayloadBase {
    type: "EmbedWrapper"
    embed: MessageEmbed
}
interface TextPayload extends PayloadBase {
    type: "Text"
    content: string
}

interface ActionRowPayload extends PayloadBase {
    type: "ActionRowWrapper"
    actionRow: MessageActionRow
}

type Payload = EmbedWrapperPayload | TextPayload | ActionRowPayload

export const hostConfig = {
    supportsMutation: true,
    getRootHostContext: () => null,
    getChildHostContext: (parentHostContext: HostContest) => parentHostContext,
    prepareForCommit: () => null,
    resetAfterCommit: (container: Container) => {
        container.onUpdate?.(container.content)
    },
    shouldSetTextContent: (type: IntrinsicElement) => type === "Text",
    createInstance: (
        type: IntrinsicElement,
        props: any,
        // rootContainer: Container,
    ): WrapperInstance => {
        switch (type) {
            case "EmbedWrapper":
                return {
                    type,
                    embed: props.embed,
                }

            case "Text":
                return {
                    type,
                    text: {
                        content: parseTextNode(props.children),
                    },
                }

            case "ActionRowWrapper":
                return {
                    type,
                    actionRow: props.actionRow,
                }

            default:
                throw new TypeError(`Bad Node <${type}/>`)
        }
    },
    createTextInstance: () => {
        throw new Error("Invalid Text Node")
    },
    clearContainer: (container: Container) => {
        container = {
            client: container.client,
            onUpdate: container.onUpdate,
            content: { embeds: [], components: [], text: { content: "" } },
        }
    },
    finalizeInitialChildren: () => false,
    appendChildToContainer: (container: Container, child: WrapperInstance) => {
        //  TODO: throw if not embed/text/row
        //  Because only those should be at the top level.
        switch (child.type) {
            case "EmbedWrapper":
                container.content.embeds.push(child.embed)
                break

            case "Text":
                container.content.text = child.text
                break

            case "ActionRowWrapper":
                container.content.components.push(child.actionRow)
                break

            default:
                throw new Error("Bad Node")
        }
    },
    removeChildFromContainer: (
        container: Container,
        child: WrapperInstance,
    ) => {
        switch (child.type) {
            case "EmbedWrapper":
                container.content.embeds?.filter((item) => item !== child.embed)
                break

            case "Text":
                container.content.text.content = "" // TODO: might not work
                break

            default:
                throw new Error("Bad Node")
        }
    },
    prepareUpdate: (
        instance: WrapperInstance,
        type: IntrinsicElement,
        oldProps,
        newProps,
    ) => {
        switch (instance.type) {
            case "EmbedWrapper":
                // TODO: Update Embed
                return {
                    type: instance.type,
                    embed: newProps.embed,
                }
            case "Text":
                return {
                    type: instance.type,
                    content: parseTextNode(newProps.children),
                }

            case "ActionRowWrapper":
                return {
                    type: instance.type,
                    actionRow: newProps.actionRow,
                }

            default:
                //TODO: throw
                return
        }
    },
    commitUpdate: (instance: WrapperInstance, updatePayload: Payload) => {
        switch (instance.type) {
            case "EmbedWrapper":
                if (updatePayload.type !== "EmbedWrapper")
                    throw new TypeError(
                        "Bad Update Payload for <EmbedWrapper/>",
                    )
                instance.embed = updatePayload.embed
                break

            case "Text":
                if (updatePayload.type !== "Text")
                    throw new TypeError("Bad Update Payload for <Text/>")
                instance.text.content = updatePayload.content
                break

            case "ActionRowWrapper":
                if (updatePayload.type !== "ActionRowWrapper")
                    throw new TypeError(
                        "Bad Update Payload for <ActionRowWrapper/>",
                    )
                instance.actionRow = updatePayload.actionRow
                break

            default:
                //TODO: throw
                break
        }
    },
}
