import { sendMessage } from "reaccord"
import { Counter } from "./Counter"
import { Client, Intents } from "discord.js"
import { config as loadEnv } from "dotenv"
import { Post } from "./Post"

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

    if (content === "..") {
        sendMessage(<Counter />, channel, client)
        return
    }

    if (content === "--") {
        sendMessage(<Post />, channel, client)
        return
    }
})

client.on("ready", () =>
    console.log(`🤖 Discord Bot logged in as ${client.user?.username}`),
)

client.login(process.env.DISCORD_TOKEN)
