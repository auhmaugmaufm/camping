'use server'

import { profileSchema, ValidateWithZod } from "@/utils/schemas";

// import { z, ZodSchema } from 'zod'

// //const profileSchema = z.string().min(2,{message: 'String must more than 2 charactor'})

// const profileSchema = z.object({
//     firstName: z.string().min(2, { message: 'Firstname more than 2 charactors' }),
//     lastName: z.string().min(2, { message: 'Lastname more than 2 charactors' }),
//     userName: z.string().min(2, { message: 'Username more than 2 charactors' }),
// })

// const ValidateWithZod = (schema, data) => {
//     const result = schema.safeParse(data)
//     if (!result.success) {
//         const errors = result.error?.errors.map((error) => error.message)
//         throw new Error(errors.join(','))
//     }
//     return result.data
// }

export const createProfileAction = async (prevState: any, formData: FormData) => {


    try {
        // const firstName = formData.get('firstName') as string
        // const lastName = formData.get('lastName') as string ทำแทนด้วย rawData
        const rawData = Object.fromEntries(formData)
        const validateField = ValidateWithZod(profileSchema, rawData)
        console.log('validated', validateField);
    } catch (error) {
        console.log(error);
        return { message: error.message || 'an error server' }
    }

    return { message: 'Create Profile Success!!!' }
}