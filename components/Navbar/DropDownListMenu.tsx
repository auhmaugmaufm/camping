import React from 'react'
import { AlignJustify, ContactRound } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import UserIcon from './UserIcon';
import Link from 'next/link';
import { links } from '@/utils/links';

import SignOutLinks from './SignOutLinks';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';



const DropDownListMenu = () => {
    return (
        <DropdownMenu>
            {/* DropdownMenuTrigger มันมีฟังก์ชั่นการกดอยู่แล้วแต่เราก็เรียกใช้ Button อีก 
            เลยต้องมี asChild เป็นการใช้ความความสามารถของลูก ๆ */}
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                    <AlignJustify />
                    <UserIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <SignedOut>
                    {/* logout */}
                    <DropdownMenuItem >
                        <SignUpButton mode='modal'>
                            <button>Register</button>
                        </SignUpButton>
                    </DropdownMenuItem>

                    <DropdownMenuItem >
                        <SignInButton mode='modal'>
                            <button>Login</button>
                        </SignInButton>
                    </DropdownMenuItem>
                </SignedOut>
                <SignedIn>
                    {/* login */}
                    {links.map((item, index) => {
                        return (
                            <DropdownMenuItem key={index}>
                                <Link href={item.href}>{item.label}</Link>
                            </DropdownMenuItem>
                        )
                    })}
                    <DropdownMenuItem>
                        <SignOutLinks />
                    </DropdownMenuItem>
                </SignedIn>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDownListMenu
