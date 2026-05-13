let currentUser = JSON.parse(localStorage.getItem('medicare_user'));

if (!currentUser) {
    currentUser = {
        fullName: 'Guest',
        phoneNo: '-',
        address: '-',
        postcode: '-',
        city: '-',
        state: '-'
    };
}

// Get language from localStorage
let userLanguage = localStorage.getItem('medicare_lang') || 'ms';
let isEnglish = userLanguage === 'en';

// Listen for language changes
window.addEventListener('storage', function(e) {
    if (e.key === 'medicare_lang') {
        userLanguage = e.newValue || 'ms';
        isEnglish = userLanguage === 'en';
        updateUIText();
    }
});

// Load profile photo
function loadProfilePhoto() {
    const savedPhoto = localStorage.getItem('medicare_profile_photo');
    if (savedPhoto && savedPhoto !== 'orangtua.jpg') {
        $('#profileImg').attr('src', savedPhoto);
    } else {
        $('#profileImg').attr('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236aa85f"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E');
    }
}

// ========== TEXT TO SPEECH ==========
function speakText(text, lang) {
    const ttsEnabled = localStorage.getItem('medicare_tts') !== 'false';
    if (!ttsEnabled) return;
    
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (lang === 'ms') {
            utterance.lang = 'ms-MY';
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
        } else {
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
        }
        window.speechSynthesis.speak(utterance);
    }
}

// ========== TRANSLATIONS ==========
const translations = {
    ms: {
        greetingMorning: "Selamat Pagi",
        greetingAfternoon: "Selamat Petang",
        greetingEvening: "Selamat Malam",
        welcome: "Selamat Datang,",
        subtitle: "Perjalanan kesihatan anda bermula di sini",
        healthRecords: "Rekod Kesihatan",
        musicTherapy: "Terapi Muzik",
        sleepReminder: "Peringatan Tidur",
        appointments: "Temujanji",
        recentActivities: "Aktiviti Terkini",
        home: "Utama",
        medicineList: "Senarai Ubat",
        nearbyHospital: "Hospital Berdekatan",
        settings: "Tetapan",
        featureSoon: "✨ Fungsi akan datang!",
        hospitalMsg: "🏥 PERINGATAN: Sudah sampai masa untuk check-up kesihatan!",
        medicineMsg: "💊 PERINGATAN UBAT: Sudah masa untuk ambil",
        sleepMsg: "😴 PERINGATAN TIDUR: Dah pukul 10 malam. Rehat yang cukup!",
        appointmentMsg: "📅 PERINGATAN TEMUJANJI",
        takenQuestion: "Sudah ambil ubat?",
        greatRecorded: "✅ Bagus! Ubat direkodkan.",
        sleepConfirm: "Nak tidur sekarang?",
        goodNight: "🌙 Selamat malam! Tidur yang lena.",
        hospitalQuestion: "Nak pergi ke hospital?",
        appointmentQuestion: "Nak pergi ke hospital sekarang?",
        goButton: "🚗 GO",
        cancelButton: "Batal",
        okButton: "OK",
        logoutConfirm: "Log keluar?"
    },
    en: {
        greetingMorning: "Good Morning",
        greetingAfternoon: "Good Afternoon",
        greetingEvening: "Good Evening",
        welcome: "Welcome,",
        subtitle: "Your health journey starts here",
        healthRecords: "Health Records",
        musicTherapy: "Music Therapy",
        sleepReminder: "Sleep Reminder",
        appointments: "Appointments",
        recentActivities: "Recent Activities",
        home: "Home",
        medicineList: "Medicine List",
        nearbyHospital: "Nearby Hospital",
        settings: "Settings",
        featureSoon: "✨ Feature coming soon!",
        hospitalMsg: "🏥 REMINDER: Time for your health check-up!",
        medicineMsg: "💊 MEDICINE REMINDER: Time to take your",
        sleepMsg: "😴 SLEEP REMINDER: It's 10 PM. Time to rest!",
        appointmentMsg: "📅 APPOINTMENT REMINDER",
        takenQuestion: "Have you taken it?",
        greatRecorded: "✅ Great! Medicine recorded.",
        sleepConfirm: "Are you going to sleep now?",
        goodNight: "🌙 Good night! Sleep well.",
        hospitalQuestion: "Go to hospital?",
        appointmentQuestion: "Go to hospital now?",
        goButton: "🚗 GO",
        cancelButton: "Cancel",
        okButton: "OK",
        logoutConfirm: "Logout?"
    }
};

