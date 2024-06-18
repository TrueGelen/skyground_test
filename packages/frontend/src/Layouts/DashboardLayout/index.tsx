import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import useUser from "../../hooks/useUser";

export default function DashboardLayout(): ReactElement {
  const { user, signOut } = useUser();
  return (
    <Stack spacing={2} alignItems="center" height="100%">
      <AppBar position="sticky">
        <Stack width="100%" maxWidth="1280px" margin="0 auto">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="body1">Welcome {user?.fullName} !</Typography>
            <Button color="inherit" onClick={signOut}>
              Sign out
            </Button>
          </Toolbar>
        </Stack>
      </AppBar>
      <Box flexGrow={1} width="100%" maxWidth="1280px">
        <Outlet />
      </Box>
    </Stack>
  );
}