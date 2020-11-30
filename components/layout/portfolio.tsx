import { WorkData } from '../../lib/work'
import { PortfolioItem } from './portfolioitem'

export function Portfolio({ works }: { works: WorkData[] }) {
  return (
    <section id="portfolio">
      <h1>Réalisations</h1>

      <div className="wrapper">
        {works.map((work) => (
          <PortfolioItem key={work.title} work={work} />
        ))}
      </div>
      <div className="wrapper-center">
        <a href="/work" className="btn">
          Toutes nos réalisations
        </a>
      </div>
    </section>
  )
}
