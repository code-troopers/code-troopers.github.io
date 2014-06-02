---
layout: post
title: Son site web en livraison continue
author: Benjamin
cover: grunt-banner
tags: [Grunt, Yeoman]
---

Si comme moi vous êtes issue du monde de l'entreprise, vous savez combien les processus de déploiement en continue d'application sont un gain de temps et d'efficacité.

Mais avez-vous déjà pensé à le faire pour un site vitrine ?

Pour cela, on va utiliser différents outils :
* [Yeoman](http://yeoman.io/) : un outil permettant de générer des squelettes de site ou d'application en intégrant directement des outils ou des frameworks
* [Grunt](http://gruntjs.com/) : un outil permettant d'effectuer les différentes tâches pour mettre en production son site web
* [Bower](http://bower.io/) : un gestionnaire de paquet permettant de gérer les dépendances du projet
* [Jenkins](http://jenkins-ci.org/) : un outil d'intégration continue qui nous servira de forge pour executer les tâches de déploiement de grunt et la livraison sur heroku
* [Heroku](http://heroku.com) : un service de cloud computing de type de plate-forme en tant que service qui nous servira à héberger le site web

Pré requis

Afin de poursuivre la suite de l'article, vous devez installer Node.js, et Git si vous ne les possédez pas encore

Yeoman

Vous pouvez suivre la procédure d'installation du site de yeoman ainsi que le "Getting started". Elle permet d'installer Grunt et Bower et de partir sur un squelette de site web avec ces deux outils déjà configurés. Il ne reste plus qu'à le personnaliser.

Grunt

Grunfile.js
Tasks
livereload

Bower

Jenkins

Heroku
