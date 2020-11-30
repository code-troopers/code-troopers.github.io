export function Cast({
  name,
  avatar,
  facebook,
  twitter,
  github,
}: {
  name: string
  avatar: string
  facebook?: string | undefined
  twitter?: string | undefined
  github?: string | undefined
}) {
  return (
    <li>
      <div>
        <img src={`/img/casting/${avatar}_BW.jpg`} alt={name} />
      </div>
      <h2>{name}</h2>
      <ul>
        {facebook ? (
          <li className="facebook">
            <a href={`https://facebook.com/${facebook}`}>
              <i className="fa fa-facebook fa-fw"></i>
            </a>
          </li>
        ) : null}
        {twitter ? (
          <li className="twitter">
            <a href={`https://twitter.com/${twitter}`}>
              <i className="fa fa-twitter fa-fw"></i>
            </a>
          </li>
        ) : null}
        {github ? (
          <li className="github">
            <a href={`https://facebook.com/${github}`}>
              <i className="fa fa-github fa-fw"></i>
            </a>
          </li>
        ) : null}
      </ul>
    </li>
  )
}

export function Casting() {
  return (
    <section id="casting">
      <h1>Casting</h1>
      <div className="wrapper">
        <p>
          Pratiques agiles, solutions ergonomiques, actions de R&amp;D d&apos;envergure… Notre
          escouade est réactive, ses méthodes fiables, fortes de solides fondements techniques pour
          mener des projets complexes, avec une expérience reconnue pour Java. L&apos;équipe des
          Troopers se complète et peut, à l&apos;envie, se substituer, garantissant ainsi un
          dialogue-client ininterrompu.
        </p>
        <p>
          Co-organisation de <a href="https://touraine.tech/">TouraineTech</a>, du{' '}
          <a href="https://www.meetup.com/fr-FR/GDG-Tours">Google Developer Group</a>, hébergement
          d’un <a href="http://opendevicelab.code-troopers.com">Open Device Lab</a>, participation
          au Startup Weekend Tours ainsi qu’au Hackathon Citoyen… Impliqué dans la scène
          developpement locale, Code-Troopers participe régulièrement aux projets numériques du
          bassin tourangeau et au-delà.
        </p>
        <ul className="flex casting">
          <Cast
            name="Cedric Gatay"
            avatar="CG"
            facebook="cedric.gatay"
            twitter="Cedric_Gatay"
            github="CedricGatay"
          ></Cast>
          <Cast name="Romain Lucas" avatar="RL" twitter="Rom1_Lucas" github="rlucas1"></Cast>
          <Cast
            name="Benjamin Cousin"
            avatar="BC"
            facebook="benjamin.cousin"
            twitter="bbbenja"
            github="bbbenja"
          ></Cast>
          <Cast
            name="Joris Potier"
            avatar="JP"
            facebook="joris.potier"
            twitter="Joris_Potier"
            github="JorisPotier"
          ></Cast>
          <Cast
            name="Florian Chauveau"
            avatar="FC"
            twitter="florianchauveau"
            github="fchauveau"
          ></Cast>
          <Cast
            name="Matthieu Bollot"
            avatar="MB"
            facebook="mattboll"
            twitter="mattboll"
            github="mattboll"
          ></Cast>
          <Cast
            name="Vincent Maubert"
            avatar="VM"
            facebook="vincent.maubert"
            twitter="VincentMaubert"
            github="vmaubert"
          ></Cast>
          <Cast name="Thibaud Maillard" avatar="TM"></Cast>
          <Cast name="Pierre Robillard" avatar="PR" github="age2pierre"></Cast>
          <Cast name="Aimeric Martin" avatar="AM"></Cast>
        </ul>
      </div>
    </section>
  )
}
