---
author: Matthieu
cover: images/banner/docker-banner.png
date: '2015-09-09'
tags:
- Docker
- Owncloud
title: 'Owncloud : solution de cloud en 5 min avec Docker'
url: /2015/09/09/ownclouddocker/
aliases: 2015/09/09/OwncloudDocker.html
---


Que ce soit pour des raisons politique de confidentialité ou des raisons technique, [Owncloud](https://owncloud.org/) a énormément de qualités comparé à Dropbox ou Google drive. Déjà car la limite de taille des données est celle du serveur, ensuite car des applications sous linux permettent de synchroniser des dossiers et enfin car il existe une multitude d'addons qui permettent de sauvegarder ses mots de passe, jouer de la musique, envoyer des notifs sur Slack etc.

La mise en production d'une instance Owncloud se fait en 5 minutes montre en main, à condition de connaître un minimum Docker.

## Nginx/proxy

Nous allons commencer par une petite digression. Avant quand on avait plusieurs "virtual host" qui pointaient sur une machine, on mettait un front-end apache et c'était plus ou moins la galère. Maintenant, il suffit de lancer cette commande une fois :

    docker run --restart=always --name nginx -d -p 80:80 -p 443:443 -v /docker/vhost.d:/etc/nginx/vhost.d:ro -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy


On pourra alors rajouter la variable d'environnement `VIRTUAL_HOST` à chaque nouvelle image Docker pour qu'elle soit directement accessible. Ce qui est magique aussi c'est que si on expose un seul port de l'image Docker alors il est directement mappé sur le port 80, même si le port n'était pas forwardé sur le host. Dernier avantage, si on met deux machines avec le même nom il va s'occuper de faire du load balancing tout seul !

Si jamais la configuration par défaut ne convient pas, il faut rajouter un fichier de configuration dans `/docker/vhost.d/`. Dans notre cas nous en avons eu besoin pour permettre d'uploader des fichiers plus gros (c'est 2 Mo par défaut).

    $ cat /docker/vhost.d/owncloud.hostname.com
    client_max_body_size 100m;

## Docker-compose

[Docker-compose](https://docs.docker.com/compose/) est un outil très pratique pour gérer les options d'une image docker. Il faut souvent lancer une image Docker avec des variables d'environnement, des liens et des volumes, et quelques semaines plus tard, on ne se souvient plus comment on a lancé les images. Là on n'a plus que une seule commande pour gérer toutes les images d'un coup et les options sont lisibles facilement.

Rentrons dans le vif du sujet :

    mariaOC:
      image: mariadb
      volumes:
       - /home/owncloud/db:/var/lib/mysql
      environment:
       - MYSQL_ROOT_PASSWORD=passwordRoot
       - MYSQL_USER=owncloud-production
       - MYSQL_DATABASE=owncloud-production
       - MYSQL_PASSWORD=passwordUser
       - TZ=Europe/Paris
    owncloud:
      image: jchaney/owncloud
      volumes:
        - /home/owncloud/data:/var/www/owncloud/data
        - /home/owncloud/logs/nginx:/var/log/nginx
        - /home/owncloud/logs/cron:/var/log/cron
        - /etc/ssl/certs/ssl-cert-snakeoil.pem:/etc/ssl/certs/ssl-cert-snakeoil.pem:ro
        - /etc/ssl/private/ssl-cert-snakeoil.key:/etc/ssl/private/ssl-cert-snakeoil.key:ro
      environment:
        - VIRTUAL_HOST=owncloud.hostname.com
        - MYSQL_ROOT_PASSWORD=passwordRoot
        - MYSQL_USER=owncloud-production
        - MYSQL_DATABASE=owncloud-production
        - MYSQL_PASSWORD=passwordUser
        - TZ=Europe/Paris
        - OWNCLOUD_IN_ROOTPATH=1
        - OWNCLOUD_SERVER_NAME=owncloud.hostname.com
        - SSL_CERT=/etc/ssl/certs/ssl-cert-snakeoil.pem
        - SSL_KEY=/etc/ssl/private/ssl-cert-snakeoil.key
      links:
        - mariaOC:db

Voici le fichier docker-compose.yml utilisé. On définit une image de [MariaDB](https://mariadb.org/) pour laquelle on spécifie un volume qui va recevoir les données et différentes variables d'environnements dont les noms sont assez explicite.
Puis une image owncloud avec des volumes pour les fichiers que l'on va sauvegarder, les logs et la clé SSL. Un lien avec la base de donnée MariaDB et quelques variables d'environnements, là encore les noms sont suffisamment explicite.

Une fois les variables modifiées selon notre volonté, il faut lancer les commandes `docker-compose build` suivi de `compose-docker up -d` et aller sur owncloud.hostname.com pour finir l'installation.

L'article est déjà fini, comme je le disais, ça se fait en un rien de temps. Mais si cela a été aussi rapide, c'est parce que Owncloud a une image très bien faîtes donc merci Josh de l'avoir mise à disposition [https://github.com/jchaney/owncloud](https://github.com/jchaney/owncloud)

<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2015-09-09-OwncloudDocker/owncloud.png" data-lightbox="group-1" title="Owncloud site et appli" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-09-09-OwncloudDocker/owncloud.png" alt="Owncloud site et appli"/>
    </a>
</div>
