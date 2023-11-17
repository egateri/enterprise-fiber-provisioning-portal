const express =  require("express")
const NE =require("../model/networkEquipment");
const logger = require("../config/logger");
const { handleValidationErrors } = require("../middleware/validate")
const { addNe,neId,updateNE } = require("../validations/neValidation")

const router =  express.Router();


//add ne
router.post('/',addNe,handleValidationErrors,async(req,res) => {
    const ne = req.body;
    // console.log(ne)
    try {
        const foundNe = await NE.findOne({ip:ne.ip});
        if (foundNe){
            logger.info("cannot add, Ne with IP => %s already exists",foundNe.ip);
            return res.status(400).json({
                statusCode:400,
                successMessage:null,
                errorMessage:"NE with provided IP already exists",
                data:null
        })
         
        }
        const newNe = await NE.create(ne);
        logger.info('network equipment added successfully: %s - %s',ne.name, ne.ip)
        res.status(201).json({
            statusCode:201,
            successMessage:"NE added successfully",
            errorMessage:null,
            data:null
    })
        
    } catch (error) {
        logger.info("error encountered when creating Network equipment")
        res.status(400).json({error:error.name,errorMessage:error.message})        
    }
});

//get all nes
router.get("/",async (req, res) => {
    try {
        const nes = await NE.find();
        // console.log(nes);
        const activeNes = nes.filter(ne => ne.deleted === false);
        res.status(200).json({
            statusCode:200,
            successMessage:"NEs fetched successfully",
            errorMessage:null,
            data:activeNes
    })

    } catch (error) {
        logger.info("error encountered whn fetching NEs")
        res.status(400).json({error:error.name,errorMessage:error.message})        
    }

});

//get ne by id
router.get('/:id',neId,handleValidationErrors,async (req, res) => {
    const { id } = req.params;
    try {
        const foundNe = await NE.findById(id);
        if(!foundNe) {
            logger.info("Ne with id %s not found", id);
            return res.status(404).json({statusCode:404,errorMessage:"user not found"})
        }; 
        res.status(200).json({
            statusCode:200,
            successMessage:"NE fetched successfully",
            errorMessage:null,
            data:foundNe
    })
        
    } catch (error) {
        logger.info("error encountered when fetching NE")
        res.status(400).json({error:error.name,errorMessage:error.message})        
    }

})
//get ne by name
//get ne by ip

//update ne
router.put('/:id',updateNE,handleValidationErrors,async (req, res) =>{
    const id = req.params.id
    const updatedNE = req.body
    try {
        const foundNe = await NE.findById(id);
        if(!foundNe) {
            logger.info("Ne with id %s not found", id);
            return res.status(404).json({statusCode:404,errorMessage:"user not found"})
        };
        const updateNE = await NE.findByIdAndUpdate(id,updatedNE,{ upsert: true })
        logger.info("Ne %s details updated", updatedNE.name);
        res.status(200).json({
            statusCode:200,
            successMessage:"Ne details updated successfully",
            errorMessage:null,
            data:null
    })        
    } catch (error) {
        logger.info("error encountered updating NE details")
        res.status(400).json({error:error.name,errorMessage:error.message})      
    }

})

//delete ne
router.delete('/:id',neId,handleValidationErrors,async (req, res) => {
    const id = req.params.id;
    const deleteNe = {deleted:true}
    try {
        await NE.updateOne({_id:id},deleteNe)
        logger.info("Ne deleted");
        res.status(200).json({
            statusCode:200,
            successMessage:"Ne deleted successfully",
            errorMessage:null,
            data:null
    })
        
    } catch (error) {
        logger.info("error encountered deleting NE")
        res.status(400).json({error:error.name,errorMessage:error.message})  
    }
})





module.exports = router;