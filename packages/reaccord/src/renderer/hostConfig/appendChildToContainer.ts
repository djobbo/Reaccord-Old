import { WrapperInstance } from "./instances"
import { Container } from "./types"

export const appendChildToContainer = (
    container: Container,
    child: WrapperInstance,
) => {
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
}
