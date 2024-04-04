import React from "react";
import CreatePost from "@/components/shared/posts/CreatePost";
import { getSession } from "@/lib/authOptions";
import { getOneUser } from "@/lib/actions/user.actions";
import { IUser } from "@/database/models/user.model";
const Page = async () => {
  const session = await getSession();
  let user;

  if (session) {
    user = await getOneUser(session?.user?.email!);
  }
  const cleanUser: IUser = JSON.parse(JSON.stringify(user));
  return (
    <div className="w-full">
      <CreatePost user={cleanUser} />
    </div>
  );
};

export default Page;
