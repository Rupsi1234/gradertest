const winston = require('winston');
var date = new Date();
const fs = require('fs');
const logDir = 'logs';
var dateFormat = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}_${date.getHours()}Hour_${date.getMinutes()}Min_${date.getSeconds()}sec`
const logger = winston.createLogger({

  format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss.SSS'
            }),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
        ), 

  transports: [
    
    new (winston.transports.Console)({
      colorize: true,
      level: 'debug'
    }),
     new (winston.transports.Console)({
      colorize: true,
      level: 'info'
    }),
      new (winston.transports.Console)({
      colorize: true,
      level: 'error'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/info_${dateFormat}.log`,
      level: 'debug'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/error_${dateFormat}.log`,
      level: 'error'
    })
  ]
});
global.logger = logger;