---
author: Code-Troopers
cover: ../mbmc-banner.png
date: '2014-04-03'
tags:
- startup
- tours
- Play2
- tech
title: Sous le capot du Startup Weekend Tours
url: /2014/04/03/souslecapot-startupweekendtours/
aliases: 2014/04/03/SousLeCapot-StartupWeekEndTours.html
---


Après l’article global d’impressions sur le Startup Weekend, nous sommes obligés de faire un court article précisant ce que nous avons implémenté et utilisé du point de vue technique (c’est ce qui nous intéresse beaucoup après tout).


## Contenu fonctionnel :

Puisque nous avons pris le temps de faire une application entière en 54h, nous allons tout de même détailler les fonctionnalités qui existent dans ce que nous avons produit :
* création de compte classique (avec validation par email obligatoire)
* création de compte via connexion Facebook
* proposition d’ajout de spectacle
* vote sur un spectacle existant
* duplication de spectacle (changement de ville)
* partage Twitter / Facebook / Google plus
* envoi de mail selon les statuts des événements
* _backoffice_ avec un tableau des événements et la possibilité de modifier leurs statuts
* modération des propositions de spectacle (avec remplissage automatique de la biographie / photo d’un artiste à partir de l’API [EchoNest](http://developer.echonest.com/))
* recherche globale avec Elasticsearch (géolocalisation et _full-text_ sur artiste)

## Contenu technique :

Les technologies utilisées dans le projet sont :
* [PlayFramework!](http://playframework.org)
  * socle [Play authenticate](https://github.com/joscha/play-authenticate)
  * intégration [password-strength](http://code-troopers.com/2014/03/05/passwordStrength.html)
  * intégration [elasticsearch-jest](https://github.com/CedricGatay/play2-elasticsearch-jest)
  * intégration [liquibase](https://github.com/CedricGatay/play-liquibase)
* [Twitter Bootstrap](http://getbootstrap.com/)
* [RequireJS](http://requirejs.org/)
* [JQuery](http://jquery.com)
  * [select2](http://ivaynberg.github.io/select2/)
  * [select2-placecomplete](https://github.com/stchangg/placecomplete)
  * [bootstrap-slider](https://github.com/seiyria/bootstrap-slider)
  * [bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker)
* [ParsleyJS](http://parsleyjs.org)
* [ElasticSearch](http://elasticsearch.org)
* [Git](http://git-scm.com/)
* [Gitlab](http://gitlab.com)
* [Heroku](http://heroku.com)
* [PostgreSQL](http://www.postgresql.org/)

Dans la liste des librairies utilisées, certaines sont des développements internes qui vont certainement donner lieu bientôt à quelques articles pour les détailler plus précisément.
Pour rappel, le projet est consutable ici : [My band, My City](http://mybandmycity.code-troopers.com).
