// Setting Page JavaScript with jQuery

// Get language from localStorage
const userLang = localStorage.getItem('medicare_lang') || 'ms';
const isEnglish = userLang === 'en';

// Translations
const translations = {
    ms: {
        pageTitle: "Tetapan",
        backBtn: "Kembali",
        notifications: "Notifikasi",
        notificationsDesc: "Terima peringatan ubat dan tips kesihatan",
        darkMode: "Mod Gelap",
        darkModeDesc: "Tukar kepada tema gelap untuk keselesaan mata",
        tts: "Text-to-Speech",
        ttsDesc: "Aktifkan bantuan suara untuk arahan",
        language: "Bahasa",
        languageDesc: "Tukar bahasa aplikasi",
        about: "Perihal MEDICARE",
        aboutDesc: "Versi 1.0.0 | Rakan Kesihatan Anda",
        logout: "Log Keluar",
        logoutConfirm: "Adakah anda pasti mahu log keluar?",
        changeLanguage: "Tukar Bahasa",
        modalTitle: "🌐 Pilih Bahasa"
    },
    en: {
        pageTitle: "Settings",
        backBtn: "Back",
        notifications: "Notifications",
        notificationsDesc: "Receive medication reminders and health tips",
        darkMode: "Dark Mode",
        darkModeDesc: "Switch to dark theme for comfortable viewing",
        tts: "Text-to-Speech",
        ttsDesc: "Enable voice assistance for instructions",
        language: "Language",
        languageDesc: "Change app language",
        about: "About MEDICARE",
        aboutDesc: "Version 1.0.0 | Your Health Companion",
        logout: "Logout",
        logoutConfirm: "Are you sure you want to logout?",
        changeLanguage: "Change Language",
        modalTitle: "🌐 Select Language"
    }
};

const t = translations[userLang];

// ========== UPDATE UI TEXT ==========
function updateUIText() {
    $('.header h1').text(`⚙️ ${t.pageTitle}`);
    $('.back-btn').html(`← ${t.backBtn}`);
    
    const cards = $('.setting-card');
    cards.eq(0).find('.setting-text h3').text(t.notifications);
    cards.eq(0).find('.setting-text p').text(t.notificationsDesc);
    cards.eq(1).find('.setting-text h3').text(t.darkMode);
    cards.eq(1).find('.setting-text p').text(t.darkModeDesc);
    cards.eq(2).find('.setting-text h3').text(t.tts);
    cards.eq(2).find('.setting-text p').text(t.ttsDesc);
    cards.eq(3).find('.setting-text h3').text(t.language);
    cards.eq(3).find('.setting-text p').text(t.changeLanguage);
    cards.eq(4).find('.setting-text h3').text(t.about);
    cards.eq(4).find('.setting-text p').text(t.aboutDesc);
    
    $('#langBtn').text(t.changeLanguage);
    $('#logoutBtn').html(`🚪 ${t.logout}`);
    $('#modalTitle').text(t.modalTitle);
    $('.lang-option').eq(0).html('🇲🇾 Bahasa Melayu');
    $('.lang-option').eq(1).html('🇬🇧 English');
}

// ========== DARK MODE ==========
function applyDarkMode(isDark) {
    if (isDark) {
        $('body').addClass('dark-mode');
        localStorage.setItem('medicare_darkmode', 'true');
        
        $('.setting-card').css({
            'background': 'rgba(25, 35, 20, 0.95)',
            'border': '1px solid rgba(100, 140, 80, 0.3)'
        });
        $('.setting-text h3').css('color', '#c4e0b5');
        $('.setting-text p').css('color', '#a8c99a');
        $('.header h1').css({ 'color': '#c4e0b5', 'textShadow': 'none' });
        $('.back-btn').css({
            'background': 'rgba(30, 40, 25, 0.8)',
            'color': '#c4e0b5',
            'border': '1px solid rgba(100, 140, 80, 0.5)'
        });
        $('.leaf').css('opacity', '0.1');
        $('#logoutBtn').css('background', '#8b3a2a');
    } else {
        $('body').removeClass('dark-mode');
        localStorage.setItem('medicare_darkmode', 'false');
        
        $('.setting-card').css({ 'background': '', 'border': '' });
        $('.setting-text h3').css('color', '');
        $('.setting-text p').css('color', '');
        $('.header h1').css({ 'color': '', 'textShadow': '' });
        $('.back-btn').css({ 'background': '', 'color': '', 'border': '' });
        $('.leaf').css('opacity', '');
        $('#logoutBtn').css('background', '');
    }
    $('#darkModeToggle').prop('checked', isDark);
}

function loadSettings() {
    const savedDarkMode = localStorage.getItem('medicare_darkmode') === 'true';
    applyDarkMode(savedDarkMode);
    
    const savedNotif = localStorage.getItem('medicare_notification') === 'true';
    $('#notificationToggle').prop('checked', savedNotif);
    
    const savedTTS = localStorage.getItem('medicare_tts') !== 'false';
    $('#ttsToggle').prop('checked', savedTTS);
}

function saveSettings() {
    localStorage.setItem('medicare_notification', $('#notificationToggle').prop('checked'));
    localStorage.setItem('medicare_tts', $('#ttsToggle').prop('checked'));
    
    const msg = isEnglish ? 'Settings saved!' : 'Tetapan disimpan!';
    alert(msg);
}

// ========== LANGUAGE FUNCTIONS ==========
function changeLanguage() {
    $('#languageModal').fadeIn(200).css('display', 'flex');
}

function setLanguage(lang) {
    localStorage.setItem('medicare_lang', lang);
    closeLanguageModal();
    location.reload();
}

function closeLanguageModal() {
    $('#languageModal').fadeOut(200);
}

// ========== NAVIGATION ==========
function goBack() {
    window.location.href = 'homepage.html';
}

function logout() {
    if (confirm(t.logoutConfirm)) {
        localStorage.removeItem('medicare_user');
        localStorage.removeItem('medicare_profile_photo');
        localStorage.removeItem('medicare_lang');
        localStorage.removeItem('medicare_darkmode');
        localStorage.removeItem('medicare_notification');
        localStorage.removeItem('medicare_tts');
        window.location.href = 'nextpage.html';
    }
}

// ========== INITIALIZE ==========
$(document).ready(function() {
    updateUIText();
    loadSettings();
    
    // Dark mode toggle
    $('#darkModeToggle').on('change', function() {
        applyDarkMode(this.checked);
    });
    
    // Save settings when toggled
    $('#notificationToggle, #ttsToggle').on('change', saveSettings);
    
    // Logout button
    $('#logoutBtn').on('click', logout);
    
    // Language button - OPEN MODAL
    $('#langBtn').on('click', function() {
        changeLanguage();
    });
    
    // Language options - SELECT LANGUAGE
    $('.lang-option').on('click', function() {
        const lang = $(this).data('lang');
        if (lang) {
            setLanguage(lang);
        }
    });
    
    // Close modal button
    $('#closeModalBtn').on('click', closeLanguageModal);
    
    console.log('Setting page loaded! Language:', isEnglish ? 'English' : 'Malay');
});

// Close modal when clicking outside
$(window).on('click', function(event) {
    if ($(event.target).is('#languageModal')) {
        closeLanguageModal();
    }
});