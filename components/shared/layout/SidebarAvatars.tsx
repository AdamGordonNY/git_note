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
      className="mx-[60px] flex-1 flex-col items-center justify-center "
    >
      <div className=" mt-[50px] flex w-full justify-between gap-[6px]">
        <div className="ml-4">
          {" "}
          <AnimatedTooltip items={avatar} />
        </div>

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
