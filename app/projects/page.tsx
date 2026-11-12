"use client";

import { useState } from "react";
import { projects, Projects } from "@/data/projects";

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Projects | null>(null);

  function openModal(project: Projects) {
    setActiveProject(project);
    setOpen(true);
  }

  // Separate featured and regular projects
  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <main className="flex flex-col items-center pt-10 px-6">
        {/* Main Heading */}
        <h1 className="font-comfortaa main font-bold text-center w-full mb-8">
          projects
        </h1>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="w-full max-w-6xl mb-15">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => openModal(project)}
                  className="group border-2 border-black p-6 text-center transition hover:bg-black hover:text-white cursor-pointer rounded-lg"
                >
                  <span className="font-black group-hover:text-white">{project.title}</span>
                  <span className="block text-base font-black">
                    <span className="text-pink-600 transition group-hover:text-white">{project.year} </span>
                    <span className="transition group-hover:text-white"> • </span>
                    <span className="text-red-400 transition group-hover:text-white"> {project.status}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Regular Projects */}
        {regularProjects.length > 0 && (
          <section className="w-full max-w-6xl mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => openModal(project)}
                  className="group border border-black p-6 text-center transition hover:bg-black hover:text-white cursor-pointer rounded-lg"
                >
                  <span>{project.title}</span>
                  <span className="block text-base font-black mt-2">
                    <span>{project.year} </span>
                    <span> • </span>
                    <span
                      className={
                        project.status === "completed"
                          ? "transition text-green-500 group-hover:text-white"
                          : project.status === "in progress"
                          ? "transition text-pink-500 group-hover:text-white"
                          : project.status === "planned"
                          ? "transition text-red-400 group-hover:text-white"
                          : "transition text-gray-500 group-hover:text-white" // fallback
                      }
                    >
                      {project.status}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Modal */}
        {open && activeProject && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={() => setOpen(false)}
          >
            <div
              className="bg-white w-[80vw] h-[80vh] max-w-[80vw] max-h-[80vh] rounded-lg p-8 overflow-y-auto hide-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title, Year, and Status */}
              <div className="flex items-baseline gap-3">
                <h2 className="font-bold text-2xl">{activeProject.title}</h2>
                <h3 className="font-medium text-lg">{activeProject.year}</h3>
              </div>

              <h3 className="font-medium mb-4 pl-2">{activeProject.status}</h3>

              {/* Description */}
              <p className="modal">{activeProject.description}</p>

              {/* GitHub link */}
              {activeProject.github ? (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-500 hover:underline mb-6"
                >
                  GitHub Repository
                </a>
              ) : (
                <span className="text-gray-400 mb-6 block">
                  No repository available
                </span>
              )}

              {/* Long Description */}
              {activeProject.longdescription && (
                <div className="mb-4">
                  {activeProject.longdescription.split("\n").map((line, index) => (
                    <p className="modal mb-1" key={index}>
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {/* Image Gallery */}
              <h3 className="font-semibold mb-2">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-5xl mb-4">
                {activeProject.gallery && activeProject.gallery.length > 0 ? (
                  activeProject.gallery.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`Project ${activeProject.title} screenshot ${index + 1}`}
                      className="w-full h-auto rounded"
                    />
                  ))
                ) : (
                  <p className="modal text-gray-400 block">No images available</p>
                )}
              </div>

              {/* Tech stack */}
              {activeProject.tech.length > 0 && (
                <>
                  <h3 className="font-semibold mb-2">Technologies</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {activeProject.tech.map((tech) => (
                      <li className="modal" key={tech}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
