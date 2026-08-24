import logger from "../config/logger";

const loggerMiddleware = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalURL
  });

  next();
};

export default loggerMiddleware;
