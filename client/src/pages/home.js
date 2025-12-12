import axios from 'axios'
import { useEffect, useState } from 'react'

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get("http://localhost:3001/recipes");
      console.log(response.data);
      setRecipes(response.data)
    }
    fetchRecipes();
  }, [])

  const userID = window.localStorage.userID;
  
  const onSave = async (recipeID) => {
    const response = await axios.put("http://localhost:3001/recipes", {userID, recipeID});
    console.log(response)
  }

  return (
    <div>
      Recipes
      {recipes.map((recipe, id) => (
        <ul>
          <li>{id+1} {" "}{recipe?.name}</li>
          <button onClick={() => {onSave(recipe._id)}}>Save</button>
        </ul>
      ))}
    </div>
  )
}

export default Home