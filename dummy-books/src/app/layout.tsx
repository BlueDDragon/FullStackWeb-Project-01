import "./globals.css";
import CustomFooter from "@/components/Layout/CustomFooter";
import CustomHeader from "@/components/Layout/CustomHeader";
import HeaderContent from "@/components/Layout/HeaderContent";

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
