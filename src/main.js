import { logger } from "./application/logger.js";
import { web } from "./application/web.js";
import "dotenv/config";

web.listen(3000, 'localhost', () => {
  logger.info('Server is running in port ' + process.env.APP_PORT);
});