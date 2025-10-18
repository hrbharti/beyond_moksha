
interface perksProps{
    heading: string,
    subHeading: string
}
export const Perks = ({heading, subHeading}:perksProps)=>{

   return <div className="border-2 h-50 w-70 flex flex-col items-center justify-center rounded-md shadow-xl">
        <div className="text-3xl text-[#1F3A52]"> {heading} </div>
        <div>{subHeading}</div>
   </div>
}