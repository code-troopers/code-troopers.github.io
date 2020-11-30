import { Layout } from '../../../../../components/layout/layout'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { BlogData, getSortedPostsData } from '../../../../../lib/blog'
import { Tags } from '../../../../../components/layout/tags'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

function markdownToHtml(content: string): string {
  return unified().use(parse).use(remark2react).processSync(content).result as string
}

type BlogPostProps = {
  post: BlogData
}

const BlogPostPage: NextPage<BlogPostProps> = ({ post }) => {
  return (
    <Layout>
      <section id="blog">
        <div className="wrapper">
          <h1>Blog</h1>
        </div>

        <section id="article">
          <div className="wrapper">
            <article>
              <img src={`/${post.cover}`} alt="banner" />
              <div className="wrapper-content">
                <h2>{post.title}</h2>
                <Tags tags={post.tags}></Tags>
                {post.content ? (
                  <div className="content" dangerouslySetInnerHTML={post.content}></div>
                ) : null}
                {post.markdown ? (
                  <div className="content">{markdownToHtml(post.markdown)}</div>
                ) : null}

                <div className="content-footer">
                  <Tags tags={post.tags}></Tags>
                  <section id="author">
                    <div className="date">
                      Rédigé par <span className="author-name">{post.author}</span>
                    </div>
                  </section>
                  <div className="share">
                    <span>Partager</span>
                    <ul className="socials">
                      <li>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          title="Facebook"
                          href=""
                          className="facebook-button"
                          onClick={() => {
                            window.open(
                              `https://www.facebook.com/sharer.php?u=https://code-troopers.com/blog${post.url}/&t=${post.title}`,
                              '',
                              'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=700'
                            )
                            return false
                          }}
                        >
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          title="Twitter"
                          href=""
                          onClick={() => {
                            window.open(
                              `https://twitter.com/share?url=https://code-troopers.com/blog${post.url}&text=${post.title}&via=codetroopers`,
                              '',
                              'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=700'
                            )
                            return false
                          }}
                        >
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div style={{ clear: 'both' }}></div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </section>
    </Layout>
  )
}

export default BlogPostPage

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostsData = getSortedPostsData()
  console.debug(allPostsData.map(({ url }) => url))
  return {
    paths: allPostsData.map(({ url }) => ({
      params: {
        year: url.substring(1, 5),
        month: url.substring(6, 8),
        day: url.substring(9, 11),
        slug: url.substring(12, url.length - 1),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}: {
  params: { year: string; month: string; day: string; slug: string }
}) => {
  const allPostsData = getSortedPostsData()
  console.debug('get static props')
  return {
    props: {
      post: allPostsData.find(
        ({ url }) => url === `/${params.year}/${params.month}/${params.day}/${params.slug}/`
      ),
    },
  }
}
