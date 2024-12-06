var radius = 240; 
var autoRotate = true; 
var rotateSpeed = -60; 
var imgWidth = 120; 
var imgHeight = 170; 

var bgMusicURL = 'https://user-images.githubusercontent.com/151072490/283747943-7b08424b-8647-4bdc-996c-965063dbb5e3.mp4';
var bgMusicControls = true; 

setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid];


ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}
// Function to generate random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to generate random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to create and animate balloons
function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");

  // Set random horizontal position for the balloon
  const leftPosition = Math.random() * window.innerWidth;
  balloon.style.left = `${leftPosition}px`;

  // Set random color for the balloon
  balloon.style.backgroundColor = getRandomColor();

  // Append the balloon to the container
  document.getElementById("balloons").appendChild(balloon);

  // Remove the balloon after it has floated up
  setTimeout(() => {
    balloon.remove();
  }, 10000); // Balloon will float up for 10 seconds
}

// Create a new balloon every 500ms
setInterval(createBalloon, 500);


  

function applyTranform(obj) {
 
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}
if (bgMusicURL) {
  const audioElement = document.createElement('audio');
  audioElement.src = bgMusicURL;
  audioElement.loop = true;
  audioElement.autoplay = true;
  audioElement.muted = true; // Initially muted for autoplay compliance

  document.getElementById('music-container').appendChild(audioElement);

  // Toggle playback on click
  document.addEventListener('click', () => {
    if (audioElement.muted) {
      audioElement.muted = false; // Unmute and start playing
      audioElement.play();
    } else if (!audioElement.paused) {
      audioElement.pause(); // Pause if it's playing
    } else {
      audioElement.play(); // Play if it's paused
    }
  });
}


document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function(e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};

