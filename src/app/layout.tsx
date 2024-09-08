import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./StoreProvider";

export const metadata: Metadata = {
  title: "Zest-Task App",
  description: "This is the practical app for understanding the nextjs with typescript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100;9..40,200;9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900;9..40,1000&display=swap" rel="stylesheet">
          </link>
      </head>
      <body>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
