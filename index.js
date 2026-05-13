// ========== 1. GENERATE STARS (DARK MODE) ==========
function createStars() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;
    starfield.innerHTML = '';
    const starCount = window.innerWidth < 768 ? 150 : 250;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        const duration = Math.random() * 4 + 2;
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = Math.random() * 5 + 's';
        starfield.appendChild(star);
    }
}

function createShootingStars() {
    const container = document.getElementById('shootingStarsContainer');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        star.style.top = Math.random() * 50 + '%';
        star.style.left = Math.random() * 50 + '%';
        star.style.animationDelay = (Math.random() * 15) + 's';
        star.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(star);
    }
}

function createGoldenSprinkle() {
    const container = document.getElementById('goldenSprinkle');
    if (!container) return;
    container.innerHTML = '';
    const sprinkleCount = window.innerWidth < 768 ? 60 : 120;
    
    for (let i = 0; i < sprinkleCount; i++) {
        const sprinkle = document.createElement('div');
        sprinkle.classList.add('sprinkle');
        const size = Math.random() * 6 + 2;
        sprinkle.style.width = size + 'px';
        sprinkle.style.height = size + 'px';
        sprinkle.style.left = Math.random() * 100 + '%';
        sprinkle.style.animationDuration = (Math.random() * 5 + 3) + 's';
        sprinkle.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(sprinkle);
    }
}

function createGoldenSparkle() {
    const container = document.getElementById('goldenSparkle');
    if (!container) return;
    container.innerHTML = '';
    const sparkleCount = window.innerWidth < 768 ? 20 : 35;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        const size = Math.random() * 12 + 8;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDuration = (Math.random() * 4 + 2) + 's';
        sparkle.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(sparkle);
    }
}

createStars();
createShootingStars();
createGoldenSprinkle();
createGoldenSparkle();

window.addEventListener('resize', () => {
    createStars();
    createShootingStars();
    createGoldenSprinkle();
    createGoldenSparkle();
});

// ========== 2. GREETING ==========
function updateGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting = "", icon = "";
    
    if (hours >= 5 && hours < 12) {
        greeting = "Good Morning";
        icon = "✨☀️";
    } else if (hours >= 12 && hours < 15) {
        greeting = "Good Afternoon";
        icon = "✨🌟";
    } else if (hours >= 15 && hours < 19) {
        greeting = "Good Evening";
        icon = "🌅✨";
    } else {
        greeting = "Good Night";
        icon = "🌙✨";
    }
    
    document.getElementById("greetingText").innerHTML = greeting + "!";
    document.getElementById("greetingIcon").innerHTML = icon;
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("timeMsg").innerHTML = `✨ ${timeStr} · welcome to golden sprinkle universe ✨`;
}
updateGreeting();

// ========== 3. DARK MODE / LIGHT MODE ==========
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const themeTextSpan = document.getElementById('themeText');
const darkBg = document.getElementById('darkBg');
const goldenSprinkle = document.getElementById('goldenSprinkle');
const goldenSparkle = document.getElementById('goldenSparkle');

let currentTheme = localStorage.getItem('theme') || 'dark';

function switchBackgroundElements(theme) {
    if (theme === 'light') {
        if (darkBg) darkBg.style.display = 'none';
        if (goldenSprinkle) goldenSprinkle.style.display = 'block';
        if (goldenSparkle) goldenSparkle.style.display = 'block';
        createGoldenSprinkle();
        createGoldenSparkle();
    } else {
        if (darkBg) darkBg.style.display = 'block';
        if (goldenSprinkle) goldenSprinkle.style.display = 'none';
        if (goldenSparkle) goldenSparkle.style.display = 'none';
        createStars();
        createShootingStars();
    }
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
        themeTextSpan.innerText = 'Light';
    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
        themeTextSpan.innerText = 'Dark';
    }
    switchBackgroundElements(theme);
    localStorage.setItem('theme', theme);
}

applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
});

// ========== 4. SOUND - VERSION PALING SIMPLE ==========
const audioElement = document.getElementById('pianoAudio');
let soundStarted = false;

if (audioElement) {
    audioElement.volume = 0.3;
    audioElement.loop = true;
}

function startAndSaveSound() {
    if (soundStarted) return;
    
    if (audioElement) {
        audioElement.play().then(() => {
            soundStarted = true;
            sessionStorage.setItem('soundStarted', 'true');
            sessionStorage.setItem('soundTime', '0');
            
            const soundSpan = document.querySelector('#soundStatus span');
            if (soundSpan) soundSpan.innerHTML = 'Now, enjoy the sound 🎧✨';
            document.getElementById('soundStatus').style.opacity = '0.95';
        }).catch(err => {
            console.log("Play failed:", err);
        });
    }
}

if (sessionStorage.getItem('soundStarted') === 'true') {
    if (audioElement && !soundStarted) {
        let savedTime = parseFloat(sessionStorage.getItem('soundTime') || '0');
        audioElement.currentTime = savedTime;
        audioElement.play().then(() => {
            soundStarted = true;
            console.log("Sound continued from time:", savedTime);
        }).catch(err => console.log(err));
    }
}

setInterval(() => {
    if (audioElement && !audioElement.paused && soundStarted) {
        sessionStorage.setItem('soundTime', audioElement.currentTime);
    }
}, 1000);

document.addEventListener('click', () => {
    if (!soundStarted && sessionStorage.getItem('soundStarted') !== 'true') {
        startAndSaveSound();
    }
}, { once: true });

// ========== 5. PAGE NAVIGATION ==========
const nextBtn = document.getElementById('nextPageBtn');

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (audioElement && !audioElement.paused && soundStarted) {
        sessionStorage.setItem('soundTime', audioElement.currentTime);
        sessionStorage.setItem('soundStarted', 'true');
    }
    window.location.href = 'nextpage.html';
});