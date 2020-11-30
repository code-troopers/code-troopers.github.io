import { NextPage } from 'next'
import { Company } from '../components/layout/company'
import { Layout } from '../components/layout/layout'
import { Numbers } from '../components/layout/numbers'
import { Skills } from '../components/layout/skills'
import { Casting } from '../components/layout/casting'
import { Portfolio } from '../components/layout/portfolio'
import { getWorks, WorkData } from '../lib/work'

interface IndexProps {
  works: WorkData[]
}

const IndexPage: NextPage<IndexProps> = ({ works }: { works: WorkData[] }) => {
  return (
    <Layout>
      <Company></Company>
      <Numbers></Numbers>
      <Skills></Skills>
      <Portfolio works={works}></Portfolio>
      <Casting></Casting>
    </Layout>
  )
}
export default IndexPage

export async function getStaticProps() {
  const works = await getWorks(4)
  return {
    props: {
      works,
    },
  }
}
