const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Bauturi = require ("../schema/bautura.js");

router.get("/", (req,res)=>{
    Bauturi.find().exec().then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); 
    })    
});

router.post("/addBautura", (req,res) =>{
    const bautura = new Bauturi({
        _id : mongoose.Types.ObjectId(),
        nume: req.body.nume,
        cantitate: req.body.cantitate,
        tip: req.body.tip,
        locatie: req.body.locatie,
        imagine: req.body.imagine
    });

    bautura.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Bautura salvata!",
            BauturaAdaugat: bautura
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.get("/:bauturaId", (req,res) => {
    const id = req.params.bauturaId;
    Bauturi.findById(id).exec().then(doc=>{
        console.log("From database ", doc);
        if(doc){
            res.status(200).json(doc);
        } else{
            res.status(404).json({ message: "No employee found with specified id" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    
});
router.patch("/:bauturaId", (req,res)=>{
    const id = req.params.bauturaId;
    Bauturi.update({_id:id}, {$set:{
        nume: req.body.nume,
        cantitate: req.body.cantitate,
        tip: req.body.tip,
        locatie: req.body.locatie,
        imagine: req.body.imagine
    }
    })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Employee Updated!"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:bauturaId", (req,res) =>{
    const id = req.params.bauturaId;
    Bauturi.remove({ _id: id })
    .exec()
      .then(result => {
        res.status(200).json({
          message: "Bautura sters!"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

module.exports = router;