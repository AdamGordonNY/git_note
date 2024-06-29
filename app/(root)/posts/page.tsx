import AllPosts from "@/components/shared/posts/AllPosts";
import { getAllPosts } from "@/lib/actions/post.actions";
import { getSession } from "@/lib/authOptions";
import React from "react";

const AllPostsPage = async () => {
  const session = await getSession();
  let posts = null;
  if (session) {
    posts = await getAllPosts({ filter: "new", pageSize: 20 });
  }
  const cleanPosts = JSON.parse(JSON.stringify(posts));

  return (
    <section className="flex w-full flex-col">
      <AllPosts posts={cleanPosts?.posts!} />
    </section>
  );
};

export default AllPostsPage;
