import React, { FormHTMLAttributes, ReactElement } from 'react'
import { useForm, FormProvider, SubmitHandler, UseFormProps } from 'react-hook-form'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'

interface FormProps<T> extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
    form: UseFormProps<T>;
    children: ReactElement | ReactElement[];
    onSubmit: SubmitHandler<T>;
}

export function Form<T>({ form, children, onSubmit, ...rest }: FormProps<T>) {
  const methods = useForm<T>(form)
  const { handleSubmit, register } = methods

  return (
    <FormProvider {...methods}>
        <form {...rest} onSubmit={handleSubmit(onSubmit)}>
        {Array.isArray(children)
            ? children.map((child) => {
                return child.props.name
                ? React.createElement(child.type, {
                    ...{
                        ...child.props,
                        register,
                        key: child.props.name
                    }
                    })
                : child;
            })
            : children}
        </form>
    </FormProvider>
  );
}

Form.Input = Input
Form.Textarea = Textarea
Form.Select = Select
