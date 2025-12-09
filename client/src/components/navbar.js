import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        <Button color="inherit" component={Link} to="/create-recipe">
          Create
        </Button>

        <Button color="inherit" component={Link} to="/saved-recipes">
          Saved
        </Button>

        <Button color="inherit" component={Link} to="/auth">
          Login/Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
