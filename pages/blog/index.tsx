import { NextPage } from 'next'
import { Layout } from '../../components/layout/layout'
import { Tags } from '../../components/layout/tags'
import { BlogData, getSortedPostsData } from '../../lib/blog'

export function BlogPost({ title, tags, cover, summary, url }: BlogData) {
  const fullPathUrl = `blog${url}`
  return (
    <div>
      <a href={fullPathUrl}>
        <div className="img-container" style={{ backgroundImage: `url(/${cover})` }}></div>
      </a>
      <div>
        <h2>
          <a href={fullPathUrl}>{title}</a>
        </h2>
        <Tags tags={tags}></Tags>
        <p>{summary}</p>
        <a className="read-more" href={fullPathUrl}>
          En savoir plus
          <div className="arrow_box_right arrow_box"></div>
        </a>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

type BlogProps = {
  allPostsData: BlogData[]
}

const BlogPage: NextPage<BlogProps> = ({ allPostsData }) => {
  return (
    <Layout>
      <section id="blogs">
        <div className="wrapper">
          <h1>Blog</h1>
        </div>

        <section id="articles">
          <div className="wrapper">
            {allPostsData.map((data) => {
              return <BlogPost key={data.url} {...data}></BlogPost>
            })}
          </div>
          <div className="pagination">
            <a href="{{ .Paginator.Prev.URL }}" className="previous-page">
              <div className="arrow">
                <div className="arrow_box_left arrow_box"></div>
              </div>
              Page précédente
            </a>

            <a href="{{ .Paginator.Next.URL }}" className="next-page">
              Page suivante
              <div className="arrow">
                <div className="arrow_box_right arrow_box"></div>
              </div>
            </a>
          </div>
        </section>
      </section>
    </Layout>
  )
}

export default BlogPage
