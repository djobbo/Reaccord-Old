import { Container } from "./types"

export const resetAfterCommit = (container: Container) => {
    if (!container.notify) return
    container?.notify(container.content)
}
