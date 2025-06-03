type Props = {
   label: string;
   type: string;
   id: string;
   placeholder?: string;
   prefix?: string;
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormInput({
   label,
   type,
   id,
   value,
   placeholder,
   prefix,
   onChange,
}: Props) {
   return (
      <div>
         <label htmlFor={id}>{label}</label>
         <div className="relative">
            {prefix && (
               <span className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400">
                  {prefix}
               </span>
            )}
            <input
               type={type}
               id={id}
               placeholder={placeholder}
               className={`mt-1 w-full rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800 ${
                  prefix ? 'pl-8' : ''
               }`}
               value={value}
               onChange={onChange}
            />
         </div>
      </div>
   );
}
