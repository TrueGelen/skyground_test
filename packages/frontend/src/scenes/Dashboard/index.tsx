import { Paper, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";
// my todo:
const mockDada = [
  { id: "1", email: "some@ya.ru", firstName: "Vlad", lastName: "Filchagin" },
  {
    id: "2",
    email: "some2@ya.ru",
    firstName: "Vlad_2",
    lastName: "Filchagin_2",
  },
  {
    id: "3",
    email: "some3@ya.ru",
    firstName: "Vlad_3",
    lastName: "Filchagin_3",
  },
  {
    id: "4",
    email: "some4@ya.ru",
    firstName: "Vlad_4",
    lastName: "Filchagin_4",
  },
] as const;

export default function Dashboard(): ReactElement {
  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Stack spacing={1}>
        {mockDada.map(({ id, email, firstName, lastName }) => (
          // my todo: надо пагинацию?
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
