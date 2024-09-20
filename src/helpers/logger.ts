import { createLogger, format, transports } from 'winston';
import path from 'path';
import { format as formatDate } from 'date-fns';

const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const getLogFileName = (): string => {
  const now = new Date();
  const formattedDate = formatDate(now, 'yyyy-MM-dd HH-mm-ss'); // Avoid invalid characters like ':' in filenames
  return `${formattedDate}-streamMate.log`;
};

export const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join('./logs', getLogFileName()),
    }),
  ],
});
