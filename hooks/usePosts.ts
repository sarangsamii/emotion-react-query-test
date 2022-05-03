import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { PostItem, PostList } from "types";

//import { User } from "types";

export const fetchPosts = (page: number) => {
  return axios
    .get("https://jsonplaceholder.typicode.com/posts", {
      params: {
        page,
      },
    })
    .then((res) => {
      //Cache List Data For faster Loading
      // res.data.data.forEach((user: User) => {
      //   queryClient.setQueryData(["user", `${user.id}`], user);
      // });
      return res.data;
    });
};

const usePosts = (page: number,initialData:PostItem[]) => {
  //const queryClient = useQueryClient();
  return useQuery(
    ["posts", { page }],
    () => {
      return fetchPosts(page);
    },
    {
      initialData,
      keepPreviousData: true,
      staleTime: 1000,
      refetchOnWindowFocus: "always",
      cacheTime: Infinity,
      retry: 2,
      retryDelay: 1000,
    }
  );
};
export default usePosts;

