import { FormEvent, ReactElement } from "react";
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
import useUser from "@/hooks/useUser";
import PasswordInput from "@/components/PasswordInput";
import { initialSignUpValue } from "./constants";
import { SignUpFormData } from "./types";
import { signUpFormSchema } from "./schemas";
import useSignUp from "./hooks/useSignUp";

export default function SignUp(): ReactElement {
  const { user } = useUser();
  const { state } = useLocation();

  const redirect = state?.redirectTo ?? "/";

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

  const { mutate: signUpMutate } = useSignUp(setError);

  const onSubmit = (data: SignUpFormData) => signUpMutate(data);

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
                    helperText={
                      (fieldState.invalid && fieldState?.error?.message) ??
                      "Minimum of 3 characters"
                    }
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
                    helperText={
                      (fieldState.invalid && fieldState?.error?.message) ??
                      "Minimum of 3 characters"
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    size="small"
                    error={fieldState.invalid}
                    helperText={
                      (fieldState.invalid && fieldState?.error?.message) ??
                      "Minimum of 3 characters"
                    }
                  />
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
                      (fieldState.invalid && fieldState?.error?.message) ??
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
                      (fieldState.invalid && fieldState?.error?.message) ??
                      "The passwords did not match"
                    }
                  />
                )}
              />
              {isSubmitting ? (
                <CircularProgress size={36} />
              ) : (
                <Button disabled={!isValid} type="submit" variant="contained">
                  Sign up
                </Button>
              )}
            </Stack>
          </form>

          <Typography variant="caption" textAlign="center">
            <span>Already have an account? </span>
            <Link to="/sign-in" state={{ redirectTo: redirect }}>
              Sign in
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
