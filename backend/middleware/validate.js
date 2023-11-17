const { validationResult } = require('express-validator')
const logger = require('../config/logger');

const validate =(schema) =>{
       return schema,(req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.info(`input data validation failed`)
            return res.status(400).json({ error:"input validation",errors: errors.array() });
        }
        next();
    } 
}

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error:"input validation",errors: errors.array() });
    }
    next();
};


module.exports = {
    validate,
    handleValidationErrors
}
