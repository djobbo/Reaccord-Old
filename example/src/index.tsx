import { renderMessage } from 'reaccord';
import { Message } from './Message';
import { Client, Intents, Message as DiscordMessage } from 'discord.js';
import { config as loadEnv } from 'dotenv';

loadEnv();

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
});

client.on('messageCreate', async ({ author, content, channel }) => {
	if (author.bot) return;

	if (content !== '..') return;

	let msg: DiscordMessage;

	renderMessage(client, <Message />, async (message) => {
		if (msg)
			msg.edit({
				content: (message as any).text,
				embeds: (message as any).embeds,
				components: (message as any).components.map((row) => ({
					type: 1,
					components: row,
				})),
			});
		else
			msg = await channel.send({
				content: (message as any).text,
				embeds: (message as any).embeds,
				components: (message as any).components.map((row) => ({
					type: 1,
					components: row,
				})),
			});
	});
});

client.on('ready', () =>
	console.log(`🤖 Discord Bot logged in as ${client.user?.username}`)
);

client.login(process.env.DISCORD_TOKEN);
