import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SavedRecipes = () => {
  const userID = window.localStorage.userID;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
      console.log(response)
      setRecipes(response.data);
    }
    fetchSavedRecipes();
  }, [])

  return (
    <div>
      <div>SavedRecipes</div>
    {recipes.map((recipe, id) => (
      <ul>
        <li> {id+1} {" "} {recipe.name} </li>
      </ul>
    ))}
    </div>
  )
}

export default SavedRecipes