
import React, { SelectHTMLAttributes } from 'react'
import { useFormContext, RegisterOptions } from 'react-hook-form'


interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'className'> {
    name: string
    label?: string
    config?: RegisterOptions
    options: Array<{value: string| number, label: string }>
}

export default function Select({ name, label, options, config, ...rest }: SelectProps) {
    const { register } = useFormContext()
    return (
        <div className="form-control">
            {label && (
                <label htmlFor={name} className="label">
                    <span className="label-text">{label}</span>
                </label>
            )}
            <select className="select select-bordered select-primary w-full" {...register(name, config)} {...rest}  defaultValue="">
                <option disabled value="">Choose the {label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
         </div>
    )
}
