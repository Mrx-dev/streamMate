import { Client, Events } from 'discord.js';
import { logger } from '../helpers/logger';
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    logger.info(`Ready! Logged in as ${client.user?.tag}`);
  },
};
