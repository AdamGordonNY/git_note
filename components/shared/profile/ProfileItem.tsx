import React from "react";
interface ProfileItemProps {
  type: string;
  content: React.PropsWithChildren<any>;
}
const ProfileItem = ({ type, content }: ProfileItemProps) => {
  return <div>ProfileItem</div>;
};

export default ProfileItem;
