import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/api/axiosClient";
import { User } from "@/providers/UserProvider/context";

export default function useFetchUsers() {
  return useQuery({
    initialData: null,
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

async function fetchUsers() {
  return (await axiosClient.get<User[]>("/users")).data;
}
