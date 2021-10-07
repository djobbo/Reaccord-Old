import { Client } from "discord.js"
import { ReactNode } from "react"
import ReactReconciler from "react-reconciler"
import { getHostConfig } from "./getHostConfig"
import { Container, NotifyFunction } from "./types"

const hostConfig = getHostConfig()

const reconciler = ReactReconciler(hostConfig as any) // TODO: Fix type

export const renderMessage = (
    embedElement: ReactNode,
    client?: Client | null,
    onUpdate?: NotifyFunction,
) => {
    let container: Container = {
        client,
        notify: onUpdate,
        content: { embeds: [], components: [], text: { content: "" } },
    }
    let reactContainer = reconciler.createContainer(container, 0, false, null)
    reconciler.updateContainer(embedElement, reactContainer, null, null)
}
