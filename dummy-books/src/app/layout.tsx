import "./globals.css";
import CustomFooter from "@/components/CustomFooter";
import CustomHearder from "@/components/CustomHeader";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header>
          <CustomHearder />
        </header>
        <main>{children}</main>
        <footer>
          <CustomFooter />
        </footer>
      </body>
    </html>
  );
}
