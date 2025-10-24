
import type { Metadata } from "next";
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SanadHome - Professional Home Nursing Care",
  description: "Providing compassionate and professional nursing care in the comfort of your home",
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={cairo.className}>
               
        {children}
      </body>
    </html>
  );
}





