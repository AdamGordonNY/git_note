import React from "react";

const Page = ({ params }: { params: string[] }) => {
  const postId = params[0];
  return <div>Page</div>;
};

export default Page;
