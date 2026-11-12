export type Projects = {
  id: string;            // unique id (slug)
  title: string;
  description: string;
  longdescription?: string;
  tech: string[];       // public path to preview image, e.g. "/sheet-music/foo-preview.jpg"
  gallery: string[];
  github?: string;
  status: "completed" | "in progress" | "planned";
  year: string;
  featured?: boolean;
};

export const projects: Projects[] = [
  {
    id: "alevelcoursework",
    title: "'Pac'",
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
        "/projects/pac/screenshot-6.png"],
    github: "https://github.com/tnair3/NEA-A-Level-2024-25",
    status: "completed",
    year: "2025",
  },
  {
    id: "daedalus",
    title: "Daedalus Engine",
    description: "Game engine built using C++ and C# with multi-platform availability for Windows, Linux, and Mac",
    tech: ["C++", "C#", "Dear ImGui", "Vulkan", "Avalonia"],
    gallery: [],
    github: "https://github.com/tnair3/Daedalus",
    status: "in progress",
    year: "2027",
    featured: true
  },
  {
    id: "mediaplayer",
    title: "Media Player",
    description: "A local mp3 media player for Android, built using Kotlin and Android Studio.",
    tech: ["Android Studio", "Kotlin"],
    gallery: [],
    github: "https://github.com/tnair3/MediaPlayer",
    status: "in progress",
    year: "2026",
    featured: true
  },
];
