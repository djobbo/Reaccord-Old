import { HostConfig } from "react-reconciler"
import { parseTextNode } from "./parseTextNode"
import { IntrinsicElement } from "./nodes"
import { ChildInstance, Container, Instance, ParentInstance } from "./types"
import { NodeProps } from "./nodes"
import {
    ButtonInteraction,
    Interaction,
    SelectMenuInteraction,
} from "discord.js"
import { ComponentType } from "discord-api-types"

const textContainers: IntrinsicElement[] = [
    "Text",
    "Title",
    "Field",
    "Button",
    "LinkButton",
    "Option",
]

const buttonStyles = {
    Primary: 1,
    Secondary: 2,
    Success: 3,
    Danger: 4,
    Link: 5,
}

const getButtonStyle = (style: keyof typeof buttonStyles) => buttonStyles[style]

const getButtonListener =
    (customId: string, onClick?: (interaction: ButtonInteraction) => void) =>
    (interaction: Interaction) => {
        if (!interaction.isButton()) return
        if (interaction.customId !== customId) return
        onClick?.(interaction)
        interaction.deferUpdate()

        // const { maxAge, client } = rootContainer

        // client?.removeListener("interactionCreate", listener)

        // TODO: Max Age
        // if (!maxAge || maxAge === Infinity) {
        //     client?.once("interactionCreate", listener)
        //     return
        // }

        // try {
        //     let timestamp = hasOwnProperty(
        //         interaction.message,
        //         "timestamp",
        //     )
        //         ? parseInt(interaction.message.timestamp)
        //         : interaction.message.createdTimestamp

        //     console.log({ maxAge }, Date.now() - timestamp)

        //     if (!timestamp || Date.now() - timestamp < maxAge)
        //         rootContainer.client?.once(
        //             "interactionCreate",
        //             listener,
        //         )
        // } catch (e) {
        //     console.error(`Couldn't parse Message Timestamp.`)
        // }
    }

const getSingleSelectListener =
    (
        customId: string,
        onChange?: (value: string, interaction: SelectMenuInteraction) => void,
    ) =>
    (interaction: Interaction) => {
        if (!interaction.isSelectMenu()) return
        if (interaction.customId !== customId) return

        onChange?.(interaction.values[0], interaction)

        interaction.deferUpdate()

        // TODO: Max Age
    }
const getMultipleSelectListener =
    (
        customId: string,
        onChange?: (
            value: string[],
            interaction: SelectMenuInteraction,
        ) => void,
    ) =>
    (interaction: Interaction) => {
        if (!interaction.isSelectMenu()) return
        if (interaction.customId !== customId) return

        onChange?.(interaction.values, interaction)

        interaction.deferUpdate()

        // TODO: Max Age
    }

