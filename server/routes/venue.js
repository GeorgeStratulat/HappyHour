const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Venues = require ("../schema/venue.js");

router.get("/", (req,res)=>{
    Venues.find().exec().then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); 
    })    
});

router.post("/addVenue", (req,res) =>{
    const venue = new Venues({
        _id : mongoose.Types.ObjectId(),
        nume: req.body.nume,
    locatie: req.body.locatie,
    bauturi: req.body.bauturi,
    detalii: req.body.detalii
    });

    venue.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Venue salvat!",
            VenueAdaugat: venue
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.get("/:venueId", (req,res) => {
    const id = req.params.venueId;
    Venues.findById(id).exec().then(doc=>{
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
router.patch("/:venueId", (req,res)=>{
    const id = req.params.venueId;
    Venues.update({_id:id}, {$set:{
        nume: req.body.nume,
    locatie: req.body.locatie,
    bauturi: req.body.bauturi,
    detalii: req.body.detalii
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

router.delete("/:venueId", (req,res) =>{
    const id = req.params.venueId;
    Venues.remove({ _id: id })
    .exec()
      .then(result => {
        res.status(200).json({
          message: "Venue sters!"
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