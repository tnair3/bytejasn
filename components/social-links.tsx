import { socials } from "@/data/socials";
import { cn } from "@/lib/cn";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "./icons";

// Same pill style as the buttons on the project cards.
const buttonClass =
  "inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3.5 py-1.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900";

// Keyed by the `name` in data/socials.ts
const icons: Record<string, typeof GithubIcon> = {
  LinkedIn: LinkedinIcon,
  Email: MailIcon,
  GitHub: GithubIcon,
  Instagram: InstagramIcon,
};

export default function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {socials.map((social) => {
        const external = !social.href.startsWith("mailto:");
        const Icon = icons[social.name];
        return (
          <li key={social.name}>
            <a
              href={social.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={buttonClass}
            >
              {Icon && <Icon className="size-4" />}
              {social.name.toLowerCase()}
              {external && <span className="sr-only">(opens in a new tab)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
