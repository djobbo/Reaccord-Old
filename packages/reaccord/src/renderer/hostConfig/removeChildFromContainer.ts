import { ParentInstance } from "./instances"
import { Container } from "./types"

export const removeChildFromContainer = (
    container: Container,
    child: ParentInstance,
) => {
    switch (child.type) {
        case "Text":
            container.content.text.content = "" // TODO: might not work
            break
        case "Embed":
            container.content.embeds?.filter((item) => item !== child.embed)
            break

        case "InteractionRow":
            // Remove Button listeners
            container.content.components?.filter(
                (item) => item !== child.components,
            )
            break

        case "Select":
            if (child.listener)
                container.client?.removeListener(
                    "interactionCreate",
                    child.listener,
                )

            container.content.components?.filter((item) => item !== child)
            break

        default:
            throw new Error("Bad Node")
    }
}
