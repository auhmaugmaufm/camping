import { z, ZodSchema } from 'zod'

//const profileSchema = z.string().min(2,{message: 'String must more than 2 charactor'})

export const profileSchema = z.object({
    firstName: z.string().min(2, { message: 'Firstname more than 2 charactors' }),
    lastName: z.string().min(2, { message: 'Lastname more than 2 charactors' }),
    userName: z.string().min(2, { message: 'Username more than 2 charactors' }),
})



export const ValidateWithZod = <T>(schema: ZodSchema<T> , data: unknown):T => {
    const result = schema.safeParse(data)
    if (!result.success) {
        const errors = result.error?.errors.map((error) => error.message)
        throw new Error(errors.join(','))
    }
    return result.data
}