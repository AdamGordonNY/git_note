const ChevronUp = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? "24"}
      height={props.size ?? "24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevron-up"
      {...props}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
};

export default ChevronUp;
