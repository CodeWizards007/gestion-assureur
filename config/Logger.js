
const { createLogger, format, transports } = require('winston');
//const config = require('config');
const { splat, combine, timestamp, label, printf, simple,colorize } = format;

const Format = printf( ({ level, message, timestamp}) => {
   return `${timestamp} [${level}] : ${message} `

});
const logger = createLogger({
    format: combine(
        //label({ label: 'MSG', message: true }),
        colorize({ all: true }),
        timestamp(),
        Format,
        splat(),
    ),
    transports: [
        new transports.Console({level: 'info'}),
         new transports.File({ filename: "../logs/debug.log", level: 'debug'})
      ]
});


module.exports = logger;