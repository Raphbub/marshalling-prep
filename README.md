# Marshalling prep

### Description

Description du projet...

#### Déroulé

Au début, un écran blanc attend l'utilisateur avec un message sur les objectifs généraux. J'ai inclus ce message et les fonctionnalités liées (détection d'une touche (clavier ou manette) préssée, *fade-out* du message) en pensant que cette interaction de l'utilisateur permettrait de lire du son ensuite... Je me suis trompé (il faut juste changer ça dans les réglages du navigateur), mais j'ai quand même laissé cette fonctionnalité qui permet aussi de confirmer que la manette a été détectée.

Après le *fade-out*, on entend une sonnerie et on se retrouve dans une pièce avec une grande fenêtre en face de nous et une porte sur la gauche...

### Installation / lancement

Pour profiter de cette scène VR, il faut procéder de la façon suivante: 

1. Cloner le repo
2. Connecter un gamepad à son ordinateur (ex. une manette DualShock3 de PS3).
3. Lancer un serveur local dans le dossier marshalling-prep (à l'aide de l'extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) de Visual Studio Code par ex.)
4. Ouvrir la page web correspondante (localhost:xxxx)
5. Autoriser la lecture de média audio et vidéo, si ce n'est pas déjà fait
6. Réactualiser la page
7. Profiter de l'expérience (parfois, il est nécessaire de "réveiller" sa manette en appuyant sur un bouton)

### Technologies

Le travail est réalisé à l'aide d'[A-Frame](https://aframe.io/), une librairie destinée au développement 3D/AR/VR pour le web. Les principaux éléments peuvent tous être déclarés en HTML et il est possible d'interagir avec, à l'aide de JavaScript.

### Sources et ressources

Le fichier [sources_ref.md](sources_ref.md) détaille un peu plus les différents éléments utilisés (blogs, tutos, documentation) pendant la conception du travail.

On mentionnera ici la provenance des assets par pseudo ordre alphabétique.

- [Alarme (réveil), Pixabay](https://pixabay.com/sound-effects/bedside-clock-alarm-95792/)
- [Avion, lucas_pl](https://www.turbosquid.com/3d-models/piper-pa-18-supercub-fbx-free/1041070)
- [Bruitage moteur, Pixabay](https://pixabay.com/sound-effects/propellerwav-14433/)

### Contexte de développement

Ce projet a été développé dans le cadre du cours _Réalité virtuelle et augmentée_ dispensé par Isaac Pante (SLI, Lettres, UNIL)
