import { Container } from "./types"

export const clearContainer = (container: Container) => {
    container = {
        client: container.client,
        notify: container.notify,
        content: { embeds: [], components: [], text: { content: "" } },
    }
}
