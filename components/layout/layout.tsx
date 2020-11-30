import { Footer } from './footer'
import { Contact } from './contact'
import { Header } from './header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header></Header>
      {children}
      <Contact></Contact>
      <Footer></Footer>
    </>
  )
}
