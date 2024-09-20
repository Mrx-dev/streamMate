import { Client } from 'discord.js-selfbot-v13';
import { Streamer } from '@dank074/discord-video-stream';
import { streamerLogger } from './helpers/logger';

export const streamer = new Streamer(new Client());

streamer.client.on('ready', (client) => {
  streamerLogger.info(`Ready! Logged in as ${client.user?.tag}`);
});
