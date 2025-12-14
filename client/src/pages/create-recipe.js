import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper,
} from "@mui/material";

// Dark green theme with recipe font
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2e7d32", // dark green
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

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: ["fixed"],
    instructions: "",
    cookingTime: 0,
    imageUrl: ""
  });
  const [cookies, _] = useCookies(["access_token"]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "ingredients") {
      setRecipe({ ...recipe, ingredients: value.split(",") });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/recipes",
        recipe,
        { headers: { authorization: cookies.access_token } }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Paper sx={{ p: 4, backgroundColor: "#264d26" }} elevation={6}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            color="primary"
          >
            Create Recipe
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              label="Ingredients (comma separated)"
              name="ingredients"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              label="Instructions"
              name="instructions"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              onChange={handleChange}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              label="Cooking Time (minutes)"
              name="cookingTime"
              variant="outlined"
              fullWidth
              type="number"
              onChange={handleChange}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              label="Image URL"
              name="imageUrl"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ fontFamily: "'Playfair Display', serif" }}
            >
              Add Recipe
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default CreateRecipe;
