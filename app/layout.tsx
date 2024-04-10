import type {Metadata} from "next";
import {Inter, Josefin_Sans} from "next/font/google";
import "./globals.css";
import {AntdRegistry} from '@ant-design/nextjs-registry';
import { ThemeProvider } from "@/components/theme-provider";
import {Toaster} from "@/components/ui/toaster";
import { ReduxProvider } from "@/redux/provider";

const josefin = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
    ]
});

export const metadata: Metadata = {
    title: "Nye-DoWoLa",
    description: "nye dowola est votre compagnon numérique pour simplifier la recherche et la réservation de services à domicile, le tout dans votre langue ewe préférée. Que vous ayez besoin d'un plombier, d'un électricien, d'un jardinier ou de tout autre service, nous sommes là pour vous connecter avec les meilleurs prestataires de services de votre région, rapidement et facilement.",
};

export default function RootLayout({ children,}: Readonly<{children: React.ReactNode; }>)
{
    return (
        <html lang="fr">
        <body className={josefin.className}>

        <ReduxProvider>
            <AntdRegistry>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Toaster/>
                    {children}
                </ThemeProvider>

            </AntdRegistry>
        </ReduxProvider>


        </body>
        </html>
    );
}