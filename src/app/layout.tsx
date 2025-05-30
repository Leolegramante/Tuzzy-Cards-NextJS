import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";

const roboto = Roboto({
    variable: "--font-roboto-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tuzzy Cards",
    description: "Tuzzy Cards, sua loja do TCG",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
        <body
            suppressHydrationWarning
            className={`${roboto.variable} antialiased`}
        >
        <div>
            {children}
        </div>
        </body>
        </html>
    );
}
