import { Channel, Client } from "discord.js"
import { ReactNode } from "react"
import ReactReconciler from "react-reconciler"
import { hostConfig } from "./hostConfig"
import { Container, NotifyFunction } from "./hostConfig/types"

const reconciler = ReactReconciler(hostConfig as any) // TODO: Fix type

interface Options {
    client?: Client | null
    onUpdate?: NotifyFunction
    maxAge?: number
    messageId?: string
}

export const renderMessage = (messageElement: ReactNode, options: Options) => {
    let container: Container = {
        content: { embeds: [], components: [], text: { content: "" } },
        ...options,
    }

    let reactContainer = reconciler.createContainer(container, 0, false, null)
    reconciler.updateContainer(messageElement, reactContainer, null, null)
}
