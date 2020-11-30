export function Contact() {
  return (
    <section id="contact">
      <h1>Contact</h1>

      <div>
        <div>
          <iframe
            title="Google map"
            className="lozad"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            data-src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDmneK7ppr9MWdY2ynnTXsnhEloW2r7GzQ&q=Code-Troopers,+37000+Tours+France&zoom=15"
          ></iframe>
        </div>
        <div>
          <h2>Code-Troopers</h2>
          <p>
            <strong>MAME</strong>
            <br />
            Cité de la création et du numérique
            <br />
            49 boulevard Preuilly
            <br />
            37000 Tours - Fr
          </p>
          <p>
            <a href="mailto:contact@code-troopers.com">contact@code-troopers.com</a>
          </p>
          <p>
            <a className="button" href="tel:+33782287216">
              07 82 28 72 16
            </a>
          </p>
        </div>
      </div>

      <h1>Suivez nos actualités</h1>

      <ul className="flex">
        <li>
          <a href="https://facebook.com/codetroopers37">
            <i className="fa fa-facebook fa-3x fa-fw"></i>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/codetroopers">
            <i className="fa fa-twitter fa-3x fa-fw"></i>
          </a>
        </li>
        <li>
          <a href="https://github.com/code-troopers">
            <i className="fa fa-github fa-3x fa-fw"></i>
          </a>
        </li>
        <li>
          <a href="/index.xml">
            <i className="fa fa-rss fa-3x fa-fw"></i>
          </a>
        </li>
      </ul>
    </section>
  )
}
