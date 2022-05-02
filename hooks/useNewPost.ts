import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { PostItem } from "types";

const queryClient = new QueryClient();

export const useNewPost = () => {
  return useMutation(
    (data: PostItem) => {
      return axios.post("https://jsonplaceholder.typicode.com/posts", data);
    },
    {
      //Optimistic Update
      onMutate: (values) => {
        queryClient.setQueryData<PostItem[]>("posts", (oldData) => {
          if (oldData) {
            return [
              ...oldData,
              {
               
                ...values,
              },
            ];
          } else {
            return [values];
          }
        });
      },
      onSuccess: (data, values) => {
        //Or You can SetQueryData and edit cache directly (Optimistic)
        queryClient.invalidateQueries("posts");
      },
      onError: (error) => console.log(error),
      onSettled: () => console.log("Execute on both error and success..."),
    }
  );
};
