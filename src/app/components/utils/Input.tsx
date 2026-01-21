interface InputProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  title: string;
  type: string;
  className?: string;
  required?: boolean;
  id?: string;
  rows?: number;
}

// Sanitizes a string to be a valid HTML id (lowercase, replace spaces and non-alphanumerics with underscores)
function sanitizeId(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9\-_:.]/g, "_");
}

export const Input = ({
  title,
  type,
  className,
  required,
  id,
  rows = 4,
  ...props
}: InputProps) => {
  const inputId = id ? id : sanitizeId(title);

  return (
    <div className="w-full h-full">
      <label className={`block text-sm font-medium mb-1`} htmlFor={inputId}>
        {title}
        {required ? "*" : ""}
      </label>
      {type === "textarea" ? (
        <textarea
          id={inputId}
          required={required}
          rows={rows}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 bg-white text-gray-900 ${className}`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          type={type}
          id={inputId}
          required={required}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 bg-white text-gray-900 ${className}`}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
};
