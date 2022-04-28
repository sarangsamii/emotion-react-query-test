import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

import { User } from "types";

const useUsers = () => {
  const queryClient = useQueryClient();
  return useQuery(
    "users",
    () => {
      const users = axios.get("https://reqres.in/api/users").then((res) => {
        res.data.data.forEach((user: User) => {
          queryClient.setQueryData(["user", `${user.id}`], user);
        });
        return res.data.data;
      });

      return users;
    },
    {
      staleTime: 1000,
      refetchOnWindowFocus: "always",
      cacheTime: Infinity,
      retry: 2,
      retryDelay: 1000,
    }
  );
};
export default useUsers;
