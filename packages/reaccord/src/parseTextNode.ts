export const parseTextNode = (el): string => {
    if (typeof el === "undefined" || el === null) return ""

    if (Array.isArray(el)) return parseTextNodeGroup(el)

    if (typeof el !== "object") return el.toString()

    switch (el.type) {
        case "Span":
            const decoration =
                (el.props.bold ? "**" : "") + (el.props.italic ? "*" : "")
            return decoration + parseTextNode(el.props.children) + decoration
        case "Link":
            return `[${parseTextNode(el.props.children)}](${parseTextNode(
                el.props.href,
            )})`
        default:
            return parseTextNode(el.props?.children ?? "")
    }
}

const parseTextNodeGroup = (els): string =>
    els.reduce((text, el) => text + parseTextNode(el), "")
