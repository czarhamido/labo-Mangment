const experss =require('express');
const router=require('express').Router();

const Client =require("../models/client");

//getting all client

router.get('/',async (req,res)=>{
    try {
        const clients=await Client.find();
        res.json(clients);
    }catch (err){
        res.status(500).json({ message: err.message })
    }
})
//creat one client
router.post('/',async (req,res)=>{
    const client=new Client({
        name:req.body.name,
        number:req.body.number,
        nameanalyse:req.body.nameanalyse,
        priceanalyse:req.body.priceanalyse
    })
    try {
        const newClient=await client.save();
        res.status(201).json(newClient);
        
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
})

//delete One Client
router.delete('/:id',getClient,async(req,res)=> {
    try {
        await res.client.remove();
        res.json({ message: 'Deleted Client' })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


//
async function getClient(req,res,next) {
    let client
    try {
        client=await Client.findById(req.params.id);
        if(client===null) {
            return res.status(404).json({ message: 'Cannot find client' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.client=client;
    next();
}


module.exports = router;