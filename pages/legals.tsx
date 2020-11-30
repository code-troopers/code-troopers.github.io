import { NextPage } from 'next'
import { Layout } from '../components/layout/layout'

const LegalsPage: NextPage = () => {
  return (
    <Layout>
      <section id="text">
        <div className="wrapper">
          <h1>Mentions légales</h1>
        </div>

        <div className="wrapper">
          <article>
            <div className="content">
              <section id="legals">
                <h2>Éditeur et propriétaire du site</h2>
                <p>
                  Le site www.code-troopers.com est la propriété de Code-Troopers SAS.
                  <br />
                  Cedric GATAY est directeur de la publication.
                </p>
                <address>
                  Code-Troopers
                  <br />
                  MAME
                  <br />
                  Cité de la création et du numérique
                  <br />
                  49 boulevard Preuilly
                  <br />
                  37000 Tours - France
                  <br />
                  contact@code-troopers.com
                  <br />
                  0782 287 216
                </address>
                <p>
                  Code-Troopers est une marqué déposée à l&apos;INPI (numéro 4145181).
                  <br />
                  Code-Troopers SAS au capital de 560 000€ RCS Tours 830 388 997. TVA
                  Intracommunautaire FR05830388997
                </p>

                <h2>Hébergeur du site internet</h2>
                <address>
                  Github Enterprise 88
                  <br />
                  Colin P Kelly Jr St
                  <br />
                  San Francisco, CA 94107 — États-Unis
                  <br />
                  +1 (877) 448-4820
                  <a href="https://github.com/contact/privacy">
                    https://github.com/contact/privacy
                  </a>
                </address>
              </section>
            </div>
          </article>
        </div>
      </section>
    </Layout>
  )
}

export default LegalsPage
