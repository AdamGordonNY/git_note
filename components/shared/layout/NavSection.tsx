import React from "react";

const NavSection = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="space-y-6 border-b border-white-500 p-4">
      <div className="group m-auto mb-2 flex flex-col justify-start gap-4 rounded-md p-2">
        <h3 className="caption-small group-hover:text-white text-white-500">
          {title}
        </h3>
        <section className="paragraph-3-medium flex flex-col gap-2 text-white-300">
          {children}
        </section>
      </div>
    </div>
  );
};

export default NavSection;
