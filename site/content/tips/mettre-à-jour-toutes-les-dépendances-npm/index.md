---
title: Mettre à jour toutes les dépendances NPM
author: mbollot
date: 2024-05-23
expirydate: ""
draft: false
tipstags:
  - npm
---
Un petit outil rapide pour mettre à jour toutes les dépendances NPM d'un projet :

```
npm install -g yarn-upgrade-all && yarn-upgrade-all
```
Il va supprimer et réinstaller tous les paquets du package.json donc avec des versions à jour :) 