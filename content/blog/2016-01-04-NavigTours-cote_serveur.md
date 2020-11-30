---
author: Cedric
cover: images/banner/navigtours-banner.png
date: '2016-01-04'
tags:
- Archi
- Docker
- NavigTours
- Java8
- Restx
title: 'Navig''Tours : côté serveur'
url: /2016/01/04/navigtours-cote_serveur/
aliases: 2016/01/04/NavigTours-cote_serveur.html
---



Cet article, une fois n'est pas coutume, va rentrer un peu plus dans le fonctionnement de la partie serveur mise en place pour [Navig'Tours](http://navigtours.com/).
Si vous n'êtes pas technique, il risque d'être compliqué de le suivre !

<!-- break -->

## Architecture
La partie serveur de Navig'Tours est en réalité assez simple. Comme dit lors de différentes présentations des membres de Code-Troopers, ce projet est pour nous un moyen de nous amuser lorsque nous nous retrouvons tous les septs.
C'est également le projet que nous utilisons pour tester certaines technologies et approches.

Ainsi, Navig'Tours est une application développée en utilisant Java 8, mais rien de forcément très étonnant maintenant. Le côté le plus intéressant est qu'elle est en production depuis plus d'un an maintenant avec Java 8 !

Ensuite, nous utilisons l'excellent framework RestX pour simplifier notre vie dans la gestion des appels REST, ce qu'il nous apporte, entre autres :

 * de l'injection de dépendances lors de la compilation
 * un outillage d'administration complet
 * une plateforme de test intégrée et de specs nous permettant de documenter facilement l'API

Enfin, pour la partie stockage des données, nous utilisons MongoDB qui nous simplifie la gestion de données en manipulant des données principalement au format JSON (et fournit une bonne gestion de la géolocalisation par coordonnées).

## Du dev...
Côté dev, nous utilisons notre petit wrapper ([ct](http://code-troopers.com/2014/12/15/CT_Project_Alias.html)) pour les tâches classiques qui se charge d'effectuer le build ainsi que le run de l'application avec ses dépendances.
Le lancement de l'application se limite à mettre à disposition un serveur MongoDB ainsi qu'à effectuer un `java -jar`.

## À la prod !
Historiquement, l'application a été déployée sur Heroku dans son plan gratuit en utilisant plusieurs services cibles (pour répartir la charge via l'utilisation de plusieurs entrées DNS).

Mais, suite au changement de tarification d'Heroku et notre envie d'utiliser Docker sur un vrai projet, nous avons migré l'environnement pour utiliser exclusivement Docker.

Un des intérêts de la transformation que nous avons opéré est que nous sommes également capable de lancer l'application très simplement à l'aide de descripteurs Docker ainsi que du docker-compose qui décrit les interactions entre nos services.

## Process de livraison
Pour effectuer la livraison de l'application, nous sommes passés d'un `git push` vers heroku à un process impliquant Jenkins dans 3 étapes successives (mais qui s'enchaînent automatiquement) :

 * construction de l'application et archivage dans un `tgz`
 * copie du tgz produit pour la construction d'une image Docker poussée vers notre dépôt interne
 * lancement de l'application via un `docker-compose run -d` sur les machines cibles

## Gestion du multi-environnement
Comme toutes les applications d'entreprise, nous déployons vers plusieurs environnement afin de valider la bonne tenue de l'application et la qualité de nos développements :

 * dev / local : poste du développeur
 * preprod : version à passer en production
 * prod : version actuelle

À ceci, nous pouvons ajouter plusieurs versions en parallèle pour différentes fonctionnalités et/ou villes (l'info exclusive est cachée ici, Navig'VotreVille arrive…).
Pour être capable de gérer des déploiements différents nous avons ajouté quelques paramètres à nos scripts de lancement de docker-compose nous permettant de disposer de noms différents par projet pous éviter les problèmes.
