---
title: Conseil Constitutionnel
url: /conseil-constitutionnel.html
date: 2019-03-01
cover: conseil-constitutionnel-v2.jpg
draft: false
tags:
  - Android
  - iOS
  - Web
---
Le Conseil constitutionnel souhaitait disposer d’une application mobile officielle afin de rendre ses contenus plus accessibles au grand public, aussi bien sur iOS que sur Android. Le projet a été lancé à partir d’une feuille blanche, sans application existante ni architecture technique définie, avec un fort enjeu de fiabilité, de conformité et d’image institutionnelle.

<!--more-->

### **Défis :**

Le principal défi résidait dans l’absence de cadre technique initial. Il a donc fallu, en collaboration étroite avec les équipes du Conseil constitutionnel, clarifier les besoins fonctionnels, définir les parcours utilisateurs et comparer différentes approches techniques, tout en respectant des délais de mise en œuvre courts.

Les contraintes clés étaient :

* Définir une architecture pérenne et sécurisée dès le démarrage du projet.
* Garantir une compatibilité complète avec les écosystèmes iOS et Android.
* Intégrer des contenus existants, uniquement disponibles au format HTML, sans multiplier les coûts de refonte.
* Respecter les exigences élevées propres à une institution publique en termes de stabilité, de maintenance et de qualité.




### **Solution :**

Nous avons conçu une architecture hybride combinant le meilleur du natif et du web.

Une couche de code natif a été développée pour s’interfacer efficacement avec les systèmes d’exploitation iOS et Android, notamment pour la gestion des notifications push, des deeplinks et des fonctionnalités propres à chaque OS.

Pour l’affichage des contenus éditoriaux, nous avons intégré des webviews permettant de réutiliser les pages HTML existantes, tout en les encapsulant dans une expérience mobile cohérente et maîtrisée. Cette approche a permis de réduire les délais de développement, de limiter les coûts et de garantir une grande souplesse d’évolution.

**Impact :** 

Les applications iOS et Android du Conseil constitutionnel ont été livrées dans le respect des délais et du budget initial. Elles ont ensuite été maintenues en conditions opérationnelles pendant plusieurs années, assurant un accès fiable et continu aux contenus institutionnels pour les utilisateurs.

Ce projet illustre notre capacité à concevoir des applications mobiles robustes, adaptées à des contextes institutionnels exigeants, tout en conciliant contraintes techniques, budgétaires et calendaires.
