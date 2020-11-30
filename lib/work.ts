import fs from 'fs'
import path from 'path'
import { GetStaticPaths, GetStaticProps } from 'next'
import matter from 'gray-matter'

const workDirectory = path.join(process.cwd(), 'content/work')

export interface WorkData {
  cover: string
  date: string
  tags: string[]
  title: string
  summary: string
  url: string
  expirydate: string | undefined
}

export interface WorkProps {
  work: WorkData
}

export async function getWorks(nb: number | null = 9999): Promise<WorkData[]> {
  const fileNames = await fs.promises.readdir(workDirectory)
  return Promise.all(
    fileNames
      .slice(0, nb)
      .map(async (fileName) => {
        const file = await fs.promises.readFile(path.join(workDirectory, fileName), 'utf8')
        return matter(file).data as WorkData
      })
      .filter(async (work) => !(await work).expirydate)
  )
}

export const getWorkPaths: GetStaticPaths = async () => {
  const fileNames = await fs.promises.readdir(workDirectory)
  const paths = await Promise.all(
    fileNames.map(async (fileName) => {
      return {
        params: { slug: fileName.replace('.adoc', '') },
      }
    })
  )
  return {
    paths,
    fallback: false,
  }
}

export const getWorkStaticProps: GetStaticProps<WorkProps> = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const file = await fs.promises.readFile(path.join(workDirectory, `${params.slug}.adoc`), 'utf8')
  const { data } = matter(file)
  return {
    props: {
      work: data as WorkData,
    },
  }
}
