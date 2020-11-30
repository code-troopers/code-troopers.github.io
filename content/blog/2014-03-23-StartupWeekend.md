---
author: Code-Troopers
cover: images/banner/swtours-banner.png
date: '2014-03-23'
tags:
- startup
- tours
- Play2
title: Startup Weekend Tours
url: /2014/03/23/startupweekend/
aliases: 2014/03/23/StartupWeekend.html
---


Retour sur 54h de Startup Weekend pour la première édition à Tours [#swtours](http://tours.startupweekend.org/)

## Introduction

Les Startup Weekends ont pour but d’encourager les entrepreneurs à créer leur projet en les confortant dans la viabilité de leur idée et en leur permettant de rencontrer des co-fondateurs. C’est par exemple l’occasion pour un charpentier de rencontrer des informaticiens pour réaliser un site, de rencontrer des avocats pour être sûr de la légalité et des investisseurs pour étudier la viabilité de la startup. Le tout en 54h, il faut aller vite !

## Vendredi (Be My Tourneur):

Nous avions prévu l’événement en sortant de notre backlog idées quelques sujets qui pouvaient mériter d’être présentés lors de l’événement. Nous avons finalement présenté un sujet (que nous risquons de développer en interne dans quelque temps) concernant la prise de rendez-vous auprès des artisans.

La sélection des projets se fait par l’intégralité des personnes présentes, en effet, chaque participant à l’événement avait à sa disposition trois pastilles autocollantes à coller sur les différents sujets.

À l’issue de ce vote, les projets ayant recueillis le plus de voix ont été conservés et leurs initiateurs ont eu l’occasion de les détailler un peu plus pour pouvoir effectuer le recrutement pour mener à bien leur idée.

En plus des projets sélectionnés par le nombre de votes, n’importe quel projet qui arrivait à réunir une équipe d’au moins deux personnes avait le droit de lancer son idée (ce qui fut le cas de deux équipes).

Comme vous l’avez sûrement remarqué, l’équipe Code-Troopers est composée de développeurs qui aiment la musique, un des projets présenté consistait à donner au public l’opportunité de proposer la venue d’artistes dans une ville en particulier. C’est donc tout naturellement que nous nous sommes dirigés vers celui-ci (non sans avoir hésité avec quelques autres projets, dont celui qui a fini vainqueur, et qui le mérite amplement !)

Ainsi, nous nous sommes retrouvés à 8 dans l’équipe, un membre Business (responsable d’une entreprise de développement locale), trois étudiants de FBS Tours (Business également donc), un graphiste (partagé entre plusieurs projets) et les quatre Code-Troopers inscrits. Nous avons passé le reste de la soirée à brainstormer autour du sujet et voir où nous pouvions raisonnablement aller.

Nous sommes passés par beaucoup d’étapes et d’idées avortées avant de nous fixer sur le fonctionnement que nous avons développé pendant les deux journées qui ont suivi. Nous avons couché les principaux axes sur le papier et sommes rentrés nous coucher avant d’attaquer les choses sérieuses.

Fin de journée - 2h


## Samedi (Ma Ville Mon Artiste)
Pour réaliser ce site rapidement, nous avons utilisé nos outils de prédilection du moment, [Intellij IDEA](http://www.jetbrains.com/idea/) comme IDE pour coder avec [Play framework!](http://playframework.com), le partage de sources se faisant sur un dépôt git hébergé par [GitLab](https://gitlab.com).

Les EPICS en tête, nous nous sommes répartis les tâches pour construire le socle, les entités, les pages et les services dont nous aurions besoin. Pendant ce temps, nos collègues de la partie business s’occupaient du business plan et de l’étude de marché. La demande était forte auprès des personnes sondées mais nous n’étions pas sereins sur le financement, à savoir qui paierait et pour quels services.

Nous devions nous réunir vers 16h pour savoir vers quoi le développement devait s’orienter. Par exemple nous avions envisagé une partie pour que les petits groupes puissent organiser leur tournée ou pour que les clients fassent du crowdfunding pour faire venir un groupe. L’idée n’était pas arrêtée et les besoins étaient presque opposés, en un week-end nous n’aurions pas le temps de tout faire !

Les discussions allant entre les mentors et la partie business, ce n’est que vers 20h que nous avons eu le projet final, nous avons alors pu arrêter de nous disperser sur les fonctionnalités potentielles et nous concentrer sur le strict nécessaire pour avoir un projet fini à la fin du week-end.

Vers minuit, les fonctionnalités étaient toutes présentes, c’était même livré en prod (sur Heroku, avec un lien vers un serveur dédié nous appartenant pour la partie ElasticSearch) ! Par contre c’était un peu… “blanc”.

<div style="text-align : center">
<a style="display: inline" href="/images/posts/2014-03-23-StartupWeekend/mbmc_nostyle_1.png" data-lightbox="image-0" title="mbmc sans style">
        <img class="mini" src="/images/posts/2014-03-23-StartupWeekend/mbmc_nostyle_1.png" alt="mbmc sans style"/>
</a>
<a style="display: inline" href="/images/posts/2014-03-23-StartupWeekend/mbmc_nostyle_2.png" data-lightbox="image-0" title="mbmc sans style">
        <img class="mini" src="/images/posts/2014-03-23-StartupWeekend/mbmc_nostyle_2.png" alt="mbmc sans style"/>
</a>
<a style="display: inline" href="/images/posts/2014-03-23-StartupWeekend/mbmc_nostyle_3.png" data-lightbox="image-0" title="mbmc sans style">
        <img class="mini" src="/images/posts/2014-03-23-StartupWeekend/mbmc_nostyle_3.png" alt="mbmc sans style"/>
</a>
</div>

C’est à ce moment là que Vincent le graphiste ([faceinteract](http://www.faceinteract.com/vnctplsn/)) est arrivé pour nous offrir un logo et une palette de couleur qui ont pu être intégrés dans la maquette de la page principale faite par Benjamin.

Fin de journée - 3h

## Dimanche (My Band My City)
Dimanche matin, réveil difficile, il reste encore beaucoup à faire pour rendre le produit sympa visuellement, mais fonctionnellement nous avons quelque chose qui tient la route. En partant du travail fourni par Vincent et Benjamin, il ne nous restait plus qu’à traduire les maquettes dans leurs versions dynamiques.

Le processus s’est plutôt bien passé, quelques bugs ont été introduits lors de l’opération, mais ceux-ci provenaient plus de changement dans les flux utilisateurs que d’erreurs de conception.

Pendant que nos amis du business rodaient leur présentation, nous avons eu l’idée de réaliser un screencast simple de l’utilisation de l’application pour éviter les effets pervers d’une démo en live (nous connaissons tous le [syndrome Bonaldi](http://fr.wikipedia.org/wiki/J%C3%A9r%C3%B4me_Bonaldi#Effet_Bonaldi), et le réseau étant particulièrement capricieux, la [loi de Murphy](http://fr.wikipedia.org/wiki/Loi_de_Murphy) se serait abattue sur nous !). Vous pouvez consulter le screencast sur YouTube ([https://www.youtube.com/watch?v=hX9eeCdNIbo](https://www.youtube.com/watch?v=hX9eeCdNIbo)).

<div style="text-align: center"><iframe width="640" height="480" src="//www.youtube.com/embed/hX9eeCdNIbo" frameborder="0"> </iframe></div>

L'application est maintenant publique [http://mybandmycity.code-troopers.com](http://mybandmycity.code-troopers.com) (attention ce n'est qu'une version alpha)!

Fin de marathon - 17h

## Verdict final
Nous avons réussi à finir dans le top 3 ! La notation se fait autour de trois critères : le modèle économique, la validation client et l’exécution. Ce n’était pas gagné car l’idée du projet a été trouvée dans la journée de vendredi, rien n’avait été préparé avant le début du week-end ! C’est d’ailleurs aussi pour ça que le projet s’est tantôt appelé «be my tourneur», puis «ma ville mon artiste», pour finir sur «My Band My City». Le projet a tout de même séduit le jury qui nous a accordé une excellente 3ème place !

Merci à toute l’équipe du staff qui nous a très bien nourris pendant ce week-end et merci à nos collègues de FBS qui ont eux aussi fait du très bon boulot.

## Classement Final
10 projets ont été présentés.

Les 3 premiers:
* Pirate de loire : sur le principe du geo caching, touristique / économique.
* Stud app : application simplifiant la vie des étudiants dans le flux d'informations envoyé par les écoles et universités.
* [My band, My City](http://mybandmycity.code-troopers.com) : application permettant de développer une communauté pour faire venir un artiste dans sa ville.

## Remerciements
Ce weekend n’aurait pas pu avoir lieu sans l’investissement de nombreuses personnes, mais nous tenons dans un premier temps à remercier les 4 organisateurs de cette premiere édition du Tours Startup Weekend : Marie Gassie - Julien Dargaisse - Julien Gomès - Julien Grimal. Ensuite il ne faut pas oublier Adrian Pica, qui a fait le déplacement de Roumanie, pour animer le weekend, et grâce à son expérience de nombreux Startup Weekend, il a su motiver et remotiver tous les participants le long de l’événement.

Il vient ensuite tous les mentors qui ont apportés leur connaissance du marché, leurs expériences des startups et surtout leurs côtés pragmatiques sur les questions de rentabilité et de viabilité des projets.


<a href="/images/posts/2014-03-23-StartupWeekend/team.jpg" data-lightbox="image-1" title="L’équipe de MyBandMyCity (de gauche à droite) : François (De Feraudy), Fabian (Petit), Julien (Pagnac), Matthieu (Bollot), Cédric (Gatay), Florian (Chauveau), Benjamin (Cousin)">
        <img class="mini" src="/images/posts/2014-03-23-StartupWeekend/team.jpg" alt="L’équipe de MyBandMyCity"/>
</a>
L’équipe de MyBandMyCity (de gauche à droite) : François (De Feraudy), Fabian (Petit), Julien (Pagnac), Matthieu (Bollot), Cédric (Gatay), Florian (Chauveau), Benjamin (Cousin)

<div id="fb-root" style="text-align:center"></div> <script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/all.js#xfbml=1"; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));</script>
<div class="fb-post" data-href="https://www.facebook.com/media/set/?set=a.236794193172341.1073741831.123604307824664&amp;type=1" data-width="466"><div class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/media/set/?set=a.236794193172341.1073741831.123604307824664&amp;type=1">Post</a> by <a href="https://www.facebook.com/pages/Code-Troopers/123604307824664">Code-Troopers</a>.</div></div>


PS : sad story :
Le seul point négatif du weekend (mis à part le wifi), dimanche soir en rentrant, j’ai retrouvé mon vélo, mais la selle avait disparu. Tours conserve donc son titre de ville la moins sûre pour les vélos...
