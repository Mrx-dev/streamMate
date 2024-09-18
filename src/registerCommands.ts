import { Client, REST, Routes, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';

export const registerCommands = async (
  client: Client,
  guildId: string,
  token: string,
  commands: RESTPostAPIApplicationCommandsJSONBody[]
) => {
  try {
    const clientId = client.user?.id;

    if (!clientId) {
      throw new Error('Client ID not available. Make sure the client is logged in.');
    }

    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const rest = new REST({ version: '10' }).setToken(token);

    // Update the commands for the guild
    const data: any = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(`Error refreshing commands:`, error);
  }
};
