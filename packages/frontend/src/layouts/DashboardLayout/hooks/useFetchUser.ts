import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosClient } from "@/api/axiosClient";
import { User } from "@/providers/UserProvider/context";

export default function useFetchUser() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onError() {
      toast.error("Failed to sign out, try again. Something went wrong :(");
    },
    onSuccess() {
      client.setQueryData(["user"], null);
    },
  });
}

async function signOut() {
  return (await axiosClient.post<User>("/sign-out")).data;
}
