import React from 'react'
import FormInput from '@/components/form/FormInput'
import { SubmitButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import { createProfileAction } from '@/actions/actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'



const CreateProfile = async () => {
    const user = await currentUser()
    if (user?.privateMetadata.hasProfile) redirect('/')

    return (
        <section>
            <h1 className='text-2xl font-semibold mb-8 capitalize'>new user</h1>
            <div className='border p-8 rounded-xl max-w-lg '>
                <FormContainer action={createProfileAction}>
                    <div className='grid md:grid-cols-2 gap-4 mt-4'>
                        <FormInput name='firstName' label='Firstname' type='text' placeholder='Firstname' />
                        <FormInput name='lastName' label='Lastname' type='text' placeholder='Lastname' />
                        <FormInput name='userName' label='Username' type='text' placeholder='Username' />
                    </div>
                    <SubmitButton text='create profile' size='lg' className='' />
                </FormContainer>
            </div>
        </section>
    )
}

export default CreateProfile
