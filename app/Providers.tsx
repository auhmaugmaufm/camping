import React from 'react'
import { ThemeProvider } from './theme-provider'
import { Toaster } from "@/components/ui/sonner"


// React.ReactNode ข้อมูลที่ return ออกมาเป็น jsx
const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>
                {children}
                <Toaster />
            </ThemeProvider>
        </>
    )
}

export default Providers
