import axios from "axios";
import { useQuery } from "react-query";

const useUsers = () => {
  return useQuery(
    "users",
    () => axios.get("https://reqres.in/api/users").then((res) => res.data.data),
    {
      staleTime: 5000,
      refetchOnWindowFocus: "always",
      cacheTime: Infinity,
      retry: 10,
      retryDelay:1000
    }
  );
};
export default useUsers;
