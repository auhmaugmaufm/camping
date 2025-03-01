'use server'

import { imageSchema, LandmarkSchema, profileSchema, ValidateWithZod } from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { BedDouble } from "lucide-react";
import { revalidatePath } from "next/cache";


const getAuthUser = async () => {
    const user = await currentUser()
    if (!user) {
        throw new Error('You must logged In !!!')
    }
    if (!user.privateMetadata.hasProfile) redirect('/profile/create')

    return user
}

export const createProfileAction = async (prevState: any, formData: FormData) => {

    try {
        const user = await getAuthUser()

        // const firstName = formData.get('firstName') as string
        // const lastName = formData.get('lastName') as string ทำแทนด้วย rawData
        const rawData = Object.fromEntries(formData)
        const validateField = ValidateWithZod(profileSchema, rawData)
        //console.log('validated', validateField);
        await db.profile.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? '',
                ...validateField,
            }
        })

        const client = await clerkClient()
        await client.users.updateUserMetadata(user.id, {
            privateMetadata: {
                hasProfile: true
            }
        })


        //return { message : 'Create Profile Successfull!!' }
    } catch (error) {
        //console.log(error);
        if (error instanceof Error) {
            // คืออะไรหว่า
            return { message: error.message || 'an error server' }
        }
        return { message: 'an error server' }

    }
    redirect('/')
}

const renderError = (error: unknown): { message: string } => {
    //code body
    return {
        message: error instanceof Error ? error.message : "An Error!!!",
    };
};

export const createLandmarkAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {

    try {
        const user = await getAuthUser()
        const rawData = Object.fromEntries(formData)
        const file = formData.get('image') as File

        // validate data
        const validateField = ValidateWithZod(LandmarkSchema, rawData)
        const validatedFile = ValidateWithZod(imageSchema, { image: file })

        // upload image to supabase
        const fullPath = await uploadFile(validatedFile.image)
        console.log(fullPath);


        // insert to DB
        await db.landmark.create({
            data: {
                ...validateField,
                image: fullPath,
                profileId: user.id
            },
        })

        // console.log('validated', validatedFile);
        // console.log('validated', validateField); 
        //return { message: 'Create Landmark Successfull!!' }
    } catch (error) {
        return renderError(error);

    }
    redirect('/')
}

export const fetchLandmarks = async (
    // search
) => {
    const landmarks = await db.landmark.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    return landmarks
}

export const fetchFavoriteId = async ({ landmarkId }: { landmarkId: string }) => {
    const user = await getAuthUser()
    const favorite = await db.favorite.findFirst({
        where: {
            landmarkId: landmarkId,
            profileId: user.id
        },
        select: {
            id: true
        }
    })
    return favorite?.id || null
}

export const toggleFavoriteAction = async (prevState: {
    favoriteId: string | null;
    landmarkId: string
    pathname: string

}) => {
    const { favoriteId, landmarkId, pathname } = prevState
    // console.log(prevState)
    const user = await getAuthUser()
    try {
        if (favoriteId) {
            // Delete
            await db.favorite.delete({
                where: {
                    id: favoriteId
                }
            })
        } else {
            // Create
            await db.favorite.create({
                data: {
                    landmarkId: landmarkId,
                    profileId: user.id

                }
            })
        }
        // this pathname is equal '/'
        revalidatePath(pathname) // refresh / update show favorite button
        return { message: favoriteId ? 'Remove Favorite Success' : 'Add Favorite Success' }
    } catch (error) {
        return renderError(error)
    }
}

export const fetchFavorites = async () => {
    const user = await getAuthUser()
    const favorites = await db.favorite.findMany({
        where: {
            profileId: user.id
        },
        select: {
            landmark:{
                select:{
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    price: true,
                    province: true,
                    lat: true,
                    lng: true,
                    category: true
                }
            }
        }
    })

    return favorites.map((favorite)=>favorite.landmark)
}