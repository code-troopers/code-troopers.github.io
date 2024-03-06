---
author: Benjamin
cover: ../android5-banner.png
date: '2015-06-06'
tags:
- Android
- Librairie
title: Android Support Design Library
url: /2015/06/06/androiddesignlibrary/
aliases: 2015/06/06/AndroidDesignLibrary.html
---


Avez-vous déjà essayé de transformer vos applications Android pour les rendre conformes aux [guidelines Material](http://www.google.com/design/spec/material-design/introduction.html), si oui, vous avez dû comme nous, vous retrouver à importer plein de librairies tierces pour implémenter par exemple le `FAB button`, ou même personnaliser le code pour rendre le `NavigationDrawer` conforme (comme ce qui a pu être fait sur le squelette d'un [précédent article](http://code-troopers.com/2014/11/26/SqueletteAndroid5.html). Et bien tout ceci est fini (enfin en partie), grâce à la nouvelle librairie Android de Google [Design Support](http://developer.android.com/tools/support-library/features.html#design).



<div style="text-align:center">
<video width="270" height="444" controls>
  <source src="/videos/designlibrary-cheesesquare.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>
</div>

Pour le moment elle permet d'implémenter les composants Material suivants :

* TextInputLayout
* FloatingActionButton
* Snackbar
* TabLayout
* NavigationView
* CoordinatorLayout
* AppBarLayout
* CollapsingToolbarLayout

Je vous laisse consulter les différents articles trouvés sur le sujet pour avoir plus de détails :

* [L'article sur l'Android developers blog](http://android-developers.blogspot.fr/2015/05/android-design-support-library.html)
* [L'article sur medium.com](https://medium.com/android-bites/first-steps-with-the-design-support-library-8dcf06230ddd) : qui montre les nouveautés grâce à des petites vidéos mais montre aussi les problèmes (sûrement corrigés au moment où vous lirez cet article)
* [Un bout d'exemple avec du code pour le NavigationView](http://antonioleiva.com/navigation-view/)

Enfin, voici le [lien](https://github.com/chrisbanes/cheesesquare) vers le code source de l'application exemple faite par [Chris Banes](https://chris.banes.me/), montrant les principales nouveautés de cette librairie.


À vos applications !
