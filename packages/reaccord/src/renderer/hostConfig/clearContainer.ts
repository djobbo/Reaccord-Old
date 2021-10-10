import { Container } from "./types"

export const clearContainer = (container: Container) => {
    container = {
        client: container.client,
        onUpdate: container.onUpdate,
        content: { embeds: [], components: [], text: { content: "" } },
    }
}
