import { Container } from "./types"

export const resetAfterCommit = (container: Container) => {
    if (!container.onUpdate) return
    container?.onUpdate(container.content)
}
