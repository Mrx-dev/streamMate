import { Client, REST, Routes, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
import { clientLogger } from './helpers/logger';

export const registerCommands = async (
  client: Client,
  guildId: string,
  token: string,
  commands: RESTPostAPIApplicationCommandsJSONBody[]
) => {
  try {
    const clientId = client.user?.id;

    if (!clientId) {
      clientLogger.error('Client ID not available. Make sure the client is logged in.');
      process.exit(-1);
    }

    clientLogger.info(`Started refreshing ${commands.length} application (/) commands.`);

    const rest = new REST({ version: '10' }).setToken(token);
    let data: any;
    // Update the commands for the guild
    if (process.env.NODE_ENV === 'production') {
      data = await rest.put(Routes.applicationCommands(clientId), { body: commands });
    } else if (process.env.NODE_ENV === 'development') {
      data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    }
    clientLogger.info(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    clientLogger.error(`Error refreshing commands:`, error);
  }
};
