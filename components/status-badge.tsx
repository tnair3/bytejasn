import type { Projects } from "@/data/projects";
import type { Scores } from "@/data/scores";

const dot: Record<Projects["status"] | Scores["status"], string> = {
  completed: "bg-emerald-500",
  "in active development": "bg-pink-500",
  "currently ongoing": "bg-pink-500",
  planned: "bg-amber-400",
};

export default function StatusBadge({status}: {
  status: Projects["status"] | Scores["status"];
}) {
  return (
      <span className="inline-flex items-center gap-1.5">
      <span className={`size-2 rounded-full ${dot[status]}`} aria-hidden />
        {status}
    </span>
  );
}