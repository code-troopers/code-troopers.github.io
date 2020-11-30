export function Footer() {
  const now = new Date()
  return (
    <footer>
      <div className="wrapper">
        <a href="#top" className="scroll-to-top">
          <img className="arrow" src="/img/arrow.png" alt="arrow" />
        </a>
        <img src="/img/footer_logo.png" alt="logo" />
        <div>
          <span>
            ©2014 — {now.getFullYear()} Code-Troopers | <a href="/legals.html">Mentions légales</a>
          </span>
          <span>
            Design : <a href="https://www.descheval.com/">descheval.com</a> | Développement :
            Code-Troopers
          </span>
        </div>
      </div>
    </footer>
  )
}
