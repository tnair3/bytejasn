import Image from "next/image";
import { socials } from "@/data/socials";

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-row items-center gap-6 ${className}`}>
      {socials.map((social) => {
        const external = !social.href.startsWith("mailto:");
        return (
          <li key={social.name}>
            <a
              href={social.href}
              aria-label={social.name}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="block opacity-80 transition duration-200 hover:-translate-y-0.5 hover:opacity-100"
            >
              <Image src={social.icon} alt="" width={28} height={28} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
