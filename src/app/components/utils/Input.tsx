
interface InputProps {
    title: string,
    type: string,
    className?: string,
    required: boolean,
    id?: string
}

// Sanitizes a string to be a valid HTML id (lowercase, replace spaces and non-alphanumerics with underscores)
function sanitizeId(str: string): string {
    return str.toLowerCase().replace(/[^a-z0-9\-_:.]/g, '_');
}

export const Input = ({ title, type, className, required, id }: InputProps) => {

    const inputId = id ? id : sanitizeId(title);
    return <div className="w-full h-full">
        <label className={`block text-sm font-medium mb-1`} htmlFor={inputId}>{title}{required ? "*" : ""}</label>
        <input
            type={type}
            id={inputId}
            className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 ${className}`}
        />
    </div>
}