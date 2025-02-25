'use client'
import { actionFunction } from "@/utils/types"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const initialState = {
    message: ''
}

const FormContainer = ({ action, children }: { action: actionFunction, children: React.ReactNode }) => {
    const [state, formAction] = useActionState(action, initialState)
    console.log(state);
    useEffect(() => {
        if (state.message) {
            toast('Event has been created', { description: state.message })
        }
    }, [state])


    return (
        <form action={formAction}>
            {children}
        </form>
    )
}
export default FormContainer