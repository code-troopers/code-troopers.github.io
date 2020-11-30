import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogData {
  id: string
  author: string
  cover: string
  date: string
  tags: string[]
  title: string
  url: string
  aliases: string
  summary: string
  content?: { __html: string }
  markdown?: string
}

export function getSortedPostsData(): BlogData[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.{html|md|adoc}$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      id,
      ...(data as BlogData),
      summary: content.substring(0, 100),
      content: fileName.endsWith('html') && {
        __html: content,
      },
      markdown: fileName.endsWith('md') && content,
    }
  })
  return allPostsData.sort((a, b) => {
    if (Date.parse(a.date) < Date.parse(b.date)) {
      return 1
    }
    return -1
  })
}
