// Actions lorsqu'une touche du clavier est pressée
function removeRectKeyPressed() {
  // On fait disparaître le rectangle
  fadeRectangle();
  // On enlève l'EV équivalent sur le gamepad
  window.removeEventListener('gamepadconnected', gamePadConnected);
}

// Ajout du message relatif au gamepad
function addGamepadMsg() {
  document.getElementById('infos').style.fontSize = '16px';
  document.getElementById('infos').innerHTML = "Manette détectée, attendre la fin du chargement et appuyez sur X pour commencer";
}

// Action pour, de façon répétée, vérifier si le bouton X [0] est pressé
// Repris en partie de StackOverflow, cf sources_ref
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
  }, 50)
}

// Actions lors de la connexion du gamepad
function gamePadConnected(e) {
  console.log("Gamepad connected");
  addGamepadMsg();
  removeRectGpPressed(e);
}

/* Fonction pour affichage du décompte et disparition du message d'accueil
Cette fonction a été améliorée avec l'aide de ChatGPT à l'aide du prompt suivant
I want that instead of instantly fading, there is a countdown of 5 seconds (shown on screen)
before it starts fading*/
function fadeRectangle() {
  let countdown = 5;
  let countdownDisplay = document.createElement('p');
  countdownDisplay.id = 'countdown';
  countdownDisplay.innerText = 'Début dans ' + countdown + ' secondes';
  let rect = document.getElementById('fullscreen-rect');
  rect.appendChild(countdownDisplay);

  let countdownInterval = setInterval(function() {
    countdown--;
    if(countdown == 3) {
      document.getElementById('alarm-clock-ent').components.sound.playSound()
      countdownDisplay.innerText = 'Début dans ' + countdown + ' secondes';
    } else if (countdown == 1) {
      countdownDisplay.innerText = 'Début dans ' + countdown + ' seconde';
      flickerSVGobjectives();
    } else if (countdown <= 0) {
        clearInterval(countdownInterval);
        // Déclencher les éléments de mise en place pendant le fading
        rect.style.opacity = '0';
        getUp();
        // Évite de jouer le son si l'Interval par sur un clignotement long
        randomNeonFlickering(noSound=true);
        setTimeout(randomPlaneTaxiing, 10000);
        setTimeout(function() {
            rect.remove();
        }, 1500);
    } else {
      countdownDisplay.innerText = 'Début dans ' + countdown + ' secondes';
    }
  }, 1000);
}

// Ajouter les deux EL aux évènements respectifs
document.addEventListener('keydown', removeRectKeyPressed, {once: true});
window.addEventListener("gamepadconnected", gamePadConnected);


// Ajout des lumières du taxiway
function addTaxywayLights() {
  // Sélection de la scène
  let sceneEl = document.querySelector('a-scene');
  // Boucle sur la longueur plus ou moins visible du taxiway
  for (let i = -27; i <= 20; i += 5) {
    // Ajout du cylindre
    let cyl = document.createElement('a-cylinder');
    cyl.setAttribute('position', `${i} 0.01 -14.35`);
    cyl.setAttribute('radius', '0.08');
    cyl.setAttribute('height', '0.15');
    cyl.setAttribute('rotation', '90 0 0');
    cyl.setAttribute('material', 'color: green');
    sceneEl.appendChild(cyl);

    // Ajout de la lumière juste au-dessus
    let pointLight = document.createElement('a-light');
    pointLight.setAttribute('type', 'point');
    pointLight.setAttribute('angle', '45');
    pointLight.setAttribute('position', `${i} 0.2 -14.35`);
    pointLight.setAttribute('color', 'green');
    pointLight.setAttribute('intensity', '1');
    pointLight.setAttribute('distance', '1');
    pointLight.setAttribute('decay', '0.1');
    sceneEl.appendChild(pointLight);
  } 
}

addTaxywayLights();

// Déplace l'avion donné sur une distance, tous les tps millisecondes
function movePlane(dist, tps, planeId = 'plane-model') {
  // Récupérer le modèle de l'avion
  let plane = document.getElementById(planeId);
  let ogPosition = Object.assign({}, plane.getAttribute('position'));
  // Récupérer le son de l'avion
  let propSound = plane.children[0];
  propSound.components.sound.playSound();

  let deplIntvl = setInterval(function() {
    // Bouger l'avion de x dist
    let xPos = movePlaneAlongX(dist, true, planeId);
    // Quand il arrive dans le brouillard, on le repositionne
    if (xPos <= -55) {
      // Arrêt de la boucle intervalle, du son et réinitialisation
      clearInterval(deplIntvl);
      setTimeout(propSound.components.sound.stopSound(), 2000);
      setTimeout(plane.setAttribute('position', ogPosition), 2000);
    }
  }, tps);
}

// Fonction de déplacement de l'avion
function movePlaneAlongX(deltaX, negative = true, planeId = 'plane-model') {
  // Récupérer le modèle de l'avion
  let plane = document.getElementById(planeId);
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
  return(position.x)
}

// Pour tester dans la console
// movePlane(1, 50)

/* Passage aléatoire de l'avion, comme pour le néon, la fonction a
été en partie générée grâce à ChatGPT, prompt How can I have a function
get called repeatedly in a range of time ? */
function randomPlaneTaxiing() {
  movePlane(0.5, 50);
  let nextDelay = Math.random() * (90000 - 60000) + 60000;
  setTimeout(randomPlaneTaxiing, nextDelay);
}

// Jouer le son du néon
function playNeonSound() {
  document.getElementById('neon-sound-ent').components.sound.playSound()
}

