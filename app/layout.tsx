import type { Metadata } from "next";
import "../src/index.css";

export const metadata: Metadata = {
  title: "FUME FRAGRANCES | Haute Parfumerie",
  description: "FUME FRAGRANCES is an independent Pakistani luxury fragrance house.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
