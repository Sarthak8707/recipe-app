import { AppBar, Toolbar, Button } from "@mui/material";
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
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/create-recipe">Create</Button>
        <Button color="inherit" component={Link} to="/saved-recipes">Saved</Button>

        {!cookies.access_token ? (
          <Button color="inherit" component={Link} to="/auth">
            Login/Register
          </Button>
        ) : (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
