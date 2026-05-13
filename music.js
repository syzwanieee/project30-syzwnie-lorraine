// Music Therapy Page - jQuery (With Bilingual Support)

$(document).ready(function() {
    
    // Get language from localStorage
    const userLang = localStorage.getItem('medicare_lang') || 'ms';
    const isEnglish = userLang === 'en';
    
    const MUSIC_URL = 'piano.mp3';
    
    // ========== TRANSLATIONS ==========
    const translations = {
        ms: {
            pageTitle: "Terapi Muzik",
            backBtn: "Kembali",
            playerTitle: "Terapi Muzik Relaksasi",
            songTitle: "Relaksasi Tenang",
            songArtist: "Muzik Penyembuhan",
            tipText: "Tutup mata, tarik nafas dalam-dalam, dan biarkan muzik merilekskan minda dan badan anda.",
            quote: "🎵 Muzik boleh menyembuhkan jiwa dan menenangkan minda 🎵",
            gifCaption1: "🌊 Ombak Pantai yang Tenang",
            gifCaption2: "🌸 Taman Bunga yang Indah",
            noAudio: "⚠️ Audio belum siap. Sila pastikan fail audio wujud."
        },
        en: {
            pageTitle: "Music Therapy",
            backBtn: "Back",
            playerTitle: "Relaxing Music Therapy",
            songTitle: "Calm Relaxation",
            songArtist: "Healing Music",
            tipText: "Close your eyes, take deep breaths, and let the music relax your mind and body.",
            quote: "🎵 Music can heal the soul and calm the mind 🎵",
            gifCaption1: "🌊 Calm Beach Waves",
            gifCaption2: "🌸 Beautiful Flower Garden",
            noAudio: "⚠️ Audio not ready. Please ensure audio file exists."
        }
    };
    
    const t = translations[userLang];
    
    // ========== UPDATE UI TEXT ==========
    function updateUIText() {
        $('.header h1').text(`🎵 ${t.pageTitle}`);
        $('.back-btn').html(`← ${t.backBtn}`);
        $('.player-header h2').text(t.playerTitle);
        $('#songTitle').text(t.songTitle);
        $('#songArtist').text(t.songArtist);
        $('.quote-text').text(t.quote);
        $('.info-box p').html(`💡 <strong>Tip:</strong> ${t.tipText}`);
        
        const captions = [t.gifCaption1, t.gifCaption2];
        $('#gifCaption').text(captions[0]);
        window.gifCaptions = captions;
    }
    
    updateUIText();
    
    // ========== CREATE AUDIO ELEMENT (if not exists) ==========
    let globalAudio = document.getElementById('globalMusicPlayer');
    
    if (!globalAudio) {
        globalAudio = document.createElement('audio');
        globalAudio.id = 'globalMusicPlayer';
        globalAudio.loop = true;
        document.body.appendChild(globalAudio);
    }
    
    // Set music source (try to use the music URL)
    globalAudio.src = MUSIC_URL;
    globalAudio.load();
    
    // Variables
    let isPlaying = false;
    let isLooping = true;
    let audioReady = false;
    
    // Check if audio can play
    globalAudio.addEventListener('canplaythrough', function() {
        audioReady = true;
        console.log('🎵 Audio ready to play');
    });
    
    globalAudio.addEventListener('error', function(e) {
        console.log('❌ Audio error:', e);
        audioReady = false;
        // Try fallback
        if (globalAudio.src !== FALLBACK_MUSIC_URL) {
            console.log('🔄 Trying fallback audio...');
            globalAudio.src = FALLBACK_MUSIC_URL;
            globalAudio.load();
        } else {
            console.log('⚠️ No audio source available');
        }
    });
    
    // Set loop
    globalAudio.loop = isLooping;
    
    // ========== PLAY/PAUSE FUNCTION ==========
    function togglePlay() {
        console.log('🎵 Toggle play, audioReady:', audioReady, 'src:', globalAudio.src);
        
        if (!globalAudio.src || globalAudio.src === '') {
            console.log('❌ No audio source');
            alert(t.noAudio);
            return;
        }
        
        if (isPlaying) {
            globalAudio.pause();
            $('#playPauseBtn').text('▶');
            isPlaying = false;
            localStorage.setItem('medicare_music_playing', 'false');
            console.log('Music paused');
        } else {
            // Try to play
            const playPromise = globalAudio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    $('#playPauseBtn').text('⏸');
                    isPlaying = true;
                    localStorage.setItem('medicare_music_playing', 'true');
                    console.log('Music playing');
                }).catch(function(error) {
                    console.log('❌ Play error:', error);
                    alert(t.noAudio + '\n\nError: ' + error.message);
                    
                    // Try to reload audio
                    globalAudio.load();
                    
                    // Try fallback again
                    if (globalAudio.src === MUSIC_URL) {
                        setTimeout(function() {
                            globalAudio.src = FALLBACK_MUSIC_URL;
                            globalAudio.load();
                            globalAudio.play().then(function() {
                                $('#playPauseBtn').text('⏸');
                                isPlaying = true;
                            }).catch(function(e) {
                                console.log('Fallback also failed:', e);
                            });
                        }, 1000);
                    }
                });
            }
        }
    }
    
    // ========== UPDATE PROGRESS BAR ==========
    function updateProgress() {
        if (globalAudio.duration && !isNaN(globalAudio.duration)) {
            const percent = (globalAudio.currentTime / globalAudio.duration) * 100;
            $('#progressFill').css('width', `${percent}%`);
            
            const currentMinutes = Math.floor(globalAudio.currentTime / 60);
            const currentSeconds = Math.floor(globalAudio.currentTime % 60);
            $('#currentTime').text(`${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`);
        }
    }
    
    // ========== SET PROGRESS ON CLICK ==========
    function setProgress(e) {
        if (globalAudio.duration && !isNaN(globalAudio.duration)) {
            const bar = $('.progress-bar');
            const rect = bar[0].getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percent = clickX / width;
            globalAudio.currentTime = percent * globalAudio.duration;
            localStorage.setItem('medicare_music_time', globalAudio.currentTime);
        }
    }
    
    // ========== VOLUME CONTROL ==========
    $('#volumeSlider').on('input', function() {
        const volume = $(this).val() / 100;
        globalAudio.volume = volume;
        localStorage.setItem('medicare_music_volume', $(this).val());
    });
    
    // Load saved volume
    const savedVolume = localStorage.getItem('medicare_music_volume');
    if (savedVolume) {
        $('#volumeSlider').val(savedVolume);
        globalAudio.volume = savedVolume / 100;
    } else {
        globalAudio.volume = 0.5;
        $('#volumeSlider').val(50);
    }
    
    // ========== LOOP BUTTON ==========
    $('#loopBtn').on('click', function() {
        isLooping = !isLooping;
        globalAudio.loop = isLooping;
        $(this).css('background', isLooping ? '#6aa85f' : 'rgba(255,255,255,0.2)');
        localStorage.setItem('medicare_music_loop', isLooping ? 'true' : 'false');
        console.log('Loop:', isLooping ? 'ON' : 'OFF');
    });
    
    // Load saved loop state
    const savedLoop = localStorage.getItem('medicare_music_loop');
    if (savedLoop === 'false') {
        isLooping = false;
        globalAudio.loop = false;
        $('#loopBtn').css('background', 'rgba(255,255,255,0.2)');
    } else {
        isLooping = true;
        globalAudio.loop = true;
        $('#loopBtn').css('background', '#6aa85f');
    }
    
    // ========== RESTORE PREVIOUS PLAYING STATE ==========
    const musicWasPlaying = localStorage.getItem('medicare_music_playing') === 'true';
    const savedTime = parseFloat(localStorage.getItem('medicare_music_time')) || 0;
    
    if (savedTime > 0 && globalAudio.duration) {
        globalAudio.currentTime = savedTime;
    }
    
    if (musicWasPlaying) {
        setTimeout(function() {
            globalAudio.play().then(function() {
                isPlaying = true;
                $('#playPauseBtn').text('⏸');
                console.log('Music resumed');
            }).catch(function(e) {
                console.log('Cannot resume:', e);
                isPlaying = false;
                $('#playPauseBtn').text('▶');
            });
        }, 1000);
    }
    
    // ========== AUDIO EVENT LISTENERS ==========
    globalAudio.addEventListener('timeupdate', updateProgress);
    
    globalAudio.addEventListener('loadedmetadata', function() {
        const minutes = Math.floor(globalAudio.duration / 60);
        const seconds = Math.floor(globalAudio.duration % 60);
        $('#duration').text(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        console.log('Duration loaded:', globalAudio.duration);
    });
    
    globalAudio.addEventListener('ended', function() {
        if (!isLooping) {
            isPlaying = false;
            $('#playPauseBtn').text('▶');
            localStorage.setItem('medicare_music_playing', 'false');
            console.log('Music ended');
        }
    });
    
    globalAudio.addEventListener('play', function() {
        isPlaying = true;
        $('#playPauseBtn').text('⏸');
    });
    
    globalAudio.addEventListener('pause', function() {
        isPlaying = false;
        $('#playPauseBtn').text('▶');
    });
    
    // ========== PLAYER BUTTONS ==========
    $('#playPauseBtn').on('click', togglePlay);
    $('.progress-bar').on('click', setProgress);
    
    // ========== GIF SLIDESHOW ==========
    let currentSlide = 0;
    const slides = $('.gif-slide');
    const dots = $('.dot');
    let slideInterval;
    
    function startSlideshow() {
        slideInterval = setInterval(function() {
            nextSlide();
        }, 5000);
    }
    
    function nextSlide() {
        $(slides[currentSlide]).removeClass('active');
        currentSlide = (currentSlide + 1) % slides.length;
        $(slides[currentSlide]).addClass('active');
        updateDots();
        updateCaption();
    }
    
    function goToSlide(index) {
        $(slides[currentSlide]).removeClass('active');
        currentSlide = index;
        $(slides[currentSlide]).addClass('active');
        updateDots();
        updateCaption();
        
        clearInterval(slideInterval);
        startSlideshow();
    }
    
    function updateDots() {
        dots.removeClass('active');
        $(dots[currentSlide]).addClass('active');
    }
    
    function updateCaption() {
        const captions = window.gifCaptions || [t.gifCaption1, t.gifCaption2];
        $('#gifCaption').text(captions[currentSlide]);
    }
    
    dots.on('click', function() {
        const index = parseInt($(this).data('index'));
        goToSlide(index);
    });
    
    startSlideshow();
    
    // ========== BACK BUTTON (music continues) ==========
    $('#backBtn').on('click', function() {
        // Save current state before leaving
        if (globalAudio) {
            localStorage.setItem('medicare_music_time', globalAudio.currentTime);
            localStorage.setItem('medicare_music_playing', isPlaying ? 'true' : 'false');
        }
        window.location.href = 'homepage.html';
    });
    
    console.log('🌿 Music Therapy page loaded!');
    console.log('Language:', isEnglish ? 'English' : 'Malay');
    console.log('🎵 Audio source:', globalAudio.src);
});