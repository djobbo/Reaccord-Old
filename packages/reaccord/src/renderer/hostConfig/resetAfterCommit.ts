import { Container } from "./types"

export const resetAfterCommit = (container: Container) => {
    container.onUpdate?.(container.content)
}
