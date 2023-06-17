import { useEffect, useState } from "react";
import styled from "styled-components";

import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { useGetPostsQuery } from "@/store/services/posts/postApi";

const _Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  // overflow-y: scroll;
  // height: 600px;
`;

export const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetPostsQuery(page.toString());

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  return (
    <>
      <Header />
      <_Main>
        {data && data.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </_Main>
    </>
  );
};
