// Sleep Settings Page - jQuery

$(document).ready(function() {
    
    // Load saved sleep settings from localStorage
    function loadSleepSettings() {
        const savedBedtime = localStorage.getItem('medicare_bedtime');
        const savedWaketime = localStorage.getItem('medicare_waketime');
        const savedReminder = localStorage.getItem('medicare_sleep_reminder');
        
        if (savedBedtime) $('#bedtime').val(savedBedtime);
        if (savedWaketime) $('#waketime').val(savedWaketime);
        if (savedReminder === 'true') {
            $('#sleepReminderToggle').prop('checked', true);
        } else if (savedReminder === 'false') {
            $('#sleepReminderToggle').prop('checked', false);
        }
    }
    
    // Save sleep settings to localStorage
    function saveSleepSettings() {
        const bedtime = $('#bedtime').val();
        const waketime = $('#waketime').val();
        const reminderEnabled = $('#sleepReminderToggle').is(':checked');
        
        localStorage.setItem('medicare_bedtime', bedtime);
        localStorage.setItem('medicare_waketime', waketime);
        localStorage.setItem('medicare_sleep_reminder', reminderEnabled);
        
        // Also save to main sleep variables for homepage
        if (reminderEnabled) {
            // Parse bedtime hours and minutes
            const [hour, minute] = bedtime.split(':').map(Number);
            localStorage.setItem('medicare_sleep_hour', hour);
            localStorage.setItem('medicare_sleep_minute', minute);
        } else {
            localStorage.removeItem('medicare_sleep_hour');
            localStorage.removeItem('medicare_sleep_minute');
        }
        
        alert(isEnglish ? 'Sleep settings saved!' : 'Tetapan tidur disimpan!');
        
        // Show success animation
        const $btn = $('#saveSleepBtn');
        $btn.text('✅ Saved!');
        setTimeout(() => {
            $btn.html('💾 Save Sleep Settings');
        }, 1500);
    }
    
    // Get language
    const userLang = localStorage.getItem('medicare_lang') || 'ms';
    const isEnglish = userLang === 'en';
    
    // Update UI text based on language
    function updateUIText() {
        if (isEnglish) {
            $('.header h1').text('😴 Sleep Reminder');
            $('.settings-card h2').text('🌙 Sleep Schedule');
            $('.setting-group label').eq(0).html('⏰ Bedtime');
            $('.setting-group label').eq(1).html('⏰ Wake-up Time');
            $('.setting-group label').eq(2).html('🔔 Reminder');
            $('.toggle-label').text('Enable sleep reminder');
            $('#saveSleepBtn').html('💾 Save Sleep Settings');
            $('.tips-card h3').text('💡 Sleep Tips');
            $('.info-box p').html('💡 <strong>Tip:</strong> You will receive a notification at your set bedtime to remind you to sleep. Get enough rest for better health!');
            $('.animation-text').text('😴 Time to rest and recharge 😴');
        } else {
            $('.header h1').text('😴 Peringatan Tidur');
            $('.settings-card h2').text('🌙 Jadual Tidur');
            $('.setting-group label').eq(0).html('⏰ Waktu Tidur');
            $('.setting-group label').eq(1).html('⏰ Waktu Bangun');
            $('.setting-group label').eq(2).html('🔔 Peringatan');
            $('.toggle-label').text('Hidupkan peringatan tidur');
            $('#saveSleepBtn').html('💾 Simpan Tetapan');
            $('.tips-card h3').text('💡 Tips Tidur');
            $('.info-box p').html('💡 <strong>Tips:</strong> Anda akan menerima notifikasi pada waktu tidur yang ditetapkan. Dapatkan rehat yang cukup untuk kesihatan yang lebih baik!');
            $('.animation-text').text('😴 Masa untuk berehat dan tidur 😴');
        }
    }
    
    // Update tips based on language
    function updateTips() {
        if (isEnglish) {
            $('.tips-list li').eq(0).text('🌙 Go to bed at the same time every night');
            $('.tips-list li').eq(1).text('📱 Avoid screens 30 minutes before bed');
            $('.tips-list li').eq(2).text('☕ Reduce caffeine intake in the evening');
            $('.tips-list li').eq(3).text('🧘 Practice relaxation techniques');
            $('.tips-list li').eq(4).text('🛌 Keep your bedroom dark and cool');
        } else {
            $('.tips-list li').eq(0).text('🌙 Tidur pada waktu yang sama setiap malam');
            $('.tips-list li').eq(1).text('📱 Elakkan skrin 30 minit sebelum tidur');
            $('.tips-list li').eq(2).text('☕ Kurangkan kafein pada waktu petang');
            $('.tips-list li').eq(3).text('🧘 Amalkan teknik relaksasi');
            $('.tips-list li').eq(4).text('🛌 Pastikan bilik tidur gelap dan sejuk');
        }
    }
    
    // ========== SLIDESHOW GAMBAR (5 GAMBAR) ==========
    let currentSlide = 0;
    const slideshowImages = [
        'sleep.jpg',
        'tido.jpg',
        'sofa.jpg',
        'bangun.jpg',
        'tiidoo.jpg'
    ];
    
    let slideInterval;
    
    function createSlideshow() {
        // Check if slideshow container already exists
        if ($('#sleepSlideshow').length) return;
        
        // Create slideshow container above save button
        const slideshowHtml = `
            <div id="sleepSlideshow" class="sleep-slideshow">
                <div class="slideshow-container">
                    <img class="slide-img" id="slideImg" src="${slideshowImages[0]}" alt="Sleep">
                    <div class="slideshow-caption" id="slideCaption">🌙 Good Night Sleep 🌙</div>
                </div>
                <div class="slideshow-dots" id="slideshowDots"></div>
            </div>
        `;
        
        // Insert above save button
        $('#saveSleepBtn').before(slideshowHtml);
        
        // Create dots
        const dotsContainer = $('#slideshowDots');
        for (let i = 0; i < slideshowImages.length; i++) {
            dotsContainer.append(`<span class="dot" data-slide="${i}"></span>`);
        }
        
        // Set first dot active
        $('.dot').first().addClass('active');
        
        // Update captions based on language
        updateSlideCaption();
        
        // Dot click event
        $('.dot').on('click', function() {
            const slideIndex = parseInt($(this).data('slide'));
            goToSlide(slideIndex);
            resetInterval();
        });
        
        // Start auto slide
        startSlideInterval();
    }
    
    function updateSlideCaption() {
        const captions = isEnglish ? [
            '🌙 Peaceful Sleep',
            '😴 Deep Relaxation',
            '🛌 Comfortable Bed',
            '⭐ Starlight Night',
            '💤 Sweet Dreams'
        ] : [
            '🌙 Tidur yang Aman',
            '😴 Relaksasi Mendalam',
            '🛌 Katil yang Selesa',
            '⭐ Malam Bertabur Bintang',
            '💤 Mimpi Indah'
        ];
        
        $('#slideCaption').text(captions[currentSlide]);
    }
    
    function goToSlide(index) {
        currentSlide = index;
        $('#slideImg').attr('src', slideshowImages[currentSlide]);
        $('.dot').removeClass('active');
        $(`.dot[data-slide="${currentSlide}"]`).addClass('active');
        updateSlideCaption();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideshowImages.length;
        goToSlide(currentSlide);
    }
    
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 4000);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Go back to home page
    function goBack() {
        window.location.href = 'homepage.html';
    }
    
    // Event listeners
    $('#backBtn').on('click', goBack);
    $('#saveSleepBtn').on('click', saveSleepSettings);
    
    // Load saved settings
    loadSleepSettings();
    updateUIText();
    updateTips();
    
    // Create slideshow
    createSlideshow();
    
    console.log('Sleep page loaded! Bedtime:', localStorage.getItem('medicare_bedtime') || '22:00');
});