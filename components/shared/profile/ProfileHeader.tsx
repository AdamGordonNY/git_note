import React from "react";
import Image from "next/image";

import { FiMapPin } from "react-icons/fi";
import { FaLink } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";

import { redirect } from "next/navigation";
import { IUser } from "@/database/models/user.model";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import icnEdit from "@/public/icons/icn-edit.svg";
interface ProfileHeaderProps {
  user: Partial<IUser>;
}
const ProfileHeader = async ({ user }: ProfileHeaderProps) => {
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <section
      className={`mt-[40px] flex h-[90px] items-center justify-between gap-5`}
    >
      <div className={` flex-0 justify-start gap-5`}>
        <Image
          alt="pic"
          height={90}
          width={90}
          src={user?.image!}
          className="rounded-[5px]"
        />
      </div>
      <div className="flex-1  flex-col justify-end gap-2.5 space-y-8">
        <span className="display-2-bold text-left align-top text-white-100">
          {user?.fullname!}
        </span>
        <div className="flex w-1/2  flex-row items-start justify-between gap-2">
          <div>
            <a href={user.portfolio} className="items-cente flex gap-1">
              <FaLink size={16} className="text-white-500" />
              <span className="paragraph-3-regular order-2 text-nowrap text-left text-primary-500">
                {user?.portfolio!}
              </span>
            </a>
          </div>
          <div className="flex items-center">
            <FiMapPin size={16} className="text-white-500" />
            <span className="paragraph-3-regular order-2 text-nowrap text-left text-white-300">
              {user?.location! || "New York, NY"}
            </span>
          </div>
          <div className="flex items-center">
            <CiCalendar size={16} className="text-white-500" />
            <span className="text-nowrap text-white-300">
              {" "}
              Joined {format(user?.updatedAt!, "MMMM,yyyy")}
            </span>
          </div>
        </div>
      </div>
      <Link href={`/profile/${user._id}/edit`}>
        <Button
          className="social-login-shadow paragraph-3-bold h-[40px] w-[140px] items-center justify-center gap-1 bg-black-700 align-middle text-primary-500"
          type="button"
        >
          <Image src={icnEdit} alt="userCheck" height={16} width={16} />
          Edit Profile
        </Button>
      </Link>
    </section>
  );
};

export default ProfileHeader;
