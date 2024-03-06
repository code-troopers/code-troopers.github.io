---
author: Matthieu
cover: ../ohmyzsh-banner.png
date: '2015-05-15'
description: 'Création de dotfile pour vim : astuces pour .vimrc '
tags:
- vim
- vimrc
- shell
title: 'vim : 10 astuces de configuration pour vos dotfiles'
url: /2015/05/15/dotfiles-vim/
aliases: 2015/05/15/Dotfiles-vim.html
---


Cet article sera le premier d'une série consacrée aux _dotfiles_. Alors les _dotfiles_, qu'est-ce que c'est Obi-Wan ? Les _dotfiles_, ce sont tous les fichiers texte de configuration que l'on peut retrouver dans son répertoire utilisateur pour sauvegarder ses préférences. De nombreux logiciels utilisent cette méthode. On peut citer gnome, IntelliJ, Maven,  ssh, git, bash et tant d'autres. On les appelle _dotfiles_ −que l'on peut traduire par fichiers point− parce qu'ils ont un nom qui commence par un point, ce qui correspond aux fichiers cachés sous linux.

Introduction
============

Chez les troopers, on est comme beaucoup d'autres constamment alliés à la ligne de commande, cf nos articles sur [babun](http://code-troopers.com/2014/10/01/babun.html) et [oh-my-zsh](http://code-troopers.com/2014/09/17/ohMyZsh.html). Un outil indispensable dans un terminal est un éditeur de fichier. Dans notre premier article sur les _dotfiles_ nous parlerons de vim, et plus spécialement de sa configuration avec vimrc. Si vous ne connaissez pas l'un des plus puissants éditeur de texte, commencez par vous renseigner dessus et sur les commandes de base par exemple sur [http://www.openvim.com/tutorial.html](http://www.openvim.com/tutorial.html).
Pour configurer vim, une seule chose à faire : `vim ~/.vimrc`



Sauvez c'est activé
===================


    if has("autocmd")
        autocmd! bufwritepost .vimrc source ~/.vimrc
    endif

De base sous vim on édite son .vimrc, on quitte et on réouvre un fichier pour voir la modification. Grâce à ces lignes, il suffira de sauvegarder pour voir ses modifications actives dans toutes les instances ouvertes de vim.

<div style="text-align: center;margin:50px;">
<video style="width: 90%; max-width: 600px;" controls src="/videos/dotfiles-saveactif.webm"></video>
</div>

En parlant de sauvegarde
========================


    noremap <C-Z> :update<CR>
    vnoremap <C-Z> <C-C>:update<CR>
    inoremap <C-Z> <C-O>:update<CR>

Pour sauvegarder sous vim, il faut faire `:w` Ce serait quand même mieux de faire `ctrl-z` un peu à l'image des `ctrl-s` que l'on trouve partout ailleurs.

<div style="text-align: center;margin:50px;">
<video style="width: 90%; max-width: 600px;"
 controls src="/videos/dotfiles-ctrlz.webm"></video>
</div>

Et pourquoi pas ctrl-s
======================


    inoremap <C-c> <Left>
    inoremap <C-t> <Down>
    inoremap <C-s> <Up>
    inoremap <C-r> <Right>

Ça pose un problème car ctrl-s me permet de me déplacer vers le haut dans vim en mode **insertion**.
Selon la disposition de votre clavier, vous pouvez remplacer `c`, `t`, `s`, `r` par `h`, `j`, `k`, `l` si vous avez un clavier azerty. Ainsi les touches `hjkl` permettent de se déplacer en mode **visuel** et `ctrl + hjkl` permettent de se déplacer en mode **insertion**. Plus aucune raison d'utiliser les flèches sous vim !

<div style="text-align: center;margin:50px;">
<video style="width: 90%; max-width: 600px;"
 controls src="/videos/dotfiles-ctrlctsr.webm"></video>
</div>

un peu de couleurs
==================


    syntax on

vim connaît à peu près tous les langages, de Shell à Java, en passant par le XML ou les simples fichiers de configuration. Avec cette commande,  vous aurez donc automatiquement la coloration syntaxique.

<div style="text-align: center;margin:50px;">
<video style="width: 90%; max-width: 600px;"
 controls src="/videos/dotfiles-syntax.webm"></video>
</div>

set nu
======

    set number


Pour afficher les numéros de ligne on peut taper `:set nu`. La commande est certes rigolote à écrire (comprenne qui pourra) mais ça ne suffit pas pour se retenir de l'automatiser.

<div style="text-align: center;margin:50px;">
<video style="width: 90%; max-width: 600px;"
 controls src="/videos/dotfiles-setnu.webm"></video>
</div>

Éviter la touche échap
======================


    inoremap éé <esc>


Pour sortir du mode **insertion**, il faut appuyer sur la touche échap par défaut. Même pour un pianiste, cette touche est trèèèèès loin sur le clavier. Mais vous pouvez bien évidemment remapper cette action. Si vous voulez des inspirations sur les meilleures combinaisons, vous pouvez regarder là : [http://vim.wikia.com/wiki/Avoid_the_escape_key](http://vim.wikia.com/wiki/Avoid_the_escape_key)
Comme je suis en bépo (au lieu de azerty) et que je n'écris presque jamais de français avec vim, j'ai utilisé le mot clé `éé`. Certains mappent sur `ii` mais vim marquera une légère pause à chaque appui sur la touche i qui est assez déstabilisant.

<div style="text-align: center;margin:50px;">
<video style="width: 90%; max-width: 600px;"
 controls src="/videos/dotfiles-exitee.webm"></video>
</div>

[pathogen](https://github.com/tpope/vim-pathogen)
=================================================

On peut faire tellement de choses, ça prendrait des semaines pour tout configurer. Pour avoir d'autres features super cool en 2 secondes,  on peut ajouter des plugins. Le gestionnaire de plugin le plus connu pour vim est sans doute pathogen.
Pour l'installation, il suffit de faire :


    mkdir -p ~/.vim/autoload ~/.vim/bundle && \
    curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim

Maintenant, passons à quelques plugins.

Colorscheme couleurs
--------------------
Les couleurs sont ternes ? le bleu sur noir des commentaires est illisible ? Alors changez les couleurs.

    cd ~/.vim/bundle
    git clone https://github.com/flazz/vim-colorschemes.git

Ajoutez ensuite `colors matrix` dans votre `.vimrc`. La liste des template de couleurs utilisables se trouvent dans `~/.vim/bundle/colorschemes/colors`.

<div style="text-align: center;margin:50px;">
<video style="width: 90%; max-width: 600px;"
 controls src="/videos/dotfiles-colormatrix.webm"></video>
</div>

nerdtree
--------

    cd ~/.vim/bundle
    git clone https://github.com/scrooloose/nerdtree.git

Et ajoutez dans votre `.vimrc` : `map <C-n> :NERDTreeToggle<CR>`
Dorénavant, il vous suffira de faire ctrl-n pour avoir votre répertoire de travail comme dans n'importe quel autre IDE.

<div style="text-align: center;margin:50px;">
<video style="width: 90%; max-width: 600px;"
 controls src="/videos/dotfiles-nerttree.webm"></video>
</div>

nerdcommenter
-------------

    cd ~/.vim/bundle
    git clone https://github.com/scrooloose/nerdcommenter.git

Et dans votre `.vimrc` : `filetype plugin on`
aintenant, en faisant `<Leader>cc` que ce soit dans un fichier html, java, python, shell etc. la ligne se mettra en commentaire. Vous pouvez aussi le faire après avoir sélectionné plusieurs lignes.
Si vous vous demandez ce qu'est la touche `<Leader>` c'est une touche définie pour faire certaines actions. Par défaut il s'agit de la touche `\`mais vous pouvez évidemment la remapper. J'utilise la touche `,` pour ma part grâce à : `let mapleader=","`.

<div style="text-align: center;margin:50px;">
<video style="width: 90%; max-width: 600px;"
 controls src="/videos/dotfiles-comment.webm"></video>
</div>

Aller plus loin
===============

En attendant d'autres articles sur les _dotfiles_, ou pour aller plus loin dans la configuration de vim, vous pouvez aller faire un tour sur github qui regorge de _dotfiles_ pour quasiment tous les softs.


Bonus
=====

Si vous aimez vim et IntelliJ, vous pouvez installer le plugin ideavim qui permet d'avoir vim comme éditeur de texte et depuis quelques mois vous pouvez même importer vos settings vim dans le plugin :

    $ cat ~/.ideavimrc
    source ~/.vimrc
