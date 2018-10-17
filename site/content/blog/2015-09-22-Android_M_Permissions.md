---
author: Florian
cover: images/banner/androidPermission-banner.png
date: '2015-09-22'
tags:
- Android
- Permission
title: Android M - Nouvelle gestion de permission
url: /2015/09/22/android_m_permissions/
aliases: 2015/09/22/Android_M_Permissions.html
---


# Nouvelle approche

Avec la prochaine release d'`Android 6.0 Marshmallow`, il va y avoir du changement au niveau de la gestion des permissions.
Terminé la popup qui demande les 10 autorisations au moment du téléchargement de l'appli, maintenant les développeurs vont pouvoir demander les permissions au moment où elles seront nécessaires.

### Permissions irrévocables
Puisqu'il va falloir demander à l'utilisateur pour chaque permission, Google a décidé que certaines anciennes permissions n'auront plus besoin d'être demandées,
 ce sont les `Normal Permissions`. Il s'agit des permissions qui n'engendrent pas de risque sur la vie privée ou sur la sécurité de l'utilisateur comme c'est par exemple le cas pour l'accès à internet ou l'accès au vibreur :
 la liste complète est disponible [ici](https://developer.android.com/preview/features/runtime-permissions.html#normal).


### Guidelines
Pour ce qui est de l'UX, Google a fait plusieurs recommandations dont certaines sont plus importantes que d'autres, à mon avis :

 * Ne demander une permisission qu'au moment où l'on en a vraiment besoin, ce qui implique de ne pas avoir un popup au lancement qui va demander toutes les permissions ;
 * Faire le maximum pour ne pas gâcher l'experience utilisateur même s'il refuse une permission : donc prévoir un mode dégradé autant que possible ;
 * Utiliser les méthodes disponibles dans appcompat plutôt que celles du sdk de base.


# Mise en pratique
Avant de commencer à coder, une dernière chose à garder à l'esprit c'est que l'utilisateur peut à tout moment révoquer une permission via le détail de l'application (même une fois que l'appli est lancée et tourne en background).
 Il faudra donc adapter la gestion de ces permissions à cette éventualité.

<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2015-09-AndroidMPermissions/p6.png" data-lightbox="group-1" title="Écran App Info" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-09-AndroidMPermissions/p6.png" alt="Écran App Info"/>
    </a>
    <a href="/images/posts/2015-09-AndroidMPermissions/p5.png" data-lightbox="group-1" title="Écran App Info : détail des permissions"  class="inlineBoxes">
            <img class="medium" src="/images/posts/2015-09-AndroidMPermissions/p5.png" alt="Écran App Info : détail des permissions"/>
    </a>
</div>

## Ne pas implémenter les nouvelles permissions
Chose importante à savoir, vous n'êtes pas obligés d'implémenter cette nouvelle gestion de permission.
En effet, puisqu'elle demande du développoment supplémentaire, de nombreuses applis ne seront pas mises à jour et garderont donc l'ancien fonctionnement.
Si c'est ce que vous souhaitez, et pour ne pas nuire au bon fonctionnement de votre appli, il vous suffit de ne pas cibler le dernier `sdk` dans votre build.gradle et de rester sur le `22`.

## Implémenter les nouvelles permissions
Pour cela, 3 étapes sont nécessaires, principalement disponibles dans le sdk 23 ainsi que dans la lib appcompat :

* `requestPermissions()`
* `onRequestPermissionsResult()`
* `shouldShowRequestPermissionRationale()`


### Build.gradle
Permière étape, cibler la dernier version du `sdk` : `23`.
Et en bonus, importer appcompat pour bénéficier des méthodes helpers de Google.

    compileSdkVersion 23
    defaultConfig {
        targetSdkVersion 23
    }
    dependencies {
        compile 'com.android.support:appcompat-v7:23.0.1'
    }

### AndroidManifest.xml
Ensuite, déclarer les permissions désirées dans l'application, normalement il n'y a pas de changements par rapport à votre configuration actuelle

    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_CONTACTS" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.SEND_SMS" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.CALL_PHONE" />

N'oubliez pas d'y déclarer aussi les `Normal Permissions` qui, bien qu'elles soient automatiquement accordées, ont toujours besoin d'être déclarées.

### Dans une activité
Dans un premier temps il faut vérifier si une permission est déjà accordée ou non

    ContextCompat.checkSelfPermission(context, Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;

Si la permission n'est pas accordée, il va falloir la demander, de préférence lors d'une action utilisateur, par exemple au click sur un bouton

    ActivityCompat.requestPermissions(MainActivity.this,
                                      new String[]{Manifest.permission.CAMERA},
                                      REQUEST_CODE_ONE);


<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2015-09-AndroidMPermissions/p1.png" data-lightbox="group-1" title="Dialog de demande d'une permission" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-09-AndroidMPermissions/p1.png" alt="Dialog de demande d'une permission"/>
    </a>
</div>

Puis écouter le choix de l'utilisateur, dans l'activité ou le fragment correspondant

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        switch (requestCode) {
            case REQUEST_CODE_ONE: {
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Toast.makeText(this, "Permission granted", Toast.LENGTH_LONG).show();
                } else {
                    Toast.makeText(this, "Permission denied", Toast.LENGTH_LONG).show();
                }
                return;
            }
        }
    }

### Demander plusieurs permissions en même temps
Même si cela est déconseillé, il peut arriver d'avoir besoin de plusieurs permissions lors de la même action utilisateur.
Pour cela il suffit de passer plusieurs permissions dans le tableau passé en paramètre du requestPermission

    ActivityCompat.requestPermissions(MainActivity.this,
                                      new String[]{Manifest.permission.READ_CONTACTS, Manifest.permission.ACCESS_FINE_LOCATION},
                                      REQUEST_CODE_TWO);

<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2015-09-AndroidMPermissions/p2.png" data-lightbox="group-1" title="Dialog de demande de plusieurs permissions 1/2" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-09-AndroidMPermissions/p2.png" alt="Dialog de demande de plusieurs permissions 1/2"/>
    </a>
<a href="/images/posts/2015-09-AndroidMPermissions/p3.png" data-lightbox="group-1" title="Dialog de demande de plusieurs permissions 2/2" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-09-AndroidMPermissions/p3.png" alt="Dialog de demande de plusieurs permissions 2/2"/>
    </a>
</div>

### Expliquer à l'utilisateur pourquoi il doit autoriser une permission
Il arrivera sûrement que certains utilsateurs refusent des permissions et que cela détériore l'expérience utilisateur sur l'application. Pour cela, Google fourni un helper pour savoir ou non s'il faut afficher un message d'information à l'utilisateur (graphique).
Cela se fera avec la méthode shouldShowRequestPermissionRationale

    if (shouldShowRequestPermissionRationale(Manifest.permission.CALL_PHONE)) {
         new AlertDialog.Builder(MainActivity.this)
                                   .setMessage("Custom message to explain why you need a permission")
                                   .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                                       @Override
                                       public void onClick(DialogInterface dialog, int which) {
                                           ActivityCompat.requestPermissions(MainActivity.this,
                                                   new String[]{Manifest.permission.CALL_PHONE},
                                                   REQUEST_CODE_FIVE);
                                       }
                                   })
                                   .setNegativeButton("Cancel", null)
                                   .create()
                                   .show();
    }
    ActivityCompat.requestPermissions(MainActivity.this,
                                      new String[]{Manifest.permission.CALL_PHONE},
                                      REQUEST_CODE_FIVE);
    }


<div style="text-align:center;margin-bottom:50px">
    <a href="/images/posts/2015-09-AndroidMPermissions/p4.png" data-lightbox="group-1" title="Dialog d'explication sur une demande de permissions" class="inlineBoxes">
        <img class="medium" src="/images/posts/2015-09-AndroidMPermissions/p4.png" alt="Dialog d'explication sur une demande de permissions"/>
    </a>
</div>

### Le piège à éviter
Penser à vérifier régulièrement l'état des permissions dans le _onResume()_ de vos Activity ou Fragment, étant donné que l'utilsateur peut à tout moment les révoquer cela permettra d'éviter de nombreux crashs.




## Resources
Code source d'exemple : [https://github.com/fchauveau/android-permissions-sample](https://github.com/fchauveau/android-permissions-sample)

Doc développeur Android : [https://developer.android.com/preview/features/runtime-permissions.html](https://developer.android.com/preview/features/runtime-permissions.html)

Guidelines Android : [http://www.google.fr/design/spec/patterns/permissions.html](https://developer.android.com/preview/features/runtime-permissions.html)

Explication sur quand demander une permission : [https://www.youtube.com/watch?v=iZqDdvhTZj0](https://www.youtube.com/watch?v=iZqDdvhTZj0)
