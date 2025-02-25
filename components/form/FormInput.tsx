import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


type FormInputProps = {
  name: string,
  type: string
  label?: string
  defaultValue?: string
  placeholder?: string
}
// label? สามารถ null ได้


// ถ้ารับเป็น props จะต้อง destructuring แต่ถ้า destruct มาเลยใช้ ({ name }) ได้เหมือนกัน
// การ destructuring คือ ----> const { name,type,label, } = props
const FormInput = (props: FormInputProps) => {
  const { name, type, label, defaultValue, placeholder } = props
  return (
    <div className='mb-2'>
      <Label htmlFor={name} >{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} defaultValue={defaultValue}/>
    </div>
  )
}
export default FormInput