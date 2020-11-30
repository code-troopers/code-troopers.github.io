import { getWorks } from '../../lib/work'
import { Layout } from '../../components/layout/layout'
import { PortfolioItem } from '../../components/layout/portfolioitem'

const PortfolioPage = ({ works }) => {
  return (
    <Layout>
      <section id="portfolio">
        <div className="wrapper">
          <h1>Réalisations</h1>
        </div>

        <div className="wrapper">
          {works.map((work) => (
            <PortfolioItem key={work.title} work={work} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default PortfolioPage

export async function getStaticProps() {
  const works = await getWorks()
  return {
    props: {
      works,
    },
  }
}
