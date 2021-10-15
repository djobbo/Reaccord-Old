import { MessageActionRow, MessageEmbed } from "discord.js"
import { WrapperInstance } from "./instances"
import { IntrinsicElement } from "./instances"

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

//TODO
export const commitUpdate = (
    instance: WrapperInstance,
    updatePayload: Payload,
) => {
    switch (instance.type) {
        case "EmbedWrapper":
            if (updatePayload.type !== "EmbedWrapper")
                throw new TypeError("Bad Update Payload for <EmbedWrapper/>")
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
}
