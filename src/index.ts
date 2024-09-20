import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { ExtendedClient } from './types/ExtendedClient';
import { checkEnv } from './helpers/checkEnv';
import { loadCommands } from './handlers/commandHandler';
import { loadEvents } from './handlers/eventHandler';
import { registerCommands } from './registerCommands';
import { coreLogger } from './helpers/logger';
import { streamer } from './streamer';

config();

const client: ExtendedClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
}) as ExtendedClient;

client.commands = new Collection();
client.registeredCommands = [];
/**
 * TODOS:
 * Create streamer.ts file in src for selfbot and export the streamer object
 * Import the streamer.ts file in index.ts and let it login
 * Create stream Command and let the bot stream the video
 * Good Luck.
 */
(async () => {
  await checkEnv();
  await streamer.client.login(process.env.SELF_TOKEN);
  await client.login(process.env.TOKEN);
  await loadEvents(client);
  await loadCommands(client);
  await registerCommands(client, process.env.TEST_GUILD_ID!, process.env.TOKEN!, client.registeredCommands);
})();

process.on('uncaughtException', (err) => coreLogger.error(err));
