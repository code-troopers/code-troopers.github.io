---
title: "Trois projets de 2014 qui tournent toujours en 2026"
description: "En creusant nos git logs, on a trouvé trois projets dont les premiers commits datent de 2014 et qui tournent encore en production aujourd'hui. L'un d'eux n'a même pas été démarré par nous."
author: Troopers
url: /2026/04/20/trois-projets-de-2014/
date: 2026-04-20
expirydate: ""
cover: cover.jpg
draft: true
tags:
  - NoESN
  - NoSSII
  - Longévité
---
En remontant dans nos plus vieux dépôts git, on a retrouvé **trois projets dont les premiers commits datent de 2014**. Ils tournent tous en production en 2026. L'un d'eux d'ailleurs n'a même pas été démarré par nous : on a repris un existant, et il vit toujours douze ans plus tard.

<!--more-->

## Les trois doyens

**[Navig'](/navigtours.html)**, premier commit le **5 mai 2014**, signé Romain Lucas. Deux apps natives à l'origine, une en Java Android, une en Swift iOS, qui le sont toujours aujourd'hui. Douze ans de features ajoutées, d'OS traversés, de refactos progressives, sans jamais casser la continuité du service. Elles font tourner deux réseaux de transport, Fil Bleu (Tours) et Tao (Orléans), avec une base de code mutualisée.

**[L'ERP de Leroy-Somer](/ideas.html)**, premier commit le **27 mai 2014**, signé François Robert, qu'on croise toujours du côté de l'organisation de [Touraine Tech](https://touraine.tech/). François a posé le tout premier fichier, Florian Roulet (autre organisateur de TnT et partenaire régulier de Futsal) a construit les fondations. On a ensuite livré **trois lots sur quatre ans** pour cet ERP Play Framework Java + jQuery, avant de passer en mode maintenance tranquille : redémarrer les serveurs, mettre à jour les librairies, accompagner les migrations d'infra. Il tourne toujours dans les ateliers de maintenance des moteurs électriques chez Nidec Leroy-Somer, douze ans après le premier commit.

**[Chapitô](/chapito.html)**, notre produit maison, premier commit le **15 novembre 2014**, signé Benjamin Cousin. À l'origine : RESTX + AngularJS côté back, natif Android/iOS côté apps. Aujourd'hui : Spring Boot + Vue.js côté back, React Native côté apps. Les apps ont été complètement réécrites à un moment, le back a traversé toutes ces montées de version sans rater une édition de festival.

Trois projets, trois clients, trois trajectoires différentes. Un point commun : ils sont encore là.

## Ce qu'on a appris à les maintenir

**Un produit qui dure n'est pas prisonnier de sa stack.** Les apps Chapitô ont migré du natif vers React Native quand c'était devenu la bonne décision. Les apps Navig' sont toujours en Java/Swift aujourd'hui, la question pourra se poser plus tard. Mais les APIs sont passés de RESTX vers Spring Boot. Le code Java chez Leroy-Somer n'a pas vu passer "on refait tout en Node.js". Changer ou ne pas changer la techno est une décision de produit, pas un réflexe d'agence.

**On ne signe pas pour une mission, on signe pour durer.** Les équipes tournent (c'est inévitable, on est humains), mais il y a toujours quelqu'un qui connaît le code. Quand un Trooper quitte un projet, celui qui reprend a déjà plusieurs mois de pair programming dans les pattes.

**Le travail change de forme, pas d'importance.** Un projet de douze ans, c'est rarement douze ans de build intense. Chez Leroy-Somer, on a construit fort pendant quatre ans, puis on a basculé dans le soin régulier. Chez Navig', c'est de la feature ajoutée en continu, avec quelques pics d'activité. Chez Chapitô, il y a eu un gros chantier de réécriture des apps. Les phases s'enchaînent, on s'adapte. Ce qui ne change pas, c'est qu'on est là.

## Et pour le reste

Les trois projets de 2014 ne sont qu'un échantillon. D'autres produits qu'on accompagne ont depuis changé d'échelle, parfois spectaculairement. D'autres tournent plus discrètement, chacun à son rythme. Pour le panorama complet, secteur par secteur (santé, service public, industrie, événementiel, grand public), on a fait le tour dans [notre bilan complet des projets Code-Troopers en 2026](/2026/04/20/nos-projets-ce-quils-deviennent/).

Du code lisible, des gens qui restent assez longtemps pour connaître le produit, des clients qui nous font confiance sur la durée : les trois ingrédients d'un produit qui tient.

Si vous avez un logiciel que vous voulez voir tourner encore en 2038, [parlons-en](/#contact) 🤝
