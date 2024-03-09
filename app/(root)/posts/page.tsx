import { getAllPosts } from "@/lib/actions/post.actions";
import { getSession } from "@/lib/authOptions";
import React from "react";

const AllPostsPage = async () => {
  const session = await getSession();
  if (session) {
    const posts = await getAllPosts();
  }

  return <div>AllPostsPage</div>;
};

export default AllPostsPage;
