import axios from 'axios';
import React, { useState } from 'react'

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: ["fixed"],
    instructions: "",
    cookingTime: 0,
    imageUrl: ""
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
     if (name === "ingredients") {
      setRecipe({ ...recipe, ingredients: value.split(",") });  // Convert CSV → array
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
   // console.log(recipe)

  }
  const handleSubmit =async (e) => {
    e.preventDefault()
    try{const response = await axios.post("http://localhost:3001/recipes", recipe)
   console.log(response)
   }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">Ingredients</label>
        <input type="text" id="ingredients" name="ingredients" onChange={handleChange} />
        <label htmlFor="instructions">Instructions</label>
        <input type="text" id="instructions" name="instructions" onChange={handleChange} />
        <label htmlFor="cookingTime">Cooking Time</label>
        <input type="text" id="cookingTime" name="cookingTime" onChange={handleChange} />
        <label htmlFor="imageUrl">Image Url</label>
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
        <button type="submit">Add Recipe</button>

      </form>
    </div>
  )
}

export default CreateRecipe