// Arrêter le son du néon
function stopNeonSound() {
  document.getElementById('neon-sound-ent').components.sound.stopSound()
}

// Clignotement du néon
function flickerNeonLight(noSound = false) {
  // Récupérer la lumière et son intensité
  let neon = document.getElementById('neon-light');
  let intensiteDepart = neon.getAttribute('light').intensity;
  // Clignoter entre 1 et 3 fois
  let flicker = Math.ceil(Math.random() * 3);
  let soundPlayed = false; // Indicateur pour contrôler la lecture du son

  // Clignotement tout les 200ms
  let countdownInterval = setInterval(function() {
    // Si "long" clignotement et le son n'a pas encore été joué
    if (flicker > 2 && !soundPlayed && !noSound) {
      playNeonSound();
      soundPlayed = true; // Marquer que le son a été joué
    }
    flicker--;
    neon.setAttribute('light', 'intensity', 0);

    setTimeout(function() {
      /* Mettre la condition dans le setTimeout, sinon l'intensité est 
      divisée par 2 après avoir été réinitialisée >.< */
      neon.setAttribute('light', 'intensity', intensiteDepart/2);
      // Vérifier si c'est le dernier clignotement
      if (flicker <= 0) {
        neon.setAttribute('light', 'intensity', intensiteDepart);
        // Arrêter le son seulement après tous les clignotements
        if (soundPlayed) {
          stopNeonSound();
        }
        clearInterval(countdownInterval);
      }
    }, 100);
  }, 200);
}

// Déclenchement aléatoire sur un des deux ou les deux
function randomNeonFlickering(noSound = false) {
  flickerNeonLight(noSound);
  let nextDelay = Math.random() * (80000 - 40000) + 40000;
  setTimeout(randomNeonFlickering, nextDelay);
}

// Animation de se lever au début
function getUp() {
  let rig = document.getElementById('rig');
  // Reset si bougé pendant l'écran noir
  rig.setAttribute('position', {x:0.5, y:1.25, z:2.3})
  // Ajout de l'animation au rig
  let anim = 'property: position; to: 0.1 1.75 2.2; dur: 1100; easing: linear;';
  rig.setAttribute('animation', anim);
}

/* TODO NE MARCHE TOUJOURS PAS*/
AFRAME.registerComponent('raycaster-listen', {
  init: function () {
      this.el.addEventListener('raycaster-intersected', evt => {
          this.raycaster = evt.detail.el;
      });
      this.el.addEventListener('raycaster-intersected-cleared', evt => {
          this.raycaster = null;
      });
  },

  tick: function () {
      if (!this.raycaster) {
          return; // No raycaster, exit the function
      }

      let intersection = this.raycaster.components.raycaster.getIntersection(this.el);
      if (intersection) {
          console.log('Intersected entity:', intersection.el); // Log the intersected entity
      }
  }
});

// Diminution du volume des sons
function muffleSound() {
  // Récupérer tous les sons
  let soundEls = document.querySelectorAll('[sound]');
  // On diminue le volume des sons par deux
  soundEls.forEach(function(el) {
    let currentVolume = el.components.sound.data.volume;
    el.setAttribute('sound', 'volume', currentVolume/2);
  });
}

// Modifier le fill des SVG pour qu'ils soient blancs/verts brillants pour "atteint/récupéré"
function changeSvgElement(objectif) {
  let svgVeste = document.getElementById('svg_veste');
  let svgBagGauche = document.getElementById('svg_bag_gauche');
  let svgBagDroite = document.getElementById('svg_bag_droite');
  let svgCasque = document.getElementById('svg_casque');

  if (objectif === 'baguette') {
    // On ne remplit la baguette de droite qui si celle de gauche est déjà "colorée"
    if (svgBagGauche.getAttribute('fill') == 'url(#barGradientWhiteBottom)') {
      svgBagDroite.setAttribute('fill', 'url(#barGradientWhiteBottom)');
    } else {
      svgBagGauche.setAttribute('fill', 'url(#barGradientWhiteBottom)');
    }
  } else if (objectif === 'casque') {
    svgCasque.style.fill = svgCasque.style.fill == 'white' ? 'black' : 'white';
  } else {
    svgVeste.style.fill = svgVeste.style.fill == 'white' ? 'black' : 'white';
  }
}

// Alterner le fill des SVG du noir au blanc et vice versa
function turnObjOnOff(elId, isBaguette) {
  let element = document.getElementById(elId);
  if (isBaguette) {
    let currentFill = element.getAttribute('fill');
    let newFill = currentFill == 'url(#barGradient)' ? 'url(#barGradientWhiteBottom)' : 'url(#barGradient)';
    element.setAttribute('fill', newFill);
  } else {
    let currentFill = element.style.fill;
    let newFill = currentFill == 'white' ? 'black' : 'white';
    element.style.fill = newFill;
  }
}

// Faire clignoter les objectifs pour attirer l'attention dessus
function flickerSVGobjectives() {
  let flicker = 21; // Impair pour finir éteint
  let intervalId = setInterval(() => {
    // "Allumer/éteindre" les SVG
    turnObjOnOff('svg_veste', false);
    turnObjOnOff('svg_bag_gauche', true);
    turnObjOnOff('svg_bag_droite', true);
    turnObjOnOff('svg_casque', false);

    flicker--;
    if (flicker <= 0) {
      // Le casque et la veste commencent alternés, il faut les rétablir en noir au dernier clignotement
      changeSvgElement('casque');
      changeSvgElement('veste');
      clearInterval(intervalId);
    }
  }, 250);
}

