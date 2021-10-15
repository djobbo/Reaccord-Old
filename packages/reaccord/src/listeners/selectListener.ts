import { SelectMenuInteraction, Interaction } from "discord.js"

export const getSingleSelectListener =
    (
        messageId: string,
        customId: string,
        onChange?: (value: string, interaction: SelectMenuInteraction) => void,
    ) =>
    (interaction: Interaction) => {
        if (!interaction.isSelectMenu()) return
        if (interaction.message.id !== messageId) return
        if (interaction.customId !== customId) return

        onChange?.(interaction.values[0], interaction)

        interaction.deferUpdate()

        // TODO: Max Age
    }

export const getMultipleSelectListener =
    (
        customId: string,
        onChange?: (
            value: string[],
            interaction: SelectMenuInteraction,
        ) => void,
    ) =>
    (interaction: Interaction) => {
        if (!interaction.isSelectMenu()) return
        if (interaction.customId !== customId) return

        onChange?.(interaction.values, interaction)

        interaction.deferUpdate()

        // TODO: Max Age
    }
