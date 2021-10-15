import { useEmbed } from "./Embed"
import { ColorResolvable } from "discord.js"

interface Props {
    color?: ColorResolvable
}

export const Color = ({ color }: Props) => {
    const { embed } = useEmbed()

    embed.setColor(color ?? "DEFAULT")

    return null
}
