import axios from "axios";
import useSinglePost from "hooks/useSinglePost";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const UserDetails: NextPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data, isLoading, isFetching } = useSinglePost(Number(postId));

  return (
    <div>
      <div>
        {isLoading ? (
          "Loading..."
        ) : (
          <div>
            {data.title} {data.body}
          </div>
        )}
      </div>
      {isFetching ? "Updating..." : null}
    </div>
  );
};
export default UserDetails;
