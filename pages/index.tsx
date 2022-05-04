import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { PostItem, PostList } from "types";
import usePosts, { fetchPosts } from "hooks/usePosts";
import { fetchSinglePostData } from "hooks/useSinglePost";
import { useQueryClient } from "react-query";

import { useForm, SubmitHandler } from "react-hook-form";
import { useNewPost } from "hooks/useNewPost";
import { useContext, useEffect, useState } from "react";
import styled from '@emotion/styled'
import { ThemeContext } from "./_app";


const SomeText = styled.div`
  color: ${({theme}) => theme.colors.primary};
`



const Home: NextPage<PostList> = ({posts}) => {
  const myTheme= useContext(ThemeContext);
  const mutation = useNewPost();
  const [page, setPage] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostItem>();
  const onSubmit: SubmitHandler<PostItem> = (data) =>
    mutation.mutate({ ...data, userId: 1 });

  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching, isPreviousData } =
    usePosts(page,posts);

  useEffect(() => {
    if (isPreviousData || !data?.hasMore) {
      queryClient.prefetchQuery(["posts", { page: page + 1 }], () => {
        return fetchPosts(page);
      });
    }
  }, [isPreviousData, data, queryClient, page]);

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
      <label htmlFor="darkMode">Dark Mode</label>
      <input id="darkMode" type="checkbox" checked={myTheme?.dark} onChange={()=>myTheme?.toggleDark()} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "block" }}>
          <SomeText>
          <h2>Post :</h2>
          </SomeText>
        
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
      <h3>Page : {page}</h3>
      {isFetching ? "..." : null}
      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 0}>
        Previous
      </button>
      <button
        onClick={() => {
          if (!isPreviousData && data.hasMore) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPreviousData || !data?.hasMore}
      >
        Next
      </button>

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

export async function getServerSideProps() {
  let data: PostList = await fetchPosts(1);
  return {
    props: { posts: data?data:[] },
  };
}