function getText(key) {
    return translations[userLanguage][key];
}

// Update UI text
function updateUIText() {
    const hour = new Date().getHours();
    let greeting = '';
    if (hour < 12) greeting = getText('greetingMorning');
    else if (hour < 18) greeting = getText('greetingAfternoon');
    else greeting = getText('greetingEvening');
    
    const timeString = new Date().toLocaleTimeString();
    $('#greetingText').html(`${greeting}<br><span class="clock-time">${timeString}</span>`);
    
    $('#welcomeTitle').html(`${getText('welcome')} <span id="userNameWelcome">${currentUser.fullName}</span>!`);
    $('#welcomeSubtitle').text(getText('subtitle'));
    
    $('.card-1 .card-text').text(getText('healthRecords'));
    $('.card-2 .card-text').text(getText('musicTherapy'));
    $('.card-3 .card-text').text(getText('sleepReminder'));
    $('.card-4 .card-text').text(getText('appointments'));
    
    $('.recent-section h3').text(getText('recentActivities'));
    
    $('.nav-item[data-page="home"] .nav-label').text(getText('home'));
    $('.nav-item[data-page="medicine"] .nav-label').text(getText('medicineList'));
    $('.nav-item[data-page="location"] .nav-label').text(getText('nearbyHospital'));
    $('.nav-item[data-page="setting"] .nav-label').text(getText('settings'));
}

// ========== LOCATION & HOSPITAL ==========
let userLocation = null;

const hospitals = [
    { name: "Hospital Raja Permaisuri Bainun", lat: 4.5921, lng: 101.0907 },
    { name: "Pantai Hospital Ipoh", lat: 4.5947, lng: 101.1176 },
    { name: "Hospital Seri Manjung", lat: 4.18478, lng: 100.66088 },
    { name: "Pantai Hospital Manjung", lat: 4.215863, lng: 100.670407 },
    { name: "Hospital Kuala Lumpur", lat: 3.1738, lng: 101.6889 },
    { name: "Hospital Sungai Buloh", lat: 3.2144, lng: 101.5922 },
    { name: "Hospital Pulau Pinang", lat: 5.4164, lng: 100.3291 },
    { name: "Hospital Sultanah Aminah", lat: 1.4655, lng: 103.7428 }
];

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function getNearestHospital() {
    if (!userLocation) return hospitals[0];
    let nearest = null;
    let minDistance = Infinity;
    hospitals.forEach(hospital => {
        const distance = calculateDistance(userLocation.lat, userLocation.lng, hospital.lat, hospital.lng);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = { ...hospital, distance: distance };
        }
    });
    return nearest || hospitals[0];
}

function getHospitalCoordinates(hospitalName) {
    const found = hospitals.find(h => 
        h.name.toLowerCase().includes(hospitalName.toLowerCase()) ||
        hospitalName.toLowerCase().includes(h.name.toLowerCase())
    );
    if (found) return { lat: found.lat, lng: found.lng, name: found.name };
    return { lat: hospitals[0].lat, lng: hospitals[0].lng, name: hospitals[0].name };
}

// ========== OPEN GOOGLE MAPS (No Waze) ==========
function openMapToLocation(lat, lng) {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
}

function detectUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
                console.log('📍 Location detected');
            },
            function() { userLocation = { lat: 4.5921, lng: 101.0907 }; }
        );
    } else {
        userLocation = { lat: 4.5921, lng: 101.0907 };
    }
}

// ========== SAVE HOSPITAL RECORD ==========
function saveHospitalRecord(hospitalName, distance) {
    const record = {
        id: Date.now(),
        name: hospitalName,
        distance: distance,
        date: new Date().toLocaleString(),
        type: 'hospital'
    };
    let records = JSON.parse(localStorage.getItem('medicare_hospital_records')) || [];
    records.unshift(record);
    localStorage.setItem('medicare_hospital_records', JSON.stringify(records));
    console.log('🏥 Hospital record saved:', hospitalName);
}

