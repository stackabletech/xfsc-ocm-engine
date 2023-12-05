import { existsSync, mkdirSync } from 'fs';
import { Logger } from 'winston';
const { ecsFormat } = require('@elastic/ecs-winston-format');

import winston = require('winston');
// import { ElasticsearchTransport } from 'winston-elasticsearch';
import { LoggerConfig } from '@common/constants';

if (!existsSync(LoggerConfig.lOG_DIR)) {
  mkdirSync(LoggerConfig.lOG_DIR);
}

// const esTransportOpts = {
//   clientOpts: { node: 'http://localhost:9200/' },
// };

// const esTransport = new ElasticsearchTransport(esTransportOpts);

// esTransport.on('error', (error) => {
//   console.error(error);
// });

const logger: Logger = winston.createLogger({
  format: ecsFormat({ convertReqRes: true }),

  transports: [
    new winston.transports.Console(),

    // new winston.transports.File({
    //   // path to log file
    //   filename: LoggerConfig.FILE_PATH,
    // }),
    // Path to Elasticsearch
    // esTransport,
  ],
});

logger.on('error', (error) => {
  console.error('Error in logger caught', error);
});

export default logger;
