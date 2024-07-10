---
title: "« La Semaine CT » : innovation, apprentissage et convivialité"
author: Nicolas
url: /2024/07/10/semainect2024/
aliases: 2024/07/10/semainect2024.html
date: 2024-07-10
expirydate: ""
cover: image3.jpg
---
Chez Code-Troopers chaque année, pendant 5 jours, le temps s’arrête. 

Tout le monde met en pause sa mission, on dit qu’on est « off » à tout le monde et interdiction de faire du télétravail 🙂 

« Ouai c’est séminaire quoi. » : oui. Mais nous on appelle ça la « Semaine CT », et elle est très attendue chaque année ! 

Et bien cette semaine CT (🤡) la semaine dernière. 

Vous voulez savoir ce qui se passe pendant cette semaine CT ? Vous êtes au bon endroit ! 

Pour résumer : Projets + démo + apéro + resto + activités diverses 

## Organisation et Équipes

On forme des petits groupes de 3 à 4 personnes dès le lundi matin (autour d’un petit dej colossal). 

Cette année, 4 équipes ont été faites, elles se font sur la base des sujets sur lesquels on a envie de travailler. Les semaines précédentes on évoque des sujets, on vote, on sélectionne, on revote, parfois on improvise un sujet de dernière minute, c’est pas toujours très carré, mais à la fin, y’a toujours des projets cool sur lesquels travailler. 

Ce format nous permet non seulement de stimuler la créativité mais aussi de travailler avec des Troopers avec qui on ne travaille pas forcément au quotidien. 

Les Projets de la Semaine	

1. Un ELO babyfoot : Développer un système de classement pour nos tournois de baby-foot. (Parce que oui, on joue régulièrement)
2. Un timeline en ligne :  Développer un jeu de société en ligne
3. Un sujet autour de la billetterie : développer une solution permettant d’intégrer une billetterie à nos applications Chapitô 
4. Faciliter les mises à jour de nos 50 applications Chapitô : Un projet pour…. faciliter les mises à jour de nos 50 applications Chapitô

## Zoom sur les Projets 

### ⚽️ ELO baby foot :

Ce projet avait pour but de développer un système de classement dynamique, pour nos parties de baby-foot quotidiennes. L’équipe a travaillé sur un algorithme de classement (ELO, un peu comme aux échecs), une interface utilisateurs intuitive et une intégration avec notre messagerie interne (Slack)

L’équipe à décidé de créer une application Web permettant de saisir les matchs joués, consulter la liste des matchs et le classement. Afin de faciliter la création d’un match, l’équipe a décidé d'intégrer le processus dans Slack en ajoutant la création automatique des équipes selon l’ELO des joueurs. La stack qui a été utilisée est : Svelte / Spring Boot / Postgres. Il n’y a pas eu de difficulté particulière à la mise en place de ce projet.

Le projet est fonctionnel même s’il reste des ajustements à faire au niveau du front et du calcul de l’ELO qui n’est pas encore satisfaisant !  

Mais d’ici quelques jours on devrait pouvoir obtenir quelque chose d’utilisable ! 

Pleins d’évolutions possibles : être capable de savoir contre qui tel Troopers a le plus gagné / perdu, obtenir des stats sur les meilleurs buteurs, les meilleures combinaisons de joueurs etc. 


<a style="display: inline" href="/2024/07/10/semainect2024/image1.png" data-lightbox="babyfoot" title="Babyfoot">
  <img class="medium" src="/2024/07/10/semainect2024/image1.png" alt="Babyfoot">
</a>


### 🃏Un timeline en ligne :

On joue pas mal au jeu de société TimeLine mais au bout d’un moment on connait les cartes par cœur, du coup le but du projet était de créer une version web (avec une infinité de thèmes et de cartes).

Le résultat obtenu au bout de ces quelques jours est une version jouable avec système de score et gestion des cartes du deck (manuellement via un formulaire ou générées automatiquement par IA en suivant un thème fourni par l’utilisateur). 

Niveau techno, l’équipe a utilisé le framework React Next.js, Shadcn UI pour les composants graphiques et le SDK d’Anthropic AI pour pouvoir utiliser l’IA Claude pour la génération des cartes. 

Pas de difficultés particulières pour le moment, quelques améliorations sont à prévoir, parce que pour l’instant, sur un thème un peu tiré par les cheveux ça invente des dates, c’est pas très malin (ex : Date du 1er burger sur Mars = 2028, on est pas dans les petits papiers de SpaceX, mais, ça nous parait un peu short). 

### 🎟️ Un sujet autour de la billetterie :

Pour le projet Chapitô on est tous les ans amenés à parler « billetterie » avec nos clients. Alors pendant 5 jours une équipe a décidé de creuser un peu ce sujet là. Qui sont les acteurs ? Chez qui sont nos clients ? Pourquoi ? Comment les intégrer ? Comment améliorer l’expérience utilisateur ? Comment utiliser certaines de nos fonctionnalités pour optimiser l’expérience. 

