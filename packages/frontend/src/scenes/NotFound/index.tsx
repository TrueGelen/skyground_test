import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

export default function NotFound(): ReactElement {
  return (
    <Stack gap={5} alignItems="center" justifyContent="center" height="100dvh">
      <Typography variant="h3">Page not found</Typography>
      <Link to="/" replace>
        <Typography variant="h6">Go back to the main page</Typography>
      </Link>
    </Stack>
  );
}
