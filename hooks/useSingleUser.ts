import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

export const fetchSingleUserData = (userId:string) => {
  const user = axios
    .get(`https://reqres.in/api/users/${userId}`)
    .then((res) => {
      return res.data.data;
    });

  return user;
};

const useSingleUser = (userId: string) => {
  return useQuery(["user", userId], () => fetchSingleUserData(userId), {
    enabled: userId ? true : false,
  });
};

export default useSingleUser;
