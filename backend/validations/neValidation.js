const { body, param } = require("express-validator");
const { isValidMongoId, isValidInet4Address } = require("./customValidation");

const reqBody = [
    body("name", "NE name is required").trim().notEmpty().isLength({ max: 100 }),
    body("ip").trim().notEmpty().custom(isValidInet4Address),
    body("model").trim().notEmpty().isLength({ max: 50 }),
    body("aggregatingPe").trim().notEmpty().isLength({ max: 100 }),
    body("peIp.peIp1").trim().notEmpty().custom(isValidInet4Address),
    body("peIp.peIp2").trim().optional().custom(isValidInet4Address),
    body("carrierVlan.*").isInt(),
    body("peInterface").trim().notEmpty(),
    body("deviceType").trim().notEmpty(),
];

const neId = [
    param("id").custom(isValidMongoId).withMessage("Invalid Mongo ID"),
];

const addNe = reqBody;

const updateNE = [neId, reqBody];

module.exports = {
    addNe,
    neId,
    updateNE,
};
