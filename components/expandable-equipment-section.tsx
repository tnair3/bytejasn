"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { ChevronDownIcon } from "./icons";

type EquipmentDetail = {
    name: string;
    description?: string;
};

type ExpandableEquipmentItem = {
    name: string;
    category: string;
    description: string;
    contents: EquipmentDetail[];
};

type ExpandableEquipmentSectionProps = {
    items: ExpandableEquipmentItem[];
};

function ExpandableEquipmentCard({
                                     item,
                                 }: {
    item: ExpandableEquipmentItem;
}) {
    const [open, setOpen] = useState(false);
    const panelId = useId();

    return (
        <li className="overflow-hidden rounded-xl border border-zinc-300 bg-white transition-colors hover:border-zinc-900">
            <div className="flex items-start justify-between gap-3 p-4">
                <div className="min-w-0">
                    <p className="mb-1 text-xs text-zinc-500">
                        {item.name}
                    </p>

                    <p className="mt-1 text-sm text-zinc-600">
                        {item.description}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((previous) => !previous)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3.5 py-1.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                >
                    {open ? "collapse" : "expand"}

                    <ChevronDownIcon
                        className={cn(
                            "size-4 transition-transform duration-300",
                            open && "rotate-180"
                        )}
                    />
                </button>
            </div>

            <div
                id={panelId}
                inert={!open}
                className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
            >
                <div className="overflow-hidden">
                    <div className="border-t border-zinc-200 p-4">
                        <ul className="flex flex-col gap-3">
                            {item.contents.map((detail) => (
                                <li key={detail.name}>
                                    <p className="text-sm font-medium text-zinc-800">
                                        {detail.name}
                                    </p>

                                    {detail.description && (
                                        <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
                                            {detail.description}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default function ExpandableEquipmentSection({
                                                       items,
                                                   }: ExpandableEquipmentSectionProps) {
    return (
        <section className="mb-14">
            <ul className="grid gap-3">
                {items.map((item) => (
                    <ExpandableEquipmentCard
                        key={item.name}
                        item={item}
                    />
                ))}
            </ul>
        </section>
    );
}
