---
author: Cedric
cover: ../maven-banner.png
date: '2014-09-01'
tags:
- Maven
- Dependances
- Tips
title: Résoudre les conflits de dépendances
url: /2014/09/01/conflitsdependances/
aliases: 2014/09/01/ConflitsDependances.html
---


Lors de nos développements, nous reposons beaucoup sur des projets externes qui nous fournissent énormément de services
utiles. Dans un récent projet, nous avons eu besoin de faire fonctionner Neo4j conjointement à ElasticSearch. Jusqu'ici,
aucun soucis n'est à déplorer, mais nous avions une exigence particulière : il fallait que l'application puisse
démarrer automatiquement un serveur Neo4J ainsi qu'un serveur ElasticSearch sur les postes de développements (ainsi que
pour les tests d'intégration).


## Problème existant

Les deux outils que nous utilisons se basent sur Apache Lucene pour toute la partie indexation et accès aux données.
Mais, et c'est là que le problème se situe, ils n'utilisent pas les mêmes versions de Lucene.

    <!-- Extrait du pom d'ElasticSearch -->
    <dependency>
        <groupId>org.apache.lucene</groupId>
        <artifactId>lucene-core</artifactId>
        <version>4.9.0</version>
        <scope>compile</scope>
    </dependency>

<hr>

    <!-- Extrait du pom de Neo4j -->
    <dependency>
        <groupId>org.apache.lucene</groupId>
        <artifactId>lucene-core</artifactId>
        <version>3.6.2</version>
    </dependency>

ElasticSearch utilise la version 4.9.0, alors que Neo4J utilise la version 3.6.2. Ainsi, en fonction du bon vouloir du
`Classloader` qui sera utilisé par l'application, il se peut qu'ElasticSearch ou Neo4J refuse de fonctionner. La
difficulté pour comprendre et détecter le problème est qu'il se manifeste souvent par un obscur `NoClassDefFoundError`
ou `NoSuchMethodError` qui n'est pas des plus explicites (d'autant plus lorsque notre IDE nous montre une version qui
contient ledit symbole non trouvé).

## Solution de contournement

Le conflit est assez simple à contourner une fois qu'on a compris ce qui se passe. En fait, il y a deux classes portant
le même nom dans les classes chargées, par exemple `org.lucene.MaClass`, l'une effaçant l'autre aux yeux du
`ClassLoader`.
Une pratique courante est de renommer (ou relocate) le package de base d'une bibliothèque utilisée et de l'inclure dans
le fichier de package du projet, le plugin `maven-shade` est conçu dans cette optique.
Le choix fait est de renommer la dépendance Lucene dans Neo4J pour notre part, ainsi, nous avons forké le projet et
configuré le plugin `shade` pour qu'il inclue le contenu de la dépendance d'Apache Lucene et qu'il fasse le renommage de
`org.apache.lucene` en `shaded.org.apache.lucene`.

     <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>2.2</version>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>shade</goal>
                    </goals>
                    <configuration>
                        <createDependencyReducedPom>true</createDependencyReducedPom>

                        <artifactSet>
                            <includes>
                                <include>org.apache.lucene:*</include>
                            </includes>
                        </artifactSet>
                        <relocations>
                            <relocation>
                                <pattern>org.apache.lucene</pattern>
                                <shadedPattern>shaded.org.apache.lucene</shadedPattern>
                            </relocation>
                        </relocations>
                    </configuration>
                </execution>
            </executions>
      </plugin>

## Déploiement et nommage

Pour ne pas polluer les dépôts, le numéro de version modifié a été postfixé par `-shaded`. Le déploiement a été fait sur
un dépôt Maven qui est en fait un simple repository Github.
Le commit correspondant à cette modification [est consultable
ici](https://github.com/CedricGatay/neo4j/commit/452f58fca69ffe3b1d0eab6261b8342f8da95889).
