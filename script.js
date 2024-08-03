// document.addEventListener('DOMContentLoaded', () => {
//   const audio = document.getElementById('audio');
//   const playPauseButton = document.getElementById('play-pause');
//   const muteUnmuteButton = document.getElementById('mute-unmute');
//   const seekBar = document.getElementById('seek-bar');

//   audio.play().catch(error => {
//       console.log('Autoplay was prevented:', error);
//   });

//   playPauseButton.addEventListener('click', () => {
//       if (audio.paused) {
//           audio.play();
//           playPauseButton.textContent = 'Pause';
//       } else {
//           audio.pause();
//           playPauseButton.textContent = 'Play';
//       }
//   });

//   muteUnmuteButton.addEventListener('click', () => {
//       audio.muted = !audio.muted;
//       muteUnmuteButton.textContent = audio.muted ? 'Unmute' : 'Mute';
//   });

//   audio.addEventListener('timeupdate', () => {
//       const value = (audio.currentTime / audio.duration) * 100;
//       seekBar.value = value;
//   });

//   seekBar.addEventListener('input', () => {
//       const value = seekBar.value * audio.duration / 100;
//       audio.currentTime = value;
//   });
// });

// var c = document.getElementById("Canvas");
// var ctx = c.getContext("2d");

// var cwidth, cheight;
// var shells = [];
// var pass = [];

// var colors = ['#ff5252', '#ff4081', '#e040fb', '#7c4dff', '#536dff', '#40cdff', '#18ffff', '#64ffda', '#69f0ae', '#b2ff59'];

// window.onresize = function() { reset();}
// reset();

// function reset() {
//     cwidth = window.innerWidth;
//     cheight = window.innerHeight;
//     c.width = cwidth;
//     c.height = cheight;
// }

// function newShell(){
//     var left = (Math.random() > 0.5)
//     var shell = {};
//     shell.x = (1 * left);
//     shell.y = 1;
//     shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
//     shell.yoff = 0.01 + Math.random() * 0.007;
//     shell.size = Math.random() * 6 + 3;
//     shell.color = colors[Math.floor(Math.random() * colors.length)];

//     shells.push(shell);
// }

// function newPass(shell){
//     var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);
    
//     for(i = 0; i < pasCount; i++){
//         var pas = {};
//         pas.x = shell.x * cwidth;
//         pas.y = shell.y * cheight;

//         var a = Math.random() * 4;
//         var s = Math.random() * 10;

//         pas.xoff = Math.sin((5 - a) * (Math.PI / 2));
//         pas.yoff = Math.sin(a * (Math.PI / 2));

//         pas.color = shell.color;
//         pas.size = Math.sqrt(shell.size);

//         if(pass.length < 1000) { pass.push(pas); }
//     }
// }

// var lastRun = 0;
// Run();

// function Run(){
//     var dt = 1;

//     if(lastRun != 0) { dt = (Math.min(50, (performance.now() - lastRun))); }
//     lastRun = performance.now();

//     ctx.fillStyle = 'rgba(0,0,0,0,25)';
//     ctx.fillRect(0, 0, cwidth, cheight);

//     if((shells.length < 10) && (Math.random() < 0.96)) { newShell(); }

//     for(let ix in shells){
//         var shell = shells[ix];

//         ctx.beginPath();
//         ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
//         ctx.fillStyle = shell.color;
//         ctx.fill();

//         shell.x -= shell.xoff;
//         shell.y -= shell.yoff;
//         shell.xoff -= (shell.xoff * dt * 0.001);
//         shell.yoff -= ((shell.yoff + 0.2) * dt * 0.00005);

//         if(shell.yoff < -0.005){
//             newPass(shell);
//             shells.splice(ix, 1);
//         }
//     }

//     for(let ix in pass){
//         var pas = pass[ix];
//         ctx.beginPath();
//         ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
//         ctx.fillStyle = pas.color;
//         ctx.fill();

//         pas.x -= pas.xoff;
//         pas.y -= pas.yoff;
//         pas.xoff -= (pas.xoff * dt * 0.001);
//         pas.yoff -= ((pas.yoff + 5) * dt * 0.00005);
//         pas.size -= (dt * 0.02 * Math.random());

//         if((pas.y > cheight) || (pas.y < -50) || (pas.size <= 0)){
//             pass.splice(ix, 1);
//         }
//     }
//     requestAnimationFrame(Run);
// }

