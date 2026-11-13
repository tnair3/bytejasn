/**
 * Spatial map of the site. Home sits in the middle and every section lives
 * on one side of it (y grows downwards, like screen coordinates):
 *
 *               about (0,-1)
 *                   |
 *   photography (-1,0) -- home (0,0) -- music (1,0)
 *                   |
 *              projects (0,1)
 *
 * Navigating is like moving a camera across that map, so the *content*
 * slides the opposite way:
 *   home -> projects     content slides up     (projects sits below)
 *   home -> photography  content slides right  (photography sits left)
 *   home -> music        content slides left   (music sits right)
 *   home -> about        content slides down   (about sits above)
 * Going back plays the same animation in reverse.
 */

export type Direction = { x: number; y: number };

const SECTION_POSITIONS: Record<string, Direction> = {
  "": { x: 0, y: 0 },
  projects: { x: 0, y: 1 },
  photography: { x: -1, y: 0 },
  music: { x: 1, y: 0 },
  about: { x: 0, y: -1 },
};

function parse(pathname: string) {
  const [section = "", child] = pathname.split("/").filter(Boolean);
  return { section, depth: child ? 1 : 0 };
}

/**
 * Which way the page content should move for a navigation, as a unit-ish
 * vector (x: -1 = left, 1 = right; y: -1 = up, 1 = down).
 * Returns null when there is no spatial relationship (the browser's default
 * cross-fade is used instead), e.g. unknown routes or sibling detail pages.
 */
export function getSlideDirection(from: string, to: string): Direction | null {
  const a = parse(from);
  const b = parse(to);
  const pa = SECTION_POSITIONS[a.section];
  const pb = SECTION_POSITIONS[b.section];
  if (!pa || !pb) return null;

  if (a.section === b.section) {
    // Drilling into / out of a detail page (e.g. /projects -> /projects/pac)
    if (a.depth === b.depth) return null;
    return b.depth > a.depth ? { x: -1, y: 0 } : { x: 1, y: 0 };
  }

  return {
    x: Math.sign(pa.x - pb.x) || 0,
    y: Math.sign(pa.y - pb.y) || 0,
  };
}
