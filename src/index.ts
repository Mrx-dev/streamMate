import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { ExtendedClient } from '../types/ExtendedClient';
import { loadCommands } from '../handlers/commandHandler';
import { loadEvents } from '../handlers/eventHandler';
import { registerCommands } from './registerCommands';
config();

const client: ExtendedClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
}) as ExtendedClient;

client.commands = new Collection();
client.registeredCommands = [];

(async () => {
  await client.login(process.env.TOKEN);
  await loadEvents(client);
  await loadCommands(client);
  await registerCommands(client, process.env.TEST_GUILD_ID!, process.env.TOKEN!, client.registeredCommands);
})();
