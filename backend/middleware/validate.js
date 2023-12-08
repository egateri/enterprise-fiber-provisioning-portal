const { validationResult } = require('express-validator')
const logger = require('../config/logger');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error:"input validation",errors: errors.array() });
    }
    next();
};


module.exports = {
    handleValidationErrors
}
