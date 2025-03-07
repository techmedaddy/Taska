import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/blockchain.log" })
    ]
});

/**
 * Logs messages at different levels.
 */
export function logInfo(message: string) {
    logger.info(message);
}

export function logError(message: string) {
    logger.error(message);
}
