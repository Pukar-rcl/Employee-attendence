import logger from "../config/logger.js";

const loggerMiddleware = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl
  });

  next();
};

export default loggerMiddleware;
