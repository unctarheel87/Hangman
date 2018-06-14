//globals
const songBank = {
  songs: [
    {id: 0, song: 'Highway to Hell', hint: 'first hit song'},
    {id: 1, song: 'Back in Black', hint: 'Album Title Track'},
    {id: 2, song: 'Hells Bells', hint: 'a slow building intro'},
    {id: 3, song: 'Shook Me All Night Long', hint: 'first pop hit'},
    {id: 4, song: 'Dirty Deeds Done Dirt Cheap', hint: 'recent single'},
    {id: 5, song: 'For Those About to Rock', hint: 'famous title'},
    {id: 6, song: 'Moneytalks', hint: 'recent single'},
    {id: 7, song: 'Shoot To Thrill', hint: 'single off Back in Black'},
  ]
}

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")

//get random index
let randIndex = Math.floor(Math.random() * songBank.songs.length)

let songPick = songBank.songs[randIndex].song.toLowerCase();
let songHint = songBank.songs[randIndex].hint;
let songPickArr = songPick.split('');
let correctResponses = [ ]
let wrongLetter = [ ]
let lives = 9
let alreadyPressed = [ ]
let keyName = [ ]

//audio
const playSong = new Audio('acdc.mp3')

for(let i = 0; i < songPickArr.length; i++) {
  songPickArr[i] === ' ' ? correctResponses.push(' ') : correctResponses.push('_')
}

//pre-event HTML
document.getElementById('letters').innerHTML = correctResponses.map((letter) => {
                                                    return "<p>" + letter + "</p>"
                                                  }).join('');
document.getElementById('lives').innerHTML = "<h2>Lives: " + lives + "</h2>";

//pre-event Canvas
ctx.beginPath();
ctx.moveTo(10,310);
ctx.lineWidth = 4;
ctx.strokeStyle = '#fff';
ctx.lineCap = 'round';
ctx.lineTo(180,310);
ctx.stroke();

//hint listeners
const hint = document.getElementById('hint');
const exit = document.getElementById('exit');

hint.addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('exit').style = "display: block;";
  document.getElementById('hintText').innerHTML = songHint;
});

exit.addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('hintText').innerHTML = '';
  document.getElementById('exit').style = "display: none;";
});

//reset listener
const reset = document.getElementById('reset');

reset.addEventListener('click', function(e) {
  e.preventDefault();
  //pick song 
  randIndex = Math.floor(Math.random() * songBank.songs.length)
  songPick = songBank.songs[randIndex].song.toLowerCase();
  songHint = songBank.songs[randIndex].hint;
  songPickArr = songPick.split('');
  //clear data
  correctResponses = [ ]
  for(let i = 0; i < songPickArr.length; i++) {
    songPickArr[i] === ' ' ? correctResponses.push(' ') : correctResponses.push('_')
  }
  wrongLetter = [ ]
  alreadyPressed = [ ]
  lives = 9
  //clear DOM
  document.getElementById('letters').innerHTML = correctResponses.map((letter) => {
                                                  return "<p>" + letter + "</p>"
                                                }).join('');
  document.getElementById('lives').innerHTML = "<h2>Lives: " + lives + "</h2>";
  document.getElementById('wrong-letter').innerHTML = wrongLetter.map((letter) => {
                                                        return "<h4>" + letter + "</h4>"
                                                      }).join('');
  document.getElementById('hintText').innerHTML = ' ';
  document.getElementById('outcome').innerHTML = ' ';
  document.getElementById('exit').style = "display: none";
  playSong.pause();
  playSong.currentTime = 0;                                                 
  
  //clear Canvas
  ctx.clearRect(0, 0, 350, 425)
  ctx.beginPath();
  ctx.moveTo(10,310);
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#fff';
  ctx.lineCap = 'round';
  ctx.lineTo(180,310);
  ctx.stroke();
});

