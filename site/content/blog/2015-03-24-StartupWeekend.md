---
author: Florian
cover: ../swtours-banner.png
date: '2015-03-24'
tags:
- startup
- tours
title: 'Retour sur le Second #SWTours'
url: /2015/03/24/startupweekend/
aliases: 2015/03/24/StartupWeekend.html
---


Ce weekend a eu lieu la seconde édition du Startup Weekend Tours, organisé par Palo Altours.
Cette année nous avons pris possession du futur lieu emblématique de l’activité numérique tourangelle : le site de l’ancienne imprimerie MAME.


Nous étions 4 Troopers venus pour apporter un soutien technique aux pitchs les plus funs et les plus intéressants du weekend.
Premier changement pour nous par rapport à l’an dernier, nous avions décidé de ne pas tous travailler sur le même projet.
Un petit challenge en plus car en divisant nos forces on savait qu’on allait perdre en efficacité et en rapidité de développement, ce qui peut être déterminant en 54h.
Nous n’étions pas non plus venus avec une idée de pitch, ce qui nous a permis de nous concentrer sur la partie technique.


# Résumé d’un weekend intense

<br/>

## Vendredi - 18h : pitchs et choix des projets
En tant que dev c’est le moment le plus complexe : plein d’idées, plein de monde, plein de sollicitations et un choix à faire vite ! Très vite !
Comme l’année dernière, il n’y a pas énormément de dev et les porteurs de projet (souvent business) ont presque tous besoin de dev dans leur équipe.
Et ce n’est pas facile de refuser un appel à l’aide.
Mais il faut faire un choix et en plus il faut faire le tri entre les projets qui semblent intéressants et ceux où il y a un minimum de dev à faire, car on est venu pour ça.
Après avoir pris notre temps pour faire le tour de tous les projets, voici notre verdict :

* Matthieu va travailler sur _TIM_ : une plate-forme qui permet de prendre rendez-vous chez des professionnels de tous genres (coiffeur, plombier…),
* Vincent va travailler sur _Roadmad_ : une application pour trouver des lieux insolites localement,
* Joris et moi, enfin, allons travailler sur _OnAssur_ : une plate-forme qui va nous aider dans la compréhension et la gestion de nos contrats d’assurance.


<br/>

## Vendredi - 21h : l'équipe !

Les équipes formées, les hostilités peuvent commencer.
Il faut affiner le concept, définir le MVP (Most Valuable Product), trouver un nom, une identité. Il faut aller vite tout en laissant à tout le monde la possibilité de s’exprimer.
Nous sommes 9 dans notre équipe, ce qui fait du monde à découvrir en peu de temps pour réussir à communiquer efficacement.

