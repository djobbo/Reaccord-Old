import { ComponentType } from "discord-api-types"
import { getButtonStyle } from "../lib"
import { ParentInstance } from "./instances"
import { parseTextNode } from "../lib"
import { Container } from "./types"

export const appendChildToContainer = (
    container: Container,
    child: ParentInstance,
) => {
    //  TODO: throw if not embed/text/row
    //  Because only those should be at the top level.
    switch (child.type) {
        case "Text":
            container.content.text = child.text
            break

        case "Embed":
            container.content.embeds.push(child.embed)
            break

        case "InteractionRow":
            container.content.components.push(child.components)
            break

        case "Select":
            container.content.components.push([
                {
                    type: ComponentType.SelectMenu,
                    label: parseTextNode(child.children),
                    disabled: child.disabled ?? false,
                    style: getButtonStyle("Link"),
                    custom_id: child.customId,
                    options: child.options,
                    min_values: child.minValues,
                    max_values:
                        child.maxValues ?? (child.single ? 1 : undefined),
                    placeholder: parseTextNode(child.placeholder),
                },
            ])
            break

        default:
            throw new Error("Bad Node")
    }
}
