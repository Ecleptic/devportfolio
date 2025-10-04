import type { Metadata } from "next";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "Cameron Green's Portfolio",
  description: "Full Stack Web Developer - Software Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-js">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/libs/font-awesome/css/font-awesome.min.css" />
        <link href="/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
