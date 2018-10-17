---
author: Cedric
cover: images/banner/mavenRelease-banner.png
date: '2014-03-19'
tags:
- bibliothèque
- OSS
- Maven
title: Distribuer sur Maven Central ses bibliothèques
url: /2014/03/19/mavenrelease/
aliases: 2014/03/19/mavenRelease.html
---


## Cas d'utilisation
Il est fréquent que nous réalisions des bouts de codes qui peuvent devenir des bibliothèques (ou librairies pour les faux amis).

Souvent un des freins à la libre distribution de ces sources très utiles n'est pas la mise à disposition des sources ([Github](http://www.github.com/code-troopers) a bien aidé dans ce sens ces dernières années), mais la distribution sur un des dépôts Maven accessible au tout venant.

En fait, il est bon de savoir que [Sonatype](http://www.sonatype.org) permet la mise à disposition de n'importe quelle bibliothèque ( _open source_ ) dans [les dépôts centraux de Maven](http://repo1.maven.org/maven2). Pour ce faire il suffit de suivre quelques étapes.


## Signature des _artefacts_

Si vous vous êtes déjà penchés sur la façon de fonctionner des dépôts Maven, vous aurez remarqué que les binaires disponibles sont en réalité signés par leurs développeurs. Le but est simple, permettre d'éviter que des petits malins introduisent des backdoors dans des librairies réputées (par exemple imaginez un hacker qui s'attaque à apache-httpclient...).

Ainsi il va être nécessaire de signer tous les binaires que vous allez produire, ceci passe par l'utilisation de [GnuPG](http://www.gnupg.org/) et de la mise à disposition de votre clef publique.

### Installation de GnuPG
L'installation passe par votre gestionnaire de package classique (`apt-get install gpg`, `brew install gpg`, `install-gpg-on-my-os.exe`...). De là, vous pourrez vérifier dans un _shell_ que vous avez une version d'accessible en tapant par exemple la commande suivante:

~~~bash
$ gpg --version
gpg (GnuPG) 1.4.16
Copyright (C) 2013 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Home: ~/.gnupg
Supported algorithms:
Pubkey: RSA, RSA-E, RSA-S, ELG-E, DSA
Cipher: IDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256, TWOFISH,
        CAMELLIA128, CAMELLIA192, CAMELLIA256
Hash: MD5, SHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224
Compression: Uncompressed, ZIP, ZLIB, BZIP2
~~~

### Génération de la clef
GnuPG est un mécanisme de chiffrement impliquant une clef publique (distribuée librement) associée à une clef privée (à garder précieusement). Avant de pouvoir prétendre distribuer des binaires chiffrés, il convient donc de générer le couple clef privée/publique et de distribuer la clef publique sur les serveurs appropriés.
Ainsi, après avoir fourni nom, email et commentaire pour votre clef, vous serez prêt à la distribuer au plus grand nombre :

~~~bash
$ gpg --gen-key
~~~

Dans les écrans qui apparaissent, vous pouvez conserver les valeurs par défaut pour la plupart des éléments (type, taille et durée de validité). Enfin, vous allez devoir spécifier la _passphrase_ de votre clef. N'hésitez pas à utiliser une phrase : elle sera plus difficilement "cassable" et vous vous en rappelerez certainement mieux qu'un mot de passe complexe.

### Vérification de la clef
Pour vérifier que votre clef est correctement installée, vous pouvez récupérer la liste des clefs connues par votre système. Ainsi pour connaître les clefs publiques vous pouvez taper :

~~~bash
$ gpg --list-keys
/Users/cgatay/.gnupg/pubring.gpg
--------------------------------
pub   2048R/CE236D5E 2013-04-28
uid                  Cedric Gatay <cedric@gatay.fr>
sub   2048R/08130909 2013-04-28
~~~

Et pour les clefs privées :

~~~bash
$ gpg --list-secret-keys
/Users/cgatay/.gnupg/secring.gpg
--------------------------------
sec   2048R/CE236D5E 2013-04-28
uid                  Cedric Gatay <cedric@gatay.fr>
ssb   2048R/08130909 2013-04-28
~~~

Si la génération s'est déroulée comme prévu, la seule différence résidera dans l'emplacement du fichier correspondant au stockage de la clef publique et privée.

