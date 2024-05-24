---
title: "only-allow : ne vous trompez plus"
author: probillard
date: 2024-05-24
expirydate: ""
draft: false
tags:
  - npm
  - yarn
---
Ça vous arrive de switcher de projet et de vous tromper entre npm et yarn ? Plus maintenant, grâce à [only-allow](https://www.npmjs.com/package/only-allow) !

Ajoutez juste une commade en preinstall (plus d'info sur le readme) et c'est parti

```
{
  "scripts": {
    "preinstall": "npx only-allow npm"
  }
}
```