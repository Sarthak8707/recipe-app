import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "", { path: "/" });
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#2e7d32", // dark green to match Home theme
        fontFamily: "'Playfair Display', serif",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: Logo / App Name */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "#fff",
            textDecoration: "none",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          MyRecipes
        </Typography>

        {/* Right side: Nav buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ textTransform: "none", fontFamily: "'Playfair Display', serif" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/create-recipe"
            sx={{ textTransform: "none", fontFamily: "'Playfair Display', serif" }}
          >
            Create
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/saved-recipes"
            sx={{ textTransform: "none", fontFamily: "'Playfair Display', serif" }}
          >
            Saved
          </Button>

          {!cookies.access_token ? (
            <Button
              color="inherit"
              component={Link}
              to="/auth"
              sx={{ textTransform: "none", fontFamily: "'Playfair Display', serif" }}
            >
              Login/Register
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={logout}
              sx={{ textTransform: "none", fontFamily: "'Playfair Display', serif" }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
