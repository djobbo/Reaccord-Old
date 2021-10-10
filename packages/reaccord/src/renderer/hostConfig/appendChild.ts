import { ComponentType } from "discord-api-types"
import { getButtonStyle } from "../lib"
import { ParentInstance, ChildInstance } from "./instances"
import { parseTextNode } from "../lib"
import { resolveColor } from "../lib/resolveColor"

export const appendChild = (
    parentInstance: ParentInstance,
    child: ChildInstance,
) => {
    switch (child.type) {
        // Embed Nodes
        case "Author":
            if (parentInstance.type !== "Embed")
                throw new Error("Found <Author/> node outside of <Embed/>")

            parentInstance.embed.author = {
                name: parseTextNode(child.children),
                icon_url: child.iconURL,
                url: child.url,
            }
            break

        case "Color":
            if (parentInstance.type !== "Embed")
                throw new Error("Found <Color/> node outside of <Embed/>")

            parentInstance.embed.color = resolveColor(
                child.color ?? child.hex ?? child.rgb ?? 0,
            )
            break

        case "Desc":
            if (parentInstance.type !== "Embed")
                throw new Error("Found <Desc/> node outside of <Embed/>")

            parentInstance.embed.description = parseTextNode(child.children)
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

        case "Footer":
            if (parentInstance.type !== "Embed")
                throw new Error("Found <Footer/> node outside of <Embed/>")

            parentInstance.embed.footer = {
                text: parseTextNode(child.children),
                icon_url: child.iconUrl,
            }
            break

        case "Title":
            if (parentInstance.type !== "Embed")
                throw new Error("Found <Title/> node outside of <Embed/>")

            parentInstance.embed.title = parseTextNode(child.children)
            break

        // MessageComponents
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
