import { IntrinsicElement, NodeProps } from "../.."
import { Instance } from "./instances"
import {
    getButtonListener,
    getSingleSelectListener,
    getMultipleSelectListener,
} from "../listeners"
import { parseTextNode } from "../lib"
import { Container } from "./types"

/**
 * @description Nested types are not narrowed
 * @link https://www.typescriptlang.org/play?ts=next#code/JYOwLgpgTgZghgYwgAgApQPYAcDOyDeAUMsgGIYYBcByMF1A5HRg8gL4A0xyAQnFNXzIARv0aiorTtz4AvQbXrIGo2VMJtChBBhA4wyALahghuABsAKhH2kAriATIAvMgA8AOWQQAHpBAAJngMcAwAPioMAHwAFCBwhhDUHgCULlEE3MAwyHEJKM6FyqFpRCQkAPQVyACSIMhgABYQGFAAnsheOI0YduYBIijxUJgA7hADOBjKYG1YKF6uAERwSwzcldU8dgb6wObmHDNzCy7IK0vIYefCaxvIVcgAogBuEPVN0wzxiazAeMMxhN7jo9BhzBAAHTmDAAczyiRS3E0mm0un0Rja9kcZ083j87yCyAA1hA2hgcuhsDhYj8kp0jlhMLhqFTcABtDwAXTSzgyZWQ2VydJcRQY5BYpXujzZ0FmymYrACGBsyBAGAMvn+Bl0DROyiEzGoS2YSwA3OwrjQJMaJOb2AxIdLquU0My5R0mBQlSqARr8drkLrZvMDSIxDd+Pa2I6QejwVCYfCmdTIcwUhbHgwU7hWN1ev1BmGjedTRaY8g4IE1f6GIalCaKNGrUIbZGoNHYyQUVpHtZDFhWvwOqRgD40XoDIYsQ4EKOfLivL5-ETSeTKcyaQj6R5GZvWZvOTz0pkSELt8gAIRiviSKWu0EYrBnHN4OB4Nk4dni70ROQMLkzTjMEIWhOEYiwNMKAzB5qgAeQAaWRDRe2qABlMB9nMZBBxwVU4BwzBhAhQwJwxadsQQAAmRd8RXPA1wpN1qVpfJkj3akD2pI9eX5LIcgvQpXAYW8GHvcpHwMZ9XFfSsP0PH8WD-OA1EA2DkDQno+gGJ4RlaZAcFAJBlFfPMtMLYQUCYkMUAYT92SWW8li5dYH3jUCkwgqCMAzZDNCAA
 */
export const createInstance = <Type extends IntrinsicElement>(
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

            if (!rootContainer.messageId)
                return {
                    type,
                    ...buttonProps,
                }

            const listener = getButtonListener(
                rootContainer.messageId,
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

            if (!rootContainer.messageId)
                return {
                    type,
                    options: [],
                    ...selectProps,
                }

            const listener = selectProps.single
                ? getSingleSelectListener(
                      rootContainer.messageId,
                      selectProps.customId,
                      selectProps.onChange,
                  )
                : getMultipleSelectListener(
                      selectProps.customId,
                      selectProps.onChange,
                  )

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
}
