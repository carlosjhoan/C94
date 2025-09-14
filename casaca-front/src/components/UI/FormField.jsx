import { forwardRef } from "react"

export const FormField = forwardRef(
    (
        {
            label,
            name,
            type = 'text',
            error,
            required = false,
            placeholder,
            ...rest
        },
        ref
    ) =>{
        return(
            <div className="mb-4 mt-6 flex flex-col items-center w-full">
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1 ml-2 text-left w-96">
                    {label}
                    {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
                </label>
                {/* border-t-2 border-t-purple-500
  border-r-2 border-r-pink-500
  border-b-2 border-b-red-500
  border-l-2 border-l-blue-500 */}
  {/* ${error ? 'border-red-500' : 'border-gray-300'}  */}
                <input
                    id={name}
                    name={name}
                    type={type}
                    ref={ref}
                    className={`
                        block px-3 py-2 
                        ${error ? 'border-red-500' : ''}
                        border-t-2 border-t-purple-500
                        border-r-2 border-r-pink-500
                        border-b-2 border-b-emerald-500
                        border-l-2 border-l-sky-500
                        rounded-md shadow-sm 
                        focus:outline-none focus:ring-2 
                        ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}
                        focus:border-transparent
                        placeholder-gray-400 
                        transition-all duration-150 
                        w-96
                    `}
                    placeholder={placeholder}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-required={required}
                    aria-describedby={error ? `${name}-error` : undefined}
                    {...rest}
                />
                {error && (
                    <div className="flex items-center w-96 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>

                    <p id={`${name}-error`} className="text-left ml-1 italic text-xs text-red-600" role="alert">
                        {error.message}
                    </p>
                    </div>
  
                )}
            </div>
        )
    }
);

FormField.displayName = 'FormField';
