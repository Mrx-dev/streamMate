import { ExtendedClient } from '../types/ExtendedClient';
import fs from 'fs';
import path from 'path';
import { Command } from '../types/commandType';
import { logger } from '../src/helpers/logger';

export const loadCommands = async (client: ExtendedClient) => {
  const foldersPath = path.join(__dirname, '../src/commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);

      try {
        const command: Command = await import(filePath);

        if ('data' in command && 'execute' in command) {
          client.commands.set(command.data.name, command);
          client.registeredCommands.push(command.data.toJSON());
        } else {
          logger.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
      } catch (err) {
        logger.error(`Error loading command at ${filePath}: ${err}`);
      }
    }
  }
};
