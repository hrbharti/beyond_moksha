
interface InputProps{
    title: string,
    type: string,
    className?: string,
    required: boolean
}
export const Input = ({title, type, className, required}:InputProps)=>{

    return  <div className="w-full h-full">
        <label className={`block text-sm font-medium mb-1`} htmlFor={title}>{title}{required ? "*":""}</label>
        <input 
            type={type}
            id={title} 
            className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 ${className}`}
        />
    </div>
}