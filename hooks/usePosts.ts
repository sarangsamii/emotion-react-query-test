import axios from "axios";
import { useQuery } from "react-query";

//import { User } from "types";

const usePosts = () => {
  //const queryClient = useQueryClient();
  return useQuery(
    "posts",
    () => {
      const users = axios.get("https://jsonplaceholder.typicode.com/posts?userId=1").then((res) => {
        //Cache List Data For faster Loading
        // res.data.data.forEach((user: User) => {
        //   queryClient.setQueryData(["user", `${user.id}`], user);
        // });
        return res.data;
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
export default usePosts;
