// Actions lorsqu'une touche du clavier est pressée
function removeRectKeyPressed() {
  // On fait disparaître le rectangle
  fadeRectangle();
  // On enlève l'EV équivalent sur le gamepad
  window.removeEventListener('gamepadconnected', gamePadConnected);
};

// Ajout du message relatif au gamepad
function addGamepadMsg() {
  document.getElementById('fullscreen-rect').innerHTML += "<p style='font-size: 14px;'>Manette détectée, appuyez sur X pour commencer</p>"
}

// Action pour, de façon répétée, vérifier si le bouton X [0] est pressé
function removeRectGpPressed(e) {
    let gp = navigator.getGamepads()[e.gamepad.index];
    // Fonction à exécuter en continu pour saisir l'appui sur la touche
    let intervalID = setInterval(function() {
      if (gp.buttons[0].pressed) {
          // If the button is pressed, clear the interval
          clearInterval(intervalID);
          // On fait disparaître le rectangle
          fadeRectangle();
          // On enlève l'EV équivalent sur le clavier
          document.removeEventListener('keydown', removeRectKeyPressed);
      };
    }, 100)
};

// Actions lors de la connexion du gamepad
function gamePadConnected(e) {
  console.log("Gamepad connected");
  addGamepadMsg();
  removeRectGpPressed(e);
}

// Faire disparaître le rectangle
// Complémentaire au paramètre transition du .css
function fadeRectangle() {
  let rect = document.getElementById('fullscreen-rect')
  rect.style.opacity = '0';
  setTimeout(function() {
    rect.remove();
  }, 1500);
}

// Ajouter les deux EV aux évènements respectifs
document.addEventListener('keydown', removeRectKeyPressed, {once: true});
window.addEventListener("gamepadconnected", gamePadConnected);

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
    modelEl.setAttribute('id', 'plane-model');
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

// Fonction de déplacement de l'avion
function movePlaneAlongX(deltaX, negative = true) {
  // Récupérer le modèle de l'avion
  let plane = document.getElementById('plane-model');

  // Récupérer la position initiale
  let position = plane.getAttribute('position');

  // Augmenter ou diminuer la position d'une unité
  if (negative) {
    position.x -= deltaX;
  } else {
    position.x += deltaX;
  }

  // Changer la position avec les nouvelles coordonnées
  plane.setAttribute('position', position);
}
