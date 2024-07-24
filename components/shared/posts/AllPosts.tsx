import { IPost } from "@/database/models/post.model";
import React from "react";
import PostCard from "./PostCard";
import { getAllPosts } from "@/lib/actions/post.actions";
import { CreateType } from "@/types";

interface AllPostsProps {
  posts: IPost[];
  searchParams: { [key: string | number]: string | undefined };
}
const AllPosts = async ({ posts, searchParams }: AllPostsProps) => {
  const renderContent = async () => {
    if (searchParams.filter === "knowledge") {
      const knowledgePosts: IPost[] = JSON.parse(
        JSON.stringify(
          await getAllPosts({
            page: Number(searchParams.page!),
            filter: searchParams.filter!,
            pageSize: 10,
          })
        )
      );
      return (
        <>
          {knowledgePosts.map((post, idx) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                type={post.postType as CreateType}
              />
            );
          })}
        </>
      );
    }
    if (searchParams.filter === "component") {
      const componentPosts: IPost[] = JSON.parse(
        JSON.stringify(
          await getAllPosts({
            page: Number(searchParams.page!),
            filter: searchParams.filter!,
            pageSize: 10,
          })
        )
      );
      return (
        <>
          {componentPosts.map((post, idx) => {
            return (
              <PostCard
                post={post}
                key={post.id}
                type={post.postType as CreateType}
              />
            );
          })}
        </>
      );
    }
    if (searchParams.filter === "workflow") {
      const workflowPosts: IPost[] = JSON.parse(
        JSON.stringify(
          await getAllPosts({
            page: Number(searchParams.page!),
            filter: searchParams.filter!,
            pageSize: 10,
          })
        )
      );
      return (
        <>
          {workflowPosts.map((post, idx) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                type={post.postType as CreateType}
              />
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {posts.map((post, idx) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                type={post.postType as CreateType}
              />
            );
          })}
        </>
      );
    }
  };
  const data = await renderContent();
  return (
    <section className="flex columns-1 flex-col gap-y-5">
      {data && data}
    </section>
  );
};

export default AllPosts;