// JavaScript for Fireworks

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('play-pause');
    const muteUnmuteButton = document.getElementById('mute-unmute');
    const seekBar = document.getElementById('seek-bar');
    const warning = document.getElementById('warning');
    const startMusicButton = document.getElementById('start-music');

    const fireworksContainer = document.getElementById('fireworks-container');
    const balloonsContainer = document.getElementById('balloons-container');
    const cardContainer = document.getElementById('card-container');

    let musicStarted = false;
    let animationsStarted = false;

    function startAnimations() {
        if (!animationsStarted) {
            fireworksContainer.style.display = 'block';

            // Show balloons after 3 seconds
            setTimeout(() => {
                balloonsContainer.classList.add('show');

                // Show card after 5 seconds
                setTimeout(() => {
                    cardContainer.classList.add('show');
                }, 5000);
            }, 3000);

            animationsStarted = true;
        }
    }

    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                playPauseButton.textContent = 'Pause';
                musicStarted = true;
                warning.style.display = 'none'; // Hide warning when music starts
                if (musicStarted) {
                    startAnimations(); // Start animations after music starts
                }
            }).catch(error => {
                console.log('Autoplay was prevented:', error);
            });
        } else {
            audio.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    startMusicButton.addEventListener('click', () => {
        if (!musicStarted) {
            audio.play().then(() => {
                musicStarted = true;
                warning.style.display = 'none'; // Hide warning when music starts
                startAnimations(); // Start animations after music starts
            }).catch(error => {
                console.log('Autoplay was prevented:', error);
            });
        }
    });

    muteUnmuteButton.addEventListener('click', () => {
        audio.muted = !audio.muted;
        muteUnmuteButton.textContent = audio.muted ? 'Unmute' : 'Mute';
    });

    audio.addEventListener('timeupdate', () => {
        const value = (audio.currentTime / audio.duration) * 100;
        seekBar.value = value;
    });

    seekBar.addEventListener('input', () => {
        const value = seekBar.value * audio.duration / 100;
        audio.currentTime = value;
    });
});


//
var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");

var cwidth, cheight;
var shells = [];
var pass = [];
var colors = ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093']; // Pink color variations

window.onresize = function() { reset(); }
reset();

function reset() {
    cwidth = window.innerWidth;
    cheight = window.innerHeight;
    c.width = cwidth;
    c.height = cheight;
}

function newShell() {
    var shell = {
        x: 0.5, // Start from the center horizontally
        y: 1,
        xoff: (Math.random() * 0.005 - 0.0025), // Small horizontal variation
        yoff: 0.01 + Math.random() * 0.007,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)]
    };
    shells.push(shell);
}

function newPass(shell) {
    var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI * 2);

    for (var i = 0; i < pasCount; i++) {
        var pas = {
            x: shell.x * cwidth,
            y: shell.y * cheight,
            xoff: Math.sin((Math.random() * 2 * Math.PI)),
            yoff: Math.cos((Math.random() * 2 * Math.PI)),
            color: shell.color,
            size: Math.sqrt(shell.size) * 2
        };

        var speed = Math.random() * 5 + 5;
        pas.xoff *= speed;
        pas.yoff *= speed;

        if (pass.length < 1000) pass.push(pas);
    }
}

var lastRun = 0;
Run();

function Run() {
    var dt = 1;

    if (lastRun != 0) {
        dt = Math.min(50, performance.now() - lastRun);
    }
    lastRun = performance.now();

    ctx.fillStyle = 'rgba(255, 203, 203, 0.25)';
    ctx.fillRect(0, 0, cwidth, cheight);

    if (shells.length < 10 && Math.random() < 0.96) {
        newShell();
    }

    for (let ix in shells) {
        var shell = shells[ix];

        ctx.beginPath();
        ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
        ctx.fillStyle = shell.color;
        ctx.fill();

        shell.x -= shell.xoff;
        shell.y -= shell.yoff;
        shell.xoff -= shell.xoff * dt * 0.001;
        shell.yoff -= (shell.yoff + 0.2) * dt * 0.00005;

        if (shell.y < 0.2) { // Explode when they reach the top 20% of the screen
            newPass(shell);
            shells.splice(ix, 1);
        }
    }

    for (let ix in pass) {
        var pas = pass[ix];
        ctx.beginPath();
        ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
        ctx.fillStyle = pas.color;
        ctx.fill();

        pas.x -= pas.xoff;
        pas.y -= pas.yoff;
        pas.xoff -= pas.xoff * dt * 0.001;
        pas.yoff -= (pas.yoff + 5) * dt * 0.00005;
        pas.size -= dt * 0.02 * Math.random();

        if (pas.y > cheight || pas.y < -50 || pas.size <= 0) {
            pass.splice(ix, 1);
        }
    }

    requestAnimationFrame(Run);
}
