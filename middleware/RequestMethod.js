const logger = require("../config/Logger");

const RequestMethod =  (req, res, next) => {
    // NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
    const allowedMethods = [
        "OPTIONS",
        "HEAD",
        "CONNECT",
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
    ];

    if (!allowedMethods.includes(req.method)) {
        logger.error(`${req.method} not allowed.`);
        return res.status(405).send(`${req.method} not allowed.`);
    }
    next();
};

module.exports = RequestMethod;