---
author: Benjamin
cover: ../addonsheroku-banner.png
date: '2014-09-04'
tags:
- Heroku
- Add-ons
title: Top 3 add-ons Heroku
url: /2014/09/04/addonsheroku/
aliases: 2014/09/04/AddonsHeroku.html
---


Vous connaissez sûrement [Heroku](https://www.heroku.com/) le service de cloud computing de type plate-forme en tant que service (PaaS), si ce n'est pas le cas, je vous conseille de vous y intéresser. Chez Code-Troopers, nous l'utilisons à la fois pour effectuer nos tests en pré-production mais aussi pour certaines de nos applications en production. Ce qui est aussi intéressant chez Heroku, c'est le nombre d'[add-ons](https://addons.heroku.com/) disponibles. Ils sont simples d'installation, la plupart du temps il suffit de deux clics et d'une variable à ajouter dans la configuration de l'application. Ils disposent presque tous de versions gratuites (souvent suffisant pour une petite application en production) mais il est aussi possible d'évoluer vers des versions payantes et plus complètes en un clic, souvent déclinées en 3 ou 4 offres.


Les add-ons sont rangés en catégories, vous avez des services de bases de données, de logs, d'analytics, de cache, de monitoring… Je vous invite à les consulter sur [cette page](https://addons.heroku.com/). Mais je vais m'attarder sur les 3 add-ons qu'on installe presque machinalement dès que l'on créé une application sur Heroku :

* [Papertrail](https://addons.heroku.com/papertrail) pour gérer les logs
* [SendGrid](https://addons.heroku.com/sendgrid) pour envoyer des mails
* [New Relic](https://addons.heroku.com/newrelic) pour surveiller l'application


## ![Logo Papertrail](/images/posts/2014-09-04-AddonsHeroku/papertrail.png) Papertrail

[Papertrail](https://papertrailapp.com/) est un service de logs. Il permet de consulter en temps réel les logs de votre application Heroku. Vous avez même la possibilité de sauvegarder vos recherches ou de créer des alertes personnalisées. La version gratuite permet de stocker jusqu'à 10Mo de log par jour, de rechercher sur 2 jours et de retenir jusqu'à 7 jours les logs. Pour l'installer, il suffit de l'ajouter depuis l'interface d'Heroku, il n'y a rien à configurer. Ensuite, vous avez juste à cliquer sur le lien pour consulter vos logs.

## ![Logo SendGrid](/images/posts/2014-09-04-AddonsHeroku/sendgrid.png) SendGrid



[SendGrid](http://sendgrid.com/) est un service de messagerie électronique. Une fois l'add-on ajouté sur Heroku, vous disposez dans les variables de configuration de votre application, d'un login et d'un mot de passe. Il ne vous reste plus qu'à changer l'accès au serveur smtp dans votre application pour utiliser ces variables. En plus de faire office de serveur smtp, SendGrid vous offre la possibilité de tracer les mails, c'est-à-dire de savoir combien ont été ouverts, combien de personnes ont cliqué sur les liens contenus, combien ne sont pas arrivés à destination… tout ça même dans la version gratuite. La seule contrainte en version gratuite est la limitation à 200 mails par jour.

## ![Logo New Relic](/images/posts/2014-09-04-AddonsHeroku/newrelic.png) New Relic



[New Relic](http://www.newrelic.com/) enfin, est un service de surveillance de votre application. Il permet à la fois de surveiller les performances de la machine, mais aussi de repérer par exemple les requêtes SQL qui sont lentes, ainsi que les méthodes de votre code qui sont coûteuse en temps processeur et d'autres données. Vous avez la possibilité de créer des rapports sur toutes ces données ainsi que de créer des alertes sur certains évenements. Les versions payantes permettent d'aller plus loin dans la recherche de points noirs dans l'application ainsi que de débloquer la limite de l'historique. L'installation est plus complexe que les autres add-ons mais reste très bien expliquée au premier lancement du service.


Bien sûr tous ces add-ons sont disponibles hors Heroku et peuvent être utilisés sur n'importe quel autre serveur.
Dans tous les cas, essayez, testez, bidouillez, faîtes vous plaisir ! C'est tout à fait le type de service qui fait gagner un maximum de temps pour déployer une application, que ce soit pour un POC, une démo ou même une mise en prod !
