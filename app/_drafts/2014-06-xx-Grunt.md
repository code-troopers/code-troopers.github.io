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

Vous pouvez suivre la procédure d'installation du site de yeoman. Elle permet d'installer yo, grunt et bower. Ensuite vous pourrez créer votre premier projet. Créez un répertoire pour votre projet et lancez la commande suivante
```
yo webapp
```
Le générateur 'webapp' vous génére un squelette contenant HTML5 Boilerplate, jQuery, et un fichier de config Grunt pour builder votre projet. Il vous propose quelques options intéressantes comme Bootstrap, Sass et Modernizer (vous pouvez ne pas les choisir et les ajouter par la suite).

Une fois le projet généré, vous avez juste à utiliser grunt pour commencer à personnaliser votre site web.

Grunt

Avant de commencer à modifier des choses, voyons voir à quoi ressemble notre site web actuellement. Pour cela vous devez executez la commande suivante
```
grunt serve
```
Votre navigateur préféré s'ouvrira automatiquement à l'adresse http://localhost:9000
<screen>
Ouvrez le projet dans un éditeur et commencez à modifier le code de app/index.html par exemple, sauvegardez et là, magie, le navigateur se rafraichi tout seul avec votre modification. Ceci est possible grâce aux tâches 'watch' et 'livereload' de Grunt qui scanne les fichiers modifiés de votre projet, execute les tâches configurées et rafraichit le navigateur.

Le squelette de Yeoman dispose d'autres tâches installés par défaut comme la minification de code, l'optimisation des images, le merge des fichiers, et encore d'autres. Vous pouvez voir la configuration de ces tâches dans le fichier Gruntfile.js

À la fin de ce fichier ce trouve les différents profiles disponibles
```
grunt serve         #lance le serveur en mode dev
grunt serve:dist    #lance le serveur en mode prod
grunt build         #build le projet pour le déployer
grunt test          #lance les tests du projet
```

Afin de déployer notre site sur heroku, nous allons ajouter un profile et une tâche qui s'occupera de faire ça tout seul.
```
npm install grunt-build-control --save-dev
```
Cette tâche [grunt build control](https://www.npmjs.org/package/grunt-build-control) permet de pusher un répertoire de notre projet sur un repo, ou une branche d'un repo. Petite remarque, le --save-dev est très important, il permet d'ajouter une ligne de le package.json avec que la tâche puisse s'installer tout seul au prochain
```
npm install
```
On doit tout d'abord configurer le fichier Grunfile.js pour ajouter notre tâche. Dans la partie initConfig, ajoutez le code suivant
```
grunt.initConfig({
  …
  buildcontrol: {
              options: {
                dir: 'dist',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
              },
              heroku: {
                options: {
                  remote: 'git@heroku.com:<repo>.git',
                  branch: 'master'
                }
              }
          }
});
```
N'oubliez de remplacer le <repo> par le nom véritable de votre repo. Vous pouvez avoir autant de section que vous voulez, par exemple, en plus d'heroku on pourrait ajouter github, … Cette commande peut-être lancer individuellement comme ceci
```
grunt buildcontrol:heroku
```
Celle-ci va copier le contenu du répertoire dist sur la branche master du repo heroku. Vous devez avoir fait un grunt build pré-alablement pour le remplir.

```
grunt.registerTask('deploy', [
      'build',
      'buildcontrol:heroku'
]);
```




Bower

Jenkins

Heroku
