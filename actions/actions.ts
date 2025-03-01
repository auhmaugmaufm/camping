'use server'

import { imageSchema, LandmarkSchema, profileSchema, ValidateWithZod } from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { BedDouble } from "lucide-react";


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