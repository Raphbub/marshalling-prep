# Marshalling prep

### Description

Cette expérience VR nous plonge dans la peau d'un *groud marshaller*, une personne chargée de guider les avions au sol, notamment dans la phase de parking. Après un réveil soudain, il faut rassembler ses affaires avant de pouvoir sortir sur le tarmac pour accomplir sa mission.

#### Déroulé

Au début, un écran noir attend l'utilisateur avec un message sur l'objectif général. Une fois la scène chargée, l'utilisateur peut appuyer sur la touche X ou une touche de son clavier pour démarrer la scène (après un petit décompte).

Pendant le *fade-out*, une sonnerie retentit et le personnage que l'on incarne se lève sur les derniers sons. On se retrouve une pièce avec une grande fenêtre en face de nous (avec un store à lamelles couvrant sa partie supérieure) et une porte sur la gauche. Par la fenêtre, on aperçoit le tarmac d'un aéroport avec une ligne de guidage pour le roulage au sol (*taxiway*). Cette ligne est bordée de guides lumineux, des petites lumières vertes. La ligne se divise sur la gauche avec un virage qui amène derrière le mur de la porte. Parfois, un petit avion passe sur cette ligne et l'on entend le bruit de son moteur.

La pièce est froide et grise, principalement faite de ciment avec une porte en bois. Elle est éclairée par un néon qui a tendance à clignoter et grésiller quelque peu. Le mobilier est sommaire : un bureau, une chaise de bureau, un tabouret, une petite table et un casier. Sur la table se trouvent un casque de protection auditive et des baguettes lumineuses servant à guider les avions. Il faut s'emparer de se matériel avant de se diriger vers la porte pour poursuivre l'aventure...

### Installation / lancement

Pour profiter de cette scène VR, il faut procéder de la façon suivante: 

1. Cloner le repo
2. Connecter un gamepad à son ordinateur (ex. une manette DualShock3 de PS3).
3. Lancer un serveur local dans le dossier marshalling-prep (à l'aide de l'extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) de Visual Studio Code par ex.)
4. Ouvrir la page web correspondante (localhost:xxxx)
5. Autoriser la lecture de média audio et vidéo, si ce n'est pas déjà fait
6. Réactualiser la page
7. (Facultatif, mais plus agréable) Attendre une petite dizaine de seconde...
8. Profiter de l'expérience (parfois, il est nécessaire de "réveiller" sa manette en appuyant sur un bouton)

### Technologies

Le travail est réalisé à l'aide d'[A-Frame](https://aframe.io/), une librairie destinée au développement 3D/AR/VR pour le web. Les principaux éléments peuvent tous être déclarés en HTML et il est possible d'interagir avec, à l'aide de JavaScript.

### Sources et ressources

Le fichier [sources_ref.md](sources_ref.md) détaille les différents éléments utilisés (assets, blogs, tutos, documentation) pendant la conception du travail.

### Contexte de développement

Ce projet a été développé dans le cadre du cours _Réalité virtuelle et augmentée_ dispensé par Isaac Pante (SLI, Lettres, UNIL)

#### Difficultés rencontrées

Pour une première avec de la modélisation 3D web, il y a quelques éléments problématiques qui n'ont pu être réglés (cf. [Issues](https://github.com/Raphbub/marshalling-prep/issues)).

Les différents *assets* audio ont tendance à ne pas charger alors que, malgré leur simplicité, ils donnent du corps à la scène. Le réveil situe un peu l'intrigue et les sons de l'hélice et du néon habillent sonalement la scène. (Il paraît tout de même que le bruit fait par l'ordinateur en "rendant" la scène peut faire penser à un avion...)

Les *assets* 3D sont assez différents les un des autres et un downscaling a été nécessaire sur certains éléments (ex. la veste haute visibilité du vestiaire) qui ralentissaient trop le modèle.

Les interactions avec le curseur ont été plutôt compliquées à saisir et les quelques lumières de la pièce ne sont pas forcément optimalement placées ou orientée.

Finalement, malgré les difficultés et la sobriété du projet, il a permis des apprentissages significatifs du développement de scènes 3D...avec quelques frustrations quand même.