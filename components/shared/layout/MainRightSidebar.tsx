import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { IUser } from "@/database/models/user.model";
const MainRightSidebar = async ({ user }: { user: Partial<IUser> }) => {
  return (
    <section className="h-screen w-[250px]">
      <div>
        <Avatar>
          <AvatarImage src={user.image} />
        </Avatar>
      </div>
    </section>
  );
};

export default MainRightSidebar;
