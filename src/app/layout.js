import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TurnoTech',
  description: 'TurnoTech - Turnos Médicos Online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <style>{inter.styles}</style>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
