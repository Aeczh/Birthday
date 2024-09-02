document.addEventListener('DOMContentLoaded', () => {
    // Music and Control Elements
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('play-pause');
    const muteUnmuteButton = document.getElementById('mute-unmute');
    const seekBar = document.getElementById('seek-bar');
    const warning = document.getElementById('warning');
    const startMusicButton = document.getElementById('start-music');

    // Animation Elements
    const fireworksContainer = document.getElementById('fireworks-container');
    const balloonsContainer = document.getElementById('balloons-container');
    const imageContainer = document.getElementById('image-container');
    const cardContainer = document.getElementById('card-container');
    const candleWish = document.getElementById('candle-wish');
    const flame = document.getElementById('flame');
    const candle = document.getElementById('candles');

    let musicStarted = false;
    let animationsStarted = false;

    // Function to start animations
    function startAnimations() {
        if (!animationsStarted) {
            fireworksContainer.style.display = 'block';
            setTimeout(() => {
                balloonsContainer.classList.add('show');
                imageContainer.classList.add('show');
                setTimeout(() => {
                    cardContainer.classList.add('show');
                }, 7000); // Delay for card appearance after balloons
            }, 5000); // Delay for balloons appearance after fireworks
            animationsStarted = true;
        }
    }

    // Play/Pause Button Event
    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                playPauseButton.textContent = 'Pause';
                musicStarted = true;
                warning.style.display = 'none'; // Hide warning
                if (musicStarted) startAnimations(); // Start animations
            }).catch(error => console.log('Autoplay was prevented:', error));
        } else {
            audio.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    // Start Music Button Event
    startMusicButton.addEventListener('click', () => {
        if (!musicStarted) {
            audio.play().then(() => {
                musicStarted = true;
                warning.style.display = 'none'; // Hide warning
                startAnimations(); // Start animations
            }).catch(error => console.log('Autoplay was prevented:', error));
        }
    });

    // Mute/Unmute Button Event
    muteUnmuteButton.addEventListener('click', () => {
        audio.muted = !audio.muted;
        muteUnmuteButton.textContent = audio.muted ? 'Unmute' : 'Mute';
    });

    // Update Seek Bar
    audio.addEventListener('timeupdate', () => {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
    });

    // Seek Bar Interaction
    seekBar.addEventListener('input', () => {
        audio.currentTime = seekBar.value * audio.duration / 100;
    });

    // Function to show an element with transition
    const showElement = (element) => {
        element.style.display = 'block'; // Pastikan elemen terlihat
        setTimeout(() => {
            element.classList.add('fade-in');
        }, 100); // Delay untuk transisi
    };

    // Fungsi untuk menyembunyikan elemen
    const hideElement = (element) => {
        element.classList.add('fade-out');
        setTimeout(() => {
            element.style.display = 'none';
        }, 1000); // Durasi sesuai dengan transisi opacity
    };

    cardContainer.addEventListener('click', () => {
        hideElement(cardContainer);
        setTimeout(() => {
            showElement(candleWish);
        }, 1000); // Delay untuk menunggu kartu sepenuhnya hilang sebelum menampilkan candle wish
    });

    // Fireworks Animation
    var c = document.getElementById("Canvas");
    var ctx = c.getContext("2d");

    var cwidth, cheight;
    var shells = [];
    var pass = [];
    var colors = ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093'];

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
            x: 0.5,
            y: 1,
            xoff: (Math.random() * 0.005 - 0.0025),
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

            if (shell.y < 0.2) {
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

    // Candle wish animation
    flame.addEventListener('click', () => {
        flame.classList.remove('burn');
        flame.classList.add('puff');
        document.querySelectorAll('.smoke').forEach(smoke => {
            smoke.classList.add('puff-bubble');
        });
        document.getElementById('glow').remove();
        const candleWish = document.getElementById('candle-wish');
        document.querySelector('h1').style.display = 'none';
        candleWish.style.display = 'block';
        candleWish.classList.add('visible');
        flame.style.bottom = '0.15em';
        candleWish.style.bottom = '320px';
        candleWish.querySelector('h1').textContent = "Wish You a Happy Birthday CutiePie🤍";
    });
});
