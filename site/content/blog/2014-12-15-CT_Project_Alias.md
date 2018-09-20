---
author: Cedric
cover: images/banner/ct-banner.png
date: '2014-12-15'
tags:
- Shell
- Helper
title: ct - alias de projets
url: /2014/12/15/ct_project_alias/
aliases: 2014/12/15/CT_Project_Alias.html
---


Dans l’équipe Code-Troopers, nous manipulons des technos qui sont assez différentes et qui possèdent chacune un vocabulaire différent qui leur permet de fonctionner en ligne de commande.
Du coup, un de nos problèmes récurrents est de se rappeler quelle commande dois-je lancer lorsque je veux travailler sur tel projet (`mvn jetty:run`, `gradle assemble`, `grunt serve`…).

Un autre aspect pénible à avoir plein de façons différentes de fonctionner est qu’il est quasiment impossible d’avoir des alias pertinents dans son shell préféré.

Fort de ce constat, nous avons entrepris d’écrire notre petit outil qui nous permet de moins réflechir quand on change de projet. Puisqu’on est pas super imaginatif et qu’on n’avait pas encore de petit outil à notre nom, nous l’avons nommé “ct”.


Qu’est ce que c’est ?
---
Imaginez que pour chaque projet vous n’ayiez qu’à remplir un fichier (à la façon de votre `.gitignore`) pour définir les différentes tâches disponibles. Une fois ceci fait, les autres développeurs n’ont plus à se soucier des tâches à lancer, ils peuvent se contenter d’utiliser le vocabulaire commun, de se placer dans le répertoire du projet et de lancer la commande `ct run` au lieu de `mvn jetty:run` (et s’ils veulent connaître la liste des tâches disponibles ils le peuvent via un `ct help`).

Encore mieux, puisque les commandes sont normalisées, vous pouvez directement exporter vos alias qui accélèrent encore l’utilisation (`run` pour `ct run`), et bingo, c’est transverse pour tous vos projets.

Comment ça marche ?
---
Le tout est un bête script shell qui utilise quelques commandes de base et quelques outils indispensables à tout développeur.

Quelques spécificités sont à remarquer en fonction de votre OS :

* sous Mac, il est important d’installer gnu-sed en lieu et place de celui d’origine
* sous Windows, il vous faut un shell unix ([Babun]({{< relref "2014-10-01-babun.md" >}}) est conseillé).

Comment l’utiliser ?
---
Tout se fait en très peu d’étapes :

### Installation de l’outil:

Référez-vous au [README](https://github.com/code-troopers/ct/blob/master/README.md) présent sur le dépôt [Github](https://github.com/code-troopers/ct/).

Pour résumer il est juste nécessaire de placer une copie du script dans votre `$PATH`.

    CT_TARGET=~/bin;mkdir $CT_TARGET; wget -O $CT_TARGET/ct https://raw.githubusercontent.com/code-troopers/ct/master/ct && chmod +x $CT_TARGET/ct

### Intégration dans un projet
Créez à la racine un fichier nommé `.ctproject` qui va contenir vos alias

    run=’mvn jetty:run’
    debug=’mvn jetty:dbg’
    test=’mvn test’

L’idéal étant de le faire au démarrage du projet, plus de questions à se poser ultérieurement

### Utilisation dans un projet

Il suffit de lancer la commande qui correspond à un alias (par exemple ici : `ct run`, `ct debug` ou `ct test`, ou d’exécuter `ct help` pour avoir la liste des alias disponibles).

### Tuning sur plusieurs projets

En définissant votre nomenclature d’alias par projet, vous pourrez vous permettre d’exporter des alias globaux sur vos machines pour appeler `ct`.

Bonus : lister les ports ouverts
----
Puisque nous jonglons souvent entre projets, un autres soucis que nous avons est que nous oublions les ports ouverts pour chacun des projets. En plus, nous avons souvent plusieurs projets de démarrés sans même nous rappeler qu’ils le sont (surtout avec les projets légers REST/AngularJS).

Nous avons donc rajouté la commande `ct ports` qui démarre un micro serveur http et permet de récupérer la liste des ports qui attendent des connexions sur nos machines, ainsi que le dossier de travail associé (ce qui est souvent suffisant pour savoir de quel projet il s’agit).

<div style="text-align:center;">
    <a href="/images/posts/2014-12-15-CT_Project_Alias/listen.png" title="Exemple de listing des ports" data-lightbox="group1">
    <img class="medium" src="/images/posts/2014-12-15-CT_Project_Alias/listen.png" alt="Exemple de listing des ports"></a>
</div>

Pour pouvoir utiliser cette commande, il faut que les quelques outils suivants soient installés : _netcat_, _awk_, _wget_ et _lsof_.

### Exemple d'utilisation
<div style="text-align:center;">
<video width="90%" controls src="/videos/screencast_ct.webm">
<object type="application/x-shockwave-flash" width="400" height="222" data="http://www.youtube.com/v/HVMoJqg41Bw">
  <param name="movie" value="http://www.youtube.com/v/jkWjmGdraR8" />
  <param name="wmode" value="transparent" />
Screencast d'une utilisation quotidienne de ct. Vous n'avez pas de navigateur moderne, ni Flash installé...
 </object></video>
</div>
