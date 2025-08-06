const Client = require("../models/client.model")



const createClient = async(req, res) =>{

    try {
        const trainerId = req.user.id;

        const newClient = new Client({
            ...req.body,
            trainerId:trainerId
        })

        const client = await newClient.save();
        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}


module.exports = {createClient}