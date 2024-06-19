import { Paper, Stack, Typography } from "@mui/material";
import { ReactElement, useEffect } from "react";
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

export default function Users(): ReactElement {
  useEffect(() => {
    // Создайте асинхронную функцию для выполнения запроса
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/users");
        console.log("Users > response", { response });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Users > result", { result });
      } catch (error) {
        console.error("Users > result", { error });
      }
    };

    fetchData();
  }, []);

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
