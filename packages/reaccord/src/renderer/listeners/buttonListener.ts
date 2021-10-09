import { ButtonInteraction, Interaction } from "discord.js"

export const getButtonListener =
    (customId: string, onClick?: (interaction: ButtonInteraction) => void) =>
    (interaction: Interaction) => {
        if (!interaction.isButton()) return
        if (interaction.customId !== customId) return
        onClick?.(interaction)
        interaction.deferUpdate()

        // const { maxAge, client } = rootContainer

        // client?.removeListener("interactionCreate", listener)

        // TODO: Max Age
        // if (!maxAge || maxAge === Infinity) {
        //     client?.once("interactionCreate", listener)
        //     return
        // }

        // try {
        //     let timestamp = hasOwnProperty(
        //         interaction.message,
        //         "timestamp",
        //     )
        //         ? parseInt(interaction.message.timestamp)
        //         : interaction.message.createdTimestamp

        //     console.log({ maxAge }, Date.now() - timestamp)

        //     if (!timestamp || Date.now() - timestamp < maxAge)
        //         rootContainer.client?.once(
        //             "interactionCreate",
        //             listener,
        //         )
        // } catch (e) {
        //     console.error(`Couldn't parse Message Timestamp.`)
        // }
    }
