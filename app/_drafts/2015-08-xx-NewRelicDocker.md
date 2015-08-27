---
layout: post
title: "Monitorer ses containeur Docker avec New Relic"
author: Benjamin
cover: docker-banner
tags: [Docker, New Relic, Monitoring]
---

## NewRelic (link)
(icon)

Si vous ne conaissez pas New Relic, vous loupez quelque chose, c'est le service indispensable pour monitorer vos serveurs et vos applications. Il est capable d'une part de vous remonter les données physiques de vos serveurs (mémoire, cpu, espace disque), et d'autre part d'analyser les performances de votre application (de nombreux languages sont disponibles). Elle dispose aussi d'un système d'alerting, facilement configurable. Tous ces services sont disponibles en version gratuite, avec limitation (nombre de jour limité de rétention des données par exemple). Je vous laisse consulter le site pour plus de détail.

Nous allons seulement parler du service de monitoring des serveurs dans cet article.

## Et Docker dans tout ça

(icon)

Ce qui est encore plus fort avec le service de monitoring des serveurs de New Relic, c'est qu'il est capable de comprendre Docker et donc de vous remonter les données par container.

(screenshot)

## Comment l'installer

Avec Docker bien sûr, il faut au préalable s'être créé un compte sur le site New Relic pour obtenir l'accès à l'interface et pouvoir se créer une clé (à remplacer dans la ligne de commande suivante).

docker run -d \
--privileged=true --name newrelic 
--pid=host \
--net=host \
-v /sys:/sys \
-v /dev:/dev \
--restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /var/log:/var/log:rw \
-e NRSYSMOND_license_key=<KEY> \
-e NRSYSMOND_logfile=/var/log/nrsysmond.log \
newrelic/nrsysmond:latest
 