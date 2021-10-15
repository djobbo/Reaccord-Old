import { useEmbed } from "./Embed"
import { parseTextNode } from "../../lib"
import { ReactNode } from "react"

interface Props {
    children?: ReactNode
}

export const Title = ({ children }: Props) => {
    const { embed } = useEmbed()

    embed.setTitle(parseTextNode(children))

    return null
}
