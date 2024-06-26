import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosClient } from "@/api/axiosClient";
import { ServerError } from "@/types/server-error";
import { User } from "@/providers/UserProvider/context";
import { SignInFormData } from "../types";

export default function useSignIn() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: signInUser,
    onError(error) {
      if (axios.isAxiosError<ServerError>(error)) {
        toast.error(error.message);
      }
    },
    onSuccess(data) {
      client.setQueryData(["user"], data);
    },
  });
}

async function signInUser(user: SignInFormData) {
  return (await axiosClient.post<User>("/sign-in", user)).data;
}
