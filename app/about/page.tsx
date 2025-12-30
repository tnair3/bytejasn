import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans flex justify-center">
      <main className="flex flex-col w-full px-6 py-10 
                       max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl">

        {/* Heading */}
        <h1 className="font-comfortaa font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-4">
          about me
        </h1>

        {/* Introduction */}
        <p className="about text-base sm:text-lg md:text-xl mb-2">
          I am a first year computer science student at King's College London, University of London
        </p>

        {/* Skills */}
        <ul className="list-disc pl-5 text-base sm:text-lg md:text-xl space-y-1 mb-6">
          <li>Python, Java, C#</li>
          <li>HTML, CSS, JavaScript, TypeScript</li>
          <li>React, Next.js, Tailwind CSS</li>
          <li>Git, GitHub, Visual Studio, VS Code</li>
        </ul>

        {/* Photography */}
        <p className="about text-base sm:text-lg md:text-xl mb-2">
          I am an aspiring freelance photographer
        </p>

        {/* Music */}
        <p className="about text-base sm:text-lg md:text-xl mb-2">
          I am a grade 7 violinist and a grade 5 flautist
        </p>

        <ul className="list-disc pl-5 text-base sm:text-lg md:text-xl space-y-1">
          <li>Violin for 12 years, Flute for 6 years</li>
          <li>Westminster City School Music Department Orchestra</li>
          <li>King's College London GKT Music Society Orchestra</li>
        </ul>
      </main>
    </div>
  );
}