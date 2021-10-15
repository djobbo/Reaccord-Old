import { parseTextNode } from "../../lib"
import { WrapperInstance, IntrinsicElement } from "./instances"

/**
 * @description Nested types are not narrowed
 * @link https://www.typescriptlang.org/play?ts=next#code/JYOwLgpgTgZghgYwgAgApQPYAcDOyDeAUMsgGIYYBcByMF1A5HRg8gL4A0xyAQnFNXzIARv0aiorTtz4AvQbXrIGo2VMJtChBBhA4wyALahghuABsAKhH2kAriATIAvMgA8AOWQQAHpBAAJngMcAwAPioMAHwAFCBwhhDUHgCULlEE3MAwyHEJKM6FyqFpRCQkAPQVyACSIMhgABYQGFAAnsheOI0YduYBIijxUJgA7hADOBjKYG1YKF6uAERwSwzcldU8dgb6wObmHDNzCy7IK0vIYefCaxvIVcgAogBuEPVN0wzxiazAeMMxhN7jo9BhzBAAHTmDAAczyiRS3E0mm0un0Rja9kcZ083j87yCyAA1hA2hgcuhsDhYj8kp0jlhMLhqFTcABtDwAXTSzgyZWQ2VydJcRQY5BYpXujzZ0FmymYrACGBsyBAGAMvn+Bl0DROyiEzGoS2YSwA3OwrjQJMaJOb2AxIdLquU0My5R0mBQlSqARr8drkLrZvMDSIxDd+Pa2I6QejwVCYfCmdTIcwUhbHgwU7hWN1ev1BmGjedTRaY8g4IE1f6GIalCaKNGrUIbZGoNHYyQUVpHtZDFhWvwOqRgD40XoDIYsQ4EKOfLivL5-ETSeTKcyaQj6R5GZvWZvOTz0pkSELt8gAIRiviSKWu0EYrBnHN4OB4Nk4dni70ROQMLkzTjMEIWhOEYiwNMKAzB5qgAeQAaWRDRe2qABlMB9nMZBBxwVU4BwzBhAhQwJwxadsQQAAmRd8RXPA1wpN1qVpfJkj3akD2pI9eX5LIcgvQpXAYW8GHvcpHwMZ9XFfSsP0PH8WD-OA1EA2DkDQno+gGJ4RlaZAcFAJBlFfPMtMLYQUCYkMUAYT92SWW8li5dYH3jUCkwgqCMAzZDNCAA
 */
export const createInstance = (
    type: IntrinsicElement,
    props: any,
    // rootContainer: Container,
): WrapperInstance => {
    switch (type) {
        case "EmbedWrapper":
            return {
                type,
                embed: props.embed,
            }

        case "Text":
            return {
                type,
                text: {
                    content: parseTextNode(props.children),
                },
            }

        case "ActionRowWrapper":
            return {
                type,
                actionRow: props.actionRow,
            }

        default:
            throw new TypeError(`Bad Node <${type}/>`)
    }
}
