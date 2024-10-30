import Error from '../Error'
import Width from '../Width'
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import Input from '@/components/common/Input'

interface NumberField {
  name: string
  label?: string | null
  width?: number | null
  defaultValue?: number | null
  required?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'number'
}
const Number: React.FC<
  NumberField & {
    register: UseFormRegister<FieldValues & any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  }
> = ({ name, label, width, register, required: requiredFromProps, errors }) => {
  return (
    <Width width={width as number}>
      <div className='flex flex-col gap-2'>
        <label className='text-md font-semibold capitalize text-neutral-content/60'>
          {label}
        </label>
        <Input
          type='number'
          {...register(name, { required: requiredFromProps as boolean })}
        />
        {requiredFromProps && errors[name] && (
          <Error error={errors[name]} label={label!} />
        )}
      </div>
    </Width>
  )
}
export default Number
