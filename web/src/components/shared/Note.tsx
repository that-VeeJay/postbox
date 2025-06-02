import { TriangleAlert, Check, Lightbulb, CircleX } from 'lucide-react';

type PropsType = {
   message: string;
   type: 'success' | 'info' | 'warning' | 'error';
};

const typeStyles = {
   success: {
      icon: <Check className="text-green-300" />,
      container:
         'bg-green-500/75 border-green-500 dark:border-green-700 dark:bg-green-900/40 dark:text-green-800',
   },
   info: {
      icon: <Lightbulb className="text-blue-300" />,
      container:
         'bg-blue-500/75 border-blue-500 dark:border-blue-700 dark:bg-blue-900/40 dark:text-blue-800',
   },
   error: {
      icon: <CircleX className="text-red-300" />,
      container:
         'bg-red-500/75 border-red-500 dark:border-red-700 dark:bg-red-900/40 dark:text-red-800',
   },
   warning: {
      icon: <TriangleAlert className="text-yellow-300" />,
      container:
         'bg-yellow-500/75 border-yellow-500 dark:border-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-800',
   },
};

export default function Note({ message, type }: PropsType) {
   const { icon, container } = typeStyles[type];

   return (
      <div className={`w-full rounded-lg border-2 p-4 select-none ${container}`}>
         <div className="flex items-center gap-3">
            {icon}
            <p className="text-white">{message}</p>
         </div>
      </div>
   );
}
