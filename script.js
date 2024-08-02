document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const playPauseButton = document.getElementById('play-pause');
  const muteUnmuteButton = document.getElementById('mute-unmute');
  const seekBar = document.getElementById('seek-bar');

  audio.play().catch(error => {
      console.log('Autoplay was prevented:', error);
  });

  playPauseButton.addEventListener('click', () => {
      if (audio.paused) {
          audio.play();
          playPauseButton.textContent = 'Pause';
      } else {
          audio.pause();
          playPauseButton.textContent = 'Play';
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
var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");

var cwidth, cheight;
var shells = [];
var pass = [];
var colors = ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093']; // Variasi warna pink

window.onresize = function() { reset(); }
reset();

function reset() {
    cwidth = window.innerWidth;
    cheight = window.innerHeight;
    c.width = cwidth;
    c.height = cheight;
}

function newShell() {
    var left = Math.random() > 0.5;
    var shell = {
        x: left ? 1 : 0,
        y: 1,
        xoff: (0.01 + Math.random() * 0.007) * (left ? 1 : -1),
        yoff: 0.01 + Math.random() * 0.007,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)]
    };
    shells.push(shell);
}

function newPass(shell) {
    // Menentukan jumlah partikel berdasarkan ukuran shell (bisa diperbesar)
    var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI * 2); // Kalikan untuk menambah jumlah partikel
    
    for (var i = 0; i < pasCount; i++) {
        var pas = {
            x: shell.x * cwidth,
            y: shell.y * cheight,
            xoff: Math.sin((Math.random() * 2 * Math.PI)), // Variasi arah
            yoff: Math.cos((Math.random() * 2 * Math.PI)), // Variasi arah
            color: shell.color,
            size: Math.sqrt(shell.size) * 2 // Perbesar ukuran partikel
        };

        // Perbesar kecepatan partikel agar menyebar lebih luas
        var speed = (Math.random() * 5 + 5);
        pas.xoff *= speed;
        pas.yoff *= speed;

        if (pass.length < 1000) pass.push(pas);
    }
}

var lastRun = 0;
Run();

var lastShellTime = 0;
var shellInterval = 1000; // Interval dalam milidetik (1 detik)

function Run() {
    var dt = 1;

    if (lastRun != 0) { dt = Math.min(50, performance.now() - lastRun); }
    lastRun = performance.now();

    ctx.fillStyle = 'rgba(255, 203, 203, 1)'; // Warna pink dengan transparansi 0.25
    ctx.fillRect(0, 0, cwidth, cheight);

    var currentTime = performance.now();
    if (shells.length < 10 && (currentTime - lastShellTime) > shellInterval) {
        newShell();
        lastShellTime = currentTime;
    }

    for (let ix in shells) {
        var shell = shells[ix];

        ctx.beginPath();
        ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
        ctx.fillStyle = shell.color;
        ctx.fill();

        shell.x -= shell.xoff;
        shell.y -= shell.yoff;
        shell.xoff -= (shell.xoff * dt * 0.001);
        shell.yoff -= ((shell.yoff + 0.2) * dt * 0.00005);

        if (shell.yoff < -0.005) {
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
        pas.xoff -= (pas.xoff * dt * 0.001);
        pas.yoff -= ((pas.yoff + 5) * dt * 0.00005);
        pas.size -= (dt * 0.02 * Math.random());

        if (pas.y > cheight || pas.y < -50 || pas.size <= 0) {
            pass.splice(ix, 1);
        }
    }
    requestAnimationFrame(Run);
}