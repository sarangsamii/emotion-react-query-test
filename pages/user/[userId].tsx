import axios from "axios";
import useSingleUser from "hooks/useSingleUser";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const UserDetails: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data, isLoading, isFetching } = useSingleUser(`${userId}`);

  return (
    <div>
      <div>
        {isLoading ? (
          "Loading..."
        ) : (
          <div>
            {data.first_name} {data.last_name}
          </div>
        )}
      </div>
      {isFetching ? "Updating..." : null}
    </div>
  );
};
export default UserDetails;
