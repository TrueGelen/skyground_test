import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { ReactElement, useCallback } from "react";
import { Link, Outlet } from "react-router-dom";
import useUser from "@/hooks/useUser";
import useFetchUser from "./hooks/useFetchUser";

export default function DashboardLayout(): ReactElement {
  const { user } = useUser();

  const { mutate: signOutMutate } = useFetchUser();

  const handleSignOut = useCallback(() => signOutMutate(), []);

  return (
    <Stack spacing={2} alignItems="center" height="100%">
      <AppBar position="sticky">
        <Stack width="100%" maxWidth="1280px" margin="0 auto">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="body1">
              Welcome, {`${user?.firstName} ${user?.lastName}`} !
            </Typography>
            <Button color="inherit" onClick={handleSignOut}>
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
