import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const ImageInput = () => {
    const name = 'image'
    return (
        <div>
            <Label className='capitalize'>
                {name}
            </Label>
            <Input id={name} name={name} type='file' accept='image/*' required />
        </div>
    )
}

export default ImageInput
