import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Grid,
} from "@mui/material";

// Dark green theme consistent with other pages
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#2e7d32" },
    background: { default: "#1b2f1b", paper: "#264d26" },
  },
  typography: {
    fontFamily: "'Playfair Display', serif",
  },
});

const Auth = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={5}>
            <Login />
          </Grid>
          <Grid item xs={12} md={5}>
            <Register />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Auth;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        username,
        password
      });
      alert(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const AuthForm = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <Paper sx={{ p: 4, backgroundColor: "#264d26" }} elevation={6}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        {label}
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ fontFamily: "'Playfair Display', serif" }}
        >
          {label}
        </Button>
      </Box>
    </Paper>
  );
};
