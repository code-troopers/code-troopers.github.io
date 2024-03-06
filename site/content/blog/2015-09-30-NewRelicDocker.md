---
author: Benjamin
cover: ../docker-banner.png
date: '2015-09-30'
tags:
- Docker
- New Relic
- Monitoring
title: Monitorer ses conteneurs Docker avec New Relic
url: /2015/09/30/newrelicdocker/
aliases: 2015/09/30/NewRelicDocker.html
---


Si vous ne conaissez pas New Relic, vous loupez quelque chose, c'est le service indispensable pour monitorer vos serveurs et vos applications. Il est capable d'une part de vous remonter les données physiques de vos serveurs (mémoire, cpu, espace disque), et d'autre part d'analyser les performances de vos applications (de nombreux langages sont disponibles). Il dispose aussi d'un système d'alerting, facilement configurable. Tous ces services sont disponibles en version gratuite, avec limitation (nombre de jour limité de rétention des données par exemple). Je vous laisse consulter le [site officiel](http://www.newrelic.com) pour plus de détail.

Nous allons seulement parler du service de monitoring des serveurs dans cet article.

<div style="float:right;margin:20px">
    <a href="/images/posts/2015-09-30-NewRelicDocker/new-relic.png" data-lightbox="group-1" title="New Relic Logo" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-09-30-NewRelicDocker/new-relic.png" alt="New Relic Logo"/>
    </a>
</div>

<div class="clearfix"></div>



## Et Docker dans tout ça

Ce qui est encore plus fort avec le service de monitoring des serveurs de New Relic, c'est qu'il est capable de comprendre Docker et donc de vous remonter les données par conteneur.

<div style="text-align:center;margin:50px">
    <a href="/images/posts/2015-09-30-NewRelicDocker/screen-newrelic-1.png" data-lightbox="group-3" title="Screen 1 New Relic" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-09-30-NewRelicDocker/screen-newrelic-1.png" alt="Screen 1 New Relic"/>
    </a>
    <a href="/images/posts/2015-09-30-NewRelicDocker/screen-newrelic-2.png" data-lightbox="group-3" title="Screen 2 New Relic" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-09-30-NewRelicDocker/screen-newrelic-2.png" alt="Screen 2 New Relic"/>
    </a>
</div>

<div class="clearfix"></div>

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

Vous trouverez toutes les informations [ici](https://hub.docker.com/r/newrelic/nrsysmond/).
