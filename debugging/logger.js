const { createLogger, format, transports } = require('winston');

const logDir = 'logs';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'PPRM' },
  transports: [
    new transports.File({ filename: `${logDir}/error.log`, level: 'error' }),
    new transports.File({ filename: `${logDir}/combined.log` }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: `${logDir}/exceptions.log` }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: `${logDir}/rejections.log` }),
  ],
});

const consoleLogFormat = format.printf(
  (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`,
);

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        consoleLogFormat,
        format.json(),
        format.splat(),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
      ),
    })
  );
}

module.exports = logger;
