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
    github: "https://github.com/tnair3/NEA-A-Level-2024-25/releases",
    status: "completed",
    year: "2025",
  },
  {
    id: "networksim",
    title: "network simulator",
    description: "A simulator that models the behaviour of computer networks",
    longdescription: "A desktop application that simulates the behaviour of computer networks. Users can create and configure network topologies, including routers, switches, and end devices. The simulator models data packet transmission, routing protocols, and network congestion. It provides a visual representation of network traffic. Built using .NET and C#, focusing on network protocols and data structures.\n The project originally started as a firewall simulator, intended to model how firewalls filter traffic based on rulesets. Near the start of the project, I decided to eventually expand this to a full network simulator, finishing the original firewall functionality, and then expanding the project to include network technology simulation.\n Started in December 2025 and ongoing.",
    tech: [".NET", "C#"],
    gallery: [],
    github: "",
    status: "planned",
    year: "2026",
    featured: true
  },
  {
    id: "chess",
    title: "chess game",
    description: "An implementation of Chess, redefining the original rules to create a unique gameplay experience",
    longdescription: "PLACEHOLDER LONG DESCRIPTION\n Started in December 2025 and ongoing.",
    tech: ["Unity", "C#"],
    gallery: [],
    github: "",
    status: "planned",
    year: "2026/27",
  },
  {
    id: "mediaplayer",
    title: "media player",
    description: "A multi-platform media player application",
    tech: [".NET MAUI", "C#"],
    gallery: [],
    github: "",
    status: "planned",
    year: "2027",
  }
];
