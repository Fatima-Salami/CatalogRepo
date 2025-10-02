import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

export default function NavBar() {
  const auth = useAuth();

  if (!auth) {
    return (
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Toolbar sx={{ maxWidth: 1280, mx: "auto", width: "100%" }}>
          <Box sx={{ flex: 1 }}>
            <Typography component={RouterLink} to="/" variant="h6" sx={{ textDecoration: "none", color: "text.primary" }}>
              Homiq Catalog
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  const { user, logout } = auth;

return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Toolbar sx={{ maxWidth: 1280, mx: "auto", width: "100%" }}>
            <Box sx={{ flex: 1 }}>
                <Typography component={RouterLink} to="/" variant="h6" sx={{ textDecoration: "none", color: "text.primary" }}>
                    Homiq Catalog
                </Typography>
            </Box>

            <Box>
                {!user ? (
                   <> 
                    <Button component={RouterLink} to="/signup" variant="outlined" sx={{ mr: 2 }}>Sign up</Button>
                    <Button component={RouterLink} to="/login" variant="contained">
                        Sign in
                    </Button></>
                ) : (
                    <>
                        <Typography component="span" sx={{ mr: 2 }}>{user.user.name}</Typography>
                        <Button onClick={() => logout()} variant="outlined">Sign out</Button>
                    </>
                )}
            </Box>
        </Toolbar>
    </AppBar>
);
}
