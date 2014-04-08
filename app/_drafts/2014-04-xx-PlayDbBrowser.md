---
layout: post
title: Play2 accéder à la base de donnée
author: Nanak
cover: swtours-banner
tags: [Play2, db, h2-browser]
---

[Play2](http://www.playframework.com/), c'est fun et c'est rapide !
Il suffit de quelques instant pour avoir une appli qui tourne en local sans rien avoir à configurer [voir la doc de play](http://www.playframework.com/documentation/2.2.x/NewApplication).
En plus dès que l'on commence un peu à jouer, créer des entités, faire une page de CRUD, tout tourne toujours aussi bien. Il faut dire que c'est agréable, car [Ebean](http://www.playframework.com/documentation/2.2.x/JavaEbean) s'est occupé de générer les commandes sql dans le fichier _1.sql_ qui est joué automatiquement par play.

Le problème arrive en général un peu après, lorsque l'envie nous prend de visualiser les données qu'on a inséré via les pages pour différents traitements.
En effet, pas besoin de monter un serveur sql ou autre, par defaut tout se passe dans une base en mémoire (ce qui signifie aussi, que lorsque le serveur est arreté les datas disparaissent).
Et forcément la question universelle est "Mais comment je peux voir ces ***** de data en basé ?".


La solution est simple, elle réside dans une commande `h2-browser`.
Mais pour pouvoir l'utiliser, il va falloir se discipliner un tout petit peu. En effet, si vous aviez l'habitude de faire des `play run` pour lancer le serveur et des `ctrl-D` pour l'arreter, il va falloir changer de méthode.

La procédure miracle est donc la suivante :

 * lancer la console play
```
 $ play
```
 * lancer le visualiseur de bdd (qui ouvre une fenetre dans votre navigateur web)
```
 $ h2-browser
```
 * démarrer votre serveur.
```
 $ run
```

Lorsqu'il se lance h2-browser devrait vous présenter une fenêtre de connection comme celle-ci :

/!\ l'image ne build pas

Maitenant qu'il est lancé, il faut se connecter, et par défaut c'est pas gagné, parce qu'il est configurer pour aller dans la base 'test' qui est une base valide, mais surement pas celle dans laqulle vos données sont.

Il faut donc modifier les champs _jdbc_, _login_, _password_.
Pour cela aller chercher dans __main.application.conf__ (normalement situé dans le repertoire _/conf/_ de votre projet) et trouvez les champs suivant

```
db.default.url="jdbc:h2:mem:play"
db.default.user=sa
db.default.password=
```
ce sont les 3 valeurs à recopier dans la fenêtre de connexion.

Et voilà le tour est joué, c'est tout de meme sympa d'être sûr de ce que l'on a en base.
