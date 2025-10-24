"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { User, LayoutDashboard, Settings, LogOut, Loader2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const UserDropDown = () => {
    const { data: session, status } = useSession();

    // Show loading state while session is being fetched
    if (status === "loading" && !session) {
        return (
            <Button variant="ghost" size="icon" disabled>
                <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
        );
    }

    const userInitial = session?.user?.name?.charAt(0).toUpperCase() || "U";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-[var(--color-primary)]/30 transition-all duration-200"
                >
                    <Avatar className="h-10 w-10 border-2 border-transparent hover:border-[var(--color-primary)]/50 transition-all duration-200">
                        <AvatarImage
                            src={session?.user?.image || ""}
                            alt={session?.user?.name || "User"}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold">
                            {userInitial}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-56 mt-2"
                align="end"
                forceMount
            >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {session?.user?.name || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session?.user?.email || ""}
                        </p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link
                        href="/profile"
                        className="flex items-center cursor-pointer hover:bg-[var(--color-accent)] transition-colors"
                    >
                        <User className="mr-2 h-4 w-4 text-[var(--color-primary)]" />
                        <span>My Profile</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        href="/dashboard"
                        className="flex items-center cursor-pointer hover:bg-[var(--color-accent)] transition-colors"
                    >
                        <LayoutDashboard className="mr-2 h-4 w-4 text-[var(--color-primary)]" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        href="/settings"
                        className="flex items-center cursor-pointer hover:bg-[var(--color-accent)] transition-colors"
                    >
                        <Settings className="mr-2 h-4 w-4 text-[var(--color-primary)]" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropDown;
