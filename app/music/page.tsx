import type {Metadata} from "next";
import PageHeader from "@/components/page-header";
import { scores } from "@/data/scores";
import { socials } from "@/data/socials";
import { ArrowUpRightIcon } from "@/components/icons";
import EquipmentSection from "@/components/equipment-section";
import ExpandableEquipmentSection from "@/components/expandable-equipment-section";
import {ImageWithFallback} from "@/components/image-with-fallback";
import StatusBadge from "@/components/status-badge";

export const metadata: Metadata = { title: "music" };

const instagram = socials.find((s) => s.name === "Instagram");

const equipment = [
    {
        name: "Cubase 15 Artist",
        category: "DAW",
        description: "Music production and composition",
    },
    {
        name: "MuseScore",
        category: "Notation",
        description: "Score writing and music notation",
    },
];

const expandableEquipment = [
    {
        name: "Virtual instruments",
        category: "Virtual instruments",
        description: "Sample libraries and orchestral instruments",
        contents: [
            {
                name: "BBC Symphony Orchestra Core",
                description: "Full orchestral sample library by Spitfire Audio in collaboration with BBC Studios, recorded at Maida Vale Studios in London",
            },
            {
                name: "NOIRE",
                description: "Sampled grand piano by Native Instruments in collaboration with Galaxy Instruments, played by Nils Frahm, recorded at Saal 3, in the Funkhaus Nalepastrasse recording complex in Berlin"
            },
            {
                name: "EastWest Hollywood Choirs Diamond",
                description: "Male and female cinematic choral library by EastWest Sounds, produced by Doug Rogers and Nick Phoenix, recorded at EastWest Studios in California",
            },
            {
                name: "Abbey Road Low Percussion Core",
                description: "Orchestral low percussion library by Spitfire Audio in collaboration with Abbey Road Studios, recorded at Studio One, Abbey Road Studios in London"
            },
            {
                name: "Spitfire Originals",
                description: "Various smaller virtual instrument libraries by Spitfire Audio, including Intimate Strings, Cinematic Pads, and Crystal Keys"
            },
        ],
    },
];

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="mb-4 text-sm font-bold tracking-wide text-zinc-500"
    >
      {children}
    </h2>
  );
}

export default function MusicPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
        <PageHeader
            title="music"
            subtitle="original compositions and covers."
        />

        <EquipmentSection
            description="The software and tools I use for music production, composition, and notation."
            items={equipment}
        />

        <ExpandableEquipmentSection
            items={expandableEquipment}
        />

        {/* Original compositions */}
        <section className="mb-14" aria-labelledby="compositions-heading">
            <SectionHeading id="compositions-heading">
                original compositions
            </SectionHeading>

            {scores.length > 0 ? (
                <ul className="grid gap-4 md:grid-cols-2">
                    {scores.map((score) => {
                        const external = score.link?.startsWith("http") ?? false;
                        return (
                            <li
                                key={score.id}
                                className="flex gap-5 rounded-xl border border-zinc-300 bg-white p-4 transition-colors hover:border-zinc-900"
                            >
                                <div className="relative aspect-[1] w-24 shrink-0 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 sm:w-28">
                                    <div className="relative h-full w-full">
                                        <ImageWithFallback
                                            src={score.scoreart}
                                            alt={`${score.title} score artwork`}
                                            fill
                                            sizes="112px"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="flex min-w-0 flex-col py-1">
                                    <h3 className="text-lg font-bold">{score.title}</h3>
                                    <p className="flex items-center gap-3 text-sm text-zinc-500">
                                        <span className="text-sm italic text-zinc-500">{score.type}</span>
                                        <StatusBadge status={score.status} />
                                    </p>
                                    {score.composers.length > 0 && (
                                        <p className="mt-2 text-xs text-zinc-500">
                                            by {score.composers.length === 1
                                            ? score.composers[0]
                                            : score.composers.length === 2
                                                ? `${score.composers[0]} & ${score.composers[1]}`
                                                : `${score.composers.slice(0, -1).join(", ")} & ${score.composers[score.composers.length - 1]}`}
                                        </p>
                                    )}
                                    {score.link ? (
                                        <a
                                            href={score.link}
                                            {...(external
                                                ? { target: "_blank", rel: "noopener noreferrer" }
                                                : {})}
                                            className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-zinc-900 underline-offset-4 hover:underline"
                                        >
                                            open score
                                            <ArrowUpRightIcon className="size-4" />
                                        </a>
                                    ) : (
                                        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-zinc-400 cursor-default">
                                            no score available yet
                                        </span>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm italic text-zinc-400 sm:text-base">
                    music is on its way.
                </p>
            )}
        </section>

      {/* Covers */}
      <section
        aria-labelledby="covers-heading"
        className="rounded-xl border border-dashed border-zinc-300 p-6 text-center"
      >
        <h2 id="covers-heading" className="font-bold">
          covers
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          all my covers (coming soon) live on instagram.
        </p>
        {instagram && (
          <a
            href={instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm font-medium transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
          >
            @by.tejasn
            <ArrowUpRightIcon className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </section>
    </div>
  );
}
