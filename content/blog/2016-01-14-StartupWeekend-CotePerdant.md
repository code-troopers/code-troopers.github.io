---
author: Matthieu
cover: images/banner/swtours-banner.png
date: '2016-01-14'
tags:
- Startup
- AngularJS
- Tech
title: 'Startup Weekend : côté perdant'
url: /2016/01/14/startupweekend-coteperdant/
aliases: 2016/01/14/StartupWeekend-CotePerdant.html
---


## Ou : Yo ! AngularJS, le meilleur ami des MVP
Le week-end du 5 décembre a eu lieu un Startup Weekend édition tourisme à Tours où 6 troopers étaient présents. 3 d'entres nous ont choisi l'équipe `We Guide` composée de 3 développeurs, 3 designers et 3 profils business (les 3 autres ont choisi [@shakemytours](https://twitter.com/shakemytours) et ont gagné le Startup Weekend).
L'idée de base est de découvrir une région à l'aide d'un guide local, officiel ou non. Quelqu'un qui emmène les touristes aussi bien dans les bars, restaurants, parcs que dans les monuments plus habituels de touraine comme les châteaux, la [basilique Saint-Martin](http://basiliquesaintmartin.fr/) ou le [Grand Aquarium de Touraine](http://www.decouvrez-levaldeloire.com/#grand-aquarium-actualites). Un peu à l'image des [greeters](http://www.tours-greeters.fr/) mais rémunérés pour motiver plus de guides et permettre de promouvoir cette pratique.

<div class="text-center">
    <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Tours,_Saint_Martin.JPG/280px-Tours,_Saint_Martin.JPG" data-lightbox="group-1" title="saint martin de tours" class="inlineBoxes">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Tours,_Saint_Martin.JPG/280px-Tours,_Saint_Martin.JPG"/>
    </a>
</div>



## Init : L'attaque des clones
Fort de nos précédentes expériences de Startup Weekend, nous avions tout prévu. En hard, batteries pleines et câbles. En soft, des images docker diverses de jdk8 à postgresql en passant par jenkins (oui c'était large et optimiste) mais aussi IntelliJ et Android Studio à jour, ainsi que diverses images de genymotion.
Nous étions parés à toute éventualité, ou presque. Pour développer le MVP de We Guide, nous avons décidé de faire un site web.
Faire un site complet en 54h, qui soit à peu près beau, c'est un peu mission impossible. On partait de absolument 0 à part une esquisse d'idée de base, donc le vendredi soir on l'a surtout passé à discuter de l'idée.

Nous avons donc choisi de nous concentrer uniquement sur un front AngularJS en mockant les appels du back. Bon, dans la liste des choses préparées à l'avance on n'avait pas pensé à faire un "yo angular".
[Yeoman](http://yeoman.io/) est un générateur de projet, ça permet d'initialiser un nouveau projet avec un certains nombre de bibliothèques, les connexions aux bases de données nécéssaires, la gestion des utilisateurs etc. Dans notre cas nous avions surtout besoin de npm/bower/gulp.
Le téléchargement est un peu long, le répertoire `node_modules` fait 380Mo, alors oui en fibre chez soit c'est rapide, mais quand on est des dizaines à tirer sur un réseau pas forcément dessiné pour, c'est un peu lent. En plus on a eu un bug dans gulp que l'on a remplacé par grunt faute de temps pour débugger, donc re-téléchargement.
Au final, on a pu commencer à tous faire nos git clone vers 10h le samedi matin.

Ensuite nous commençons à intégrer ce que l'on aura besoin. Du beau et des petits effets, donc [Angular Material](https://material.angularjs.org/latest/). On prépare nos composants, autocomplete, sliders, buttons… et les routes, page principale, page de création/édition de compte, recherche de guides. Les informations sur les couleurs, les pictos, logo et maquettes arrivent au fil de l'eau. C'est toujours un peu spécial de commencer à travailler et d'avoir toutes les informations _après_ mais on commence à être des habitués des Startup Weekend (et de certains clients ;) )

## Commit : Le réveil de la force
Le samedi soir, on est dans la vibe. Plus trop besoin de réseau, on a des visuels et nos bibliothèques de base. Pas besoin de s'occuper des ravitaillements, on se concentre juste sur le code et c'est ça qu'on aime.
Nous avons donc une navbar avec notre logo et les différentes actions de navigation fonctionnelles.
<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2016-01-14-StartupWeekend-CotePerdant/navbar1.png" data-lightbox="group-2" title="navbar weguide" class="inlineBoxes">
<img class="medium" src="/images/posts/2016-01-14-StartupWeekend-CotePerdant/navbar1.png" alt="navbar"/><br/>
    </a>
<br/>
    <a href="/images/posts/2016-01-14-StartupWeekend-CotePerdant/navbar2.png" data-lightbox="group-2" title="navbar connected weguide" class="inlineBoxes">
<img class="medium" src="/images/posts/2016-01-14-StartupWeekend-CotePerdant/navbar2.png" alt="navbar connecté"/>
    </a>
</div>


Un logo, une phrase d'accroche sur un fond de page avec transition d'images en background animé par css (ici en accéléré dans le gif).
<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2016-01-14-StartupWeekend-CotePerdant/logo.gif" data-lightbox="group-3" title="Logo weguide" class="inlineBoxes">
<img class="medium" src="/images/posts/2016-01-14-StartupWeekend-CotePerdant/logo.gif" alt="logo"/>
    </a>
</div>

Un footer avec nos liens twitter et facebook, et le premier formulaire de recherche.
On recherche donc une ville, un autocomplete angular material, avec des dates de début et de fin de projet. Si vous connaissez AngularJS, vous savez peut-être qu'il n'y avait pas de date picker jusqu'à peu. Maintenant il y en a mais en RC et c'est encore un peu buggué, il a fallu corriger certaines choses liées au style.
Ah oui, sur le bouton de recherche, en plus du ripple effect il y a un petit effet kiss cool tout en css et évidemment, la ville est mandatory (tout est dans le détail).
<div style="text-align: center;margin:50px;">
<video style="width: 90%; max-width: 600px;" controls src="/images/posts/2016-01-14-StartupWeekend-CotePerdant/search.webm"></video>
</div>

On arrive alors sur la page de résultats. Sur cette page au design épuré, nous avons la barre de recherche avec la ville et les dates saisies précédemment.
<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2016-01-14-StartupWeekend-CotePerdant/searchbar.png" data-lightbox="group-4" title="Searchbar weguide" class="inlineBoxes">
<img class="medium" src="/images/posts/2016-01-14-StartupWeekend-CotePerdant/searchbar.png" alt="searchbar"/>
    </a>
</div>

S'en suit des paramètres par défaut. Des checkbox pour les activités, des doubles sliders pour sélectionner la distance et le prix souhaité.
<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2016-01-14-StartupWeekend-CotePerdant/params.gif" data-lightbox="group-5" title="search parameters weguide" class="inlineBoxes">
<img class="medium" src="/images/posts/2016-01-14-StartupWeekend-CotePerdant/params.gif" alt="params"/>
    </a>
</div>

Au centre, une description du guide, "effet zoom pour plus d'infos" et la possibilité de lui envoyer un message.
<div style="text-align: center;margin:50px;">
<video style="width: 90%; max-width: 600px;" controls src="/images/posts/2016-01-14-StartupWeekend-CotePerdant/guide.webm"></video>
</div>

Enfin, une autre page fonctionnelle a été réalisée pour s'inscrire en tant que guide.
Tout est enregistré dans le local storage avec AngularJS, ça permet d'aller vite, de pouvoir jouer avec l'appli mais de ne pas avoir besoin d'une base de donnée.
<div style="text-align: center;margin:50px;">
<video style="width: 90%; max-width: 600px;" controls src="/images/posts/2016-01-14-StartupWeekend-CotePerdant/register.webm"></video>
</div>

Pour en voir plus, vous pouvez aller sur [https://weguide.herokuapp.com](https://weguide.herokuapp.com)  et le code est disponible sur [https://github.com/code-troopers/sw-weguide/](https://github.com/code-troopers/sw-weguide/) mais ne vous attardez pas trop sur les commits logs :p

## Push : Un nouvel espoir
Pour finir même si nous n'avons pas gagné de prix, on a gagné des amis, on s'est amusé, on a codé tout le week-end sans s'occuper de logistique et c'était bien sympa.
Encore une fois merci aux organisateurs d'avoir tout prévu et d'avoir pris soin de notre santé physique et mentale.

Nos collègues étaient principalement des étudiants qui n'avaient jamais travaillés avec des développeurs. Inconsciemment nous avons utilisé quelques principes de base des méthodes agiles, entre autre en faisant un point toutes les 2/3 heures, équivalent à un daily. Et nous avons essayé de faire passer l'idée des post-its pour les bugfix et les nouvelles tâches. Mais nous aurions pu mieux faire, en partie parce-que l'on travaille totalement différement en Startup Weekend comparé à la vraie vie, donc on aurait pu mettre l'accent sur d'autres points afin de les former à être de bons clients, ça pourrait être utile pour plus tard :)

Cet article avait deux buts, déjà soulager ma conscience car sans doute personne n'a vu notre travail même si cette année un prix a été remis pour le MVP le plus abouti, c'est déjà plus valorisant pour les développeurs.
Ensuite pour le rappeler, AngularJS c'est juste trop bien, ce n'est pas un mockup, cela marche vraiment en un rien de temps. J'espère vous avoir convaincu si vous en doutiez encore.
