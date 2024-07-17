import React from "react";

import PostFilter from "./PostFilter";

const PostsHeader = () => {
  return (
    <div className="flex w-full justify-between">
      <span className="display-2-bold text-white-100">Recent Posts</span>
      <PostFilter />
    </div>
  );
};

export default PostsHeader;
