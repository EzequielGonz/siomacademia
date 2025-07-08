import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Siom Academia",
  description: "Siom Academia: Formación profesional de calidad para impulsar tu carrera y desarrollo personal.",
  openGraph: {
    title: "Siom Academia",
    description: "Siom Academia: Formación profesional de calidad para impulsar tu carrera y desarrollo personal.",
    images: [
      {
        url: "/logo.png",
        width: 500,
        height: 500,
        alt: "Logo Siom Academia"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Siom Academia",
    description: "Siom Academia: Formación profesional de calidad para impulsar tu carrera y desarrollo personal.",
    images: ["/logo.png"]
  },
  icons: {
    icon: "/logo.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <meta property="og:title" content="Siom Academia" />
        <meta property="og:description" content="Siom Academia: Formación profesional de calidad para impulsar tu carrera y desarrollo personal." />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Siom Academia" />
        <meta name="twitter:description" content="Siom Academia: Formación profesional de calidad para impulsar tu carrera y desarrollo personal." />
        <meta name="twitter:image" content="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
