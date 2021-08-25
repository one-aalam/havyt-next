import React, { InputHTMLAttributes } from 'react'
import { useFormContext, RegisterOptions } from 'react-hook-form'


interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'> {
    name: string
    label?: string
    config?: RegisterOptions
}

export default function Input({ name, label, config, ...rest }: InputProps) {
    const { register, formState } = useFormContext();
    return (<div className="form-control">
        {label && (
            <label htmlFor={name} className="label">
                <span className="label-text">{label}</span>
            </label>
        )}
        <input
        id={name} placeholder={label} className="input input-primary input-bordered" defaultValue=""
        {...register(name, config)}
        {...rest} />
        {/* {formState.errors[name] && (
            <small className="mt-1 text-sm text-red-600">{formState.errors[name].message}</small>
        )} */}
    </div>)
}
