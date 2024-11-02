import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider';
import { NextUIProvider } from '@nextui-org/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scribe",
  description: "Your digital self",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <NextUIProvider>
            {children}
          </NextUIProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
