import { parseTextNode } from "../../lib"
import { WrapperInstance, IntrinsicElement } from "./instances"

export const prepareUpdate = (
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
}
