import { ComponentType } from "discord-api-types"
import { getButtonStyle } from "../lib"
import { ParentInstance, ChildInstance } from "./instances"
import { parseTextNode } from "../lib"

export const appendInitialChild = (
    parentInstance: ParentInstance,
    child: ChildInstance,
) => {
    //  TODO: throw if embed/text/row
    //  Because they should always be at the top level.
    switch (child.type) {
        case "Title":
            if (parentInstance.type !== "Embed")
                throw new Error("Found <Title/> node outside of <Embed/>")
            parentInstance.embed.title = parseTextNode(child.children)
            break

        case "Field":
            if (parentInstance.type !== "Embed")
                throw new Error("Found <Field/> node outside of <Embed/>")
            if (!parentInstance.embed.fields) parentInstance.embed.fields = []
            parentInstance.embed.fields.push({
                name: parseTextNode(child.title),
                value: parseTextNode(child.children),
            })
            break

        case "Button":
            if (parentInstance.type !== "InteractionRow")
                throw new Error(
                    "Found <Button/> node outside of <InteractionRow/>",
                )
            parentInstance.components.push({
                type: ComponentType.Button,
                emoji: child.emoji,
                label: parseTextNode(child.children),
                disabled: child.disabled ?? false,
                custom_id: child.customId,
                options: child.options ?? [],
                style: getButtonStyle(child.style ?? "Primary"),
            })
            break

        case "LinkButton":
            if (parentInstance.type !== "InteractionRow")
                throw new Error(
                    "Found <Button/> node outside of <InteractionRow/>",
                )
            parentInstance.components.push({
                type: ComponentType.Button,
                emoji: child.emoji,
                label: parseTextNode(child.children),
                url: child.href,
                disabled: child.disabled ?? false,
                style: getButtonStyle("Link"),
            })
            break

        case "Option":
            if (parentInstance.type !== "Select")
                throw new Error("Found <Option/> node outside of <Select/>")
            parentInstance.options.push({
                default: child.selected,
                description: parseTextNode(child.description),
                emoji: child.emoji,
                value: child.value,
                label: parseTextNode(child.children),
            })
            break

        default:
            break
    }
}
