/* Pour gagner un peu de temps de chargement, on attend que le contenu soit chargé
avant d'ajouter le modèle de l'avion à la scène (en dehors du champ de vision) 
Adapté de la génération par ChatGPT pour le prompt 'In A-Frame, using javascript, write a function
using the loaded event so that a model is added to the scene only when loaded' */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#piper-plane').addEventListener('loaded', function () {
    // On sélectionne la scène et on créé un objet
    var sceneEl = document.querySelector('a-scene');
    var modelEl = document.createElement('a-obj-model');

    // Définition des attributs
    modelEl.setAttribute('src', '#piper-plane');
    modelEl.setAttribute('mtl', '#piper-plane-material');
    modelEl.setAttribute('position', '50 -0.3 -15');
    modelEl.setAttribute('scale', '1 1 1');
    // Pencher légèrement le modèle pour que la roue arrière "touche" le sol
    modelEl.setAttribute('rotation', '-12 -90 0');

    // Ajouter l'élément (avec ses attributs définis) à la scène
    sceneEl.appendChild(modelEl);
  });
});