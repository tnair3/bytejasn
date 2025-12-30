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

        {/* Sheet Music */}
        <div className="flex flex-col gap-6 mb-10">
          <button
            onClick={() => openModal("sheet")}
            className="px-6 py-2 border border-black hover:bg-black hover:text-white transition cursor-pointer rounded-lg"
          >
            sheet music
          </button>
        </div>

        {/* Covers */}
        <div className="flex flex-col gap-6 mb-10">
          <p className="text-gray-600 modal max-w-md text-center">
            all covers of music created by other artists can be found on my{" "}
            <span><a href="https://www.instagram.com/by.tejasn/" className="underline hover:text-blue-600">
              instagram
            </a></span>
          </p>
        </div>

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
            <div className="bg-white w-[60vw] h-[60vh] max-w-4xl max-h-[80vh] rounded-lg pt-8 p-12 relative overflow-y-auto hide-scrollbar" onClick={(e) => e.stopPropagation()}>
              {content === "sheet" && (
                <>
                  <h2 className="font-bold mb-2">sheet music</h2>
                  <p className="modal">
                    arrangements of existing pieces and original compositions 
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 pt-5">
                    {arrangements.map((item) => (
                      <div key={item.id} className="text-center">
                        <a href={item.pdf} download className="group block relative">
                          <img
                            src={item.preview}
                            alt={item.title}
                            className="w-full border border-black"
                          />

                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <span className="text-white font-bold tracking-wide">open</span>
                          </div>
                        </a>

                        <h3 className="mt-3 text-sm">{item.title}</h3>
                        <p className="subtitle text-zinc-600">{item.composer}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}