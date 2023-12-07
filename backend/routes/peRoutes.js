const express = require("express");
const PE = require("../model/providerEdgeRouter");
const logger = require("../config/logger");
const { reqBody, peId, updatePE } = require("../validations/peValidation");
const { handleValidationErrors } = require("../middleware/validate");
const  verifyToken = require("../middleware/authentication")

const router = express.Router();

router.use(verifyToken);

//add PE
router.post("/", reqBody, handleValidationErrors, async (req, res) => {
    const pe = req.body;
    try {
        const foundPe = await PE.findOne({ peIp1: pe.peIp1 });
        if (foundPe) {
            logger.info("PE with IP => %s already exists", foundPe.peIp1);
            return res.status(400).json({
                statusCode: 400,
                successMessage: null,
                errorMessage: "PE with provided IP already exists",
                data: null,
            });
        }
        const newPe = await PE.create(pe);
        logger.info("PE added successfully: %s - %s", pe.name, pe.peIp1);
        res.status(201).json({
            statusCode: 201,
            successMessage: "PE added successfully",
            errorMessage: null,
            data: null,
        });
    } catch (error) {
        logger.info("error encountered when creating PE");
        res.status(400).json({ error: error.name, errorMessage: error.message });
    }
});
//get pe by ID
router.get("/:id", peId, handleValidationErrors, async (req, res) => {
    const { id } = req.params;
    try {
        const foundPe = await PE.findById(id);
        if (!foundPe) {
            logger.info("PE with id %s not found", id);
            return res
                .status(404)
                .json({ statusCode: 404, errorMessage: "PE not found" });
        }
        res.status(200).json({
            statusCode: 200,
            successMessage: "PE fetched successfully",
            errorMessage: null,
            data: foundPe,
        });
    } catch (error) {
        logger.info("error encountered when fetching PE");
        res.status(400).json({ error: error.name, errorMessage: error.message });
    }
});

//get all PEs
router.get("/", async (req, res) => {
    try {
        const pes = await PE.find();
        const activePes = pes.filter((pe) => pe.deleted === false);
        res.status(200).json({
            statusCode: 200,
            successMessage: "PEs fetched successfully",
            errorMessage: null,
            data: activePes,
        });
    } catch (error) {
        logger.info("error encountered whn fetching PEs");
        res.status(400).json({ error: error.name, errorMessage: error.message });
    }
});

//update PE
router.put("/:id", updatePE, handleValidationErrors, async (req, res) => {
    const id = req.params.id;
    const updatedPE = req.body;
    try {
        const foundPe = await PE.findById(id);
        if (!foundPe) {
            logger.info("PE with id %s not found", id);
            return res
                .status(404)
                .json({ statusCode: 404, errorMessage: "PE not found" });
        }
        const updatePE = await PE.findByIdAndUpdate(id, updatedPE, {
            upsert: true,
        });
        logger.info("PE %s details updated", updatedPE.name);
        res.status(200).json({
            statusCode: 200,
            successMessage: "PE details updated successfully",
            errorMessage: null,
            data: null,
        });
    } catch (error) {
        logger.info("error encountered updating PE details");
        res.status(400).json({ error: error.name, errorMessage: error.message });
    }
});

//delete PE

router.delete("/:id", peId, handleValidationErrors, async (req, res) => {
    const id = req.params.id;
    const deletePe = { deleted: true };
    try {
        await PE.updateOne({ _id: id }, deletePe);
        logger.info("PE deleted");
        res.status(200).json({
            statusCode: 200,
            successMessage: "PE deleted successfully",
            errorMessage: null,
            data: null,
        });
    } catch (error) {
        logger.info("error encountered deleting PE");
        res.status(400).json({ error: error.name, errorMessage: error.message });
    }
});

module.exports = router;
