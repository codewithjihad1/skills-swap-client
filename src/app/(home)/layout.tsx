import "@/app/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import AuthProvider from "@/provider/AuthProvider";
import { ThemeProvider } from "next-themes";
import ReactQueryProvider from "@/provider/ReactQueryProvider";

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                suppressHydrationWarning
            >
                <AuthProvider>
                    <ReactQueryProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <Header />
                            {children}
                            <Footer />
                        </ThemeProvider>
                    </ReactQueryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
