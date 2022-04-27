import axios from "axios";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import { User } from "types";
import Image from "next/image";
import useUsers from "hooks/useUsers";

const Home: NextPage = () => {
  const { data, isLoading, isError, isFetching } = useUsers()

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>An error has occurred:</div>;

  return (
    <div>
      {data.map(({ id, first_name, last_name, avatar, email }: User) => (
        <div key={id}>
          <Image width={200} height={200} src={avatar} alt="Profile" />
          {first_name} {last_name} {email}
        </div>
      ))}
      {isFetching ? "Updating" : null}
    </div>
  );
};

export default Home;
