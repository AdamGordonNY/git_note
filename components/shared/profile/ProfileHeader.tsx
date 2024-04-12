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
    <>
      <div className="mt-[40px] flex w-full flex-1 justify-between gap-2   max-lg:flex-col ">
        <div className="flex flex-row gap-2">
          <section className="flex  shrink-0 gap-x-2">
            <Image
              alt="pic"
              height={90}
              width={90}
              src={user?.image!}
              className="shrink-0 rounded-[5px]"
            />
          </section>
          <section className="flex w-full shrink-0 flex-col gap-2 ">
            <span className="display-2-bold text-nowrap   text-white-100">
              {user?.fullname!}
            </span>
            <div className="flex flex-wrap content-center items-center justify-start gap-x-4 whitespace-nowrap border-2 max-md:flex-col   max-md:content-start max-md:items-start">
              <a
                href={user.portfolio}
                className="paragraph-3-regular flex items-center  gap-1 text-nowrap  text-primary-500"
              >
                <FaLink size={16} className="text-white-500" />
                <span className="">{user?.portfolio!}</span>
              </a>

              <span className="paragraph-3-regular flex  items-center  gap-1 whitespace-nowrap  text-white-300">
                <FiMapPin size={16} className="text-white-500" />

                {user?.location! || "New York, NY"}
              </span>

              <span className="flex items-center gap-1 whitespace-nowrap text-white-300">
                <CiCalendar
                  size={16}
                  className="text-white-500"
                  strokeWidth={2}
                />{" "}
                Joined {format(user?.updatedAt!, "MMMM,yyyy")}
              </span>
            </div>
          </section>
        </div>

        <section className="flex shrink-0">
          <Link href={`/profile/edit`}>
            <Button
              className="social-login-shadow paragraph-3-bold h-[40px] min-w-[140px] items-center  justify-center gap-1 bg-black-700 align-middle text-primary-500  "
              type="button"
            >
              <Image src={icnEdit} alt="userCheck" height={16} width={16} />
              Edit Profile
            </Button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default ProfileHeader;
