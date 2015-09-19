---
layout: post
title: "Android M - Nouvelle gestion de permission"
author: Florian
cover: android5-banner
tags: [Android, Permission]
---

# Nouvelle approche

Avec la prochaine release d'`Android 6.0 Marshmallow` il va y avoir du changement au niveau de la gestion des permissions.
Terminé la popup qui demande les 10 autorisations au moment du téléchargement de l'appli, maintenant les développeurs vont pouvoir demander les permissions au moment ou elles seront nécessaires.

### Permissions irrévocable
Puisqu'il va falloir devoir demander à l'utilisateur pour chaques permissions Google à décider que certaines anciennes permissions n'auront plus besoin d'être demandées,
 ce sont les `Normal Permissions`. Il s'agit des permissions qui n'engendre pass de risque sur la vie privée ou sécurité de l'utilisateur, c'est par exemple le cas pour l'acces a internet ou l'acces au vibreur
 la liste complète est disponible [ici](https://developer.android.com/preview/features/runtime-permissions.html#normal).
 

### Guidelines
Pour ce qui est de l'UX Google a fait plusieurs recommendations dont certaines sont plus importantes que d'autre à mon avis :

 * Ne demander une permisission qu'au moment ou on en a vraiment besoin  : ne pas faire un popup au lancement qui va demander toutes les permissions
 * Faire le maximum pour ne pas gâcher l'experience utilisateur même si il refuse une permission : donc prévoir un mode dégradé autant que possible 
 * Utiliser les méthodes disponible dans appcompat plutot que celle du sdk de base
 
 
# Mise en pratique
Avant de commencer à coder une derniàre chose à garder à l'esprit, c'est que l'utilisateur peut à tout moment révoquer une permission (meme une fois que l'appli est lancée et tourne en background)
via le détail de l'application. Il faudra donc adapter la gestion de ces permission à cette éventualitée.

<div style="text-align:center;margin-bottom:50px">
    <a href="/images/postAndroidPermission/p6.png" data-lightbox="group-1" title="Le téléchargement des fichiers sur un CDN [alt+entrée]" class="inlineBoxes">
        <img class="medium" src="/images/postAndroidPermission/p6.png" alt="Le téléchargement des fichiers sur un CDN [alt+entrée]"/>
    </a>
    <a href="/images/postAndroidPermission/p5.png" data-lightbox="group-1" title="Le téléchargement des fichiers sur un CDN [alt+entrée]" class="inlineBoxes">
            <img class="medium" src="/images/postAndroidPermission/p5.png" alt="Le téléchargement des fichiers sur un CDN [alt+entrée]"/>
    </a>
</div>

## Ne pas implémenter les nouvelles permissions
Chose importante à savoir, vous n'êtes pas obligé d'implémenter cette nouvelle gestion de permission.
En effet puisqu'elle demande du développoment supplémentaire, de nombreuse appli ne seront pas mise à jour et donc garderont l'ancien fonctionnement. 
Si c'est ce que vous souhaitez, et pour ne pas nuir au bon fonctionnement de votre appli,  il vous suffit de ne pas cibler le dernier `sdk` dans votre build.gradle et de rester sur le `22`.

## Implémenter les nouvelles permissions
Pour cela on va avoir besoin de 3 méthode principalement disponible dans le sdk 23 ainsi que dans la lib appcompat :

* `requestPermissions()`
* `onRequestPermissionsResult()`
* `shouldShowRequestPermissionRationale()`


### Build.gradle 
Permirère chose, cibler la dernier version du `sdk` : `23`.
Et en bonus importer appcompat pour bénéficier des méthodes helpers de google.
  
    compileSdkVersion 23
    defaultConfig {
        targetSdkVersion 23
    }
    dependencies {
        compile 'com.android.support:appcompat-v7:23.0.1'
    }

### AndroidManifest.xml
Ensuite déclarer les permissions désirée dans l'application, normalement pas de changement par rapport a votre configuration actuelle
  
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_CONTACTS" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.SEND_SMS" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.CALL_PHONE" />

N'oubliez pas d'y déclarer aussi les `Normal Permissions` qui bien qu'elles soit automatiquement accordées ont toujours besoin d'être déclarée.

### Dans une activité
Dans un premier temps il faut vérifier si une permission est déjà accordée ou non
  
    ContextCompat.checkSelfPermission(context, Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;

Si la permission n'est pas accordée, il va falloir la demander, dé préférence lors d'une action utilisateur, par exemple au click sur un bouton

    ActivityCompat.requestPermissions(MainActivity.this,
                                      new String[]{Manifest.permission.CAMERA},
                                      REQUEST_CODE_ONE);
                                      
                                      
<div style="text-align:center;margin-bottom:50px">
    <a href="/images/postAndroidPermission/p1.png" data-lightbox="group-1" title="Le téléchargement des fichiers sur un CDN [alt+entrée]" class="inlineBoxes">
        <img class="medium" src="/images/postAndroidPermission/p1.png" alt="Le téléchargement des fichiers sur un CDN [alt+entrée]"/>
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
Meme si cela est déconseillé il peut arriver d'avoir besoin de plusieurs permission lors de la même action utilisateur,
pour cela il suffi de passer plusieurs permission dans le tableau passé en parametre du resestPermission

    ActivityCompat.requestPermissions(MainActivity.this,
                                      new String[]{Manifest.permission.READ_CONTACTS, Manifest.permission.ACCESS_FINE_LOCATION},
                                      REQUEST_CODE_TWO);

<div style="text-align:center;margin-bottom:50px">
    <a href="/images/postAndroidPermission/p2.png" data-lightbox="group-1" title="Le téléchargement des fichiers sur un CDN [alt+entrée]" class="inlineBoxes">
        <img class="medium" src="/images/postAndroidPermission/p2.png" alt="Le téléchargement des fichiers sur un CDN [alt+entrée]"/>
    </a>
<a href="/images/postAndroidPermission/p3.png" data-lightbox="group-1" title="Le téléchargement des fichiers sur un CDN [alt+entrée]" class="inlineBoxes">
        <img class="medium" src="/images/postAndroidPermission/p3.png" alt="Le téléchargement des fichiers sur un CDN [alt+entrée]"/>
    </a>
</div>

### Expliquer à l'utilisateur pourquoi il doit autoriser une permission
Il arrivera surement que certain utilsateur refusent des permissions et que cela détériore l'experience utilisateur sur l'application. Pour cela google fourni un helper pour savoir ou non si il faut afficher un message d'information à l'utiilsateur (graphique).
Cela se passa avec la méthode shouldShowRequestPermissionRationale

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
    <a href="/images/postAndroidPermission/p4.png" data-lightbox="group-1" title="Le téléchargement des fichiers sur un CDN [alt+entrée]" class="inlineBoxes">
        <img class="medium" src="/images/postAndroidPermission/p4.png" alt="Le téléchargement des fichiers sur un CDN [alt+entrée]"/>
    </a>
</div>

### Le piège à éviter
Penser à re-vérifier l'état des permission dans le _onResume()_ de vos Activity ou Fragment, étant donné que l'utilsateur peut à tout moment les révoker cela permettra d'éviter de nombreux crashs.




## Resources
Code source d'exemple : [https://github.com/fchauveau/android-permissions-sample](https://github.com/fchauveau/android-permissions-sample)

Doc developpeur Android : [https://developer.android.com/preview/features/runtime-permissions.html](https://developer.android.com/preview/features/runtime-permissions.html)

Guidelines Android : [http://www.google.fr/design/spec/patterns/permissions.html](https://developer.android.com/preview/features/runtime-permissions.html)

