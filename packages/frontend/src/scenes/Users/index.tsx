import { ReactElement } from "react";
import { toast } from "react-toastify";
import { Paper, Stack, Typography } from "@mui/material";
import SceneSpinner from "../../components/SceneSpinner";
import useFetchUsers from "./hooks/useFetchUsers";

export default function Users(): ReactElement {
  const { data: users, isLoading, isError } = useFetchUsers();

  if (isError) {
    toast.error("Something went wrong :(");
  }

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Stack spacing={1}>
        {isLoading && <SceneSpinner />}
        {users?.map(({ id, email, firstName, lastName }) => (
          <Stack key={id} spacing={1} direction="row">
            <Typography variant="body2" fontWeight="bold">
              {email}
            </Typography>
            <Typography variant="body2">{`${firstName} ${lastName}`}</Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
