import React from "react";

import PostFilter from "./PostFilter";

const PostsHeader = ({ name }: { name?: string }) => {
  return (
    <div className="flex w-full justify-between">
      <span className="display-2-bold text-white-100">
        {name ? `Hello, ${name} !` : "Recent Posts"}
      </span>
      <PostFilter />
    </div>
  );
};

export default PostsHeader;
