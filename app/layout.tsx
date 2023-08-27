import Providers from "@/components/Providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="background">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
