import type {Metadata} from "next";
import PageHeader from "@/components/page-header";
import EquipmentSection from "@/components/equipment-section";
import ExpandableEquipmentSection from "@/components/expandable-equipment-section";

export const metadata: Metadata = { title: "photography" };

const equipment = [
    {
        name: "Canon EOS 550D",
        category: "Camera",
        description: "My primary camera for photography",
    },
    {
        name: "ON1 Photo RAW 2027",
        category: "Software",
        description: "Photo editing and processing",
    },
];

const expandableEquipment = [
    {
        name: "Lenses",
        category: "Lenses",
        description: "The lenses I use for photography",
        contents: [
            {
                name: "Standard Kit Lens",
                description: "Canon EF-S 18-55mm f/3.5-5.6 IS",
            },
            {
                name: "Prime Lens",
                description: "Canon EF 50mm f/1.4 USM",
            },
            {
                name: "Telephoto Lens",
                description: "Tamron AF 70-300mm f/4-5.6 Di LD Macro 1:2",
            },
        ],
    },
];

export default function PhotographyPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
        <PageHeader title="photography" />

        <EquipmentSection
            description="The equipment and software I use for photography."
            items={equipment}
        />

        <ExpandableEquipmentSection
            items={expandableEquipment}
        />

        <p className="text-center text-sm italic text-zinc-400 sm:text-base">
        photos are on their way.
      </p>
    </div>
  );
}
