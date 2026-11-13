export type Social = {
  name: string;
  href: string;
  icon: string; // public path to the icon
};

export const socials: Social[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tejas-nair-063737299/",
    icon: "/icons/linkedin.svg",
  },
  {
    name: "Email",
    href: "mailto:nairstejas@gmail.com",
    icon: "/icons/gmail.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com/tnair3",
    icon: "/icons/github.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/by.tejasn/",
    icon: "/icons/instagram.svg",
  },
];
