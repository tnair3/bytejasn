import { cn } from "@/lib/cn";

type EquipmentItem = {
    name: string;
    category: string;
    description: string;
};

type EquipmentSectionProps = {
    description: string;
    items: EquipmentItem[];
};

export default function EquipmentSection({
                                             description,
                                             items,
                                         }: EquipmentSectionProps) {
    return (
        <section className="mb-3" aria-labelledby="equipment-heading">
            <h2
                id="equipment-heading"
                className="mb-4 text-sm font-bold tracking-wide text-zinc-500"
            >
                equipment
            </h2>

            <p className="mb-5 text-sm leading-relaxed text-zinc-600">
                {description}
            </p>

            <ul className="grid items-start gap-3 sm:grid-cols-2">
                {items.map((item) => (
                    <li
                        key={item.name}
                        className={cn(
                            "rounded-xl border border-zinc-300 bg-white p-4 transition-colors",
                            "hover:border-zinc-900"
                        )}
                    >
                        <p className="mb-1 text-xs text-zinc-500">
                            {item.category}
                        </p>

                        <h3 className="font-bold text-zinc-900">
                            {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-600">
                            {item.description}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}