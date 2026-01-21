import { ServicesCard } from "./utils/ServicesCard";
import nama from "@public/images/nama.png";
import legacy from "@public/images/legacy.png";

export const Services = () => {
  return (
    <div className="flex flex-wrap h-full items-center justify-center content-center gap-x-20 gap-y-15 mx-auto py-12">
      <ServicesCard
        heading="Tribute"
        subHeading="A special way to celebrate the life, stories, and memories of the person you love."
        icon={nama}
        route="\tribute"
        link="Create Memorial"
      />

      <ServicesCard
        heading="Legacy Vault"
        subHeading="Save memories, photos, videos, and documents safely for your family."
        icon={legacy}
        route="/legacy-vault"
        link="Create Vault"
      />
    </div>
  );
};
