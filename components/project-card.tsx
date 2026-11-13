"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { getParagraphs, type Projects } from "@/data/projects";
import { cn } from "@/lib/cn";
import { TransitionLink } from "./transition-link";
import StatusBadge from "./status-badge";
import { ArrowRightIcon, ChevronDownIcon, GithubIcon } from "./icons";

const buttonClass =
  "inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3.5 py-1.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900";

const PREVIEW_COUNT = 3;

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Projects;
  featured?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const paragraphs = getParagraphs(project);
  const previews = project.gallery.slice(0, PREVIEW_COUNT);
  const hiddenCount = project.gallery.length - previews.length;

  return (
    <article
      className={cn(
        "overflow-hidden bg-white transition-colors",
        featured
          ? "rounded-2xl border-2 border-zinc-900"
          : "rounded-xl border border-zinc-300 hover:border-zinc-900",
      )}
    >
      <div className={cn("flex flex-col gap-4", featured ? "p-6 sm:p-8" : "p-5")}>
        <div>
          <div className="flex items-baseline gap-2">
            <h3
                className={cn(
                    "font-bold",
                    featured ? "text-2xl sm:text-3xl" : "text-lg",
                )}
            >
              {project.title}
            </h3>
            {project.release && (
                <span className="text-xs text-zinc-500 sm:text-sm">
                  {project.release}
                </span>
            )}
          </div>
          <p className="mt-1.5 flex items-center gap-2 text-sm text-zinc-500">
            <span>{project.year}</span>
            <StatusBadge status={project.status} />
          </p>
        </div>

        <p
          className={cn(
            "leading-relaxed text-zinc-700",
            featured ? "text-base sm:text-lg" : "line-clamp-2 text-sm",
          )}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            className={cn(buttonClass, "cursor-pointer")}
          >
            {open ? "collapse" : "expand"}
            <ChevronDownIcon
              className={cn(
                "size-4 transition-transform duration-300",
                open && "rotate-180",
              )}
            />
          </button>

          <TransitionLink
            href={`/projects/${project.id}`}
            className={buttonClass}
          >
            full page
            <ArrowRightIcon className="size-4" />
          </TransitionLink>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass}
            >
              <GithubIcon className="size-4" />
              source
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>

      {/* Expandable panel: animates height by transitioning grid rows 0fr -> 1fr */}
      <div
        id={panelId}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "flex flex-col gap-5 border-t border-zinc-200",
              featured ? "p-6 sm:p-8" : "p-5",
            )}
          >
            {paragraphs.length > 0 ? (
              <div className="flex flex-col gap-2">
                {paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-zinc-700 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-zinc-400">
                a longer write-up is on its way.
              </p>
            )}

            {project.tech.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}

            {previews.length > 0 && (
              <div>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {previews.map((src, i) => (
                    <li
                      key={src}
                      className="relative aspect-video overflow-hidden rounded-md border border-zinc-200 bg-zinc-100"
                    >
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 45vw"
                        className="object-cover"
                      />
                    </li>
                  ))}
                </ul>
                {hiddenCount > 0 && (
                  <p className="mt-2 text-xs text-zinc-500">
                    +{hiddenCount} more on the full page
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
