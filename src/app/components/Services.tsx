import { ServicesCard } from "./utils/ServicesCard";
import nama from "../../../public/nama.png";
import legacy from "../../../public/legacy.png";
import people from "../../../public/people.png";
import petServices from "../../../public/Pet services.png";

export const Services = () => {
  return (
    <div  className="flex flex-wrap h-full items-center justify-center content-center gap-x-20 gap-y-15 mx-auto py-12">
      <ServicesCard
        heading="Human Funeral"
        subHeading="We organise everything for you, from rituals to arrangements, so you can focus on family and prayers."
        icon={people}
        link="Get Support"
      />

      <ServicesCard
        heading="Pet Funeral"
        subHeading="Pets are family too. We help you say goodbye with care and dignity."
        icon={petServices}
        link="Get Support"
      />

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
