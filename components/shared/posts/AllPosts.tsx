import { IPost } from "@/database/models/post.model";
import React from "react";

interface AllPostsProps {
  posts: IPost[];
}
const AllPosts = ({ posts }: AllPostsProps) => {
  return <section className="grid  grid-cols-2">AllPosts</section>;
};

export default AllPosts;
