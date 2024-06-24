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
import axios from "axios";
import { toast } from "react-toastify";
import useUser from "@/hooks/useUser";
import PasswordInput from "@/components/PasswordInput";
import { ServerError } from "../../types/server-error";
import { initialCredentialsValue } from "./constants";
import { SignInFormData } from "./types";
import { signInFormSchema } from "./schemas";
import { signInUser } from "./api/signInUser";

export default function SignIn(): ReactElement {
  const { user, setUser } = useUser();
  const { state } = useLocation();

  const redirect = state?.redirectTo ?? "/";

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
  } = useForm<SignInFormData>({
    defaultValues: initialCredentialsValue,
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const { data: user } = await signInUser(data);

      setUser(user);
    } catch (error) {
      if (axios.isAxiosError<ServerError>(error)) {
        toast.error(error.message);
      }
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
                <Button disabled={!isValid} type="submit" variant="contained">
                  Sign in
                </Button>
              )}
            </Stack>
          </form>

          <Typography variant="caption" textAlign="center">
            <span>New to Skyground? </span>
            <Link to="/signup" state={{ redirectTo: redirect }}>
              Create an account
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
