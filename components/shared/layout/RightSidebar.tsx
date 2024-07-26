"use client";
import React, { Suspense } from "react";

import { IUser } from "@/database/models/user.model";

import RightSidebarSkeleton from "../RightSidebarSkeleton";
import SidebarAvatars from "./SidebarAvatars";
import EditSocials from "../profile/edit/EditSocials";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import ResourceTag from "../ResourceTag";
import SocialLinks from "../profile/SocialLinks";

const RightSidebar = ({
  postTags,
  user,
}: {
  postTags: string[];
  user: Partial<IUser>;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const applyFilter = (type: string, value: string) => {
    const mySearchParams = new URLSearchParams(searchParams.toString());

    mySearchParams.set("page", "1");

    if (mySearchParams.get(type) === value) {
      mySearchParams.delete(type);
      router.replace("/dashboard?" + mySearchParams.toString());
      return;
    } else {
      mySearchParams.set(type, value);
    }

    router.replace("/dashboard?" + mySearchParams.toString());
  };

  return (
    <section className=" max-w-[292px] border-l-[1.5px] bg-black-800 text-white-100 max-xl:hidden">
      <Suspense fallback={<RightSidebarSkeleton />}>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-10 flex justify-center">
            <SidebarAvatars user={user!} />
          </div>
          <div className="w-full gap-2 px-2 py-3.5">
            {pathName === "profile" && <EditSocials user={user} />}
          </div>
          <Separator />
          <div></div>
          {/* 1. Fill Other Pages 2. Expand - path can be an array of values, multiple paths can render the same/diff components */}
          {postTags &&
            postTags.map((tag) => (
              <ResourceTag
                key={tag}
                type="plain"
                className="cursor-pointer p-2 text-sm font-medium hover:bg-black-900"
                onClick={() => applyFilter("tag", tag)}
              >
                {tag}
              </ResourceTag>
            ))}
          {pathName === "profile" && (
            <SocialLinks
              github={user.socials?.github!}
              instagram={user.socials?.instagram!}
              twitter={user.socials?.dribbble!}
              linkedin={user.socials?.linkedin!}
              dribbble={user.socials?.dribbble!}
              facebook={user.socials?.facebook!}
            />
          )}
        </div>
      </Suspense>
    </section>
  );
};

export default RightSidebar;
