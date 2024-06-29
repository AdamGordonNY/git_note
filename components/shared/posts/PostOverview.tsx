"use client";

import Badge from "@/components/ui/badge";
import { IPost } from "@/database/models/post.model";
import { createTypeList } from "@/lib/constants";
const PostOverview = ({ post }: { post: IPost }) => {
  const { postType, title, tags } = post;

  const filteredPostType = createTypeList.filter(
    (type) => type.name === postType
  );

  return (
    <section className="space-y-4 p-4">
      <Badge
        color={filteredPostType[0].badgeColor}
        icon={filteredPostType[0].name}
        size="medium"
      >
        {filteredPostType[0].uiName}
      </Badge>

      <h1 className="heading-1-medium">{title}</h1>
      <div className="flex flex-wrap gap-2">
        {tags &&
          tags.map((tag) => (
            <Badge size="medium" key={tag}>
              {tag}
            </Badge>
          ))}
      </div>
    </section>
  );
};

export default PostOverview;
