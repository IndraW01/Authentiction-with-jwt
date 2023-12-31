import { PrismaClient } from "@prisma/client";
import { logger } from "./logger.js";

export const prisma = new PrismaClient(
  {
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'error',
      },
      {
        emit: 'event',
        level: 'info',
      },
      {
        emit: 'event',
        level: 'warn',
      },
    ],
    errorFormat: "pretty",
  }
)

prisma.$on('query', (e) => {
  logger.info(e);
})
prisma.$on('error', (e) => {
  logger.info(e);
})
prisma.$on('info', (e) => {
  logger.info(e);
})
prisma.$on('warn', (e) => {
  logger.info(e);
})