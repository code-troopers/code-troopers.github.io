---
author: Florian
cover: images/banner/android-banner.png
date: '2015-11-04'
tags:
- Android
- APK
- Gradle
- Livraison
title: 'Android : Publier son apk en ligne de commande'
url: /2015/11/04/android_publier_apk_avec_gradle/
aliases: 2015/11/04/Android_publier_apk_avec_gradle.html
---


Lorsque l’on fait du développement Android, on a régulièrement besoin de publier des nouvelles versions de l'application sur le Play Store.
Il est assez fastidieux de devoir se connecter à l’interface de Google, de sélectionner le projet et ensuite d’uploader son nouvel apk.

Heureusement pour nous, Google a prévu le coup avec une API que l’on peut attaquer en ligne de commande.
Et, encore plus sympa, [Björn Hurling](https://plus.google.com/+Bj%C3%B6rnHurling/posts) a publié sur github
[un plugin gradle qui utilise cette API](https://github.com/Triple-T/gradle-play-publisher).

Voyons ensemble pas à pas comment et quoi configurer afin de livrer ses apk en ligne de commande en utilisant gradle.



## Prérequis

Pour commencer, il faut avoir un build qui fonctionne avec gradle.

Normalement pas de problème si c'est un projet récent puisque c'est ce qu'Android Studio propose maintenant par défaut.
Si ce n'est pas le cas, vous pouvez vous reposer sur la [doc de Google](http://tools.android.com/tech-docs/new-build-system/intellij_to_gradle) à ce sujet.


## Étape 1 : Création du 'Service Account'

La première étape consiste à créer un compte qui peut utilser l'API de Google : contrairement à un compte utilisateur classique, celui-ci utilisera un ficher de clé pour s'identifier plutôt qu'un mot de passe.

Pour cela, rendez-vous dans un premier temps dans l'interface développeur du Play Store, dans la section `Settings > API acces` et cliquez sur `Create Service Account`.

<div style="text-align:center;margin:50px">
  <a href="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen1.png" data-lightbox="group-1" title="Configuration de l'Accout service - 1" class="inlineBoxes">
    <img class="medium" src="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen1.png" alt="Configuration de l'Accout service - 1"/>
  </a>
  <a href="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen2.png" data-lightbox="group-1" title="Configuration de l'Accout service - 2" class="inlineBoxes">
    <img class="medium" src="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen2.png" alt="Configuration de l'Accout service - 2"/>
  </a>
</div>

En suivant le lien du petit `1` vous allez être redirigé vers la console Google développeur d'où vous pourrez créer un nouveau `Credential`  de type `Service account`.

Sélectionnez le format de clé `JSON` qui est recommandé, le téléchargement de celle-ci devrait alors se faire automatiquement.

On peut ensuite voir qu'un nouveau `Service account` est apparu dans la liste des Credentials.

<div style="text-align:center;margin:50px">
  <a href="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen3.png" data-lightbox="group-1" title="Configuration de l'Accout service - 3" class="inlineBoxes">
    <img class="medium" src="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen3.png" alt="Configuration de l'Accout service - 3"/>
  </a>
  <a href="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen4.png" data-lightbox="group-1" title="Configuration de l'Accout service - 4" class="inlineBoxes">
    <img class="medium" src="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen4.png" alt="Configuration de l'Accout service - 4"/>
  </a>
  <a href="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen5.png" data-lightbox="group-1" title="Configuration de l'Accout service - 5" class="inlineBoxes">
    <img class="medium" src="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen5.png" alt="Configuration de l'Accout service - 5"/>
  </a>
</div>


De retour sur l'interface d'admin du Play Store, on constate que le `Service Account` est bien créé et disponible ici.

<div style="text-align:center;margin:50px">
  <a href="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen6.png" data-lightbox="group-1" title="Configuration de l'Accout service - 6" class="inlineBoxes">
    <img class="medium" src="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen6.png" alt="Configuration de l'Accout service - 6"/>
  </a>
</div>


## Étape 2 : Attribution des droits
Il faut maintenant donner les droits au compte que l'on vient de créer afin qu'il puisse au moins livrer les apk en alpha.

Pour cela cliquez sur le bouton `Grant access`. Dans la popup qui s'ouvre, les droits minimums à accorder pour que le plugin puisse fonctionnner sont :

 * Edit store listing, pricing & distribution
 * Manage Production APKs
 * Manage Alpha & Beta APKs
 * Manage Alpha & Beta users

Ces choix pourront être modifés ultérieurement dans l'écran récapitulatif (mais ce n'est pas recommandé).

<div style="text-align:center;margin:50px">
  <a href="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen7.png" data-lightbox="group-1" title="Configuration de l'Accout service - 7" class="inlineBoxes">
    <img class="medium" src="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen7.png" alt="Configuration de l'Accout service - 7"/>
  </a>
  <a href="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen8.png" data-lightbox="group-1" title="Configuration de l'Accout service - 8" class="inlineBoxes">
    <img class="medium" src="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_ConfigureAccount_Screen8.png" alt="Configuration de l'Accout service - 8"/>
  </a>
</div>

## Étape 3 : le plugin gradle
Il faut maintenant configurer son build pour ajouter les informations relatives au plugin qui effectuera la livraison vers le Play Store.

Dans le fichier `build.gradle` du projet il faut donc rajouter la dépendance au plugin :


    buildscript {

        repositories {
            mavenCentral()
        }

        dependencies {
            // ...
            classpath 'com.github.triplet.gradle:play-publisher:1.1.4'
        }
    }


Et dans le `build.gradle` de l'application (du Module), il faut appliquer le plugin au même niveau que le plugin Android :

    apply plugin: 'com.android.application'
    apply plugin: 'com.github.triplet.play'

Ensuite, toujours dans le `build.gradle`, il est nécessaire d'ajouter les informations de l'`Account service` précédemment créé pour qu'il puisse se connecter et faire la livraison
(c'est là que l'on va utiliser la clé `JSON` générée).

Placez donc la clé dans votre projet et faites-y référence dans la configuration du plugin :

    play {
        jsonFile = file('../publishKey/serviceAccountKeys.json')
    }


À partir de là, notre build est configuré. On peut notamment s'en rendre compte en faisant un `./gradlew tasks`

On y voit toutes les tâches gradle qu'on peut appeler :

<div style="text-align:center;margin:50px">
  <a href="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_Gradlew_tasks_config_before.png" data-lightbox="group-1" title="Liste des tasks gradle disponibles sans le plugin" class="inlineBoxes">
    <img class="medium" src="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_Gradlew_tasks_config_before.png" alt="Liste des tasks gradle disponibles sans le plugin"/>
  </a>
  <a href="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_Gradlew_tasks_config_after.png" data-lightbox="group-1" title="Liste des tasks gradle disponibles avec le plugin" class="inlineBoxes">
    <img class="medium" src="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_Gradlew_tasks_config_after.png" alt="Liste des tasks gradle disponibles avec le plugin"/>
  </a>
</div>

Mais ce n'est pas suffisant car il manque notamment les tâches permettant l'upload de l'apk. Pour cela il faut rajouter la `signingConfigs` dans le `build.gradle`.
Ce qui peut notamment se faire comme ça :

        signingConfigs {
            release {
                storeFile file("../keystore.jks")
                storePassword "7r00p3r5"
                keyAlias "release"
                keyPassword "7r00p3r5"
            }
        }
        buildTypes {
            release {
                //...
                signingConfig signingConfigs.release
            }
        }


Maintenant, on peut voir la présence de la tâche qui nous intéresse : `publishApkRelease`

<div style="text-align:center;margin:50px">
  <a href="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_Gradlew_tasks_config_complete.png" data-lightbox="group-1" title="Liste des tasks gradle disponibles avec upload apk" class="inlineBoxes">
    <img class="medium" src="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_Gradlew_tasks_config_complete.png" alt="Liste des tasks gradle disponibles avec upload apk"/>
  </a>
</div>        

## Étape 4 : génération et upload

Pour effectuer un upload de l'apk il suffit maintenant d'appeler la tâche `publishApkRelease`. Et pas besoin de générer l'apk signé via Android Studio puisque comme tout est configuré, il sera généré dans les tâches précédent l'uploadApk.

Si tout se passe bien le build se termine avec un :

    BUILD SUCCESSFUL

Si il y a un problème lors de l'updload, il est affiché dans la console, par exemple si le __version code__ est déjà utilisé

<div style="text-align:center;margin:50px">
  <a href="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_Gradlew_upload_ko.png" data-lightbox="group-1" title="Exemple d'upload d'apk en erreur" class="inlineBoxes">
    <img class="medium" src="/images/posts/2015-11-04-Android_publier_apk_avec_gradle/Android_Gradle_PublishAPK_Gradlew_upload_ko.png" alt="Exemple d'upload d'apk en erreur"/>
  </a>
</div>    


Ensuite vous pouvez vous rendre sur l'interface d'admin du Play Store et constater que l'upload d'un nouvel apk a bien eu lieu en alpha et le passer en bêta ou en production.


__Attention__ : ne pas commiter la clé `JSON` sur github, au même titre que le mot de passe du `keystore`.


##Pour aller plus loin

Le plugin permet bien plus de choses que la livraison des apks. En effet, il permet de mettre à jour la description, les images et le changelog.
Pour savoir comment configurer tout cela, je vous invite à consulter la page github du projet [https://github.com/Triple-T/gradle-play-publisher](https://github.com/Triple-T/gradle-play-publisher)

L'étape ultime de la livraison continue, c’est de configurer un jenkins pour qu’il livre en alpha à chaque nouveau commit sur master, et pour cela il suffit de le configurer en rajoutant par exemple une tâche post build qui fera appel à la commande gradle que nous venons de configurer.
