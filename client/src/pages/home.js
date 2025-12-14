import axios from 'axios'
import { useEffect, useState } from 'react'
import {useCookies} from "react-cookie"

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const [ae, setae] = useState(false);

   useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get("http://localhost:3001/recipes");
      console.log(response.data);
     // console.log(cookies.access_token);
      setRecipes(response.data)
    }
    fetchRecipes();
  }, [])

  
  if(ae){
    return (
      <div>
        Sign in to save recipe
      </div>
    )
  }

 

  const userID = window.localStorage.userID;
  
  const onSave = async (recipeID) => {
    try{
      const response =  await axios.put("http://localhost:3001/recipes", {userID, recipeID}, {headers: {authorization: cookies.access_token}});
    }
    catch (err){
      setae(true)
    }
   // console.log(response)
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