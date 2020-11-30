export function Skills() {
  return (
    <section id="skills">
      <div className="wrapper">
        <h1>Compétences</h1>
        <ul className="flex">
          <li>
            <img src="/img/skill_conception.png" alt="logo conception" />
            <div className="title">Conception & Analyse</div>
            <div>Nous vous accompagnons et vous apportons des solutions innovantes.</div>
          </li>
          <li>
            <img src="/img/skill_dev.png" alt="logo dev" />
            <div className="title">Développement d’application</div>
            <div>Nous réalisons des développements logiciels et mobiles sur-mesure.</div>
          </li>
          <li>
            <img src="/img/skill_design.png" alt="logo design" />
            <div className="title">Design d’interface</div>
            <div>
              Sensibles à vos besoins esthétiques, les Troopers réalisent des interfaces graphiques,
              ainsi que des applications créatives.
            </div>
          </li>
          <li>
            <img src="/img/skill_maintenance.png" alt="logo maintenance" />
            <div className="title">Maintenance & Suivi</div>
            <div>
              Nous sommes présents tout au long des étapes de vos projets online. Les Troopers sont
              expérimentés et travaillent en équipe : ici le dialogue-client n’est jamais
              interrompu.
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
