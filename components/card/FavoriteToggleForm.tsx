'use client'

import React from 'react'
import { toggleFavoriteAction } from '@/actions/actions'
import FormContainer from '../form/FormContainer'
import { usePathname } from 'next/navigation'
import { CardSubmitButton } from '../form/Buttons'

const FavoriteToggleForm = ({ favoriteId, landmarkId }: { favoriteId: string | null, landmarkId: string }) => {
    console.log(favoriteId);
    const pathname = usePathname()
    // console.log(pathname); รี path เมื่อกด fav เพื่อให้แสดงข้อมูลใหม่
    const toggleAction = toggleFavoriteAction.bind(null, { favoriteId, landmarkId, pathname })

    return (
        <FormContainer action={toggleAction}>
            <CardSubmitButton isFavorite={favoriteId ? true : false }/>
        </FormContainer>
    )
}

export default FavoriteToggleForm
