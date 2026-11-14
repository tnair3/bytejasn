export type Scores = {
  id: string;
  title: string;
  type: "album" | "single";
  scoreart?: string;       // public path to preview image, e.g. "/sheet-music/foo-preview.jpg"
  link?: string;           // external link to score
  composers: string[];
  status: "completed" | "currently ongoing" | "planned";
}

export const scores: Scores[] = [
  {
    id: "dtd-demo",
    title: "Dawn to Dusk",
    type: "album",
    link: "https://drive.google.com/drive/folders/14vWMQfFKFZe5ELpodU2LSVZGViBgPn5R",
    composers: [ "Tejas Nair" ],
    status: "currently ongoing",
  },
  {
    id: "bossrushgame",
    title: "Boss Rush Soundtrack",
    type: "album",
    composers: [ "Yu Jingwen", "Collin Lee", "Tejas Nair" ],
    status: "currently ongoing",
  }
];