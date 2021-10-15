import { WrapperInstance } from "./instances"
import { Container } from "./types"

export const removeChildFromContainer = (
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
}
