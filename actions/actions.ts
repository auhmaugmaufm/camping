'use server'

import { profileSchema, ValidateWithZod } from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { redirect } from "next/navigation";


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
        const user = await currentUser()
        if (!user) throw new Error('Please login!!!')

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
        const user = await currentUser()
        if (!user) throw new Error('Please login!!!')

        const rawData = Object.fromEntries(formData)
        // const validateField = ValidateWithZod(profileSchema, rawData)
        console.log('validated', rawData);
        
       
        return { message : 'Create Landmark Successfull!!' }
    } catch (error) {
        return renderError(error);

    }
    //redirect('/')
}