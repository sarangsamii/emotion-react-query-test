import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { PostItem, PostUser, User } from "types";
import usePosts from "hooks/usePosts";
import { fetchSinglePostData } from "hooks/useSinglePost";
import { useQueryClient } from "react-query";

import { useForm, SubmitHandler } from "react-hook-form";
import { useNewPost } from "hooks/useNewPost";

const Home: NextPage = () => {
  const mutation = useNewPost();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostItem>();
  const onSubmit: SubmitHandler<PostItem> = (data) =>
    mutation.mutate({ ...data, userId: 1 });

  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching } = usePosts();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>An error has occurred:</div>;


  const buttonTextRender = () => {
    if (mutation.isLoading) {
      return "Sending...";
    } else if (mutation.isSuccess) {
      return "Saved!";
    } else if (mutation.isError) {
      return "Oppss an Error Occured :(";
    } else {
      return "Send";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "block" }}>
          <h2>Post :</h2>
          <div style={{ marginBottom: 24 }}>
            <label htmlFor="title">title : </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
            />
            {errors.title && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="body">body : </label>
            <input
              type="text"
              id="body"
              {...register("body", { required: true })}
            />
            {errors.body && <span>This field is required</span>}
          </div>
          <button>{buttonTextRender()}</button>
        </div>
      </form>

      {data.map(({ id, title, body }: PostItem) => (
        <div
          key={id}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginBottom: 12,
          }}
          onMouseEnter={() => {
            queryClient.prefetchQuery(
              ["post", id],
              () => fetchSinglePostData(id),
              {
                staleTime: Infinity,
              }
            );
          }}
        >
          <Link href={`/post/${id}`}>
            <a style={{ color: "red" }}>{title}</a>
          </Link>

          {body}
        </div>
      ))}
      {isFetching ? "Updating" : null}
    </div>
  );
};

export default Home;
