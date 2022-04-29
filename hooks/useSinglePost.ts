import axios from "axios";
import { useQuery } from "react-query";

export const fetchSinglePostData = (postId:number) => {
  const user = axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => {
      return res.data;
    });

  return user;
};

const useSinglePost = (postId: number) => {
  return useQuery(["post", postId], () => fetchSinglePostData(postId), {
    enabled: postId ? true : false,
  });
};

export default useSinglePost;
