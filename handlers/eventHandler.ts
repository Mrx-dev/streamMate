import { ExtendedClient } from '../types/ExtendedClient';
import fs from 'fs';
import path from 'path';
import { logger } from '../src/helpers/logger';

export const loadEvents = (client: ExtendedClient) => {
  const eventsPath = path.join(__dirname, '../src/events');
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.ts'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);

    import(filePath)
      .then((event) => {
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args, client));
        } else {
          client.on(event.name, (...args) => event.execute(...args, client));
        }
      })
      .catch((err) => {
        logger.error(`Error loading event ${filePath}: ${err}`);
      });
  }
};
