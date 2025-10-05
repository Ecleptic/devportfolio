import type { Metadata } from "next";
import { Lato } from "next/font/google";
import fs from "fs";
import path from "path";
import { ResumeData } from "../types/resume";
import "../styles/globals.scss";

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

// Read metadata from resume.json
const resumePath = path.join(process.cwd(), "..", "resume.json");
const resumeData: ResumeData = JSON.parse(fs.readFileSync(resumePath, "utf8"));
const meta = resumeData.metadata || {
  title: "Cameron Green's Portfolio",
  description: "Full Stack Web Developer - Software Engineer Portfolio",
  keywords: ["Cameron Green", "Software Engineer", "Web Developer"],
  siteUrl: "https://camerongreens.com",
  siteName: "Cameron Green's Portfolio",
  locale: "en_US",
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  authors: [{ name: resumeData.basics.name }],
  creator: resumeData.basics.name,
  publisher: resumeData.basics.name,
  metadataBase: new URL(meta.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.siteUrl,
    siteName: meta.siteName,
    locale: meta.locale,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`no-js ${lato.className}`}>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link href="/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
