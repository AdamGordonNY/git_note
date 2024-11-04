import { IUser } from "@/database/models/user.model";
import Link from "next/link";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
const SidebarAvatars = ({ user }: { user: Partial<IUser> }) => {
  const avatar = [
    {
      id: user.id,
      name: user.fullname!,
      designation: "Software Engineer",
      image: `${user.image!}`,
    },
  ];
  return (
    <Link
      href={`/profile`}
      className="mx-[30px] flex flex-col  justify-center "
    >
      <div className=" flex w-full justify-between gap-x-4 lg:mt-[50px]">
        {" "}
        <AnimatedTooltip items={avatar} />
        <div className="ml-4 flex flex-col">
          <span className="paragraph-3-medium text-white-100">
            {user.fullname}
          </span>
          <span className="paragraph-4-regular text-white-300">
            {user.email}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SidebarAvatars;
