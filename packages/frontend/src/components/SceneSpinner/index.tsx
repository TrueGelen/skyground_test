import { CircularProgress, Stack } from "@mui/material";
import { ReactElement } from "react";

export default function SceneSpinner(): ReactElement {
  return (
    <Stack
      alignItems="center"
      height="100%"
      justifyContent="center"
      spacing={2}
      width="100%"
    >
      <CircularProgress />
      <p>Loading...</p>
    </Stack>
  );
}
