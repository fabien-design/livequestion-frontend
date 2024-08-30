import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/features/components/Navbar/Navbar";
import Footer from "@/features/components/Footer";
import Head from "next/head";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Livequestion",
    description: "Livequestion is a platform for asking and answering questions in real-time.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="text-black">
                <UserProvider>
                    <NavBar />
                    <main className="min-h-screen bg-gray-50">{children}</main>
                    <Footer />
                </UserProvider>
            </body>
        </html>
    );
}
