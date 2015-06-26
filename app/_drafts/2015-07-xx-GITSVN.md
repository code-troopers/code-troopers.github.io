---
layout: post
title: GIT-SVN comment survivre dans un environnement hostile
author: Florian
cover: git-banner
tags: [GIT, GIT-SVN, Outils, Productivité]
---

Git c’est cool, Git c’est Hype, Git c’est tout récent ([enfin presque](http://git-scm.com/book/fr/v1/D%C3%A9marrage-rapide-Une-rapide-histoire-de-Git)) et c’est pour ça qu’on aime bien ça.
Mais pour beaucoup Git c’est nouveau, donc c’est le changement, donc c’est compliqué, et c’est pour ça que plein de boites préfère garder leur serveur svn.

Je vais tenter de vous donner les principales commandes si vous vous trouvez dans une boite qui ne veut pas changer son scm mais que vous, vous avez envie d'évoluer.
Vous pourrez donc utiliser la puissance de Git alors  sans que cela n'ait d'impacts sur le gestionnaires de sources de la société dans laquelle vous êtes.

##Prérequis

- Avoir Git-SVN d'installé ! Et ce qui est cool c'est que en fait Git-SVN fait partie intégrante de GIT. C'est donc GIT que vous allez installer : [www.git-scm.com](www.git-scm.com)
- Un accès au svn (l'url du projet qui vous intersess fera largement l'affaire)
- Un terminal
- Du courage pour affronter le changement !


##Init du Projet
Il y a deux cas :

- soit tout le monde travaille sur le trunk du projet, et c'est bien pour suivre ce guide
- soit ce n'est pas le cas et donc je vous invite à consulter plus en détail [la doc](https://git-scm.com/docs/git-svn)


On va partir du principe que tout le monde travaille sur le trunk, c’est le cas de base.

Dans cette situation, pour récupere les sources du projet vous devrez faire un :

    git svn clone http://maboite/svn/monBeauProjet/ -s

Par contre dès que le repo svn et un peu vieux (i.e. avec plein de commits) ca va mettre 3h ! En effet, Git va prendre les revision une par une afin de créer l’historique local du repo.
Si vous n’avez pas besoin de tous l’histoirique des revisions ce que vous pouvez faire c’est :

    git svn clone http://maboite/svn/monBeauProjet/ -s -r4000:HEAD

ainsi il ne crééra l’histo qu’a partir de la révision 4000 du svn. Je vous conseille donc de prendre le 4000 le plus proche de la derniere revision.

À partir de là c’est bon, vous avez votre projet qui est géré par Git. La preuve vous pouvez tester via ces différentes commandes

    git status
    git branch -a
    git log -n5


##Travailler sur le projet (en local)
Vous pouvez donc dès à présent commencer à travailler offline ou bien sans vous soucier des commites de vos collègues.
Et cela avec tous les avantages qui Git apporte.

    git commit -m"Ajout de la modification du mot de passe par l'admin"
    git stash save “Début du reset de mot de passe, mais je suis encore dérangé par le chef”
    git stash pop

On peut meme faire des branches Git (en local) sans que cela n'impacte le serveur.

    git checkout -b myLocalBranch
    //work avec plein de petits commits
    git checkout master
    git merge myLocalBranch


##Commiter sur le svn
Ensuite pour se synchroniser avec vous collègues (c'est mieux) les deux commandes indispensables sont

    git svn rebase
    git svn dcommit

Le `git svn rebase` va faire l'équivalent d'un svn update quant au `git svn dcommit` ca sera un svn commit.


##Bonus : Utiliser des branches
Bon soyons honnete si vous utilisez un svn il y a quand meme peu de chance que les branches soient vraiment utilisée. Mais si ça arrive, voila comment les utiliser.

Mettre a jour toutes les branches du svn : git svn fetch
Changer de branche : git checkout -b <brancheDistante> <nomDeBrancheLocale>

Et maintenant vous pouvez naviger entre vos branche normalement via Git  :

    git checkout master
    git checkout nomDeBrancheLocale
    git checkout -

et par exemple pour recopier un commit d'une branche à une autre sans copier manuellement le fichier.

    git cherry-pick


Voilà vous avez maintenant les bases pour utiliser Git alors que de premier abord cela ne semblait pas possible.
Il ne vous reste plus qu'a forcer un peu plus pour remplacer l'ancien server svn par un nouveau sous Git et comme ça toute votre boite pourra en profiter.