Pour ça, une équipe s’est mise dans la peau d’un service de billetterie, et en 5 jours l’équipe a développé, une interface admin pour créer une billetterie et des articles, une interface web pour réserver son billet et une appli de scan de billet. 🥵 

Bon, il ne faut pas s’emballer, en 5 jours on ne refait pas Weezevent, mais ça permettait d’aborder des sujets techniques intéressants. 

Techno : React Native, Java, Spring Boot, Vue

### 🚧 Faciliter les mises à jour de nos 50 applications :

La dernière équipe a travaillé sur le projet Chapitô pour développer un backoffice unique (les backoffice permettent aux organisateurs d'évènements de créer leurs applications mobiles). 

L'objectif est d'aligner les versions clients, simplifier l'onboarding et réduire les coûts d'infrastructure. 

Les technos utilisées pour ce projet sont : Java, Kotlin, Spring Boot et VueJS. 

Les difficultés se trouvaient dans la façon d’adapter l'existant volumineux. Néanmoins, les résultats obtenus sont suffisamment encourageants pour poursuivre vers un backoffice unifié. 

D’ailleurs un Trooper continue le projet cette semaine pour que ça aille au bout ! 

Ce projet visait à automatiser et simplifier le processus de mise à jour de nos nombreuses applications. L’équipe a conçu un système centralisé permettant de déployer les mises à jour de manière efficace et sécurisée.

### Fin du zoom sur les projets 

### Activités et Team Building

La semaine CT est toujours ponctuée d’activités de détente (ou pas ! Un tournoi de baby ici c’est très sérieux et on peut être TRÈS tendu en finale). 

🏆⚽️Tournoi de Baby : Aimeric et Florian

🏆🎯Tournoi de Fléchettes : Joris et Pierre

🏆🏎️Tournoi de Mario Kart : Matthieu


<a style="display: inline" href="/2024/07/10/semainect2024/image5.jpg" data-lightbox="mariokart" title="Mario Kart">
  <img class="medium" src="/2024/07/10/semainect2024/image5.jpg" alt="Mario Kart">
</a>


On fait toujours aussi une grosse activité team building toute une après-midi. Cette année c’était KhoLanTours Organisé par Numatéra (on a fait du feu, cherché des objets dans la forêt, fais l’épreuve des poteaux, etc.) (Rouge 🏆)


<a style="display: inline" href="/2024/07/10/semainect2024/image3.jpg" data-lightbox="kholantours" title="KohLanTours">
  <img class="medium" src="/2024/07/10/semainect2024/image3.jpg" alt="KohLanTours">
</a>


On profite du fait que tout le monde soit présent pour partager les repas dans différents resto, ou dans notre petit patio. Et bien sûr on organise des apéros et des soirées ! 

Aussi, tous les matins la première heure est dédiée à un p’ti dej Démo !  Les démo sont libres, tech ou pas tech ! Le but est de partager un truc auquel on s’est intéressé récemment. 



Cette semaine on peut dire que c’était varié : 

* Apprendre à reconnaître une écriture asiatique pour être un pro à Geotastic. Par Charles-Marie
* Pimp my Mac. Pour une meilleure gestion des fenêtres. Par Vincent. 
* Ornithopter : une introduction à la fascinante machine volante de DUNE. Par Pierre
* Les astuces de Figma pour un design efficace. Par Jules
* Next.js et les React Server Components (RSC). Par Benjamin
* Utiliser HomeAssistant pour se débarrasser de son trousseau de clés. Par Florian
* Découvrir la technique cinématographique du Texas switch. Par Aimeric


<a style="display: inline" href="/2024/07/10/semainect2024/image4.jpg" data-lightbox="demo" title="Démo 1">
  <img class="medium" src="/2024/07/10/semainect2024/image4.jpg" alt="Démo 1">
</a>



<a style="display: inline" href="/2024/07/10/semainect2024/image2.jpg" data-lightbox="demo" title="Démo 2">
  <img class="medium" src="/2024/07/10/semainect2024/image2.jpg" alt="Démo 2">
</a>


### Et après ? 

Ce que l’on peut reprocher de temps en temps à La Semaine CT c’est que les projets ne sont pas complètement aboutis et parfois sont un peu abandonnés ou partent à la “poubelle”. (C’est pas forcément grave, le but est avant tout de découvrir de nouvelles choses, technos, domaines, etc.)

Mais cette année, au moins 2 des 4 projets seront poursuivis, le projet sur l’ELO Baby et celui sur le backoffice unique pour Chapitô. C’est du bonus !

Quoi qu’il en soit, l’objectif de cette semaine CT est atteint ! Tous les Troopers ont passé un bon moment, chacun a pu tester de nouvelles idées dans une ambiance décontractée.