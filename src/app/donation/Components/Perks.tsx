
interface perksProps{
    heading: string,
    subHeading: string
}
export const Perks = ({heading, subHeading}:perksProps)=>{

   return <div className="p-[2px] rounded-md bg-gradient-to-t from-[#1F3A52] to-[#4682B8]">
    <div className="flex flex-col items-center justify-center h-48 w-80 rounded-md bg-white shadow-xl">
        <div className="text-3xl text-[#1F3A52] font-semibold">{heading}</div>
        <div className="mt-2.5 text-center">{subHeading}</div>
    </div>
</div>

}