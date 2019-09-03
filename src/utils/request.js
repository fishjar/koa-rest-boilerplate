import rp from "request-promise";
import logger from "./logger";

/**
 * request封装
 */
export default options => {
  return rp({ json: true, ...options })
    .then(res => res)
    .catch(function({ name, statusCode, message, options }) {
      logger.error(
        `${name} ${statusCode} ${message} ${JSON.stringify(options)}`
      );
    });
};
