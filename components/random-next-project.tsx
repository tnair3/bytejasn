"use client";

import { useState, useEffect } from "react";
import { projects } from "@/data/projects";
import { TransitionLink } from "@/components/transition-link";
import { ArrowRightIcon } from "@/components/icons";

export default function RandomNextProject({ currentId }: { currentId: string }) {
    const [next, setNext] = useState<typeof projects[0] | null>(null);

    useEffect(() => {
        const otherProjects = projects.filter((p) => p.id !== currentId);
        if (otherProjects.length > 0) {
            const randomProject = otherProjects[Math.floor(Math.random() * otherProjects.length)];
            setNext(randomProject);
        }
    }, [currentId]);

    if (!next) return null;

    return (
        <nav aria-label="Next project" className="mt-16 border-t border-zinc-200 pt-6">
            <TransitionLink
                href={`/projects/${next.id}`}
                className="group flex items-center justify-between gap-4"
            >
        <span>
          <span className="block text-xs text-zinc-500">next project</span>
          <span className="text-lg font-bold">{next.title}</span>
        </span>
                <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
            </TransitionLink>
        </nav>
    );
}