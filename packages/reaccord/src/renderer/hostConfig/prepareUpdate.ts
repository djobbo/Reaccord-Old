import { ComponentType } from "discord-api-types"
import { IntrinsicElement } from "../.."
import { getButtonStyle } from "../lib"
import { Instance } from "./instances"
import {
    getSingleSelectListener,
    getMultipleSelectListener,
    getButtonListener,
} from "../listeners"
import { parseTextNode } from "../lib"
import { Container } from "./types"

export const prepareUpdate = (
    instance: Instance,
    type: IntrinsicElement,
    oldProps,
    newProps,
    rootContainer: Container,
) => {
    switch (instance.type) {
        case "Embed":
            // TODO: Update Embed
            if (!newProps.children) return

            return (
                Array.isArray(newProps.children)
                    ? newProps.children
                    : [newProps.children]
            )
                ?.map((child) => {
                    switch (child.type) {
                        case "Title":
                            return [
                                "title",
                                parseTextNode(child.props.children),
                            ]
                        default:
                            return null
                    }
                })
                .filter(Boolean)

        case "Text":
            return parseTextNode(newProps.children)

        case "InteractionRow":
            // TODO: Update Components
            return (
                Array.isArray(newProps.children)
                    ? newProps.children
                    : [newProps.children]
            )?.map((child) => {
                switch (child.type) {
                    case "Button":
                        if (child.listener)
                            rootContainer.client?.removeListener(
                                "interactionCreate",
                                child.listener,
                            )
                        return {
                            type: ComponentType.Button,
                            emoji: child.props.emoji,
                            label: parseTextNode(child.props.children),
                            disabled: child.props.disabled ?? false,
                            custom_id: child.props.customId,
                            options: child.props.options ?? [],
                            style: getButtonStyle(
                                child.props.style ?? "Primary",
                            ),
                        }

                    case "LinkButton":
                        return {
                            type: ComponentType.Button,
                            emoji: child.props.emoji,
                            label: parseTextNode(child.props.children),
                            url: child.props.href,
                            disabled: child.props.disabled ?? false,
                            style: getButtonStyle("Link"),
                        }

                    default:
                        return null
                }
            })

        case "Select":
            if (instance.listener)
                rootContainer.client?.removeListener(
                    "interactionCreate",
                    instance.listener,
                )
            instance.listener = newProps.single
                ? getSingleSelectListener(newProps.customId, newProps.onChange)
                : getMultipleSelectListener(
                      newProps.customId,
                      newProps.onChange,
                  )
            rootContainer.client?.on("interactionCreate", instance.listener)
            return (
                Array.isArray(newProps.children)
                    ? newProps.children
                    : [newProps.children]
            )?.map((child) => {
                if (child.type !== "Option")
                    throw new Error(
                        "Only <Option/> nodes should be inside of <Select/>",
                    )

                return {
                    default: child.props.selected,
                    description: parseTextNode(child.props.description),
                    emoji: child.props.emoji,
                    value: child.props.value,
                    label: parseTextNode(child.props.children),
                }
            })

        case "Button":
            //TODO: check here
            if (instance.listener)
                rootContainer.client?.removeListener(
                    "interactionCreate",
                    instance.listener,
                )
            instance.listener = getButtonListener(
                newProps.customId,
                newProps.onClick,
            )
            rootContainer.client?.on("interactionCreate", instance.listener)
            return
        default:
            return
    }
}
