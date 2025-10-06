import "@/app/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import React from "react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Skills Swap Marketplace - Exchange Skills, Learn Together",
    description:
        "Connect with others to exchange skills and learn new talents through our innovative skills swap platform.",
};

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <ToastContainer />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default layout;
