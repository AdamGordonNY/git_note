import { IPost } from "@/database/models/post.model";
import React from "react";
import PostCard from "./PostCard";
import { ResourceTagType } from "../ResourceTag";
import { getAllPosts } from "@/lib/actions/post.actions";

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
              <React.Fragment key={idx}>
                <PostCard post={post} type={post.postType as ResourceTagType} />
              </React.Fragment>
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
              <React.Fragment key={idx}>
                <PostCard post={post} type={post.postType as ResourceTagType} />
              </React.Fragment>
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
              <React.Fragment key={idx}>
                <PostCard post={post} type={post.postType as ResourceTagType} />
              </React.Fragment>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {posts.map((post, idx) => {
            return (
              <React.Fragment key={idx}>
                <PostCard post={post} type={post.postType as ResourceTagType} />
              </React.Fragment>
            );
          })}
        </>
      );
    }
  };

  return (
    <section className="flex columns-1 flex-col gap-y-5">
      {renderContent()}
    </section>
  );
};

export default AllPosts;
