import { sendMessage } from "reaccord"
import { Counter } from "./Counter"
import { Client, Intents } from "discord.js"
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

    sendMessage(<Counter />, channel, client, 10 * 1000)
})

client.on("ready", () =>
    console.log(`🤖 Discord Bot logged in as ${client.user?.username}`),
)

client.login(process.env.DISCORD_TOKEN)
