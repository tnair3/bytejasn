import Image from "next/image";
import PageHeader from "@/components/page-header";
import { arrangements } from "@/data/arrangements";
import { scores } from "@/data/scores";
import { socials } from "@/data/socials";
import { ArrowUpRightIcon } from "@/components/icons";

const instagram = socials.find((s) => s.name === "Instagram");

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
        subtitle="original compositions, arrangements and covers."
      />

      {/* Original compositions */}
      {scores.length > 0 && (
        <section className="mb-14" aria-labelledby="compositions-heading">
          <SectionHeading id="compositions-heading">
            original compositions
          </SectionHeading>

          <ul className="grid gap-4 md:grid-cols-2">
            {scores.map((score) => {
              const external = score.link.startsWith("http");
              return (
                <li
                  key={score.id}
                  className="flex gap-5 rounded-xl border border-zinc-300 bg-white p-4 transition-colors hover:border-zinc-900"
                >
                  <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 sm:w-28">
                    <Image
                      src={score.scoreart}
                      alt={`${score.title} score artwork`}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-col py-1">
                    <h3 className="text-lg font-bold">{score.title}</h3>
                    <p className="text-sm italic text-zinc-500">{score.type}</p>
                    {score.composers.length > 0 && (
                      <p className="mt-2 text-xs text-zinc-500">
                        composed by {score.composers.join(", ")}
                      </p>
                    )}
                    {score.description && (
                      <p className="mt-2 text-sm text-zinc-700">
                        {score.description}
                      </p>
                    )}
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
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Sheet music arrangements */}
      {arrangements.length > 0 && (
        <section className="mb-14" aria-labelledby="arrangements-heading">
          <SectionHeading id="arrangements-heading">
            arrangements
          </SectionHeading>

          <ul className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {arrangements.map((arrangement) => (
              <li key={arrangement.id}>
                <a
                  href={arrangement.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-zinc-300 bg-zinc-100 transition-colors group-hover:border-zinc-900">
                    <Image
                      src={arrangement.preview}
                      alt={`${arrangement.title} sheet music preview`}
                      fill
                      sizes="(min-width: 768px) 30vw, 45vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="font-bold text-white">view pdf</span>
                    </div>
                  </div>
                  <p className="mt-2 font-bold">{arrangement.title}</p>
                  <p className="text-xs text-zinc-500">
                    {arrangement.composer}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Covers */}
      <section
        aria-labelledby="covers-heading"
        className="rounded-xl border border-dashed border-zinc-300 p-6 text-center"
      >
        <h2 id="covers-heading" className="font-bold">
          covers
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          all my covers live on instagram.
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
