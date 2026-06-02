import "./globals.css";
import CustomFooter from "@/components/Footer/CustomFooter";
import CustomHeader from "@/components/Header/CustomHeader";
import HeaderContent from "@/components/Header/HeaderContent";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <HeaderContent children={
          <>
            <header>
              <CustomHeader />
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
