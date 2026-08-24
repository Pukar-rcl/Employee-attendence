import pino from "pino";

const logger = pino(
  pino.transport({
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid"
    }
  })
);

export default logger;
