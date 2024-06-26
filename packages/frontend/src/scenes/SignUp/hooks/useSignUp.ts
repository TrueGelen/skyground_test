import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { isValidationError } from "@/types/guards/is-validation-error";
import { ServerError } from "@/types/server-error";
import { User } from "@/providers/UserProvider/context";
import { axiosClient } from "@/api/axiosClient";
import { SignUpFormData } from "../types";

export default function useSignUp(setError: UseFormSetError<SignUpFormData>) {
  const client = useQueryClient();

  return useMutation({
    mutationFn: signUpUser,
    onError(error) {
      if (axios.isAxiosError<ServerError>(error)) {
        const err = error.response?.data?.error;
        if (isValidationError(err)) {
          return err.errors.map(({ property, constraints }) =>
            setError(property as keyof SignUpFormData, {
              type: "server",
              message: Object.values(constraints).at(0),
            })
          );
        }
      }

      toast.error("Something went wrong :(");
    },
    onSuccess(data) {
      client.setQueryData(["user"], data);
    },
  });
}

async function signUpUser(user: SignUpFormData) {
  return (await axiosClient.post<User>("/sign-up", user)).data;
}
