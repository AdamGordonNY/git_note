import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { twMerge } from "tailwind-merge";
interface CustomButtonProps extends ButtonProps {
  className?: string;
  children?: React.ReactNode;
  text?: string;
}
const CustomButton = ({ className, text }: CustomButtonProps) => {
  return <Button className={twMerge(`${className}, 'gap-4'`)}>{text}</Button>;
};

export default CustomButton;
