import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
} from "@mui/material";

// Dark green theme with recipe-style fonts
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2e7d32", // dark green
    },
    background: {
      default: "#1b2f1b", // darker green background
      paper: "#264d26",
    },
  },
  typography: {
    fontFamily: "'Playfair Display', serif",
  },
});

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const [ae, setae] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get("http://localhost:3001/recipes");
      setRecipes(response.data);
    };
    fetchRecipes();
  }, []);

  if (ae) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth="sm"
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" component="h1" color="primary">
            Sign in to save recipes
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }

  const userID = window.localStorage.userID;

  const onSave = async (recipeID) => {
    try {
      await axios.put(
        "http://localhost:3001/recipes",
        { userID, recipeID },
        { headers: { authorization: cookies.access_token } }
      );
    } catch (err) {
      setae(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom align="center" color="primary">
          Recipes
        </Typography>

        {recipes.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No recipes found.
          </Typography>
        ) : (
          <List sx={{ bgcolor: "#264d26", borderRadius: 2 }}>
            {recipes.map((recipe, id) => (
              <Box key={recipe._id}>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 2,
                  }}
                >
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onSave(recipe._id)}
                    sx={{ ml: 2 }}
                  >
                    Save
                  </Button>
                </ListItem>
                {id < recipes.length - 1 && <Divider sx={{ bgcolor: "#2e7d32" }} />}
              </Box>
            ))}
          </List>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Home;
