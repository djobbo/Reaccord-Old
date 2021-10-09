import { ParentInstance } from "./instances"

export const commitUpdate = (instance: ParentInstance, updatePayload) => {
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
}
