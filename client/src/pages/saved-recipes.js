import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Divider,
} from "@mui/material";

// Dark green theme consistent with the app
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2e7d32",
    },
    background: {
      default: "#1b2f1b",
      paper: "#264d26",
    },
  },
  typography: {
    fontFamily: "'Playfair Display', serif",
  },
});

const SavedRecipes = () => {
  const userID = window.localStorage.userID;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
      setRecipes(response.data);
    };
    fetchSavedRecipes();
  }, [userID]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom align="center" color="primary">
          Saved Recipes
        </Typography>

        {recipes.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            You haven’t saved any recipes yet.
          </Typography>
        ) : (
          <List sx={{ bgcolor: "#264d26", borderRadius: 2 }}>
            {recipes.map((recipe, id) => (
              <React.Fragment key={recipe._id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "'Playfair Display', serif", color: "#fff" }}
                      >
                        {id + 1}. {recipe.name}
                      </Typography>
                    }
                    secondary={
                      recipe.description && (
                        <Typography
                          variant="body2"
                          sx={{ fontFamily: "'Playfair Display', serif", color: "#ccc" }}
                        >
                          {recipe.description.length > 60
                            ? recipe.description.slice(0, 60) + "..."
                            : recipe.description}
                        </Typography>
                      )
                    }
                  />
                </ListItem>
                {id < recipes.length - 1 && <Divider sx={{ bgcolor: "#2e7d32" }} />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default SavedRecipes;
