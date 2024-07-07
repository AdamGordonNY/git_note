import React from "react";
import ResourceTag from "../ResourceTag";

const PostsHeader = () => {
  return (
    <div className="flex w-full justify-between">
      <span className="display-2-bold text-white-100">Recent Posts</span>
      <div className="flex justify-end gap-x-3.5">
        <ResourceTag type="knowledge" text="Knowledge" />
        <ResourceTag type="workflow" text="Workflow" />
        <ResourceTag type="component" text="Component" />
      </div>
    </div>
  );
};

export default PostsHeader;
