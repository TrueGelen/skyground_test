import { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Paper, Stack, Typography } from "@mui/material";
import { User } from "@/Providers/UserProvider/context";
import { fetchUsers } from "./api/fetchUsers";
import SceneSpinner from "../../components/SceneSpinner";

export default function Users(): ReactElement {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await fetchUsers();

      setUsers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong :(");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Stack spacing={1}>
        {loading && <SceneSpinner />}
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
