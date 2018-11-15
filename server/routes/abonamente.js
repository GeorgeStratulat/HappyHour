const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Abonamente = require ('../schema/abonamente.js');

router.get("/", (req,res)=>{
    
      Abonamente.find().exec().then(docs=>{
          console.log(docs);
          res.status(200).json(docs);
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        }); 
      })    
    });

router.post("/addAbonament", (req, res) =>{
    const abonament = new Abonamente({
        _id: new mongoose.Types.ObjectId(),
        numar_bauturi: req.body.numar_bauturi,
        numar_bauturi_zilnic: req.body.numar_bauturi_zilnic
    });
    console.log(abonament);
    
    abonament.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Abonament salvat!",
            AbonamentAdaugat: abonament
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
});

router.get("/:abonamentId", (req,res) => {
    const id = req.params.abonamentId;
    Abonamente.findById(id).exec().then(doc=>{
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

router.patch("/:abonamentId", (req,res)=>{
    const id = req.params.abonamentId;
    Abonamente.update({_id:id}, {$set:{
        numar_bauturi: req.body.numar_bauturi,
        numar_bauturi_zilnic: req.body.numar_bauturi_zilnic
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

router.delete("/:abonamentId", (req,res) =>{
    const id = req.params.abonamentId;
    Abonamente.remove({ _id: id })
    .exec()
      .then(result => {
        res.status(200).json({
          message: "Abonament sters!"
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