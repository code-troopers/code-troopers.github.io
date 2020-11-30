import { useRouter } from 'next/router'

export function Header() {
  const router = useRouter()
  console.debug(router.pathname)
  return (
    <header>
      <nav>
        <a href="/" className="brand">
          <img src="/img/Code-Troopers.png" alt="Code-Troopers" />
        </a>
        <a href="/#skills" className="">
          <span>Compétences</span>
        </a>
        <a href="/#portfolio" className="">
          <span>Réalisations</span>
        </a>
        <a href="/#casting" className="">
          <span>Casting</span>
        </a>
        <a href="/#contact" className="">
          <span>Contact</span>
        </a>
        <a href="/blog" className={router.pathname.includes('blog') ? 'blog active' : 'blog'}>
          <span>Blog</span>
        </a>
      </nav>
    </header>
  )
}
