import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { User } from "types";
import useUsers from "hooks/useUsers";
import { fetchSingleUserData } from "hooks/useSingleUser";
import { useQueryClient } from "react-query";

const Home: NextPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching } = useUsers();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>An error has occurred:</div>;

  return (
    <div>
      {data.map(({ id, first_name, last_name, avatar, email }: User) => (
        <div
          key={id}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
          onMouseEnter={() => {
            queryClient.prefetchQuery(
              ["user", `${id}`],
              () => fetchSingleUserData(`${id}`),
              {
                staleTime: Infinity,
              }
            );
          }}
        >
          <Link href={`/user/${id}`}>
            <a>
              {first_name} {last_name}
            </a>
          </Link>
          <Image
            width={200}
            height={200}
            src={avatar}
            objectFit="contain"
            alt="Profile"
          />

          {email}
        </div>
      ))}
      {isFetching ? "Updating" : null}
    </div>
  );
};

export default Home;
