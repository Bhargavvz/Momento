import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`
            block w-full rounded-xl border border-neutral-200 dark:border-dark-200 px-4 py-3 
            text-neutral-900 dark:text-dark-900 placeholder-neutral-500 dark:placeholder-dark-500
            focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 focus:outline-none
            transition-all duration-200 bg-white dark:bg-dark-100 shadow-soft
            ${icon ? 'pl-10' : 'pl-4'}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};