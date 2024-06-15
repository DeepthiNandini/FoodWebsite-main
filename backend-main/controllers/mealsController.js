const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Meals = require('../models/mealsModel');
const multer = require('multer');

//createmeal
const createMeal = asyncHandler(async (req,res)=>{
    console.log(req.file)
    const mealName = req.body.name
    console.log(mealName);
    const findMeal = await Meals.findOne({name: mealName});
    if (!findMeal){
        const newMeal = new Meals({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.path 
          });
          newMeal.save();
          res.status(200).send('Meal added');
    }else{
        throw new Error('Meal Already Exist');
    }
}) 

//getmeals
const getMeals = asyncHandler(async (req, res)=>{
    console.log("New call came");
    try{
        const meals = await Meals.find();
        res.json(meals);
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
})

module.exports = {createMeal, getMeals};