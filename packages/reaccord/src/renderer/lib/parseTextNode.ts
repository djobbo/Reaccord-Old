import { ReactNode } from "react"
import { hasOwnProperty } from "../../util/hasOwnProperty"

export const parseTextNode = (el: ReactNode): string => {
    if (typeof el === "undefined" || el === null) return ""

    if (Array.isArray(el)) return parseTextNodeGroup(el)

    if (typeof el !== "object") return el.toString()

    if (!hasOwnProperty(el, "type")) return ""

    switch (el.type) {
        case "Span":
            const decoration =
                (el.props.bold ? "**" : "") + (el.props.italic ? "*" : "")
            return decoration + parseTextNode(el.props.children) + decoration
        case "Link":
            return `[${parseTextNode(el.props.children)}](${parseTextNode(
                el.props.href,
            )})`
        case "Br":
            return `\n`
        default:
            return parseTextNode(el.props?.children ?? "")
    }
}

const parseTextNodeGroup = (els): string =>
    els.reduce((text, el) => text + parseTextNode(el), "")
