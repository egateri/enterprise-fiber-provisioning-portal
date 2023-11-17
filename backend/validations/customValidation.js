const logger = require('../config/logger')

const isValidMongoId = (value) => {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(value);
};

const IPV4_REGEX = /^(?:\d{1,3}\.){3}\d{1,3}$/;

const isValidInet4Address = (ip) => {
    if (ip === null) {
        logger.info('IP cannot be null');
        return false;
    }

    if (!IPV4_REGEX.test(ip)) {
        logger.info('IP does not match pattern');
        return false;
    }

    const parts = ip.split('.');

    try {
        for (const segment of parts) {
            if (parseInt(segment) > 255 || (segment.length > 1 && segment.startsWith('0'))) {
                logger.info('An Octet value { %s } is greater than 255 or starts with 0.',segment);
                return false;
            }
        }
} catch (error) {
    return false;
}

return true;
  }


module.exports = {
    isValidMongoId,
    isValidInet4Address
}