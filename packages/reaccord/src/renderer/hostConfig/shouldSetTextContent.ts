import { IntrinsicElement } from "../nodes"

const textContainers: IntrinsicElement[] = [
    "Text",
    "Title",
    "Field",
    "Button",
    "LinkButton",
    "Option",
]

export const shouldSetTextContent = (type: IntrinsicElement) =>
    textContainers.includes(type)