### Distribution de la clef publique
Pour que tout le monde soit à même de vérifier votre "identité", il faut distribuer votre clef publique sur les dépôts reconnus. L'un d'eux est `hkp://pool.sks-keyservers.net` qui fera la distribution auprès des différents serveurs OpenPGP.
Pour se faire, il suffit de lancer la synchronisation vers ce serveur, en remplaçant `${KEY_ID}` par l'id de votre clef publique tel que récupéré lors de la commande précédente (dans mon cas il s'agit de `CE236D5E`):

~~~bash
    $ gpg --keyserver hkp://pool.sks-keyservers.net --send-keys ${KEY_ID}
~~~

Pour vérifier que l'envoi s'est fait comme attendu, vous pouvez demander à récupérer la clef par la commande suivante :

~~~bash
    $ gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys ${KEY_ID}
~~~

## Création d'un compte sur Sonatype
La distribution de binaires passe par la création d'un compte sur le [JIRA de Sonatype](https://issues.sonatype.org). La procédure est assez simple, elle ne vaut pas la peine d'être détaillée plus avant.
Ensuite, pour faire vous autoriser à distribuer vos applicatifs, il est nécessaire de créer un ticket pour demander les droits correspondants. Ce ticket doit être du type _Support - Open Source Project Repository Hosting_ - _New Project_ dans le JIRA OSSRH.
Il vous faudra ensuite remplir les champs suivants :

 * summary : Descriptif de votre projet
 * groupId : le groupId de votre projet (généralement votre nom de domaine, `com.code-troopers` dans notre cas)
 * Project URL : URL vers le site du projet
 * SCM URL : URL vers les sources du projet
 * Nexus Username : votre nom d'utilisateur actuel (et les éventuels noms d'utilisateurs à autoriser)
 * Already sync to central : si il y a déjà des projets sur Maven central avec le même groupId
 * Description : n'importe quelle information supplémentaire que vous jugez utile de préciser


Par exemple, le ticket correspondant à la mise à disposition de l'intégration entre [Apache Wicket](http://wicket.apache.org) et [ParsleyJS](http://www.parsleyjs.org) est [OSSRH-6026](https://issues.sonatype.org/browse/OSSRH-6026)

## Préparation du projet pour la distribution
Pour que vous puissiez distribuer votre projet, il est nécessaire d'ajuster légèrement le descripteur de votre projet (le fameux `pom.xml` dans notre cas traitant de Maven).

### Informations indispensables
Il est nécessaire que le `pom.xml` contienne les informations suivantes :

 * `modelVersion`
 * `groupId`
 * `artifactId`
 * `version`
 * `packaging`
 * `name`
 * `description`
 * `url`
 * `licenses`
 * `scm.url`
 * `scm.connection`
 * `developers`

### Modification de votre projet

De plus il est indispensable d'hériter du [projet parent de Sonatype](http://repo1.maven.org/maven2/org/sonatype/oss/oss-parent/7/oss-parent-7.pom), celui-ci décrit en fait les plugins ainsi que les dépôts qui vont être utilisés pour la livraison.

Vous devez donc ajouter dans votre descripteur le lien avec le parent Sonatype :

~~~xml
<project>
  <parent>
    <groupId>org.sonatype.oss</groupId>
    <artifactId>oss-parent</artifactId>
    <version>7</version>
  </parent>
  <!-- le reste de votre descripteur -->
</project>
~~~

Pour le remplissage des informations de votre dépôt de sources, plusieurs façon de les remplir s'offrent à vous en fonction du type de dépôt que vous utilisez, dans la majorité des cas pour les projets récents, le système de gestion de version utilisé est Git, la partie correspondant dans le `pom.xml`sera donc de la forme suivante (en ajustant `${USER}` et `${PROJECT}` bien entendu) :
~~~xml
<scm>
  <connection>scm:git:git@github.com:${USER}/${PROJECT}.git</connection>
  <developerConnection>scm:git:git@github.com:${USER}/${PROJECT}.git</developerConnection>
  <url>git@github.com:${USER}/${PROJECT}.git</url>
</scm>
~~~

## Préparation de votre poste pour la distribution
Pour déployer sur les dépôts gérés par Sonatype, vous allez devoir vous identifier pour gérer l'upload, bien entendu, il n'est pas concevable de stocker vos informations d'identification au sein du descripteur de votre projet :
 * vous ne voulez pas publier vos identifiants au grand public
 * vous ne voulez pas passer sur chacun des projets si vous les changez

