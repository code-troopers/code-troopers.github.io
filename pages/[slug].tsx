import { NextPage } from 'next'
import { getWorkPaths, getWorkStaticProps, WorkProps } from '../lib/work'

const WorkPage: NextPage<WorkProps> = ({ work }) => {
  return <div>{work.title}</div>
}

export default WorkPage

export const getStaticPaths = getWorkPaths
export const getStaticProps = getWorkStaticProps
