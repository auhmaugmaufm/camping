'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { LoaderCircle } from 'lucide-react';


type btnSize = 'default' | 'lg' | 'sm'
// size ที่ส่งมา ต้องเป็นตามที่กำหนด

type SubmitButtonProps = {
    className: string,
    size?: btnSize,
    text?: string
}

// export const SubmitButton = ({ className, size, text }: { className: string, size: string, text: string }) 
export const SubmitButton = ({ className, size, text }: SubmitButtonProps) => {

    const { pending } = useFormStatus()
    // load อยู่ Pending จะเป็น true


    return (
        <Button
            disabled={pending}
            className={`&{className} capitalize`}
            size={size}
            type='submit'
        >
            {
                pending
                    ? <LoaderCircle className='animate-spin' />
                    : <p>{text}</p>
            }
        </Button>
    )
}