//keypress event listener
document.addEventListener('keypress', function(e) {
  keyName = e.key;
  let duplicates = []
  for (let i = 0; i < songPick.length; i++ ) {
    if (songPickArr[i] === keyName) {
        duplicates.push(i);
    }
  }

  for (let i = 0; i < duplicates.length; i++) {
      correctResponses.splice(duplicates[i], 1, keyName);
  }

  if(songPickArr.indexOf(keyName) === -1 && wrongLetter.includes(keyName) == false) {
    wrongLetter.push(keyName)
    lives--
  }
 
  //win logic
  if(songPickArr.join() === correctResponses.join()) {
    document.getElementById('outcome').innerHTML = "<h1>You Win!!</h1>";
    document.getElementById('outcome').style = "color: lightgreen"
    playSong.play();
  } else if(lives == 0) {
    document.getElementById('outcome').innerHTML = "<h1>You Lose...try again!</h1>";
    document.getElementById('outcome').style = "color: tomato"
  }

document.getElementById('letters').innerHTML = correctResponses.map((letter) => {
                                                return "<p>" + letter + "</p>"
                                                }).join('');
document.getElementById('lives').innerHTML = "<h2>Lives: " + lives + "</h2>";
document.getElementById('wrong-letter').innerHTML = wrongLetter.map((letter) => {
                                                    return "<h4>" + letter + "</h4>"
                                                    }).join('');

//Canvas  
const vertices = [
    {x:90, y:310},
    {x:90, y:62},
    {x:182, y:62},
    {x:182, y:109},
    {x:182, y:172},
    {x:182, y:240},
    {x:162, y:270},
    {x:182, y:240},
    {x:202, y:270},
    {x:182, y:200},
    {x:162, y:215},
    {x:182, y:200},
    {x:202, y:215}
  ]
  
  const radians = [
    {r0: 0},
    {r1: 2 * Math.PI}
  ]

  //animation logic for Hangman Draw
  if(lives == 8) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 2;
    }))
  }
  else if(lives == 7) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 3 && index > 0;
    }))
  }
  else if(lives == 6) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 4 && index > 1;
    }))
  }
  else if(lives == 5 && alreadyPressed.includes(keyName) == false) {
    animateDrawArc(radians,182,140,25, true)
  }
  else if(lives == 4) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 6 && index > 3;
    }))
  }
  else if(lives == 3) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 7 && index > 4;
    }))
  }
  else if(lives == 2) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 9 && index > 6;
    }))
  }
  else if(lives == 1) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 11 && index > 8;
    }))
  }
  else if(lives == 0) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 13 && index > 10;
    }))
  }
  
  //animation functions
function animateLineDraw(vertices) {
  const wayPoints = [ ]
  for(let i = 1; i < vertices.length; i++) {
    //find distance between each point
    const pt1 = vertices[i-1];
    const pt2 = vertices[i];
    const dx = pt2.x - pt1.x;
    const dy = pt2.y - pt1.y; 
    //create individual waypoints
      for(let n = 0; n < 50; n++) {
        const x = pt1.x + dx * n/50;
        const y = pt1.y + dy * n/50;
        wayPoints.push({x:x, y:y})
      }
    }
  let a = 1
  function draw() {
      //create Animation Frame
      if(a < wayPoints.length - 1) { 
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#fff';
        ctx.moveTo(wayPoints[a - 1].x, wayPoints[a - 1].y);
        ctx.lineTo(wayPoints[a].x, wayPoints[a].y);
        ctx.stroke();
        a++
        requestAnimationFrame(draw) 
      }  
    }
    requestAnimationFrame(draw);
}   

function animateDrawArc(radians, x, y, r) {
  const wayPoints = [ ];
  for(let i = 1; i < radians.length; i++) {
    //find distance between each point
    const rd0 = radians[i-1];
    const rd1 = radians[i];
    const dr = rd1.r1 - rd0.r0;
    //create individual waypoints
      for(let n = 0; n < 50; n++) {
        const r = rd0.r0 + dr * n/50;
        wayPoints.push({rd:r})
      }
    }
  let a = 1
  function draw() {
      //create Animation Frame
      if(a < wayPoints.length - 1) { 
        const lineWidth = 4
        ctx.strokeStyle = '#fff';
        ctx.clearRect(x - r - lineWidth, y - r - lineWidth, r * 2 + lineWidth * 2, r * 2 + lineWidth * 2); 
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.arc(x,y,r,0,wayPoints[a].rd)
        ctx.stroke();
        ctx.closePath();
        a++
        requestAnimationFrame(draw)
      }  
    }
    requestAnimationFrame(draw);
  }
  //update alreadyPressed
  alreadyPressed.push(keyName)
});