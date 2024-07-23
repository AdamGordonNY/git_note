import { getAllPosts } from "@/lib/actions/post.actions";
import { CreateType } from "@/types";
import React from "react";

const Page = async ({ params }: { params: { postType: string } }) => {
  const type = params.postType as CreateType;
  switch (type) {
    case "knowledge": {
      // Assuming 'GetPostParams' expects 'postType' instead of 'type'
      const fetchedPosts = await getAllPosts({
        filter: "knowledge",
        page: 1,
        pageSize: 10,
      });
      // Example usage of 'fetchedPosts', adjust according to actual needs
      return (
        <div>
          {fetchedPosts?.posts.length! > 0
            ? "Posts available"
            : "No posts found"}
        </div>
      );
    }
    case "component": {
      // Assuming 'GetPostParams' expects 'postType' instead of 'type'
      const fetchedPosts = await getAllPosts({
        filter: "component",
        page: 1,
        pageSize: 10,
      });
      // Example usage of 'fetchedPosts', adjust according to actual needs
      return (
        <div>
          {fetchedPosts?.posts.length! > 0
            ? "Posts available"
            : "No posts found"}
        </div>
      );
    }

    case "workflow": {
      // Assuming 'GetPostParams' expects 'postType' instead of 'type'
      const fetchedPosts = await getAllPosts({
        filter: "workflow",
        page: 1,
        pageSize: 10,
      });
      // Example usage of 'fetchedPosts', adjust according to actual needs
      return (
        <div>
          {fetchedPosts?.posts.length! > 0
            ? "Posts available"
            : "No posts found"}
        </div>
      );
    }
    default:
      return <div>Not Found</div>;
  }
};

export default Page;