export const getHostConfig = () => {
    // TODO: Fix type
    const hostConfig: Partial<
        HostConfig<
            IntrinsicElement, // JSX.InstrinsicElements
            any,
            Container,
            Instance,
            any,
            null,
            null,
            null,
            {},
            any,
            null,
            null,
            null
        >
    > = {
        supportsMutation: true,
        getRootHostContext: () => null,
        getChildHostContext: (parentHostContext) => parentHostContext,

        prepareForCommit: () => null,
        resetAfterCommit: (container) => {
            if (!container.notify) return
            container?.notify(container.content)
        },
        shouldSetTextContent: (type) => textContainers.includes(type),
        /**
         * @description Nested types are not narrowed
         * @link https://www.typescriptlang.org/play?ts=next#code/JYOwLgpgTgZghgYwgAgApQPYAcDOyDeAUMsgGIYYBcByMF1A5HRg8gL4A0xyAQnFNXzIARv0aiorTtz4AvQbXrIGo2VMJtChBBhA4wyALahghuABsAKhH2kAriATIAvMgA8AOWQQAHpBAAJngMcAwAPioMAHwAFCBwhhDUHgCULlEE3MAwyHEJKM6FyqFpRCQkAPQVyACSIMhgABYQGFAAnsheOI0YduYBIijxUJgA7hADOBjKYG1YKF6uAERwSwzcldU8dgb6wObmHDNzCy7IK0vIYefCaxvIVcgAogBuEPVN0wzxiazAeMMxhN7jo9BhzBAAHTmDAAczyiRS3E0mm0un0Rja9kcZ083j87yCyAA1hA2hgcuhsDhYj8kp0jlhMLhqFTcABtDwAXTSzgyZWQ2VydJcRQY5BYpXujzZ0FmymYrACGBsyBAGAMvn+Bl0DROyiEzGoS2YSwA3OwrjQJMaJOb2AxIdLquU0My5R0mBQlSqARr8drkLrZvMDSIxDd+Pa2I6QejwVCYfCmdTIcwUhbHgwU7hWN1ev1BmGjedTRaY8g4IE1f6GIalCaKNGrUIbZGoNHYyQUVpHtZDFhWvwOqRgD40XoDIYsQ4EKOfLivL5-ETSeTKcyaQj6R5GZvWZvOTz0pkSELt8gAIRiviSKWu0EYrBnHN4OB4Nk4dni70ROQMLkzTjMEIWhOEYiwNMKAzB5qgAeQAaWRDRe2qABlMB9nMZBBxwVU4BwzBhAhQwJwxadsQQAAmRd8RXPA1wpN1qVpfJkj3akD2pI9eX5LIcgvQpXAYW8GHvcpHwMZ9XFfSsP0PH8WD-OA1EA2DkDQno+gGJ4RlaZAcFAJBlFfPMtMLYQUCYkMUAYT92SWW8li5dYH3jUCkwgqCMAzZDNCAA
         */
        createInstance: <Type extends IntrinsicElement>(
            type: Type,
            props: NodeProps[Type],
            rootContainer: Container,
        ): Instance => {
            switch (type) {
                case "Text":
                    const textProps = props as NodeProps["Text"] // BUG:
                    return {
                        type,
                        text: { content: parseTextNode(textProps.children) },
                    }

                case "Embed":
                    return {
                        type,
                        embed: {},
                    }

                case "InteractionRow":
                    return {
                        type,
                        components: [],
                    }

                case "Button": {
                    const buttonProps = props as NodeProps["Button"]
                    const listener = getButtonListener(
                        buttonProps.customId,
                        buttonProps.onClick,
                    )
                    rootContainer.client?.on("interactionCreate", listener)

                    return {
                        type,
                        ...buttonProps,
                        listener,
                    }
                }

                case "Select": {
                    const selectProps = props as NodeProps["Select"]

                    const listener = selectProps.single
                        ? getSingleSelectListener(
                              selectProps.customId,
                              selectProps.onChange,
                          )
                        : getMultipleSelectListener(
                              selectProps.customId,
                              selectProps.onChange,
                          )

                    // const listener = (interaction: Interaction) => {
                    //     if (!interaction.isSelectMenu()) return
                    //     if (interaction.customId !== selectProps.customId)
                    //         return

                    //     if (selectProps.single) {
                    //         selectProps.onChange?.(
                    //             interaction.values[0],
                    //             interaction,
                    //         )
                    //     } else {
                    //         selectProps.onChange?.(
                    //             interaction.values,
                    //             interaction,
                    //         )
                    //     }
                    //     interaction.deferUpdate()

                    //     // TODO: Max Age
                    // }
                    rootContainer.client?.on("interactionCreate", listener)

                    return {
                        type,
                        options: [],
                        listener,
                        ...selectProps,
                    }
                }

                default:
                    return {
                        type,
                        ...props,
                    } as any // TODO: Fix this
            }
        },
        createTextInstance: () => {
            throw new Error("Invalid Text Node")
        },
        clearContainer: (container: Container) => {
            container = {
                client: container.client,
                notify: container.notify,
                content: { embeds: [], components: [], text: { content: "" } },
            }
        },
        finalizeInitialChildren: () => false, // if true -> commitMount method
        appendInitialChild: (
            parentInstance: ParentInstance,
            child: ChildInstance,
        ) => {
            //  TODO: throw if embed/text/row
            //  Because they should always be at the top level.
            switch (child.type) {
                case "Title":
                    if (parentInstance.type !== "Embed")
                        throw new Error(
                            "Found <Title/> node outside of <Embed/>",
                        )
                    parentInstance.embed.title = parseTextNode(child.children)
                    break

                case "Field":
                    if (parentInstance.type !== "Embed")
                        throw new Error(
                            "Found <Field/> node outside of <Embed/>",
                        )
                    if (!parentInstance.embed.fields)
                        parentInstance.embed.fields = []
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
                        throw new Error(
                            "Found <Option/> node outside of <Select/>",
                        )
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
        },
        appendChild: (parentInstance: ParentInstance, child: ChildInstance) => {
            switch (child.type) {
                case "Title":
                    if (parentInstance.type !== "Embed")
                        throw new Error(
                            "Found <Title/> node outside of <Embed/>",
                        )
                    parentInstance.embed.title = parseTextNode(child.children)
                    break

                case "Field":
                    if (parentInstance.type !== "Embed")
                        throw new Error(
                            "Found <Field/> node outside of <Embed/>",
                        )
                    if (!parentInstance.embed.fields)
                        parentInstance.embed.fields = []
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
                        throw new Error(
                            "Found <Option/> node outside of <Select/>",
                        )
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
        },
        appendChildToContainer: (
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
                                child.maxValues ??
                                (child.single ? 1 : undefined),
                            placeholder: parseTextNode(child.placeholder),
                        },
                    ])
                    break

                default:
                    throw new Error("Bad Node")
            }
        },
        //TODO: removeChild() -> Button remove listener
        removeChildFromContainer: (
            container: Container,
            child: ParentInstance,
        ) => {
            switch (child.type) {
                case "Text":
                    container.content.text.content = "" // TODO: might not work
                    break
                case "Embed":
                    container.content.embeds?.filter(
                        (item) => item !== child.embed,
                    )
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

                    container.content.components?.filter(
                        (item) => item !== child,
                    )
                    break

                default:
                    throw new Error("Bad Node")
            }
        },
        prepareUpdate: (
            instance,
            type,
            oldProps,
            newProps,
            rootContainer,
            hostContext,
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
                        ? getSingleSelectListener(
                              newProps.customId,
                              newProps.onChange,
                          )
                        : getMultipleSelectListener(
                              newProps.customId,
                              newProps.onChange,
                          )
                    rootContainer.client?.on(
                        "interactionCreate",
                        instance.listener,
                    )
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
                    rootContainer.client?.on(
                        "interactionCreate",
                        instance.listener,
                    )
                    return
                default:
                    return
            }
        },
        commitUpdate: (instance: ParentInstance, updatePayload) => {
            switch (instance.type) {
                case "Embed":
                    updatePayload.forEach(([prop, value]) => {
                        instance.embed[prop] = value
                    })
                    break

                case "Text":
                    instance.text.content = updatePayload
                    break

                case "InteractionRow":
                    instance.components.length = 0
                    instance.components.push(...updatePayload)
                    break

                case "Select":
                    instance.options.length = 0
                    instance.options.push(...updatePayload)
                    break

                default:
                    break
            }
        },
    }

    return hostConfig
}
