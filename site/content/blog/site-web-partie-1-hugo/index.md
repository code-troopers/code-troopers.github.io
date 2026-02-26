---
title: Site web, l'envers du décor avec Hugo et DecapCMS
author: Matthieu Bollot
url: /2024/04/30/siteweb/
aliases: 2024/04/30/site-web.html
date: 2024-04-16
expirydate: ""
cover: image.png
draft: false
tags:
  - Hugo
  - Blog
  - Web
description: "Comment nous avons construit le site Code-Troopers avec Hugo et DecapCMS. Pourquoi un générateur statique plutôt que WordPress, et comment ça fonctionne."
---
# Explorez les dessous de notre site web

## Pourquoi Hugo ? 🤔

Lorsque nous avons célébré l'anniversaire de notre blog, nous avons révélé un secret : rendre notre site éditable sans nécessiter de compétences en développement. Mais, bien sûr, savoir ce qui se cache derrière est essentiel pour comprendre pourquoi c'est intéressant.

Nous avons opté pour [Hugo](https://gohugo.io), un générateur de sites qui crée des fichiers HTML/CSS statiques. Pourquoi Hugo ? Tout simplement parce que c'est rapide, polyvalent sur toutes les plateformes, intuitif, et offre une multitude de possibilités. Alors, pourquoi ne pas choisir une plateforme nocode comme Webflow ou Wix ? Parce que, pour être honnête, ce n'est tout simplement pas aussi amusant. Ces solutions ne nous permettent pas la liberté créative que nous recherchons. De même, les CMS classiques comme WordPress ou Drupal ne nous ont jamais vraiment séduits. Ils sont souvent développés en PHP ou en Python, nécessitent un hébergement spécifique, et, avouons-le, manquent parfois de flexibilité pour les développeurs qui aiment personnaliser chaque détail. En plus c'est payant, alors que nous hébergeons notre site gratuitement depuis 11 ans sur les github pages ! (téma la taille du rat) Et puis il y a un autre point à prendre en compte, pour de l'auto hébergement, personne ne va pirater un site en html/css c'est juste (presque) pas possible. Alors qu'un wordpress, il vaut mieux le faire héberger chez quelqu'un dont c'est le métier et qui va s'en occuper à plein temps.

## Comment ça marche ? 🛠️

Hugo fonctionne sur la base de répertoires et de fichiers pour générer des sites statiques, sans nécessiter de base de données. Le processus est simple : une fois les fichiers générés, il suffit de les servir.

Dans notre configuration, le répertoire "content" contient notamment un sous-répertoire "blog", où chaque article de blog est représenté par un répertoire individuel contenant un fichier index et une image de bannière. Ces fichiers index peuvent être écrits en HTML, Markdown ou AsciiDoc, offrant une flexibilité totale. Pour créer un nouvel article, il suffit de créer un répertoire, un fichier markdown, y écrire le contenu et voilà !

Les contenus sont ensuite utilisés par des "layouts". Par exemple, dans nos fichiers index, nous définissons un titre, qui est ensuite affiché à l'aide d'un modèle prédéfini.

De plus, nous utilisons des "partials" pour rendre certaines parties du site réutilisables, comme le footer ou le menu. C'est l'équivalent d'une directive Vue ou Angular.

Pour finir, les layouts ou les partials peuvent contenir des shortcodes. Par exemple sur la page d'accueil il y a une boucle pour afficher les 3 derniers articles. Un autre exemple concernant les articles de blog, les bannières sont toutes converties en webp et re-taillées en 900x500. Si on décide de changer un jour de résolution, il suffira de mettre à jour une ligne de code et le laisser faire les resize sur les images.

## Est-ce accessible à tous ? 🌟

Vous vous demandez peut-être si cette approche est adaptée aux non-techniciens. Pas tout à fait ! Écrire du markdown pourquoi pas, mais le fait de ne pas avoir de retour direct, de savoir si on crée le fichier au bon endroit, de faire des commits… Ce n'est pas adapté et c'est pourquoi nous avons ajouté [DecapCMS](https://decapcms.org/) !

## Qu'est-ce que DecapCMS ?

DecapCMS, comme son nom l'indique c'est un CMS mais qui a la particularité de se baser sur des fichiers, il fait aussi des commits pour mettre à jour comme il faut.

Pour l'utiliser il faut d'abord l'installer, avec un package npm dans notre cas et le configurer. Dans le fichier de configuration, nous allons détailler tout ce qu'il peut éditer, sachant qu'il peut éditer du html, du markdown, du json. Voici un exemple de configuration pour les articles de blog :

```json
collections: # A list of collections the CMS should be able to edit
  - name: "post" # Used in routes, ie.: /admin/collections/:slug/edit
    label: "Post" # Used in the UI, ie.: "New Post"
    folder: "site/content/blog" # The path to the folder where the documents are stored
    media_folder: "."
    path: "{{slug}}/index" # Each document is inside a folder with the slug name.
    create: true # Allow users to create new documents in this collection
    fields: # The fields each document in this collection have
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Author", name: "author", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime", format: "YYYY-MM-DD", timeFormat: false}
      - {label: "Image", name: "cover", widget: "image", required: false}
      - {label: "Body", name: "body", widget: "markdown"}
      - {label: "Tags", name: "tags", widget: "list"}
```

Ici on définit où se trouvent les fichiers à l'aide du folder et du path ainsi que tous les champs à éditer, pour un article on retrouve donc le titre, l'auteur, la date de publication, une image de bannière, le contenu de l'article et une liste de tags associés. Pour chaque champ, on associe un widget, par exemple la date de publication c'est un widget "datetime" ce qui va permettre d'avoir un beau datepicker dans le CMS. Le body est associé au widget markdown, qui va permettre d'avoir un éditeur de texte riche.

Mais on peut aller encore plus loin ! Par exemple, nous pour nos images on utilise lightbox qui permet de faire un truc un peu joli pour afficher les images et les regrouper quand on en a plusieurs. Dans ce cas on peut enregistrer un [composant](https://decapcms.org/docs/custom-widgets/#registereditorcomponent) en détaillant simplement les champs que l'on souhaite (pour une image on veut un titre pour l'accessibilité, un nom de groupe et l'image elle-même) et enfin on lui décrit comment transformer le contenu saisi en html, donc là on écrit les balises, comme on le souhaite.

<a style="display: inline" href="/2024/04/30/siteweb/decapcms.png" data-lightbox="group-0" title="Image d'illustration du widget Rich Text de DecapCMS">
  <img class="medium" src="/2024/04/30/siteweb/decapcms.png" alt="Image d'illustration du widget Rich Text de DecapCMS">
</a>

Avec Hugo et DecapCMS, la création et la modification de notre site web deviennent à la fois accessibles et passionnantes.

L'article présente succintement l'aspect technique, j'espère qu'il vous donnera l'envie d'aller voir plus en profondeur les projets, c'est vraiment une stack que je trouve agréable à la fois côté rédacteur de blog et côté développeur pour l'aspect technique donc si jamais vous avez besoin de mettre en place un blog ou un CMS, regardez cette alternative.

Vous pouvez explorer les coulisses de notre site, disponible en open source sur [GitHub](https://github.com/code-troopers/code-troopers.github.io).