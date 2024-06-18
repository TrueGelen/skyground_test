import { FormEvent, ReactElement } from "react";
import useUser from "../../hooks/useUser";
import { Link, Navigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initialCredentialsValue } from "./constants";
import PasswordInput from "../../components/PasswordInput";
import { SignInFormData } from "./types";
import { signInFormSchema } from "./schemas";

export default function SignIn(): ReactElement {
  const { user, signIn } = useUser();
  const { state } = useLocation();
  // my todo: может посмотреть, как это типизироавть
  const redirect = state?.prevLocation ?? "/";

  const {
    control,
    formState: { isSubmitting, isValid },
    setError,
    handleSubmit,
  } = useForm<SignInFormData>({
    defaultValues: initialCredentialsValue,
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignInFormData) => {
    console.log("SignIn > onSubmit", data);

    try {
      // my todo:
      signIn();
      // await signIn(credentials);
    } catch (error) {
      // my todo: mb ошибку бедет сервер возвращать, вообще посмотреть, как отображаюся
      setError("password", {
        message: "Invalid username or password",
      });
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void =>
    void handleSubmit(onSubmit)(e);

  if (user != null) return <Navigate to={redirect} replace />;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack spacing={4}>
          <Typography variant="h3">Sign in to Skyground</Typography>
          <form onSubmit={handleFormSubmit}>
            <Stack alignItems="center" direction="column" gap={3}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Email" size="small" />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    fullWidth
                    label="Password"
                    size="small"
                  />
                )}
              />
              {isSubmitting ? (
                <CircularProgress size={36} />
              ) : (
                // my todo: потом сделать так, что бы кнопку можно было нажать, только когда все заполнено
                <Button disabled={!isValid} type="submit" variant="contained">
                  Sign in
                </Button>
              )}
            </Stack>
          </form>

          <Typography variant="caption" textAlign="center">
            <span>New to Skyground? </span>
            <Link to="/signup" state={{ prevLocation: redirect }}>
              Create an account
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
