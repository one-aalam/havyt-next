import React, { FormHTMLAttributes, ReactElement } from 'react'
import { useForm, FormProvider, SubmitHandler, UseFormProps } from 'react-hook-form'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'

interface FormProps<T> extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
    form: UseFormProps<T>
    children: ReactElement | ReactElement[]
    onSubmit: SubmitHandler<T>
}

export function Form<T>({ form, children, onSubmit, ...rest }: FormProps<T>) {
  const methods = useForm<T>(form)
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
        <form {...rest} onSubmit={handleSubmit(onSubmit)}>
            {children}
        </form>
    </FormProvider>
  );
}

Form.Input = Input
Form.Textarea = Textarea
Form.Select = Select
