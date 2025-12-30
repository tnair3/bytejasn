import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans overflow-hidden">
      <main className="flex flex-col items-center justify-center gap-8">
        {/* Name / Title */}
        <h1 className="font-comfortaa font-bold text-center text-4xl sm:text-6xl">
          tejas nair
        </h1>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
          <Link href="/projects" className="font-comfortaa hover:underline">projects</Link>
          <Link href="/photography" className="font-comfortaa hover:underline">photography</Link>
          <Link href="/music" className="font-comfortaa hover:underline">music</Link>
          <Link href="/about" className="font-comfortaa hover:underline">about me</Link>
        </div>

        {/* Social Icons */} 
        <div className="flex flex-row gap-6 mt-4">
          <Link href="https://www.linkedin.com/in/tejas-nair-063737299/" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/linkedin.svg" alt="LinkedIn" width={28} height={28} />
          </Link>
          <Link href="mailto:nairstejas@gmail.com">
            <Image src="/icons/gmail.svg" alt="Gmail" width={28} height={28} />
          </Link>
          <Link href="https://github.com/tnair3" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/github.svg" alt="Github" width={28} height={28} />
          </Link>
          <Link href="https://www.instagram.com/by.tejasn/" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/instagram.svg" alt="Instagram" width={28} height={28} />
          </Link>
        </div>
      </main>
    </div>
  );
}