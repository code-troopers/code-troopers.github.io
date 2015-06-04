---
layout: post
title: Android Support Design Library
author: Benjamin
cover: banner-android
tags: [Android, Librairie]
---

Avez-vous déjà essayé de transformer vos applications Android pour les rendre conforme au [guidelines `Material`](http://www.google.com/design/spec/material-design/introduction.html), si oui, vous avez du, comme nous, vous retrouver à importer plein de librairies tierces pour implémenter par exemple le `FAB button`, ou même personnaliser le code pour rendre le `NavigationDrawer` conforme (comme ce qui a pu être fait sur le squelette d'un [précédent article](http://code-troopers.com/2014/11/26/SqueletteAndroid5.html). Et bien tout ceci est fini (enfin en partie), grace à la nouvelle librairie Android de Google [`Design Support`](http://developer.android.com/tools/support-library/features.html#design).

Elle permet d'implémenter les composants Material suivants :

* TextInputLayout : for showing EditText hint and error text as floating labels.
* FloatingActionButton for implementing a primary action on your interface as a floating action button, supporting either default or mini sizes.
* Snackbar for providing lightweight feedback with an optional action in an animated snackbar.
* TabLayout for implementing fixed and scrollable tabs as well as easy integration with ViewPager.
* NavigationView for implementing navigation drawer contents, including the ability to inflate menu items via a Menu Resource.
* CoordinatorLayout, a general purpose layout, used for building dependencies between sibling views and allowing easy scrolling reactions between components via CoordinatorLayout.Behavior. Many of the Design Library components rely on being a child of a CoordinatorLayout.
* AppBarLayout, a container for a Toolbar and other views (such as TabLayout) for reacting to scrolling events by scrolling off the screen, becoming visible in reaction to a downward scroll, or collapsing/uncollapsing before scrolling off/onto the screen.
* CollapsingToolbarLayout for controlling how a Toolbar collapses. A toolbar may collapse by: pinning components to the top of the screen while it collapses, introducing parallax scrolling of components such as an ImageView, or adding a content scrim color when the view is partially collapsed.

Example: application chris bane + video

Autres posts : medium

