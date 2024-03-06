---
author: Matthieu
cover: ../ohmyzsh-banner.png
date: '2015-05-22'
description: 'Création de dotfiles pour git : astuces pour .gitconfig, git hook '
tags:
- git
- gitconfig
- hook
title: 'git : quelques astuces de configuration pour vos dotfiles'
url: /2015/05/22/dotfiles-git/
aliases: 2015/05/22/Dotfiles-git.html
---


Cet article est le deuxième de la série des _dotfiles_. Voir l'article sur [vimrc](code-troopers.com/2015/05/15/Dotfiles-vim.html). Nous allons ici aborder quelques configurations indispensables de git.

La base
============

Si vous utilisez git, vous avez forcément fait des commandes de base pour rentrer votre nom et votre email (indispensable pour pusher vos commits)

    $ git config --global user.name "Jango Fett"
    $ git config --global user.email "jango.fett@code-troopers.com"

Ceci a pour but d'écrire dans votre fichier ~/.gitconfig ces simples lignes :

    [user]
        name = Jango Fett
        email = jango.fett@code-troopers.com



Un peu de couleurs
===================
C'est toujours important d'avoir de la couleur, ça donne bonne mine, ça rend joyeux mais surtout ça aide à la lisibilité. Dans les dernières version de git, la couleur est activée automatiquement, mais vous pouvez toujours la modifier ! Voici un exemple de configuration :

    [color "branch"]
        current = yellow reverse
        local = yellow
        remote = green
    [color "diff"]
        meta = yellow bold
        frag = magenta bold
        old = red bold
        new = green bold
    [color "status"]
        added = yellow
        changed = green
        untracked = cyan

<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2015-05-22-Dotfiles-git/gitcolours.png" data-lightbox="group-1" title="git avec couleurs personnalisées" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-05-22-Dotfiles-git/gitcolours.png" alt="git avec couleurs personnalisées"/>
    </a>
</div>


gitignore global
========================
Parfois vous arrivez dans un environnement où personne n'utilise IntelliJ, peut-être même que vous voulez cacher le fait que vous utilisez IDEA. Dans ce cas, pas besoin de commiter un .gitignore qui contient `.idea` et `*.iml` mettez le plutôt dans `~/.gitignore`. Pour que ça marche, vous devrez rajouter dans votre `~/.gitconfig` :

    [core]
        excludesfile = ~/.gitignore


J'<3 vim
========
J'aime vim, alors je le met partout. Besoin d'un éditeur de texte pour les commits ? vim !

    [core]
        editor = vim

Besoin d'un outil pour faire des diff ? vim !

    [merge]
        tool = vimdiff


Montre-nous tes fichiers
==================
Vous avez créé un nouveau répertoire, ajouté plein de fichiers dedans, et vous revenez en console pour voir ce qu'il y a à commiter. Soit un cas d'utilisation quotidien ou presque. Sauf que quand vous faîtes `git status` seul le répertoire apparaît et pas les fichiers à l'intérieur ! Pour y remédier :

    [status]
        showUntrackedFiles = all

<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2015-05-22-Dotfiles-git/git-status.png" data-lightbox="group-1" title="git status coloré" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-05-22-Dotfiles-git/git-status.png" alt="git status coloré"/>
    </a>
</div>

Alias
======
Comme pour les shell, on peut créer des alias de commande. Par exemple :

    [alias]
        cp = cherry-pick
        co = checkout
        cl = clone
        ci = commit
        br = branch

C'est plus rapide à taper… un peu, et encore faut s'en souvenir que cp ça fait cherry-pick. Mais certaines commandes sont longues et là ça devient encore plus pertinent :

        last = log -1 --stat
        st = status -sb
        unstage = reset HEAD --
        dc = diff --cached
        pr = pull --rebase
        lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %Cblue<%an>%Creset' --abbrev-commit --date=relative --all

Je vous laisse essayer celles qui ne sont pas explicite ;)

Les Hooks
========
Il y a beaucoup d'options et de choses à faire mais je terminerai cet article avec les hooks, qui mériteraient peut-être à eux seuls un article. Un hook −qui se traduit par « crochet »− va intercepter une commande afin de réaliser une action. Par exemple, quand je lance la commande commit, je veux vérifier que tous les tests passent, ou quand je push, je veux mettre à jour automatiquement le ticket jira associé, on peut vraiment tout faire vu qu'il s'agit juste de scripts à rajouter.

On a d'abord besoin de définir le répertoire qui va contenir les hooks. Vous pouvez ajouter dans votre `~/.gitconfig` :

    [init]
        templatedir = ~/.git_template

Par exemple si vous voulez rajouter un script qui interdit de commiter `System.out.println`, vous pouvez créer ce fichier : `~/.git_template/hooks/pre-commit`
J'ai récupéré le mien sur https://github.com/borisguery/git-keywords-checker sur lequel j'ai juste modifié les deux variables KEYWORDS_REGEX et EXTENSIONS_REGEX. Ce qui donne grosso modo dans le fichier :

    5 # Add or remove keywords here
    6 KEYWORDS_REGEX="printStackTrace\(|FIXME|TODO"
    7 # Add extensions to check here
    8 EXTENSIONS_REGEX="(.java$|.js$)"
On interdit de commiter `printStackTrace(` ou `FIXME` ou `TODO` dans les fichiers `java` ou `js`.

<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2015-05-22-Dotfiles-git/git-hooks.png" data-lightbox="group-1" title="git hooks pre-commit en action" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-05-22-Dotfiles-git/git-hooks.png" alt="git hooks pre-commit en action"/>
    </a>
</div>

Oui ça paraît un peu violent d'interdire le commit de TODO et FIXME mais on peut passer outre en commitant avec l'option `--no-verify` et au moins on est au courant donc on n'oublie pas les actions nécessaires selon les équipes de travail (ajout d'un post-it, d'une carte trello etc.)

2 petits détails pour que ça marche :

  * Il faut que le script soit exécutable, donc vous pouvez faire `chmod +x ~/.git_template/hooks/pre-commit`
  * Ce sera actif uniquement sur les nouveaux dépôts, pour activer le hook sur les dépôts existants, vous devez faire un `git init`

Si vous voulez d'autres exemples de hooks, vous pouvez commencer par jeter un œil aux hooks de [git-flow](https://github.com/petervanderdoes/git-flow-hooks)
