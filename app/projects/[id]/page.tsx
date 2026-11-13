import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getParagraphs, getProject, projects } from "@/data/projects";
import { TransitionLink } from "@/components/transition-link";
import StatusBadge from "@/components/status-badge";
import RandomNextProject from "@/components/random-next-project";
import {
    ArrowLeftIcon,
    GithubIcon,
} from "@/components/icons";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
    return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const project = getProject(id);
    if (!project) return {};
    return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params;
    const project = getProject(id);
    if (!project) notFound();

    const paragraphs = getParagraphs(project);

    return (
        <article className="mx-auto w-full max-w-3xl px-6 py-10 sm:py-14">
            <TransitionLink
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
            >
                <ArrowLeftIcon className="size-4" />
                projects
            </TransitionLink>

            <header className="mt-8">
                <h1 className="text-3xl font-bold sm:text-5xl">{project.title}</h1>
                <p className="mt-3 flex items-center gap-2 text-sm text-zinc-500 sm:text-base">
                    <span>{project.year}</span>
                    <StatusBadge status={project.status} />
                </p>

                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
                    >
                        <GithubIcon className="size-4" />
                        view source
                        <span className="sr-only">(opens in a new tab)</span>
                    </a>
                )}
            </header>

            <p className="mt-10 text-lg leading-relaxed text-zinc-800 sm:text-xl">
                {project.description}
            </p>

            {paragraphs.length > 0 && (
                <div className="mt-6 flex flex-col gap-3">
                    {paragraphs.map((paragraph, i) => (
                        <p key={i} className="leading-relaxed text-zinc-700">
                            {paragraph}
                        </p>
                    ))}
                </div>
            )}

            {project.tech.length > 0 && (
                <section className="mt-12" aria-labelledby="tech-heading">
                    <h2 id="tech-heading" className="mb-3 text-sm font-bold text-zinc-500">
                        technologies
                    </h2>
                    <ul className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                            <li
                                key={tech}
                                className="rounded-full bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-700"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {project.gallery.length > 0 && (
                <section className="mt-12" aria-labelledby="gallery-heading">
                    <h2
                        id="gallery-heading"
                        className="mb-3 text-sm font-bold text-zinc-500"
                    >
                        gallery
                    </h2>
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {project.gallery.map((src, i) => (
                            <li key={src}>
                                <Image
                                    src={src}
                                    alt={`${project.title} screenshot ${i + 1}`}
                                    width={1280}
                                    height={720}
                                    sizes="(min-width: 768px) 384px, 100vw"
                                    className="h-auto w-full rounded-lg border border-zinc-200 bg-zinc-100"
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <RandomNextProject currentId={project.id} />
        </article>
    );
}