export type Scores = {
  id: string;
  title: string;
  type: "album" | "single";
  scoreart: string;       // public path to preview image, e.g. "/sheet-music/foo-preview.jpg"
  link: string;           // external link to score
  description?: string;
  composers: string[];
}

export const scores: Scores[] = [
  {
    id: "ninelayersofhell",
    title: "PLACEHOLDER",
    type: "album",
    scoreart: "/scoreart/placeholder.png",
    link: "https://google.com",
    composers: ["Tejas Nair", "Jingwen"]
  },
  {
    id: "placeholder-single",
    title: "PLACEHOLDER",
    type: "single",
    scoreart: "/scoreart/placeholder.png",
    link: "https://google.com",
    composers: ["Tejas Nair"]
  }
];