La technique est donc d'utiliser le fichier de configuration global de Maven en définissant des paramètres. Ainsi, en éditant le fichier `~/.m2/settings.xml` vous allez ajouter vos identifiants (encore une fois, en ajustant `${USER}` et `${PASSWORD}`):

~~~xml
  <servers>
    <server>
      <id>sonatype-nexus-snapshots</id>
      <username>${USER}</username>
      <password>${PASSWORD}</password>
    </server>
    <server>
      <id>sonatype-nexus-staging</id>
      <username>${USER}</username>
      <password>${PASSWORD}</password>
    </server>
  </servers>
~~~

## Distribution d'une version `SNAPSHOT`
Si vous désirez distribuer vos bibliothèques sur des dépôts centraux, vous devez connaître les notions de `SNAPSHOT` et _release_ propres à Maven. Pour faire un bref rappel, les versions `SNAPSHOT` sont des versions en développement alors que les versions _release_ sont les versions finales. Ainsi, dépendre d'une version `SNAPSHOT` déclenchera des vérifications régulières par l'outil de construction pour récupérer toujours la dernière version alors qu'une version _release_ ne sera rapatriée qu'une et une seule fois (en assurant la stabilité de la construction).

Sonatype fourni un dépôt pour de telles versions de développement ainsi qu'un dépôt pour les versions stables. Dans un premier temps et pour tester que votre système est correctement configuré, vous allez déployer une version `SNAPSHOT` de votre librairie :
~~~bash
$ mvn clean deploy
~~~
Si tout se passe comme prévu, votre livrable sera visible et disponible sur le dépôt SNAPSHOT de Sonatype : [https://oss.sonatype.org/content/repositories/snapshots](https://oss.sonatype.org/content/repositories/snapshots)
En cas d'erreur `401 Unauthorized`, vérifiez que vos identifiants JIRA sont corrects (en vous connectant sur [https://issues.sonatype.org](https://issues.sonatype.org)).

## Préparation et distribution d'une _release_
Le _plugin_ Maven _release_ est préconfiguré grace à l'intégration du descripteur parent de Sonatype, il suffit donc de l'utiliser pour construire votre projet, il va s'occuper de construire les livrables nécessaires, de les signer et de les déployer en tant que _staging_.

    $ mvn release:clean
    $ mvn release:prepare
    $ mvn release:perform

Lors de la procédure, le plugin _release_ va s'occuper de changer le numéro de version `SNAPSHOT` vers un numéro _release_, de préparer la version `SNAPSHOT`suivante, de _tagguer_ le tout sur le système de gestion de sources. Un de ses atouts est de préparer la construction à partir d'une version propre provenant du système de gestion de sources, de cette façon vous pourrez vous assurer de la reproductibilité des constructions.

Vous aurez donc besoin de saisir la _passphrase_ de votre clef _GnuPG_ lors du processus, pour effectuer la signature des livrables.

_Vous pouvez également distribuer votre livrable avec la commande `deploy` comme dans le cas d'une livraison `SNAPSHOT`._

## Publication de vos livrables
Pour finir la publication de votre livrable, il faut passer par l'interface de Sonatype https://oss.sonatype.org
Dans la partie _Staging Repositories_, vous verrez une ligne correspondant à votre déploiement, sur cette ligne, il faudra _close_ pour dire que la distribution est terminée, puis, une fois qu'il sera clos, il faudra en faire la _promote_ pour qu'il soit distribué vers les dépôts Maven centraux.

Si vous ne pouvez pas clôre ou promouvoir votre livrable, Nexus vous fournira un message d'explication (tel que "impossible de trouver le jar de sources")

**Attention**: pour votre première livraison vers les dépôts centraux, il sera nécessaire de mettre à jour le ticket JIRA que vous avez ouvert pour demander la synchronisation vers Maven Central.

## Ajout d'un collaborateur
Il est rare que seul une personne ait le droit d'effectuer les distributions, ainsi, dès que vous désirez ajouter quelqu'un vous devrez mettre à jour le ticket JIRA pour demander l'ajout (collaborateur qui devra suivre également la première partie du guide pour créer un compte et distribuer sa signature numérique).

## Livraison d'un nouveau projet
Tant que votre projet respecte le _groupId_ dont vous avez revendiqué la paternité, vous pourrez livrer et distribuer à votre convenance sans avoir besoin de créer de nouvelles demandes sur le JIRA de Sonatype.

Dans notre cas, nous avons enregistré `com.code-troopers` en tant que _groupId_ parent de nos réalisations.
