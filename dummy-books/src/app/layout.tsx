import "./globals.css";
import CustomFooter from "@/components/CustomFooter";
import CustomHearder from "@/components/CustomHeader";
import HeaderContent from "@/components/HeaderContent";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <HeaderContent children={
          <>
            <header>
              <CustomHearder />
            </header>
            <main>{children}</main>
          </>}/>
        <footer>
          <CustomFooter />
        </footer>
      </body>
    </html>
  );
}
