import { Client } from "discord.js"
import { ReactNode } from "react"
import ReactReconciler from "react-reconciler"
import { hostConfig } from "./hostConfig"
import { Container, NotifyFunction } from "./hostConfig/types"

const reconciler = ReactReconciler(hostConfig as any) // TODO: Fix type

export const renderMessage = (
    messageElement: ReactNode,
    client?: Client | null,
    onUpdate?: NotifyFunction,
    maxAge: number = Infinity,
) => {
    let container: Container = {
        client,
        notify: onUpdate,
        content: { embeds: [], components: [], text: { content: "" } },
        maxAge,
    }
    let reactContainer = reconciler.createContainer(container, 0, false, null)
    reconciler.updateContainer(messageElement, reactContainer, null, null)
}
