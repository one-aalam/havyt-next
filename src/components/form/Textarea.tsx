import React, { TextareaHTMLAttributes } from 'react'
import { useFormContext, RegisterOptions } from 'react-hook-form'


interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className'> {
    name: string
    label?: string
    config?: RegisterOptions
}

export default function Textarea({ name, label, config, ...rest }: TextareaProps) {
    const { register } = useFormContext()
    return (<div className="form-control">
        {label && (
            <label htmlFor={name} className="label">
                <span className="label-text">{label}</span>
            </label>
        )}
        <textarea
        id={name} placeholder={label} className="textarea h-24 textarea-bordered textarea-primary"
         {...register(name, config)}
         {...rest}></textarea>
    </div>)
}
