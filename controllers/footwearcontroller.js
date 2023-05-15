const express = require("express");
const footwears = express.Router();
const {
    getAllFootwear,
    getOneFootwear,
    createFootwear,
    updateFootwear,
    deleteFootwear
} = require("../queries/footwear.js");

//INDEX
footwears.get("/", async (req, res) => {
    const allFootwear = await getAllFootwear();
    res.status(200).json(allFootwear);
});

//SHOW
footwears.get("/:id", async (req, res) => {
    const { id } = req.params;
    const footwear = await getOneFootwear(id);
    if(!footwear.error) {
        res.status(200).json(footwear);
    }else if (footwear.error.code === 0) {
        res.status(404).json("footwear not found")
    }else {
        res.status(500).json({error: "server error"})
    }
});
       
//CREATE
footwears.post("/", async (req, res) => {
    const {name, cost, category, url, image, is_trending } = req.body;
    const newFootwear = await createFootwear({
        name, 
        cost,
        category, 
        url, 
        image,
        is_trending 
    });
    if (!newFootwear.error) {
        res.status(201).json(newFootwear);
    }else {
        res.status(500).json({error: "server error"})
    }
})  

//UPDATE FOOTWARE
footwears.put("/:id", async (req, res) => {
    const { id } = req.params;
    const footwear = req.body;
    const updatedFootwear = await updateFootwear(id, footwear);
    if (!updatedFootwear.error) {
        res.status(201).json(updatedFootwear);
    }else {
        res.status(500).json({error: "server error"})
    }
  });

  //DELETE
  footwears.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedFootwear = await deleteFootwear(id);
    console.log(deletedFootwear);
    if (deletedFootwear.id) {
      res.status(201).json(deletedFootwear);
    } else {
      res.status(404).json("Footwear not found");
    }
  });



module.exports = footwears;

