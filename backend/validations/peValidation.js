const { body, param } = require("express-validator");
const { isValidMongoId, isValidIpAddress } = require("./customValidation");

const reqBody = [
    body("name", "NE name is required").trim().notEmpty().isLength({ max: 100 }),
    body("model").trim().notEmpty().isLength({ max: 50 }),
    body("peIp1").trim().notEmpty().custom(isValidIpAddress),
    body("peIp2").trim().optional().custom(isValidIpAddress),
    body("peInterface1").trim().notEmpty().isLength({ max: 50 }),
    body("peInterface2").trim().optional().isLength({ max: 50 }),
    body("peInterface3").trim().optional().isLength({ max: 50 }),
    body("deviceType").trim().notEmpty(),
    body("mcLag").isBoolean()
];

const peId = [
    param("id").custom(isValidMongoId).withMessage("Invalid Mongo ID"),
];

const updatePE = [reqBody, peId]

module.exports = {
    reqBody,
    peId,
    updatePE
}