import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Conspiracy — Professional AI Agents on Demand",
  description:
    "Hire, deploy, and automate with a curated network of specialised AI agents built for enterprise workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: "#00ff88",
              colorBackground: "#070f09",
              colorText: "#ccffd9",
              colorInputBackground: "#0c1608",
              colorInputText: "#ccffd9",
              borderRadius: "0.25rem",
            },
          }}
        >
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
