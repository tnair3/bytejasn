export type Arrangement = {
  id: string;            // unique id (slug)
  title: string;
  composer: string;
  preview: string;       // public path to preview image, e.g. "/sheet-music/foo-preview.jpg"
  pdf: string;           // public path to the PDF, e.g. "/sheet-music/foo.pdf"
};

export const arrangements: Arrangement[] = [
  {
    id: "alicia-clairobscur",
    title: "Alicia",
    composer: "Lorien Testard",
    preview: "/sheetmusic/alicia-preview.png",
    pdf: "/sheetmusic/alicia.pdf",
  },
  {
    id: "lune-clairobscur",
    title: "Lune",
    composer: "Lorien Testard",
    preview: "/sheetmusic/lune-preview.png",
    pdf: "/sheetmusic/lune.pdf",
  },
  {
    id: "sealedvessel-hollowknight",
    title: "Sealed Vessel",
    composer: "Christopher Larkin",
    preview: "/sheetmusic/sealedvessel-preview.png",
    pdf: "/sheetmusic/sealedvessel.pdf",
  },
];