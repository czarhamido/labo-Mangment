const experss =require('express');
const router=require('express').Router();

const Analyse =require("../models/analyse");

//getting all Analyse

router.get('/',async (req,res)=>{
    try {
        const analyse=await Analyse.find();
        res.json(analyse);
    }catch (err){
        res.status(500).json({ message: err.message })
    }
})
//getting One analyse
router.get('/:name', getAnalyseByname, (req, res) => {
    res.json(res.analyse)
  })
  
//creat one Analyse
router.post('/',async (req,res)=>{
    const analyse=new Analyse({
        name:req.body.name,
        price:req.body.price,
    })
    try {
        const newAnalyse=await analyse.save();
        res.status(201).json(newAnalyse);
        
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
})

//delete One Analyse
router.delete('/:id',getAnalyse,async(req,res)=> {
    try {
        await res.analyse.remove();
        res.json({ message: 'Deleted analyse' })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


//
async function getAnalyse(req,res,next) {
    let analyse
    try {
        analyse=await Analyse.findById(req.params.id);
        
        if(analyse===null) {
            return res.status(404).json({ message: 'Cannot find analyse' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.analyse=analyse;
    next();
}

async function getAnalyseByname(req,res,next) {
    let analyse
    try {
        analyse=await Analyse.findOne({'name:':req.params.name})
        
        if(analyse===null) {
            return res.status(404).json({ message: 'Cannot find analyse' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.analyse=analyse;
    next();
}


module.exports = router;