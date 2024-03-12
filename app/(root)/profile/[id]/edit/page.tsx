import EditBasics from "@/components/shared/profile/edit/EditBasics";
import UploadPhoto from "@/components/shared/profile/edit/UploadPhoto";

import { getOneUser } from "@/lib/actions/user.actions";
import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import React from "react";

const EditProfilePage = async () => {
  const session = await getSession();
  let user;
  if (session) {
    user = await getOneUser(session?.user?.email!);
    console.log(user);
  } else {
    redirect("/sign-in");
  }
  return (
    <div className="box-border flex min-h-[screen] w-full flex-col justify-start px-[30px] align-top   ">
      <span className="display-1-bold pl-[30px] pt-[30px] text-white-100">
        Edit Profile
      </span>
      <div className="px-[30]">
        <UploadPhoto email={user?.email!} image={user?.image} />
        {user && (
          <EditBasics
            _id={JSON.stringify(user?._id)}
            email={user.email}
            fullname={user.fullname}
            portfolio={user.portfolio || " "}
          />
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
