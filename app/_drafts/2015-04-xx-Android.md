---
layout: post
title: "Android : Publier son apk en ligne de commande"
author: Florian
cover: swtours-banner
tags: [Android, Gradle, Livraison]
---

Lors que l’on fait du développement Android et qu’on publie régulièrement des nouvelles version de l'application sur le play store, 
il est assez fastidieux de devoir se connecter à l’interface de google, de sélectionner le projet et ensuite d’uploader son nouvel apk 
(en plus, chez nous on n'est pas fan du clic-clic on préfère la ligne de commande).

Heureusement pour nous chez Google ils sont sympa et ils ont prévu le coup avec une API que l’on peut attaquer en ligne de commande.
Et encore plus sympa [Björn Hurling](https://plus.google.com/+Bj%C3%B6rnHurling/posts) a lui publié sur github 
[un plugin gradle qui utilise cette API](https://github.com/Triple-T/gradle-play-publisher).

Voyons ensemble et en pas à pas comment et quoi configurer afin de livrer ses apk en ligne de commande.

<!-- break -->
  
## Prérequis

Pour commencer il faut avoir un build qui fonctionne avec gradle. 

Normalement pas de problème si c'est un projet récent puisque c'est que qu'Android Studio propose maintenant par défaut.
Si c'est n'est pas le cas vous pouvez vous reposer sur la [doc de Google](http://tools.android.com/tech-docs/new-build-system/intellij_to_gradle) à ce sujet.


## Étape 1 : Creation du 'Service Account'

La première étape consite à créer un compte qui peut utilser l'API de google, contrairement à un compte utilisateur classique celui-ci utilisera un ficher de clé pour s'identifier plutôt qu'un mot de passe.
Pour cela rendez-vous dans un premier temps dans la l'interface developpeur du Play Store, dans la section `Settings > API acces` et cliquez sur `Create Service Account`.


<div style="text-align:center;margin:50px">
  <a href="/images/postAndroidGradle/Capture1.png" data-lightbox="group-1" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture1.png" alt=""/>
  </a>
  <a href="/images/postAndroidGradle/Capture2.png" data-lightbox="group-1" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture2.png" alt=""/>
  </a>
</div>

Vous allez être redirigé sur l'interface google developpeur principale ou pour pourrez un nouveau `OAuth > client ID`  de type `service account`.

Une fois le compte créé pensez a générer une clé p12 qui sera utilisé pour l'authenficication

<div style="text-align:center;margin:50px">
  <a href="/images/postAndroidGradle/Capture3.png" data-lightbox="group-2" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture3.png" alt=""/>
  </a>
  <a href="/images/postAndroidGradle/Capture4.png" data-lightbox="group-2" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture4.png" alt=""/>
  </a> 
  <a href="/images/postAndroidGradle/Capture5.png" data-lightbox="group-2" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture5.png" alt=""/>
  </a>
</div>


De retour sur l'interface d'admin du Play Store, on constate que le compte est bien créée est disponible.

<div style="text-align:center;margin:50px">
  <a href="/images/postAndroidGradle/Capture6.png" data-lightbox="group-3" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture6.png" alt=""/>
  </a>
</div>
    

## Étape 2 : Attribution de droits
Il faut maintenant donner les droits au compte que l'on vient de créer afin qu'il puisse au moins livrer les apk en alpha.
Les droit minimum à accorder pour que le plugin puisse fonctionnner sont : 
 
 * Edit 
 * Manage
 * Manage
 * Manage


<div style="text-align:center;margin:50px">
  <a href="/images/postAndroidGradle/Capture7.png" data-lightbox="group-4" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture7.png" alt=""/>
  </a>
  <a href="/images/postAndroidGradle/Capture8.png" data-lightbox="group-4" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture8.png" alt=""/>
  </a>
</div>

## Étape 3 : le plugin gradle
Il faut maintenant configure son build gradle pour ajouter les informations relative au plugin qui effectura la livraison.

Ajouter le plugin dans le build, ainsi que l'endroit ou il se trouve

<div style="text-align:center;margin:50px">
  <a href="/images/postAndroidGradle/Capture71.png" data-lightbox="group-5" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture71.png" alt=""/>
  </a>
  <a href="/images/postAndroidGradle/Capture81.png" data-lightbox="group-5" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture81.png" alt=""/>
  </a>
</div>
 
Configuration du plugin = ajouter les informations du compte qui va se connecter pour faire la livraison 
(c'est là que l'on va utiliser la clé P12 générée précedement)

<div style="text-align:center;margin:50px">
  <a href="/images/postAndroidGradle/Capture9.png" data-lightbox="group-3" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture9.png" alt=""/>
  </a>
</div>



./gradlwe taks : on voit les nouvelles cible gradle qu'on peut appeler


## Étape 4 : génération et upload
le build n'est pas nécessaire car il est fait par la nouvelle task


rapport d'upload : ok

rapport ko : probablement un pb dans le user ou la clé

Attention : ne commiter pas la clé sur github




##Pour allez plus loin 
* Le plugin permet bien plus de chose que la livraions. En effet il permet de mettre a jour la description les images et le change log.
Pour savoir comment configurer tout cela, je vous invite a consulter la page github du projet [https://github.com/Triple-T/gradle-play-publisher](https://github.com/Triple-T/gradle-play-publisher)

L'étape ultime de la livraison continue, c’est de configure un jenkins pour qu’il livre en alpha à chaque nouveau commit, et pour ca rien de plus simple il suffit de rajouter une tache post build qui fera appel a la commande précédente.
C'est ce que nous verrons dans le prochain article.

