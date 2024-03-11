import React from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ReusableSidebarLink from "./ReusableSidebarLink";
import type { SidebarLink } from "@/types/global";
import { Separator } from "../ui/separator";
interface NavContentProps {
  sidebarLinks: SidebarLink[];
  quickLinks?: SidebarLink[];
}
const NavContent = ({ sidebarLinks, quickLinks }: NavContentProps) => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {quickLinks?.map((item: SidebarLink) => {
        return (
          <ReusableSidebarLink
            key={item.route}
            href={item.route}
            linkType={item.linkType}
          >
            {item.label}
          </ReusableSidebarLink>
        );
      })}
      {sidebarLinks.map((item: SidebarLink) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <SheetClose asChild key={item.route}>
            {isActive ? (
              <ReusableSidebarLink href={item.route} linkType={item.linkType}>
                {item.label}
              </ReusableSidebarLink>
            ) : (
              <ReusableSidebarLink href={item.route} linkType={item.linkType}>
                {item.label}
              </ReusableSidebarLink>
            )}
          </SheetClose>
        );
      })}
    </section>
  );
};
const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevFlow"
          />

          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Dev <span className="text-primary-500">Overflow</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent sidebarLinks={} />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
