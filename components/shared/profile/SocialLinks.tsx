"use client";
import { ProfileSocials } from "@/types/global";
import React from "react";
import Image from "next/image";
import twitterIcon from "@/public/icons/icn-twitter.svg";
import instagramIcon from "@/public/icons/icn-instagram.svg";
import linkedinIcon from "@/public/icons/icn-linkedin.svg";
import githubIcon from "@/public/icons/icn-github.svg";
import dribbleIcon from "@/public/icons/icn-dribbble.svg";
import facebookIcon from "@/public/icons/icn-facebook.svg";
interface SocialLinksProps {
  twitter: {
    username: string;
    url: string;
  };
  instagram: {
    username: string;
    url: string;
  };
  linkedin: {
    username: string;
    url: string;
  };
  github: {
    username: string;
    url: string;
  };
  dribbble: {
    username: string;
    url: string;
  };
  facebook: {
    username: string;
    url: string;
  };
}
const SocialLinks = ({
  twitter,
  dribbble,
  facebook,
  linkedin,
  instagram,
  github,
}: SocialLinksProps) => {
  const socialLinks: ProfileSocials[] = [
    { name: "twitter", username: twitter?.username, url: twitter?.url },
    { name: "dribbble", username: dribbble?.username, url: dribbble?.url },
    { name: "facebook", username: facebook?.username, url: facebook?.url },
    { name: "linkedin", username: linkedin?.username, url: linkedin?.url },
    { name: "instagram", username: instagram?.username, url: instagram?.url },
    { name: "github", username: github?.username, url: github?.url },
  ];
  return (
    <div className="justify-left flex  flex-col align-middle">
      {socialLinks.map((link) => {
        return (
          <a
            key={link.name}
            href={link.url}
            className="justify-left flex  flex-row content-center items-center gap-4 p-2  text-white-100 hover:shadow-lg"
          >
            {link.name === "twitter" && (
              <Image src={twitterIcon} alt="twitter" height={16} width={16} />
            )}
            {link.name === "instagram" && (
              <Image src={instagramIcon} alt="ig" height={16} width={16} />
            )}
            {link.name === "linkedin" && (
              <Image src={linkedinIcon} alt="linkedin" height={16} width={16} />
            )}
            {link.name === "github" && (
              <Image src={githubIcon} alt="github" height={16} width={16} />
            )}
            {link.name === "dribbble" && (
              <Image src={dribbleIcon} alt="dribble" height={16} width={16} />
            )}
            {link.name === "facebook" && (
              <Image src={facebookIcon} alt="facebook" height={16} width={16} />
            )}

            <span className="paragraph-2-regular capitalize text-white-300/50 ">
              {link.username}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
