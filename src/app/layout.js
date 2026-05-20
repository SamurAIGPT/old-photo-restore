import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/saas/Navbar";

const font = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "VintageRestore - Restore Old and Damaged Photos Instantly",
  description: "Restore face clarity, remove scratches, and colorize black-and-white photos with advanced AI restoration technology.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-dvh w-full" style={{ colorScheme: 'light' }}>
      <body className={`${font.className} h-full w-full flex flex-col antialiased bg-white`}>
        <Providers>
          <Navbar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
