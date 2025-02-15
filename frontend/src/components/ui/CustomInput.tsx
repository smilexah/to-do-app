import { useEffect, useState } from 'react';
import { Input as NextInput } from "@nextui-org/react";
import { useController } from "react-hook-form";

type Props = {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    control: any;
    required?: boolean;
    patternValue?: RegExp;
    patternErrorMessage?: string;
    maxLength?: number;
    maxLengthErrorMessage?: string;
    minLength?: number;
    minLengthErrorMessage?: string;
    endContent?: JSX.Element;
    className?: string;
    classNames?: any;
};

const MyInput = ({
                     className,
                     classNames,
                     name,
                     label,
                     placeholder,
                     type = "text",
                     control,
                     required,
                     patternValue,
                     patternErrorMessage = 'Invalid pattern',
                     maxLength,
                     maxLengthErrorMessage = 'Input text exceeds limit',
                     minLength,
                     minLengthErrorMessage = 'Input text doesn’t reach the desired size',
                     endContent,
                     ...props
                 }: Props) => {
    const [rules, setRules] = useState({});

    useEffect(() => {
        const updatedRules: any = {};

        if (patternValue) {
            updatedRules.pattern = {
                value: patternValue,
                message: patternErrorMessage,
            };
        }
        if (maxLength) {
            updatedRules.maxLength = {
                value: maxLength,
                message: maxLengthErrorMessage,
            };
        }
        if (required) {
            updatedRules.required = "Обязательное поле";
        }
        if (minLength) {
            updatedRules.minLength = {
                value: minLength,
                message: minLengthErrorMessage,
            };
        }

        if (Object.keys(updatedRules).length > 0) {
            setRules(prevState => ({
                ...prevState,
                ...updatedRules
            }));
        }
    }, []);

    const { field, fieldState: { invalid }, formState: { errors } } = useController({
        name,
        control,
        rules
    });

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && <label htmlFor={name} className="text-gray-700 font-medium text-sm">{label}</label>}
            <div className="relative">
                <NextInput
                    id={name}
                    placeholder={placeholder}
                    type={type}
                    value={field.value}
                    name={field.name}
                    isInvalid={invalid}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    endContent={endContent}
                    errorMessage={invalid ? String(errors[name]?.message || '') : ''}
                    classNames={{
                        inputWrapper: `border rounded-lg shadow-sm px-3 py-2 transition ${
                            invalid ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500" : "border-gray-300 focus-within:ring-2 focus-within:ring-blue-500"
                        }`,
                        input: "w-full text-gray-800 bg-transparent outline-none",
                        errorMessage: "text-xs text-red-500 mt-1", // ✅ Red error message
                    }}
                />
            </div>
        </div>
    );
};

export default MyInput;
