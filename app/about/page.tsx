import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { TransitionLink } from "@/components/transition-link";
import SocialLinks from "@/components/social-links";
import { ArrowRightIcon } from "@/components/icons";
import AgeToggle from "@/components/age-toggle";

export const metadata: Metadata = { title: "about me" };

// Edit the content here.
const BIRTH = "2007-03-29T08:00:00+00:00";

const skills = [
  { label: "languages", items: ["C#", "C++", "Java", "Kotlin", "XML", "Python"] },
  { label: "frameworks & technologies", items: ["Jetpack Compose", "Vulkan", "Avalonia UI", "React", "Next.js"] },
  { label: "tools", "items": ["Git", "JetBrains IDEs", "Android Studio", "VS Code", "Visual Studio"] },
  { label: "environments", "items": ["Linux", "Windows", "WSL", "Hyper-V"] },
];

const instruments = [
  { name: "violin", grade: 7, years: "from 2014" },
  { name: "flute", grade: 5, years: "from 2020" },
];

const ensembles = [
  {
    name: "King's College London GKT Music Society Orchestra",
    years: "from 2025",
  },
  {
    name: "Westminster City School Music Department Orchestra",
    years: "2018 – 2025",
  },
];

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-zinc-200 py-8 md:grid-cols-[10rem_1fr] md:gap-8">
      <h2 className="text-sm font-bold tracking-wide text-zinc-500">{label}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:py-16">
      <PageHeader title="about me" />

      <div className="mb-8">
          <div className="text-center">
              <p className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                  BSc Computer Science
              </p>
              <p className="mt-1 text-sm font-medium tracking-[0.15em] text-zinc-500 uppercase sm:text-base">
                  2nd Year · King&apos;s College London
              </p>
          </div>
          <div className="mt-2 flex justify-center">
              <div className="mt-2 flex justify-center">
                  <AgeToggle birth={BIRTH} />
              </div>
          </div>
      </div>

      <Row label="code">
        <dl className="grid gap-5 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.label}>
              <dt className="mb-2 text-xs text-zinc-500">{group.label}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Row>

      <Row label="photography">
        <p className="text-lg leading-relaxed">
          I am a photographer as a hobbyist as well as freelance.
        </p>
        <TransitionLink
          href="/photography"
          className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          see my photography
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </TransitionLink>
      </Row>

      <Row label="music">
        <ul className="grid gap-3 sm:grid-cols-2">
          {instruments.map((instrument) => (
            <li
              key={instrument.name}
              className="rounded-xl border border-zinc-300 bg-white p-4"
            >
              <p className="font-bold">{instrument.name}</p>
              <p className="mt-1 text-sm text-zinc-500">
                grade {instrument.grade} · {instrument.years}
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-col gap-3 text-sm text-zinc-700 sm:text-base">
          {ensembles.map((ensemble) => (
            <li key={ensemble.name} className="flex gap-3">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-purple-500"
              />
              <div>
                <span className="block">{ensemble.name}</span>
                <span className="block text-xs text-zinc-500 sm:text-sm">
                  {ensemble.years}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <TransitionLink
          href="/music"
          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          listen to my music
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </TransitionLink>
      </Row>

      <Row label="get in touch">
        <SocialLinks />
      </Row>
    </div>
  );
}
