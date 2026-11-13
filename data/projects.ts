export type Projects = {
  id: string; // unique id, also used for the /projects/[id] page
  title: string;
  description: string; // short summary shown on the cards
  longdescription?: string; // use "\n" to start a new paragraph
  tech: string[];
  gallery: string[]; // public paths to screenshots, e.g. "/projects/pac/screenshot-1.png"
  github?: string;
  release?: string;
  status: "completed" | "in active development" | "planned";
  year: string;
  featured?: boolean; // pinned at the top of the projects page
};

export const projects: Projects[] = [
  {
    id: "alevelcoursework",
    title: "Pac",
    description: "An implementation of the classic arcade game Pac-Man in Python, using Pygame for my A-Level Computer Science coursework.",
    longdescription:
      "Developed a fully functional implementation of Pac-Man. Includes features such as maze navigation, ghost AI, pellet collection, and score tracking. Added custom maze generation using depth-first search algorithm. Includes locally stored login system, with encrypted login details, and a leaderboard system. Built using Python and the Pygame library, focusing on game mechanics and user experience.\n Started in September 2024 and completed in February 2025.",
    tech: ["Python", "Pygame", "SQLite"],
    gallery: [
      "/projects/pac/screenshot-1.png",
      "/projects/pac/screenshot-2.png",
      "/projects/pac/screenshot-3.png",
      "/projects/pac/screenshot-4.png",
      "/projects/pac/screenshot-5.png",
      "/projects/pac/screenshot-6.png",
    ],
    github: "https://github.com/tnair3/NEA-A-Level-2024-25",
    status: "completed",
    year: "2025",
  },
  {
    id: "daedalus",
    title: "Daedalus Engine",
    description: "Game engine built using C++ and C# with multi-platform availability for Windows, Linux, and Mac",
    tech: ["C++", "C#", "Vulkan", "Dear ImGui", "Avalonia UI", "XAML"],
    gallery: [],
    github: "https://github.com/tnair3/Daedalus",
    release: "pre-alpha",
    status: "in active development",
    year: "2027",
    featured: true,
  },
  {
    id: "mediaplayer",
    title: "Media Player",
    description: "A local mp3 media player for Android, built using Kotlin and Android Studio.",
    tech: ["Kotlin", "Jetpack Compose", "Android"],
    gallery: [],
    github: "https://github.com/tnair3/MediaPlayer",
    release: "1.0-alpha2",
    status: "in active development",
    year: "2026",
  },
  {
    id: "os",
    title: "OS",
    description: "A CLI-based Operating System",
    tech: ["C (Freestanding)", "x86 Assembly", "Linker Scripts", "QEMU", "Make"],
    gallery: [],
    github: "https://github.com/tnair3/OS",
    status: "planned",
    year: "2027",
  },
  {
    id: "shell",
    title: "Linux Shell",
    description: "A shell for Arch Linux",
    tech: ["C", "GTK3", "gtk-layer-shell", "Wayland IPC", "D-Bus", "CMake"],
    gallery: [],
    github: "",
    status: "planned",
    year: "2027",
  },
];

export function getProject(id: string): Projects | undefined {
  return projects.find((p) => p.id === id);
}

/** longdescription split into trimmed, non-empty paragraphs */
export function getParagraphs(project: Projects): string[] {
  return (project.longdescription ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
