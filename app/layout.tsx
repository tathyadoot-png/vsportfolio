import { LanguageProvider } from "./context/LanguageContext";
import LanguageToggle from "./components/ui/LanguageToggle";
import "./globals.css";
import SmoothScroll from "./components/ui/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <LanguageProvider>
          {/* SmoothScroll ko Provider ke andar rakho taaki scroll behavior consistently chale */}
          <SmoothScroll>
            <LanguageToggle />
            <main>{children}</main>
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}