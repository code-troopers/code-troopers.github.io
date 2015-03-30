---
layout: post
title: Publier son apk sur le playstore en ligne de commande
author: Florian
cover: swtours-banner
tags: [Android, Gradle, Livraison]
---

Lors que l’on fait du développement Android et qu’on publie régulièrement des nouvelles vesrion sur le play store, il est assez fastidieux de devoir se connecter à l’ihm de google, de sélectionner le projet et ensuite d’uploader son nouvel apk.
Heureusement et comme souvent, chez google ils sont sympa et ils ont prévu le coup avec une api que l’on peut attaquer en ligne de commande.
Encore plus sympa Björn Hurling à lui publier sur github un plugin gradle qui utiliser cet api.

Voyons en pas à pas quoi configurer et comment, pour livrer ses apk en ligne de commande

<!-- break -->
##Prérequis 
avoir déjà un build qui fonctionne avec gradle.

##Etape 1 : Creation du service account

<div style="text-align:center;margin:50px">
  <a href="/images/postAndroidGradle/Capture1.png" data-lightbox="group-2" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture1.png" alt=""/>
  </a>
  <a href="/images/postAndroidGradle/Capture2.png" data-lightbox="group-2" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture2.png" alt=""/>
  </a>
  <a href="/images/postAndroidGradle/Capture3.png" data-lightbox="group-2" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture3.png" alt=""/>
  </a>
  <a href="/images/postAndroidGradle/Capture4.png" data-lightbox="group-2" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture4.png" alt=""/>
  </a> 
  <a href="/images/postAndroidGradle/Capture5.png" data-lightbox="group-2" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture5.png" alt=""/>
  </a>
  <a href="/images/postAndroidGradle/Capture6.png" data-lightbox="group-2" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture6.png" alt=""/>
  </a>
</div>
    


##Etape 2 : Attribution de droits
Il faut mantenant donner les droits au service de faire des choses sur notre projet

<div style="text-align:center;margin:50px">
  <a href="/images/postAndroidGradle/Capture7.png" data-lightbox="group-2" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture7.png" alt=""/>
  </a>
  <a href="/images/postAndroidGradle/Capture8.png" data-lightbox="group-2" title="" class="inlineBoxes">
    <img class="medium" src="/images/postAndroidGradle/Capture8.png" alt=""/>
  </a>
</div>








##Pour allez plus loin :
L’’étape ultime de la livraison continue, c’est de configure un jenkins pour qu’il livre en alpha à chaque nouveau commit, et pour ca rien de plus simple il suffit de rajouter une tache post build qui fera appel a la commande précédente.


<div style="text-align:center;margin:50px">
    <a href="/images/postNeo4j/admin-page.png" data-lightbox="group-2" title="Interface d'administration" class="inlineBoxes">
        <img class="medium" src="/images/postNeo4j/admin-page.png" alt="Interface d'admin"/>
    </a>
</div>
    
