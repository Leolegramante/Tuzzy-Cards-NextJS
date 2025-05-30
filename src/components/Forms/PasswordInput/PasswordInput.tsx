"use client";

import {cn} from "@/helpers/cs";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/20/solid";
import React, {useState} from "react";

type PasswordInputProps = React.ComponentProps<"input"> & {
    label?: string | null;
    error?: string | null;
};

export function PasswordInput({
                                  label,
                                  name,
                                  className,
                                  error,
                                  ...props
                              }: PasswordInputProps) {
    const [inputType, setInputType] = useState("password");
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
        setInputType(!showPassword ? "text" : "password");
    };

    return (
        <div className={cn("my-4", className)}>
            {label ? (
                <label className="block text-sm font-semibold text-principal">
                    {label}
                </label>
            ) : null}
            <div
                className='relative'
            >
                <input
                    type={inputType}
                    name={name}
                    className={cn(
                        "py-1.5 px-3 ps-4 pe-10 block w-full rounded-lg text-principal font-normal ring-2 ring-inset ring-principal focus:ring-2 focus:ring-inset focus:ring-fy sm:text-sm/6 border-2 border-transparent disabled:opacity-50 disabled:pointer-events-none ",
                        {
                            "ring-red-500 focus:ring-red-500": !!error,
                        }
                    )}
                    {...props}
                />
                <button type="button" onClick={handleShowPassword}
                        className='absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600'>
                    {showPassword && <EyeSlashIcon className="text-principal mx-2" width={20} height={20}/>}
                    {!showPassword && <EyeIcon className="text-principal mx-2" width={20} height={20}/>}
                </button>
            </div>
            {error ? (
                <div>
                    <small className="text-sm font-semibold text-red-500">{error}</small>
                </div>
            ) : null}
        </div>
    );
}