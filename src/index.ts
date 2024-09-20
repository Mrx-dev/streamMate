import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { ExtendedClient } from '../types/ExtendedClient';
import { checkEnv } from './helpers/checkEnv';
import { loadCommands } from '../handlers/commandHandler';
import { loadEvents } from '../handlers/eventHandler';
import { registerCommands } from './registerCommands';
import { logger } from './helpers/logger';

config();
const client: ExtendedClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
}) as ExtendedClient;

client.commands = new Collection();
client.registeredCommands = [];

(async () => {
  await checkEnv();
  await client.login(process.env.TOKEN);
  await loadEvents(client);
  await loadCommands(client);
  await registerCommands(client, process.env.TEST_GUILD_ID!, process.env.TOKEN!, client.registeredCommands);
})();

process.on('uncaughtException', (err) => logger.error(err));
