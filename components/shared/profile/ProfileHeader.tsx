import React from "react";
import Image from "next/image";
import { getSession } from "@/lib/authOptions";

const ProfileHeader = async () => {
  const session = await getSession();

  return (
    <div className={`mt-[40px] flex h-[90px] items-center `}>
      <div className={` flex-0 ml-[10px]`}>
        <Image
          alt="pic"
          height={90}
          width={90}
          src={session?.user?.image!}
          className="rounded-[5px]"
        />
      </div>
      <div className="ml-[10px] flex-1 flex-col gap-4">
        <div className="flex-1">
          <span className="display-2-bold text-left align-top text-white-100">
            {session?.user?.name!}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