// ========== CUSTOM POPUP ==========
function showCustomPopup(title, message, showGoButton = false, onGo = null) {
    $('.custom-notification-popup').remove();
    
    const popupDiv = document.createElement('div');
    popupDiv.className = 'custom-notification-popup';
    popupDiv.innerHTML = `
        <div class="popup-overlay">
            <div class="popup-content">
                <div class="popup-icon">📅</div>
                <h3>${title}</h3>
                <p>${message}</p>
                <div class="popup-buttons">
                    ${showGoButton ? `<button class="popup-btn go-btn" id="popupGoBtn">${getText('goButton')}</button>` : ''}
                    <button class="popup-btn ${showGoButton ? 'cancel-btn' : 'ok-btn'}" id="popupCloseBtn">${showGoButton ? getText('cancelButton') : getText('okButton')}</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(popupDiv);
    
    if (showGoButton && onGo) {
        document.getElementById('popupGoBtn').onclick = function() {
            popupDiv.remove();
            onGo();
        };
    }
    
    document.getElementById('popupCloseBtn').onclick = function() {
        popupDiv.remove();
    };
    
    setTimeout(() => {
        if (document.body.contains(popupDiv)) popupDiv.remove();
    }, 30000);
}

// ========== LOAD DATA ==========
function loadMedicines() {
    const saved = localStorage.getItem('medicare_medicines');
    if (saved) return JSON.parse(saved);
    return [
        { name: "Vitamin C", name_ms: "Vitamin C", dose: "1x sehari", dose_en: "1x daily", time: "08:00", taken: false, lastTaken: null, lastNotified: null },
        { name: "Paracetamol", name_ms: "Paracetamol", dose: "Bila perlu", dose_en: "When needed", time: "14:00", taken: false, lastTaken: null, lastNotified: null },
        { name: "Antasid", name_ms: "Antasid", dose: "2x sehari", dose_en: "2x daily", time: "20:00", taken: false, lastTaken: null, lastNotified: null }
    ];
}

let userMedicines = loadMedicines();

function saveMedicines() {
    localStorage.setItem('medicare_medicines', JSON.stringify(userMedicines));
}

function loadAppointments() {
    const saved = localStorage.getItem('medicare_appointments');
    if (saved) return JSON.parse(saved);
    return [];
}

const SLEEP_HOUR = 22;
const SLEEP_MINUTE = 0;

function saveMedicineRecord(medicineName, dose) {
    const record = { id: Date.now(), name: medicineName, dose: dose, date: new Date().toLocaleString(), type: 'medicine' };
    let records = JSON.parse(localStorage.getItem('medicare_medicine_records')) || [];
    records.unshift(record);
    localStorage.setItem('medicare_medicine_records', JSON.stringify(records));
}

function saveSleepRecord() {
    const record = { id: Date.now(), date: new Date().toLocaleString(), type: 'sleep', message: isEnglish ? 'Went to bed on time' : 'Tidur tepat pada waktunya' };
    let records = JSON.parse(localStorage.getItem('medicare_sleep_records')) || [];
    records.unshift(record);
    localStorage.setItem('medicare_sleep_records', JSON.stringify(records));
}

// ========== MEDICINE REMINDER ==========
function checkMedicineReminder() {
    userMedicines = loadMedicines();
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const today = now.toDateString();
    
    userMedicines.forEach((medicine) => {
        if (medicine.time === currentTime) {
            const lastNotifiedDate = medicine.lastNotified ? new Date(medicine.lastNotified).toDateString() : null;
            if (lastNotifiedDate !== today && !medicine.taken) {
                medicine.lastNotified = now.toString();
                saveMedicines();
                
                const medicineName = isEnglish ? medicine.name : (medicine.name_ms || medicine.name);
                const doseText = isEnglish ? medicine.dose_en : medicine.dose;
                const message = `${getText('medicineMsg')} ${medicineName} (${doseText})`;
                
                speakText(message, userLanguage);
                const taken = confirm(message + "\n\n" + getText('takenQuestion'));
                
                if (taken) {
                    medicine.taken = true;
                    medicine.lastTaken = now.toString();
                    saveMedicines();
                    saveMedicineRecord(medicineName, doseText);
                    const successMsg = getText('greatRecorded');
                    speakText(successMsg, userLanguage);
                    alert(successMsg);
                }
            }
        }
    });
}

// ========== SLEEP REMINDER ==========
function checkSleepReminder() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const today = now.toDateString();
    const lastNotifiedDate = localStorage.getItem('medicare_sleep_last_notified');
    
    if (currentHour === SLEEP_HOUR && currentMinute >= SLEEP_MINUTE && currentMinute < SLEEP_MINUTE + 5) {
        if (lastNotifiedDate !== today) {
            localStorage.setItem('medicare_sleep_last_notified', today);
            const message = getText('sleepMsg');
            speakText(message, userLanguage);
            const confirmSleep = confirm(message + "\n\n" + getText('sleepConfirm'));
            if (confirmSleep) {
                saveSleepRecord();
                const goodnightMsg = getText('goodNight');
                speakText(goodnightMsg, userLanguage);
                alert(goodnightMsg);
            }
        }
    }
}

// ========== HOSPITAL REMINDER (Sunday) dengan SAVE RECORD ==========
function checkHospitalReminder() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    
    if (day === 0 && hour >= 9 && hour < 12) {
        const lastNotified = localStorage.getItem('medicare_hospital_last_notified');
        const today = now.toDateString();
        
        if (lastNotified !== today) {
            localStorage.setItem('medicare_hospital_last_notified', today);
            const hospital = getNearestHospital();
            const message = getText('hospitalMsg');
            const hospitalName = hospital.name;
            const distance = hospital.distance ? hospital.distance.toFixed(1) : 0;
            
            speakText(message + " " + hospitalName, userLanguage);
            
            showCustomPopup(
                getText('hospitalMsg'),
                `${hospitalName}\n📍 ${distance} km`,
                true,
                () => {
                    // SAVE HOSPITAL RECORD FIRST
                    saveHospitalRecord(hospitalName, parseFloat(distance));
                    // THEN OPEN MAP
                    openMapToLocation(hospital.lat, hospital.lng);
                }
            );
        }
    }
}

// ========== APPOINTMENT REMINDER ==========
function checkAppointmentReminder() {
    const appointments = loadAppointments();
    const now = new Date();
    const today = now.toDateString();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    appointments.forEach((appointment, index) => {
        const appDate = new Date(appointment.date);
        const appDateString = appDate.toDateString();
        const appTime = appointment.time;
        
        if (appDateString === today && appTime === currentTime) {
            const lastNotifiedKey = `appointment_notified_${index}_${appointment.date}_${appointment.time}`;
            const lastNotified = localStorage.getItem(lastNotifiedKey);
            
            if (!lastNotified) {
                localStorage.setItem(lastNotifiedKey, now.toString());
                
                const title = getText('appointmentMsg');
                const doctorText = appointment.doctor ? ` dengan Dr. ${appointment.doctor}` : '';
                const message = `${appointment.name}${doctorText}\n📅 ${new Date(appointment.date).toLocaleDateString()} 🕐 ${appointment.time}\n${appointment.notes ? `📝 ${appointment.notes}` : ''}`;
                
                speakText(`Peringatan temujanji di ${appointment.name} pada pukul ${appointment.time}`, userLanguage);
                
                const coords = getHospitalCoordinates(appointment.name);
                
                showCustomPopup(
                    title,
                    message,
                    true,
                    () => openMapToLocation(coords.lat, coords.lng)
                );
            }
        }
    });
}

// ========== START ALL REMINDERS ==========
function startAllReminders() {
    setInterval(() => {
        checkMedicineReminder();
        checkSleepReminder();
        checkHospitalReminder();
        checkAppointmentReminder();
    }, 10000);
    
    setTimeout(() => {
        console.log('🚀 Running initial reminder checks...');
        checkMedicineReminder();
        checkSleepReminder();
        checkHospitalReminder();
        checkAppointmentReminder();
    }, 3000);
    
    console.log('🚀 All reminders started!');
}

// ========== TEST FUNCTIONS ==========
window.testHospitalPopup = function() {
    const hospital = getNearestHospital();
    showCustomPopup(getText('hospitalMsg'), `${hospital.name}\n📍 ${hospital.distance ? hospital.distance.toFixed(1) + ' km' : 'Hospital terdekat'}`, true, () => {
        saveHospitalRecord(hospital.name, hospital.distance || 0);
        openMapToLocation(hospital.lat, hospital.lng);
    });
};

window.testAppointmentPopup = function() {
    showCustomPopup(getText('appointmentMsg'), 'Hospital Pantai Ipoh\n👨‍⚕️ Dr. Ahmad\n📅 25 Disember 2025 🕐 10:00 AM', true, () => openMapToLocation(4.5947, 101.1176));
};

window.testNow = function() {
    const medMsg = getText('medicineMsg') + " Vitamin C (1x sehari)";
    speakText(medMsg, userLanguage);
    const medResult = confirm("🔴 TEST MEDICINE 🔴\n\n" + medMsg + "\n\n" + getText('takenQuestion'));
    if (medResult) {
        speakText(getText('greatRecorded'), userLanguage);
        alert(getText('greatRecorded'));
    }
    
    setTimeout(() => {
        const sleepMsg = getText('sleepMsg');
        speakText(sleepMsg, userLanguage);
        const sleepResult = confirm("🔴 TEST SLEEP 🔴\n\n" + sleepMsg + "\n\n" + getText('sleepConfirm'));
        if (sleepResult) {
            speakText(getText('goodNight'), userLanguage);
            alert(getText('goodNight'));
        }
    }, 500);
    
    setTimeout(() => { testHospitalPopup(); }, 1000);
    setTimeout(() => { testAppointmentPopup(); }, 2000);
};

window.showSchedule = function() {
    const medicines = loadMedicines();
    console.log('📋 MEDICINE SCHEDULE:');
    medicines.forEach(med => { const name = isEnglish ? med.name : (med.name_ms || med.name); console.log(`   ${med.time} - ${name}`); });
    const appointments = loadAppointments();
    console.log('📋 APPOINTMENTS:');
    appointments.forEach(app => { console.log(`   ${app.date} ${app.time} - ${app.name}`); });
};

// ========== REDIRECT FUNCTIONS ==========
function showMedicine() { window.location.href = 'ubat.html'; }
function showLocation() { window.location.href = 'hospital.html'; }
function showSettings() { window.location.href = 'setting.html'; }
function showProfile() { 
    localStorage.setItem('medicare_user', JSON.stringify(currentUser)); 
    window.location.href = 'profile.html'; 
}

// ========== LIVE CLOCK ==========
function updateClockAndGreeting() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    let greeting = '';
    if (hours < 12) greeting = getText('greetingMorning');
    else if (hours < 18) greeting = getText('greetingAfternoon');
    else greeting = getText('greetingEvening');
    $('#greetingText').html(`${greeting}<br><span class="clock-time">${timeString}</span>`);
}

function startLiveClock() {
    updateClockAndGreeting();
    setInterval(updateClockAndGreeting, 1000);
}

// ========== SETTINGS ==========
function initDarkMode() {
    $('#darkModeToggle').on('change', function() {
        $('body').toggleClass('dark-mode', this.checked);
        localStorage.setItem('medicare_darkmode', this.checked);
    });
}

function initNotification() {
    $('#notificationToggle').on('change', function() {
        localStorage.setItem('medicare_notification', this.checked);
    });
}

function initTTS() {
    $('#ttsToggle').on('change', function() {
        localStorage.setItem('medicare_tts', this.checked);
        const status = this.checked ? 'on' : 'off';
        const msg = isEnglish ? `Voice ${status}` : `Suara ${status === 'on' ? 'hidup' : 'mati'}`;
        speakText(msg, userLanguage);
        alert(msg);
    });
}

function loadDarkModeStatus() {
    if (localStorage.getItem('medicare_darkmode') === 'true') {
        $('body').addClass('dark-mode');
        $('#darkModeToggle').prop('checked', true);
    }
}

function loadVoices() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
        }
    }
}

// ========== EVENT LISTENERS ==========
function initEventListeners() {
    $('#profileIcon').on('click', showProfile);
    $('#logoutBtn').on('click', logout);
    
    $('.nav-item').on('click', function() {
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
        const page = $(this).data('page');
        if (page === 'medicine') showMedicine();
        else if (page === 'location') showLocation();
        else if (page === 'setting') showSettings();
    });
    
    $('.card').on('click', function() {
        const feature = $(this).data('feature');
        if (feature === 'health') window.location.href = 'healthrecords.html';
        else if (feature === 'appointment') window.location.href = 'appointment.html';
        else if (feature === 'music') window.location.href = 'music.html';
        else if (feature === 'reminder') window.location.href = 'sleep.html';
        else alert(getText('featureSoon'));
    });
    
    initDarkMode();
    initNotification();
    initTTS();
}

function logout() {
    if (confirm(getText('logoutConfirm'))) {
        localStorage.clear();
        window.location.href = 'medicare.html';
    }
}

$('#userNameWelcome').text(currentUser.fullName);

// ========== MAIN INIT ==========
$(document).ready(function() {
    console.log('🚀 Page loaded at ' + new Date().toLocaleTimeString());
    loadProfilePhoto();
    updateUIText();
    startLiveClock();
    loadDarkModeStatus();
    initEventListeners();
    loadVoices();
    detectUserLocation();
    startAllReminders();
    setTimeout(() => { window.showSchedule(); }, 1000);
    console.log('✅ Home page ready!');
    console.log('🔴 TO TEST HOSPITAL POPUP: testHospitalPopup()');
    console.log('🔴 TO TEST ALL: testNow()');
});