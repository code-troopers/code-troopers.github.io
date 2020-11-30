import { WorkData } from '../../lib/work'
import { Tags } from './tags'

export function PortfolioItem({ work }: { work: WorkData }) {
  return (
    <div>
      <a href="{{ .Permalink }}">
        <img src={work.cover} alt="banner" />
      </a>
      <div>
        <h2>
          <a href="{{ .Permalink }}">{work.title}</a>
        </h2>

        <Tags tags={work.tags} className="skill" />

        {work.summary}
        <a className="read-more" href="{{ .Permalink }}">
          En savoir plus
        </a>
      </div>
    </div>
  )
}
