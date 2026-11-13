export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-10 text-center sm:mb-14">
      <h1 className="text-3xl font-bold sm:text-5xl">{title}</h1>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-md text-sm text-zinc-500 sm:text-base">
          {subtitle}
        </p>
      )}
    </header>
  );
}
