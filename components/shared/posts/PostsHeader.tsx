import React from "react";

import PostFilter from "./PostFilter";

const PostsHeader = ({ name, page }: { name?: string; page?: string }) => {
  return (
    <div className="flex w-full justify-between px-9 py-5">
      <div className="flex flex-col">
        <span className="display-2-bold flex flex-col text-white-100">
          {name ? `Hello, ${name} !` : "Recent Posts"}
          {page === "/" && (
            <span className="paragraph-1-regular text-white-300">
              Here are your recent posts
            </span>
          )}
        </span>
      </div>
      {page !== "/" && <PostFilter />}
    </div>
  );
};

export default PostsHeader;
