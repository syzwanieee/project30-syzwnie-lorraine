// Health Records Page with jQuery

// Get language from localStorage
const userLang = localStorage.getItem('medicare_lang') || 'ms';
const isEnglish = userLang === 'en';

// Translations
const t = isEnglish ? {
    pageTitle: "Health Records",
    backBtn: "Back",
    hospitalVisits: "Hospital Visits",
    medicinesTaken: "Medicines Taken",
    goodSleep: "Good Sleep",
    activityHistory: "Activity History",
    tipTitle: "Tip:",
    tipText: "Your health activities are automatically recorded here. Data is saved in your browser.",
    all: "All",
    hospital: "Hospital",
    medicine: "Medicine",
    sleep: "Sleep",
    emptyState: "No records yet. Your health activities will appear here."
} : {
    pageTitle: "Rekod Kesihatan",
    backBtn: "Kembali",
    hospitalVisits: "Lawatan Hospital",
    medicinesTaken: "Ubat Diambil",
    goodSleep: "Tidur Cukup",
    activityHistory: "Sejarah Aktiviti",
    tipTitle: "Tips:",
    tipText: "Aktiviti kesihatan anda direkodkan secara automatik di sini. Data disimpan dalam browser anda.",
    all: "Semua",
    hospital: "Hospital",
    medicine: "Ubat",
    sleep: "Tidur",
    emptyState: "Tiada rekod lagi. Aktiviti kesihatan anda akan muncul di sini."
};

// Update UI text
function updateUIText() {
    $('.header h1').text(`📋 ${t.pageTitle}`);
    $('.back-btn').html(`← ${t.backBtn}`);
    $('.summary-card').eq(0).find('p').text(t.hospitalVisits);
    $('.summary-card').eq(1).find('p').text(t.medicinesTaken);
    $('.summary-card').eq(2).find('p').text(t.goodSleep);
    $('.records-container h2').text(t.activityHistory);
    $('.info-box p').html(`💡 <strong>${t.tipTitle}</strong> ${t.tipText}`);
    
    // Filter buttons
    $('.filter-btn').eq(0).text(t.all);
    $('.filter-btn').eq(1).text(`🏥 ${t.hospital}`);
    $('.filter-btn').eq(2).text(`💊 ${t.medicine}`);
    $('.filter-btn').eq(3).text(`😴 ${t.sleep}`);
}

// Load data from localStorage
let hospitalRecords = JSON.parse(localStorage.getItem('medicare_hospital_records')) || [];
let medicineRecords = JSON.parse(localStorage.getItem('medicare_medicine_records')) || [];
let sleepRecords = JSON.parse(localStorage.getItem('medicare_sleep_records')) || [];

// Function to add hospital record (called from homepage when GO is pressed)
function addHospitalRecord(hospitalName, distance) {
    const record = {
        id: Date.now(),
        name: hospitalName,
        distance: distance,
        date: new Date().toLocaleString(),
        type: 'hospital'
    };
    hospitalRecords.unshift(record);
    localStorage.setItem('medicare_hospital_records', JSON.stringify(hospitalRecords));
    displayRecords(currentFilter);
    updateSummary();
}

// Function to add medicine record (called when TAKEN is pressed)
function addMedicineRecord(medicineName, dose) {
    const record = {
        id: Date.now(),
        name: medicineName,
        dose: dose,
        date: new Date().toLocaleString(),
        type: 'medicine'
    };
    medicineRecords.unshift(record);
    localStorage.setItem('medicare_medicine_records', JSON.stringify(medicineRecords));
    displayRecords(currentFilter);
    updateSummary();
}

// Function to add sleep record (called when sleep notification is shown)
function addSleepRecord() {
    const record = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        type: 'sleep',
        message: isEnglish ? 'Went to bed on time' : 'Tidur tepat pada waktunya'
    };
    sleepRecords.unshift(record);
    localStorage.setItem('medicare_sleep_records', JSON.stringify(sleepRecords));
    displayRecords(currentFilter);
    updateSummary();
}

// Current filter
let currentFilter = 'all';

// Display records based on filter
function displayRecords(filter) {
    let allRecords = [];
    
    // Combine all records
    hospitalRecords.forEach(r => allRecords.push({ ...r, type: 'hospital' }));
    medicineRecords.forEach(r => allRecords.push({ ...r, type: 'medicine' }));
    sleepRecords.forEach(r => allRecords.push({ ...r, type: 'sleep' }));
    
    // Sort by date (newest first)
    allRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Filter
    if (filter !== 'all') {
        allRecords = allRecords.filter(r => r.type === filter);
    }
    
    const container = $('#recordsList');
    if (allRecords.length === 0) {
        container.html(`<div class="empty-state">${t.emptyState}</div>`);
        return;
    }
    
    let html = '';
    allRecords.forEach(record => {
        let icon = '';
        let title = '';
        let detail = '';
        
        if (record.type === 'hospital') {
            icon = '🏥';
            title = record.name;
            const distanceText = record.distance < 1 ? `${Math.round(record.distance * 1000)} m` : `${record.distance.toFixed(1)} km`;
            detail = isEnglish ? `Visited hospital • ${distanceText} away` : `Melawat hospital • ${distanceText} dari lokasi`;
        } else if (record.type === 'medicine') {
            icon = '💊';
            title = record.name;
            detail = isEnglish ? `Took medicine • Dosage: ${record.dose}` : `Makan ubat • Dos: ${record.dose}`;
        } else {
            icon = '😴';
            title = isEnglish ? 'Sleep Record' : 'Rekod Tidur';
            detail = record.message;
        }
        
        html += `
            <div class="record-item" data-type="${record.type}">
                <div class="record-icon ${record.type}">${icon}</div>
                <div class="record-info">
                    <div class="record-title">${title}</div>
                    <div class="record-detail">${detail}</div>
                </div>
                <div class="record-date">${record.date}</div>
            </div>
        `;
    });
    
    container.html(html);
}

// Update summary statistics
function updateSummary() {
    const hospitalCount = hospitalRecords.length;
    const medicineCount = medicineRecords.length;
    const sleepCount = sleepRecords.length;
    
    $('#hospitalCount').text(hospitalCount);
    $('#medicineCount').text(medicineCount);
    $('#sleepCount').text(sleepCount);
}

// Load dark mode
function loadDarkMode() {
    if (localStorage.getItem('medicare_darkmode') === 'true') {
        $('body').addClass('dark-mode');
    }
}

// Go back - FIXED (only homepage.html)
function goBack() {
    window.location.href = 'homepage.html';
}

// Initialize
$(document).ready(function() {
    updateUIText();
    displayRecords('all');
    updateSummary();
    loadDarkMode();
    
    // Filter buttons
    $('.filter-btn').on('click', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        displayRecords(currentFilter);
    });
    
    console.log('Health Records page loaded!');
    console.log('Records count - Hospital:', hospitalRecords.length, 'Medicine:', medicineRecords.length, 'Sleep:', sleepRecords.length);
    console.log('Redirect: Back -> homepage.html');
});