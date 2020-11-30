---
author: Cedric
cover: images/banner/ct-banner.png
date: '2015-06-10'
tags:
- IntelliJ
- JavaScript
- tip
title: Améliorer la complétion JavaScript d'IntelliJ IDEA
url: /2015/06/10/completionjavascriptdansintellij/
aliases: 2015/06/10/CompletionJavascriptDansIntelliJ.html
---



# IntelliJ IDEA
Tout le monde sait que nous adorons utiliser IntelliJ IDEA pour développer.
Peu importe le langage IntelliJ est vraiment un excellent IDE qui nous permet d'être efficaces quasiment instantanément.

Par contre, quand on arrive dans le monde du JavaScript on peut avoir quelques soucis pour être
dans un environnement suffisamment typé où l'on sait ce qu'on va faire sans se poser trop de questions,
ou tout simplement pouvoir bénéficier de l'aide de l'IDE pour savoir de quelles méthodes on dispose.



## JavaScript dans IntelliJ
Par défaut, IntelliJ est déjà suffisament malin pour scanner les fichiers du workspace
et trouver de la complétion en automatique (ainsi que la JSDoc).

Cependant, ce mécanisme ne marche pas à tous les coups :

 * vous utilisez des versions sur des CDN
 * vous avez des versions minifiées dans votre workspace
 * vous utilisez des outils qui impliquent certains framework (karma / jasmine / mocha...)

## Faire comprendre le JavaScript à IntelliJ
Pour réussir à obtenir une complétion correcte vous avez plusieurs solutions :

 * pour les CDN, vous pouvez demander à IntelliJ de récupérer la ressource (il ne la mettra pas dans votre projet pour autant)

<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2015-06-JavaScriptIntelliJ/cdndl.png" data-lightbox="group-1" title="Le téléchargement des fichiers sur un CDN [alt+entrée]" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-06-JavaScriptIntelliJ/cdndl.png" alt="Le téléchargement des fichiers sur un CDN [alt+entrée]"/>
    </a>
</div>

 * pour les versions minifiées, vous pouvez ajouter manuellement les bibliothèques dans la fenêtre de paramètres (Languages & Frameworks > JavaScript > Libraries)

<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2015-06-JavaScriptIntelliJ/settings.png" data-lightbox="group-1" title="La fenêtre des paramètres" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-06-JavaScriptIntelliJ/settings.png" alt="La fenêtre des paramètres"/>
    </a>
</div>

## LA mega astuce
IntelliJ est capable de comprendre le TypeScript, et des gens ont eu la bonne idée de regrouper des définitions TypeScript pour
la plupart des librairies les plus utilisées dans un dépôt Github : [DefinitelyTyped](http://www.definitelytyped.org).
Dans la fenêtre de création de librairie JavaScript, dans la partie qui permet le téléchargement d'une librairie,
sélectionnez la source "TypeScript Community Stubs", vous verrez qu'il y a beaucoup de librairies que vous utilisez au quotidien.

Avec ceci, vous aurez une complétion efficace, avec le typage offert par TypeScript (dans la mesure du possible),
ainsi qu'une documentation précise (pour la plupart des librairies).

<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2015-06-JavaScriptIntelliJ/example.png" data-lightbox="group-1" title="Jasmine est bien connu par IntelliJ" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-06-JavaScriptIntelliJ/example.png" alt="Jasmine est bien connu par IntelliJ"/>
    </a>
</div>
