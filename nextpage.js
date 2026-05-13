// ========== STARS & BACKGROUND ==========
function createStars() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;
    starfield.innerHTML = '';
    const starCount = window.innerWidth < 768 ? 150 : 250;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 4 + 2) + 's';
        star.style.animationDelay = (Math.random() * 5) + 's';
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
    const count = window.innerWidth < 768 ? 60 : 120;
    for (let i = 0; i < count; i++) {
        const sprinkle = document.createElement('div');
        sprinkle.classList.add('sprinkle');
        sprinkle.style.width = (Math.random() * 6 + 2) + 'px';
        sprinkle.style.height = sprinkle.style.width;
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
    const count = window.innerWidth < 768 ? 20 : 35;
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.width = (Math.random() * 12 + 8) + 'px';
        sparkle.style.height = sparkle.style.width;
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

// ========== THEME ==========
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const themeTextSpan = document.getElementById('themeText');
const darkBg = document.getElementById('darkBg');
const goldenSprinkleDiv = document.getElementById('goldenSprinkle');
const goldenSparkleDiv = document.getElementById('goldenSparkle');

let currentTheme = localStorage.getItem('theme') || 'dark';

function switchBackgroundElements(theme) {
    if (theme === 'light') {
        if (darkBg) darkBg.style.display = 'none';
        if (goldenSprinkleDiv) goldenSprinkleDiv.style.display = 'block';
        if (goldenSparkleDiv) goldenSparkleDiv.style.display = 'block';
    } else {
        if (darkBg) darkBg.style.display = 'block';
        if (goldenSprinkleDiv) goldenSprinkleDiv.style.display = 'none';
        if (goldenSparkleDiv) goldenSparkleDiv.style.display = 'none';
    }
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        if (sunIcon) sunIcon.style.display = 'inline-block';
        if (moonIcon) moonIcon.style.display = 'none';
        if (themeTextSpan) themeTextSpan.innerText = 'Light';
    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'inline-block';
        if (themeTextSpan) themeTextSpan.innerText = 'Dark';
    }
    switchBackgroundElements(theme);
    localStorage.setItem('theme', theme);
}

applyTheme(currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

// ========== SOUND ==========
const audioElement = document.getElementById('pianoAudio');

if (audioElement) {
    audioElement.volume = 0.3;
    audioElement.loop = true;
}

if (sessionStorage.getItem('soundStarted') === 'true') {
    let savedTime = parseFloat(sessionStorage.getItem('soundTime') || '0');
    if (audioElement && savedTime > 0) {
        audioElement.currentTime = savedTime;
        audioElement.play().catch(err => console.log("Play error:", err));
    }
}

setInterval(() => {
    if (audioElement && !audioElement.paused) {
        sessionStorage.setItem('soundTime', audioElement.currentTime);
        sessionStorage.setItem('soundStarted', 'true');
    }
}, 1000);

// ========== CLICK GAMBAR - SHOW MODAL ==========
const modal = document.getElementById('appModal');
const modalAppName = document.getElementById('modalAppName');
const modalCreator = document.getElementById('modalCreator');
const modalLogoImg = document.getElementById('modalLogoImg');

function showModal(appName, creatorName, logoUrl) {
    if (modalAppName) modalAppName.innerHTML = appName;
    if (modalCreator) modalCreator.innerHTML = 'created by ' + creatorName;
    if (modalLogoImg) modalLogoImg.src = logoUrl;
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
    }
}

// Event untuk gambar Wanie (MEDICARE)
const clickWanie = document.getElementById('clickWanie');
if (clickWanie) {
    clickWanie.addEventListener('click', function(e) {
        e.stopPropagation();
        showModal('MEDICARE', 'NURSYAZWANIE', 'ubat.png');
    });
}

// Event untuk gambar Lily (TripTrace)
const clickLily = document.getElementById('clickLily');
if (clickLily) {
    clickLily.addEventListener('click', function(e) {
        e.stopPropagation();
        showModal('TripTrace', 'Lily Liyana Lorraine', 'logotriptrace.jpeg');
    });
}

// Close modal button
const closeModalBtn = document.getElementById('closeModalBtn');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Close modal bila click outside
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
}

// ========== GO BUTTON - NAVIGATE ==========
const goBtns = document.querySelectorAll('.go-btn');
goBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pageUrl = btn.getAttribute('data-page');
        if (audioElement && !audioElement.paused) {
            sessionStorage.setItem('soundTime', audioElement.currentTime);
            sessionStorage.setItem('soundStarted', 'true');
        }
        if (pageUrl) {
            window.location.href = pageUrl;
        }
    });
});

// ========== BACK BUTTON ==========
const backBtn = document.getElementById('backBtn');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        if (audioElement && !audioElement.paused) {
            sessionStorage.setItem('soundTime', audioElement.currentTime);
            sessionStorage.setItem('soundStarted', 'true');
        }
        window.location.href = 'medicare.html';
    });
}

window.addEventListener('beforeunload', () => {
    if (audioElement && !audioElement.paused) {
        sessionStorage.setItem('soundTime', audioElement.currentTime);
        sessionStorage.setItem('soundStarted', 'true');
    }
});