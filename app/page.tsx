import { TransitionLink } from "@/components/transition-link";
import SocialLinks from "@/components/social-links";

const links = [
  { href: "/projects", label: "projects" },
  { href: "/photography", label: "photography" },
  { href: "/music", label: "music" },
  { href: "/about", label: "about me" },
];

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-center text-4xl font-bold sm:text-6xl">
          tejas nair
        </h1>

        <nav
          aria-label="Pages"
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8"
        >
          {links.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className="text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
            >
              {link.label}
            </TransitionLink>
          ))}
        </nav>

        <SocialLinks className="mt-4" />
      </div>
    </div>
  );
}
