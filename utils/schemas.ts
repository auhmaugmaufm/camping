import { z, ZodSchema } from 'zod'
import { categories } from './category'
import { provinces } from './provinces'

//const profileSchema = z.string().min(2,{message: 'String must more than 2 charactor'})

export const profileSchema = z.object({
    firstName: z.string().min(2, { message: 'Firstname more than 2 characters' }),
    lastName: z.string().min(2, { message: 'Lastname more than 2 characters' }),
    userName: z.string().min(2, { message: 'Username more than 2 characters' }),
})

const validateImage = () => {
    const maxFileSize = 1024 * 1024
    return z.instanceof(File) // object ของ file
        .refine((file) => {
            return file.size <= maxFileSize
        }, 'File size must be less than 1MB')
}

export const imageSchema = z.object({
    image: validateImage()
})

export const LandmarkSchema = z.object({
    name: z.string()
        .min(2, { message: 'Name must be more than 2 characters' })
        .max(30, { message: 'Name must be less than 30 characters' }),
    category: z.string(),
    description: z.string() 
        .min(2, { message: 'Description must be more than 2 characters' })
        .max(200, { message: 'Description must be less than 200 characters' }),
    price: z.coerce.number().int().min(1, { message: 'Price must be more than 0' }),  // แก้ไขข้อความให้ตรงกับเงื่อนไข
    province: z.string(),
    lat: z.coerce.number(),
    lng: z.coerce.number(),
});


export const ValidateWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
    const result = schema.safeParse(data)
    if (!result.success) {
        const errors = result.error?.errors.map((error) => error.message)
        throw new Error(errors.join(','))
    }
    return result.data
}

