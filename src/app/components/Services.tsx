import { ServicesCard } from "./utils/ServicesCard"
import nama from '../../../public/nama.png'
import legacy from '../../../public/legacy.png'
import people from '../../../public/people.png'
import petServices from '../../../public/Pet services.png'

export const Services = ()=>{

    return <div className="grid grid-cols-2  w-full h-full gap-3">
        <ServicesCard
        heading="Human Services"
        subHeading="Comprehensive funeral services for individuals and family with dignity and respect."
        icon={people}
        />

        <ServicesCard
        heading="Legacy Vault"
        subHeading="Preserve memories and create lasting legacies for future generations."
        icon={legacy}
        />

        <ServicesCard
        heading="Pet Services"
        subHeading="Compassionate memorial services for your beloved animal companions."
        icon={petServices}
        />

        <ServicesCard
        heading="Tribute"
        subHeading="Personalised tribute service to celebrate and honor a life well -lived."
        icon={nama}
        />
    </div>
}