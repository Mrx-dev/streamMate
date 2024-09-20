import { createLogger, format, transports } from 'winston';
import path from 'path';
import { format as formatDate } from 'date-fns';

const logFormat = format.printf(({ level, message, timestamp, label }) => {
  return `${timestamp} [${label}] [${level}]: ${message}`;
});

const getLogFileName = (): string => {
  const now = new Date();
  const formattedDate = formatDate(now, 'yyyy-MM-dd HH-mm-ss');
  return `${formattedDate}-streamMate.log`;
};

export const createBotLogger = (botName: string) => {
  return createLogger({
    level: 'info',
    format: format.combine(format.label({ label: botName }), format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: path.join('./logs', getLogFileName()),
      }),
    ],
  });
};

export const clientLogger = createBotLogger('Client Bot');
export const streamerLogger = createBotLogger('Streamer Bot');
export const coreLogger = createBotLogger('Core');
