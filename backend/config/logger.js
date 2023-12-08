const {format,createLogger,transports} = require('winston');

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = createLogger({
  level:'info',
  format: format.combine(
    enumerateErrorFormat(),
    format.uncolorize(),
    format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }), 
    format.splat(),
    format.simple(),
    format.printf(({ level, message, timestamp }) => `${timestamp} | ${level} | ${message}`)
  ),

  transports: [
    new transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = logger;