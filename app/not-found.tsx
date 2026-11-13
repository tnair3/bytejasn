import { TransitionLink } from "@/components/transition-link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <p className="text-6xl font-bold text-zinc-300">404</p>
      <h1 className="text-xl font-bold">page not found</h1>
      <TransitionLink
        href="/"
        className="text-sm text-zinc-600 underline underline-offset-4 hover:text-zinc-900"
      >
        back home
      </TransitionLink>
    </div>
  );
}
