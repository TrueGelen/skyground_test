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
import PasswordInput from "../../components/PasswordInput";
import { initialSignUpValue } from "./constants";
import { SignUpFormData } from "./types";
import { signUpFormSchema } from "./schemas";

export default function SignUp(): ReactElement {
  const { user } = useUser();
  const { state } = useLocation();
  // my todo: может посмотреть, как это типизироавть
  const redirect = state?.prevLocation ?? "/";

  const {
    control,
    formState: { isSubmitting, isValid },
    setError,
    handleSubmit,
  } = useForm<SignUpFormData>({
    defaultValues: initialSignUpValue,
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log("SignIn > onSubmit", data);

    try {
      // my todo:
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
    <Box display="flex" justifyContent="center" p={10}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack spacing={4}>
          <Typography variant="h3">Sign up to Skyground</Typography>
          <form onSubmit={handleFormSubmit}>
            <Stack alignItems="center" direction="column" gap={3}>
              <Controller
                control={control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="First name"
                    size="small"
                    error={fieldState.invalid}
                    helperText={fieldState.invalid && "Minimum of 3 characters"}
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Last name"
                    size="small"
                    error={fieldState.invalid}
                    helperText={fieldState.invalid && "Minimum of 3 characters"}
                  />
                )}
              />
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
                render={({ field, fieldState }) => (
                  <PasswordInput
                    {...field}
                    fullWidth
                    label="Password"
                    size="small"
                    error={fieldState.invalid}
                    helperText={
                      fieldState.invalid &&
                      "The password must contain at least 8 characters and consist of at least one letter and one digit"
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <PasswordInput
                    {...field}
                    fullWidth
                    label="Confirm password"
                    size="small"
                    error={fieldState.invalid}
                    helperText={
                      fieldState.invalid && "The passwords did not match"
                    }
                  />
                )}
              />
              {isSubmitting ? (
                <CircularProgress size={36} />
              ) : (
                // my todo: потом сделать так, что бы кнопку можно было нажать, только когда все заполнено
                <Button disabled={!isValid} type="submit" variant="contained">
                  Sign up
                </Button>
              )}
            </Stack>
          </form>

          <Typography variant="caption" textAlign="center">
            <span>Already have an account? </span>
            <Link to="/signin" state={{ prevLocation: redirect }}>
              Sign in
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
