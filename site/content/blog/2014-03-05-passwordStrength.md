---
author: Florian
cover: images/banner/passwordStrength-banner.png
date: '2014-03-05'
tags:
- Security
- Play2
title: Strength Password Indicator Pour Play2
url: /2014/03/05/passwordstrength/
aliases: 2014/03/05/passwordStrength.html
---


## Introduction

Le grand public commence tout doucement à être sensibilisé à l’importance d’avoir un mot de passe <b>sécurisé</b>, en partie grâce aux reportages TV de plus en plus nombreux sur ce domaine, mais surtout par les différentes fuites
ou vols de bases de données qui arrivent de plus en plus fréquemment.

Il faut donc profiter de cette sensibiliation et en tant que développeurs, nous avons la possibilité d'inciter nos
utilisateurs à utiliser un bon mot de passe. Alors, au travail !

Quoi de mieux pour faire passer un message simple à un utilisateur qu'un peu de couleur (savamment dosée bien sûr).
Nous allons donc parler de feedback visuel. Prenons par exemple une création de compte Google.
Lorsqu'on entre le mot de passe, Google nous informe de la qualité de la chaîne saisie via un pop-up contenant une progressbar de couleur, accompagnée d'un petit commentaire.

~~~html
<a href="/images/posts/2014-03-05-passwordStrength/googleWay.png" data-lightbox="image-1"
   title="Indicateur de niveau de sécurité by Google">
    <img class="mini" src="/images/posts/2014-03-05-passwordStrength/googleWay.png"
         alt="Indicateur de niveau de sécurité by Google"/>
</a>
~~~

À mon goût, c'est déjà trop, car c'est bien connu, aucun utilisateur ne lit les informations qu'on lui donne.
Donc se contenter d'une barre de progression qui change de couleur sera très bien pour rapidement améliorer l'expérience utilisateur.

## zxcvbn : la lib qui va bien

Il existe déjà de nombreux algorithmes qui essaient de calculer la complexité d’un mot de passe.
Donc au lieu de tenter d'inventer un truc bancal, j’ai décidé d’en utiliser un qui semble plutôt abouti : <a href="https://github.com/lowe/zxcvbn">zxcvbn</a>.

Derrière ce nom barbare on retrouve dans ce projet plusieurs éléments intéressants.
L’avantage de celui-ci de mon point de vue est qu’en plus de calculer la complexité, il utilise aussi un
dictionnaire des mauvais mots de passe. Ainsi ‘123456’ ou ‘password’ seront directement qualifés de mauvais mots de passe.

## Branchement dans play

Le branchement dans play, va consister en l'ajout de bases au niveau de l'input password que l'on veux customiser,
puis l'appel de la fonction javascript de zxcvbn qui se charge de calculer le niveau de complexité de la chaîne de caractère qui est saisie par l'utilisateur.

Pour cela, on va dans un premier temps inclure les libs qui vont bien :

* zxcvbn (à récupérer sur <a href="https://github.com/lowe/zxcvbn">github</a>).
* jquery et bootstrap pour l'affichage du feedback

~~~html
<script type="text/javascript" src="/assets/js/zxcvbn-async.js"></script>

<script src="//code.jquery.com/jquery-2.0.3.min.js"></script>
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
~~~

Ensuite, il faut customiser le champ password en question, pour lui ajouter les quelques attributs qui seront affichés en fonction de la saisie utilisateur

~~~html
<div class="col-md-6">
    @input(
    fakeForm("password"),
    '_label -> Messages("Password"),
    'class -> "form-control") { (id, name, value, args) =>
    <input type="password" name="@name" id="@id" @toHtmlArgs(args)>
    <div class="progress" style="height: 5px; margin-bottom: 0px;">
        <div class="progress-bar" id="pwdStrengthProgress" style="width: 0%;"></div>
    </div>
    <span class="label" id="pwdStrengthLabel" style="position: relative;float: right;"></span>
    }
</div>
~~~

Et pour finir, le script qui, lors de la saisie utilisateur, va faire appel à zxcvbn pour savoir ce qu'il faut afficher comme feedback

~~~html
<script>
    $(document).ready(function () {
        $('#password').keyup(function (event) {
            var password = $('#password').val();
            var result = zxcvbn(password);
            $('#entropy').html(result.entropy);

            // label based on score (0,1=weak; 2=ok; 3 =good; 4=great)
            var $label = $('#pwdStrengthLabel');
            if (password.length === 0) {
                $label.hide();
            } else {
                $label.show();
            }
            $label.html(result.entropy < 33 ? "Faible" : result.entropy < 66 ? "Moyen" :
                                                       result.entropy < 80 ? "Bon" : "Excellent");
            $label.removeClass("label-danger label-warning label-success")
                    .addClass(result.entropy < 33 ? "label-danger" :
                              result.entropy < 66 ? "label-warning" : "label-success");

            // progress bar based on entropy (tops out at 100)
            var $progress = $('#pwdStrengthProgress');
            $progress.css('width', result.entropy + '%');
            $progress.removeClass("progress-bar-danger progress-bar-warning progress-bar-success")
                    .addClass(result.entropy < 33 ? "progress-bar-danger" :
                              result.entropy < 66 ? "progress-bar-warning" : "progress-bar-success");
        });
    });
</script>
~~~

Ce script est largement inspiré de : <a href="https://github.com/johnbeil/bootstrap3-zxcvbn/blob/master/index.html">https://github.com/johnbeil/bootstrap3-zxcvbn/blob/master/index.html</a>

## Résultats

Comme vous pouvez le voir dans le js qui traite le retour de la fonction zxcvbn, il y a 3 niveaux de couleurs qui se déclenchent à différents niveaux, combinés à un simple label

<a href="/images/posts/2014-03-05-passwordStrength/weak.png" data-lightbox="image-1"
   title="Feedback pour un mauvais mot de passe">
    <img class="mini" src="/images/posts/2014-03-05-passwordStrength/weak.png" alt="Feedback pour un mauvais mot de passe"/>
</a>
<a href="/images/posts/2014-03-05-passwordStrength/fair.png" data-lightbox="image-1"
   title="Feedback pour un mot de passe moyen">
    <img class="mini" src="/images/posts/2014-03-05-passwordStrength/fair.png" alt="Feedback pour un mot de passe moyen"/>
</a>
<a href="/images/posts/2014-03-05-passwordStrength/good.png" data-lightbox="image-1"
   title="Feedback pour un bon mot de passe">
    <img class="mini" src="/images/posts/2014-03-05-passwordStrength/good.png" alt="Feedback pour un bon mot de passe"/>
</a>
<a href="/images/posts/2014-03-05-passwordStrength/great.png" data-lightbox="image-1"
   title="Feedback pour un mot de passe parfait">
    <img class="mini" src="/images/posts/2014-03-05-passwordStrength/great.png" alt="Feedback pour un mot de passe parfait"/>
</a>

## Sources

Vous pouvez retrouver les sources correspondants à cet exemple dans un projet play sur github à cette adresse : <a href="https://github.com/fchauveau/passwordStrengthBar">https://github.com/fchauveau/passwordStrengthBar</a>

## Pour aller plus loin

zxcvbn propose 6 indicateurs (<b>entropy, crack_time, crack_time_display, score, match_sequence, calculation_time</b>)
lors de son contrôle du mot de passe. Dans mon cas je n'ai utilisé que l'entropie
pour mes niveaux d'indicateurs.
