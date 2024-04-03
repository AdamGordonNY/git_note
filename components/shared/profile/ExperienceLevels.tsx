import { IUser } from "@/database/models/user.model";
import React from "react";
import checkSquare from "@/public/icons/checksquare.svg";
import Image from "next/image";
interface ExperienceLevelsProps {
  user?: IUser;
  experienceLevels: string[];
  [key: string]: any;
}
const ExperienceLevels = ({
  user,
  experienceLevels,
}: ExperienceLevelsProps) => {
  return (
    <section className="flex w-full flex-col gap-7">
      <span className="paragraph-1-bold text-white-100">Knowledge Level</span>
      <div className="flex flex-col gap-x-2 space-y-2">
        {experienceLevels.map((experience) => {
          return (
            <>
              <div key={experience} className="flex w-full  gap-x-2 ">
                <Image src={checkSquare} alt="userCheck" />
                <span className="paragraph-2-regular text-white-300">
                  {experience}
                </span>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceLevels;
