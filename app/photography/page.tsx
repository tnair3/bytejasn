import type {Metadata} from "next";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = { title: "photography" };

export default function PhotographyPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
      <PageHeader title="photography" />

      <p className="text-center text-sm italic text-zinc-400 sm:text-base">
        photos are on their way.
      </p>
    </div>
  );
}
