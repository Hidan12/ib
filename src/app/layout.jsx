'use client'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { HeaderSpecial } from '@/components/headerSpecial/HeaderSpecial'
import ReduxProvider from '@/redux/ReduxProvider'
import { usePathname, useRouter } from 'next/navigation'


export default function RootLayout({ children }) {
  const pathname = usePathname()
  return (
    <html>
      <body>
        <ReduxProvider>
          {pathname == "/" ? <Header/> : <HeaderSpecial/>}
          <main>{children}</main>
          {pathname !== "/" && <Footer/>}
        </ReduxProvider>
      </body>
    </html>
  )
}