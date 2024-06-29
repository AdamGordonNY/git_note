import IconWrapper from "./IconWrapper";

const VerticalEllipsisIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-ellipsis-vertical"
      {...props}
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
};

export default IconWrapper(VerticalEllipsisIcon, {
  backgroundStyle: "bg-none",
  strokeOrFill: "stroke-white-300",
});
