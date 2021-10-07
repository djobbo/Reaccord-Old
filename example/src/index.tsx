import { renderMessage } from "reaccord"
import { Counter } from "./Counter"
import {
    Client,
    Intents,
    Message as DiscordMessage,
    MessageActionRow,
} from "discord.js"
import { config as loadEnv } from "dotenv"

loadEnv()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
})

client.on("messageCreate", async ({ author, content, channel }) => {
    if (author.bot) return

    if (content !== "..") return

    let msg: DiscordMessage

    renderMessage(<Counter />, client, async (message) => {
        if (msg)
            msg.edit({
                content: message.text.content,
                embeds: message.embeds as any,
                components: message.components.map((row) => ({
                    type: "ACTION_ROW",
                    components: row as any,
                })),
            })
        else
            msg = await channel.send({
                content: message.text.content,
                embeds: message.embeds as any,
                components: message.components.map((row) => ({
                    type: "ACTION_ROW",
                    components: row as any,
                })),
            })
    })
})

client.on("ready", () =>
    console.log(`🤖 Discord Bot logged in as ${client.user?.username}`),
)

client.login(process.env.DISCORD_TOKEN)
