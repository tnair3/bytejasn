import type { Metadata } from "next";
import { projects } from "@/data/projects";
import PageHeader from "@/components/page-header";
import ProjectCard from "@/components/project-card";

export default function ProjectsPage() {
    const pinned = projects.filter((p) => p.featured);
    const planned = projects.filter((p) => !p.featured && p.status === "planned");
    const others = projects.filter((p) => !p.featured && p.status !== "planned");

    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
            <PageHeader
                title="projects"
                subtitle="things I've built, a few I'm still building, and a few I have planned."
            />

            {pinned.length > 0 && (
                <section className="mb-14">
                    <div className="grid items-start gap-6 md:grid-cols-2">
                        {pinned.map((project) => (
                            <ProjectCard key={project.id} project={project} featured />
                        ))}
                    </div>
                </section>
            )}

            {others.length > 0 && (
                <section className="mb-4">
                    <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {others.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </section>
            )}

            {planned.length > 0 && (
                <section>
                    <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {planned.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}