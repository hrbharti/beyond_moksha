import { ServicesCard } from "./utils/ServicesCard";
import tributeIcon from "@public/svgs/tribute.svg";
import legacyVaultIcon from "@public/svgs/legacy-vault.svg";

export const Services = () => {
  return (
    <div className="flex flex-wrap h-full items-center justify-center content-center gap-x-20 gap-y-15 mx-auto py-12">
      <ServicesCard
        heading="Tribute"
        subHeading="A special way to celebrate the life, stories, and memories of the person you love."
        icon={tributeIcon}
        route="/tribute"
        link="Create Memorial"
      />

      <ServicesCard
        heading="Legacy Vault"
        subHeading="Save memories, photos, videos, and documents safely for your family."
        icon={legacyVaultIcon}
        route="/legacy-vault"
        link="Create Vault"
      />
    </div>
  );
};
