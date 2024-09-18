import { Client, Collection } from 'discord.js';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';

export interface ExtendedClient extends Client {
  commands: Collection<string, any>;
  registeredCommands: RESTPostAPIApplicationCommandsJSONBody[];
}
