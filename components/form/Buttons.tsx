'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { Heart, LoaderCircle } from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';


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
                    ? <><LoaderCircle className='animate-spin' /><span>Please, wait</span></>
                    : <p>{text}</p>
            }
        </Button>
    )
}

export const SignInCardButton = () => {
    return (
        <SignInButton mode='modal'>
            <Button size='icon' variant='outline'>
                < Heart />
            </Button>
        </SignInButton>
    )
}

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
    //console.log('is', isFavorite);
    const { pending } = useFormStatus()
    return (
        <Button type='submit' size='icon' variant='outline'>
            {
                pending ? <LoaderCircle className='animate-spin'/> : isFavorite ? <Heart color='red' fill='red' /> : <Heart />
            }

        </Button>
    )

}