Petit tour de table de notre équipe : [Mélodie](https://twitter.com/MelodieFourez), [Stéphane](https://twitter.com/SandeauGruberS), [Marie](https://twitter.com/MarieCottu), [Maxime](https://twitter.com/maximepvrt),
 [Bénédicte](https://twitter.com/loustalotbene), [Alexis](https://twitter.com/alexescu), [Victor](https://twitter.com/victor_proust), [Joris](https://twitter.com/Joris_Potier) et [moi](https://twitter.com/FlorianChauveau)
 (quelques têtes déjà vues, mais personne avec qui nous avions déjà travaillé : _challenge accepted_).

On ne sait pas encore où on va, mais côté dev il faut déjà avancer. Maxime est venu avec une stack AngularJS + Google endpoint. Parfait, ce sera simple à héberger, on peut au moins commencer à commiter sur son repo github.

<br/>

## Vendredi - "plus tard dans la soirée" : on a un nom !
`Kaléméon`
Marie, notre super graphiste, a trouvé un lien entre le caméléon et sa vision à 360° et la solution que l’on souhaite apporter à nos utilisateurs : toute l’équipe valide !

Côté business Stéphane, Mélodie, Bénédicte et Alexis ont plein d'idées, et Victor est là pour apporter son expertise, en tant qu'étudiant en droit c'est pile la personne qu'il fallait.

Il reste Maxime, Joris et moi, on a entammé le dev en partant des vagues concepts métier évoqués : des assurances, des contrats, des mots clés et des assurés.


<br/>

## Samedi - 10h : au travail
L’objectif de la journée : avoir un MVP avec une démo fonctionnelle.
On essaie donc de définir un certain nombre de _use case_ et la trame que l’on souhaite présenter lors de la démo.
Cela nous permet d’affiner en grande partie le dev qu’on a à faire. Joris se concentre sur les endpoints, de mon coté je gère la partie front en angular et Maxime me file un coup de main pour l’interface en intégrant les visuels de Marie.

De l’autre coté de la table, ça bouge beaucoup aussi. Mais je n’écoute que d’une oreille car je suis concentré.
Au milieu de l’après-midi, Stéphane, Alexis, Victor et Bénédicte sortent sonder des gens dans la rue. Ils sont partis sur le terrain pour tester nos choix et idées avec des 'vrais' gens.
C'est une étape indispensable du weekend. Les retours des personnes sondées sont super positifs, donc on va en mettre dans la présentation finale.
Ils enchainent sur le _Business Model Canevas_, là je suis complètement largué, et aussi admiratif de ce qu'ils arrivent à faire en si peu de temps.

Sur la partie dev ça se passe bien, à peine quelques conflits de commit, mais c'est normal vu qu'on travaille sur les mêmes fichiers.
5h30 (oui oui le temps passe vraiment aussi vite) : il est temps d’aller dormir. Je laisse Marie et Maxime qui ont encore des ressources insoupçonnées.


<br/>

## Dimanche - 10h : un peu de recul
Retour au travail le dimanche vers 10h, toute l’équipe est là. Maxime n’a pas dormi (wahoo).
Il a terminé la page d'accueil du site [http://kalemeon.co/](http://kalemeon.co/).
Et pour la partie application, le travail a bien avancé aussi, niveau visuel c’est presque bon. Il reste du travail coté back. Il a bien géré les jointures entre un utilisateur et ses contrats associés. C’est Joris qui part sur cette tâche.
De mon coté, je me charge d’une saisie de données réelles, c’est toujours plus sympa pour une démo. Sur ce point, un grand merci à Victor qui a épluché plusieurs types de contrats pour en extraire les infos pertinentes sous forme de clauses et de mots-clés associés. Je n’ai plus qu’à jouer avec un builder et voilà une BDD bien remplie.

Pendant ce temps, l’autre moitié de l’équipe a travaillé sur la présentation finale et le rendu est vraiment bien.


<br/>

## Dimanche - 14h : pause repas et élections
À croire que Palo Altours fixe la date du Startup Weekend en se basant sur le calendrier électoral car, encore une fois, c’est un weekend d’élections. C’est donc après une petite pause citoyenne que nous reprenons le travail.
Le problème, c’est que côté dev il n’y a presque plus de travail. Le MVP semble bien fonctionner selon les cas d'utilisations sélectionnés pour la démo.
Il reste donc surtout de la cosmétique à faire, c'est pas le plus fun.


<br/>

## Dimanche - 17h : Préparation de la démo : la fin du monde
Encore un couac ! Une appletv est disponible mais le rendu sur iphone 5 n’est pas génial et impossible de trouver un ipad. Par chance on a mis la main sur un Slimport, mais là encore échec, le vidéoprojecteur n’est pas compatible : grrr.
Derniere tentative avec un Chromecast et là, c’est le wifi qui lâche toutes les 10 secondes :/
Finalement ce sera un PC avec un navigateur redimmensionné à la taille d’un téléphone, c’est mieux que rien…


<br/>

## Dimanche - 21h : les résultats
L'annonce des résultats se fait dans une ambiance survoltée, et le classement est le suivant :

  * 1er - `Peetch` [https://twitter.com/PeetchApp](https://twitter.com/PeetchApp)
  * 2nd - `Sonson` [https://twitter.com/sonsonapp](https://twitter.com/sonsonapp)
  * 3ème - `Qui apporte quoi ?`

Arghhh !! Quelle déception, aucun des 4 Troopers n’est sur le podium. C’est sûrement le signe que les Troopers sont fait pour travailler unis. On le saura pour la prochaine fois…


Si vous souhaitez regarder ce qui a été réalisé (il n'est pas garanti que ca reste en ligne très longtemps) :

 * Pour Kaléméon (la gestion des contrats d'assurance) : [app.kalemeon.co](http://app.kalemeon.co)
 * Pour TIM (la prise de rendez-vous) : [https://timfront.herokuapp.com/](https://timfront.herokuapp.com/#/)
 * Pour Roadmad (la recherche de lieux insolites autour de soi) : _pas de lien_

Rendez-vous avant la fin de l’année pour la prochaine édition, on sera encore là et toujours aussi motivés ! Il me semble qu’il y a les élections régionales à la fin de l’année, c’est sûr, bloquez ce weekend-là sur vos agendas :P


<br/>

## Remerciements
Merci le site MAME

C’est la première fois que je pénétrais sur le site de l’ancienne imprimerie MAME et, bien que l’esplanade soit encore en travaux, l’intérieur est vraiment sympa et bien aménagé.
Le site s’est parfaitement prêté à l’exercice avec un grand espace pour les discours, une zone où tous les cerveaux étaient réunis mais où il y avait assez de places pour que chaque groupe ait son espace. Il y avait même de quoi se détendre avec billards, tables de ping-pong et un panier de basket pour les plus sportifs.

Merci l’orga

Évidemment (et même si ça fait fayot :p), merci à Marie, Julien et Julien pour l’organisation ainsi que tous les bénévoles car ça fait une sacré logistique à mettre en place et tout s’est déroulé sans accrocs.

<br/>

## Photos
Pour voir quelques photos du weekend vous pouvez allez jetter un oeil sur [twitter](https://twitter.com/search?q=%23SWTOURS&src=tyah&mode=photos) ou bien sur la galerie de la [smilybox](http://www.smilybox.fr/albums/index.php?galerie=swtours) qui était installée dans la zone détente.

<div style="text-align:center;">
    <a href="/images/posts/2015-03-24-StartupWeekend/swtours_2015_0.jpg" title="" data-lightbox="group1" class="inlineBoxes">
      <img class="mini" src="/images/posts/2015-03-24-StartupWeekend/swtours_2015_0.jpg" alt="">
    </a>
    <a href="/images/posts/2015-03-24-StartupWeekend/swtours_2015_1.jpg" title="" data-lightbox="group1" class="inlineBoxes">
      <img class="mini" src="/images/posts/2015-03-24-StartupWeekend/swtours_2015_1.jpg" alt="">
    </a>
    <a href="/images/posts/2015-03-24-StartupWeekend/swtours_2015_4.jpg" title="" data-lightbox="group1" class="inlineBoxes">
      <img class="mini" src="/images/posts/2015-03-24-StartupWeekend/swtours_2015_4.jpg" alt="">
    </a>
    <a href="/images/posts/2015-03-24-StartupWeekend/swtours_2015_2.jpg" title="" data-lightbox="group1" class="inlineBoxes">
      <img class="mini" src="/images/posts/2015-03-24-StartupWeekend/swtours_2015_2.jpg" alt="">
    </a>
    <a href="/images/posts/2015-03-24-StartupWeekend/swtours_2015_6.jpg" title="" data-lightbox="group1" class="inlineBoxes">
      <img class="mini" src="/images/posts/2015-03-24-StartupWeekend/swtours_2015_6.jpg" alt="">
    </a>
    <a href="/images/posts/2015-03-24-StartupWeekend/swtours_2015_7.jpg" title="" data-lightbox="group1" class="inlineBoxes">
      <img class="mini" src="/images/posts/2015-03-24-StartupWeekend/swtours_2015_7.jpg" alt="">
    </a>
    <a href="/images/posts/2015-03-24-StartupWeekend/swtours_2015_3.jpg" title="" data-lightbox="group1" class="inlineBoxes">
      <img class="mini" src="/images/posts/2015-03-24-StartupWeekend/swtours_2015_3.jpg" alt="">
    </a>
    <a href="/images/posts/2015-03-24-StartupWeekend/swtours_2015_5.jpg" title="" data-lightbox="group1" class="inlineBoxes">
      <img class="mini" src="/images/posts/2015-03-24-StartupWeekend/swtours_2015_5.jpg" alt="">
    </a>
</div>
