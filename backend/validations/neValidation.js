const { body, param } = require("express-validator");
const { isValidMongoId, isValidIpAddress } = require("./customValidation");

const reqBody = [
    body("name", "NE name is required").trim().notEmpty().isLength({ max: 100 }),
    body("ip").trim().notEmpty().custom(isValidIpAddress),
    body("model").trim().notEmpty().isLength({ max: 50 }),
    body("aggregatingPe").trim().notEmpty().isLength({ max: 100 }),
    body("peIp.peIp1").trim().notEmpty().custom(isValidIpAddress),
    body("peIp.peIp2").trim().optional().custom(isValidIpAddress),
    body("carrierVlan.*").isInt(),
    body("peInterface").trim().notEmpty(),
    body("deviceType").trim().notEmpty(),
];

const neId = [
    param("id").custom(isValidMongoId).withMessage("Invalid Mongo ID"),
];

const updateNE = [neId, reqBody];

module.exports = {
    reqBody,
    neId,
    updateNE,
};
