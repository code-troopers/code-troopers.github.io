---
author: Cedric
cover: images/banner/docker-banner.png
date: '2015-06-25'
tags:
- guide
- docker
- tips
title: Installer votre dépot privé Docker
url: /2015/06/25/installdockerregistry/
aliases: 2015/06/25/InstallDockerRegistry.html
---

Petit à petit chez Code-Troopers, nous migrons tous nos développements pour utiliser Docker.
Cela fait quelque temps que nous l'utilisons pour des projets "public", auquel cas le registry public Docker est largement suffisant (et immédiat à utiliser).

En revanche, nous commençons à migrer nos applications de production également vers Docker, et nous ne pouvons pas utiliser le mode public du registry public.
Nous nous sommes donc mis à déployer un dépôt privé, authentifié par utilisateur / mot de passe.

La procédure n'est pas très complexe, mais cette opération reste une bonne opportunité d'écrire un article à ce sujet (les articles en français n'étant pas légion).


## Step by step
Il faut créer une entrée DNS pour votre service.

Puis nous allons utiliser l'image Docker avec nginx pour l'authentification [docker-nginx-registry-proxy](https://github.com/MarvAmBass/docker-nginx-registry-proxy).

## Informations d'identification
Pour les étapes suivantes, placez vous dans le répertoire de votre choix pour stocker les fichiers (dans ce cas nous sommes dans `/srv/registry-config`)

### Génération du certificat
Pensez à bien renseigner le FQDN DNS lors de la demande de Common Name pour le certificat.

    openssl genrsa -out ca.key 4096
    openssl req -new -x509 -days 1826 -key ca.key -out ca.crt
    openssl genrsa -out ia.key 4096
    openssl req -new -key key.pem -out ia.csr #this is where you need to fill your FQDN
    openssl x509 -req -days 730 -in ia.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out cert.pem

### Génération des mots de passes basic auth
En utilisant un container docker qui embarque htpasswd vous pourrez générer facilement le fichier nécessaire :

    docker run --rm -ti -v $(pwd):/tmp dgageot/htpasswd -c /tmp/docker-registry.htpasswd $MONUSER

## Démarrage du registry
Les images seront stockées dans le répertoire `/srv/registry`

    mkdir /srv/registry
    docker run -d --restart=always --name registry -v /srv/docker-registry:/registry -e "SETTINGS_FLAVOR=local" -e "STORAGE_PATH=/registry" registry
    docker run -d --restart=always -p 443:443 -v /srv/registry-config:/etc/nginx/external --link registry:registry --name nginx-registry-proxy marvambass/nginx-registry-proxy

## Configuration d'une machine cliente

### Importer le certificat racine
Il faut importer le certificat racine dans la liste des certificats reconnus

    sudo -s
    mkdir -p /etc/docker/certs.d/$FQDN
    cp ca.crt /etc/docker/certs.d/$FQDN/

    mkdir -p /usr/local/share/ca-certificates/docker-ct
    cp ca.crt /usr/local/share/ca-certificates/docker-ct/
    update-ca-certificates-

Pour vérifier que tout fonctionne comme attendu, vous pouvez voir si votre certificat ressort bien dans la commande suivante :

    awk -v cmd='openssl x509 -noout -subject' ' /BEGIN/{close(cmd)};{print | cmd}' < /etc/ssl/certs/ca-certificates.crt | grep $(VOTRE IDENTIFIANT)

Vous serez également certainement amené à redémarrer vos daemon docker (de chacune des machines)

    systemctl stop docker
    systemctl start docker

### Identification sur le dépot
Une fois que toutes ces étapes sont effectuées, normalement votre dépot est prêt à être utilisé.

Il vous faut cependant en première étape vous identifier à l'aide du couple utilisateur / mot de passe créé lors de l'installation :

    docker login https://mondepotdocker.tld

Ceci aura pour effet de créer un fichier `~/.dockercfg` vous permettant d'accéder aux commandes suivantes sans avoir besoin de retaper vos identifiants.

## Utilisation du dépôt

Une fois la machine cliente configurée, vous pouvez simplement utiliser le dépot en préfixant les noms de vos images par l'URL du dépôt.
Par exemple, pour push/pull l'image de monapplication la commande suivante fera l'affaire :

    docker push mondepotdocker.tld/monapplication:v1.0.0
    docker pull mondepotdocker.tld/monapplication:v1.0.0

### Utilisation avec docker-compose

Si vous utilisez docker-compose, il se peut que vous ayiez des soucis avec le certificat autosigné et/ou avec l'authentification.

Pour contourner la vérification du certificat, vous pouvez simplement lancer `docker-compose` avec le flag `--allow-insecure-ssl`.

Pour ce qui est de l'authentification, une astuce simple pour contourner les problèmes de ce genre est de faire un `docker pull` manuellement au préalable (le scripter depuis le fichier compose.yml n'est pas trop difficile).
