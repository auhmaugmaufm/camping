import React from 'react'
import FormInput from '@/components/form/FormInput'
import { SubmitButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import { createLandmarkAction } from '@/actions/actions'
import CategoryInput from '@/components/form/CategoryInput'
import TextareaInput from '@/components/form/TextareaInput'
import ProvincesInput from '@/components/form/ProvincesInput'
import MapLandmark from '@/components/map/MapLandmark'




const CreateCamp = async () => {

    return (
        <section>
            <h1 className='text-2xl font-semibold mb-8 capitalize'>Create Landmark</h1>
            <div className='border p-8 rounded-xl '>
                <FormContainer action={createLandmarkAction}>
                    <div className='grid md:grid-cols-2 gap-4 mt-4'>
                        <FormInput name='name' label='Landmark' type='text' placeholder='Landmark' />
                        <CategoryInput />
                    </div>
                    <TextareaInput name='description' />
                    <div className='grid md:grid-cols-2 gap-4 mt-4'>
                        <FormInput name='price' label='Price' type='number' placeholder='Price' />
                        <ProvincesInput />
                    </div>

                    <MapLandmark location={{lat: 20,lng: 100}}/>

                    <SubmitButton text='create landmark' size='lg' className='' />
                </FormContainer>
            </div>
        </section>
    )
}

export default CreateCamp
