import React from "react";
interface ContainerProps {
  profileDetail: "components" | "knowledge" | "workflow";
}
const ProfilePageContainer = ({ profileDetail }: ContainerProps) => {
  return (
    <div className="mt-[40px] box-border flex w-full">ProfilePageContainer</div>
  );
};

export default ProfilePageContainer;
