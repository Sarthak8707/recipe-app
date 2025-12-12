import express from 'express';
import {RecipeModel} from '../models/Recipes.js'
import { UserModel } from '../models/Users.js';

const router = express.Router();
// Get all recipes

router.get("/", async (req, res) => {
    try{
    const response = await RecipeModel.find({});
     res.json(response);
    }
    catch(err){
        console.log(err);
    }
})

 // Create Recipe
router.post("/", async (req, res) => {
    try{
        const newRecipe = new RecipeModel(req.body);
        const response = await newRecipe.save();
         res.json(response);
         console.log("success")
    }
    catch(err){
        console.log(err)
    }
})
// Save a recipe
router.put("/", async (req, res) => {
    try{
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json("Recipe saved");
    }
    catch(err){
        console.log(err);
    }
})

 // Get saved recipes
router.get("/savedRecipes/:id", async (req, res) => {
    try{
        const user = await UserModel.findById(req.params.id).populate("savedRecipes");;
        return res.json(user.savedRecipes);
    }
    catch(err){
        console.log(err)
    }
})

export {router as recipesRouter};