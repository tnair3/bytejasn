"use client";

import { useState } from "react";
import { arrangements } from "@/data/arrangements";
import { scores } from "@/data/scores"

type ModalContent = "sheet" | null;

export default function Music() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ModalContent>(null);

  function openModal(type: ModalContent) {
    setContent(type);
    setOpen(true);
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <main className="flex flex-col items-center pt-10">
        <h1 className="font-comfortaa main font-bold text-center w-full mb-8">
          music
        </h1>

        {/* Original Compositions */}
        <div className="flex flex-col gap-6 mb-10">
          <h3 className="font-semibold text-lg">original compositions</h3>

          {scores.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4"
            >
              {/* Score artwork (left) */}
              <div className="relative w-32 h-auto group">
                <img
                  src={item.scoreart}
                  alt={item.title}
                  className="w-full h-auto rounded border"
                />
                {/* Overlay */}
                <a
                  href={item.link}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded cursor-pointer"
                >
                  <span className="text-white font-semibold">open</span>
                </a>
              </div>

              {/* Text content (right) */}
              <div className="flex flex-col">
                <a href={item.link} className="font-bold text-base hover:text-blue-600 hover:underline">
                  {item.title}
                </a>
                <p className="subtitle text-sm text-gray-600">
                  {item.type}
                </p>
                {/* Composers list */}
                {item.composers?.length > 0 && (
                  <ul className="mt-1 text-sm text-gray-500 list-disc list-inside list-none">
                    {item.composers.map((composer, index) => (
                      <li className="composers" key={index}>{composer}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Covers */}
        <div className="flex flex-col gap-6 mb-10">
          <p className="text-gray-600 modal max-w-md text-center">
            all covers of music can be found on my{" "}
            <span><a href="https://www.instagram.com/by.tejasn/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
              instagram
            </a></span>
          </p>
        </div>
      </main>
    </div>
  );
}