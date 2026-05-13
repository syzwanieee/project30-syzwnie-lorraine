// ubat.js - Single file (HTML English, but can switch to Malay based on localStorage)

// ========== GET LANGUAGE FROM LOCALSTORAGE ==========
const userLang = localStorage.getItem('medicare_lang') || 'ms';
const isEnglish = userLang === 'en';
const isMalay = userLang === 'ms';

// ========== TRANSLATIONS ==========
const translations = {
    ms: {
        pageTitle: "Senarai Ubat",
        backBtn: "Kembali",
        addBtn: "+ Tambah Ubat Baru",
        sectionTitle: "Jadual Ubat Anda",
        tipTitle: "Tips:",
        tipText: "Klik pada ubat untuk edit masa. Notification akan keluar mengikut masa yang ditetapkan.",
        addModalTitle: "Tambah Ubat Baru",
        editModalTitle: "Edit Ubat",
        nameLabel: "Nama Ubat",
        doseLabel: "Dos",
        timeLabel: "Masa (HH:MM)",
        timeNote: "Notifikasi akan keluar pada masa ini",
        saveBtn: "Simpan Ubat",
        deleteBtn: "Padam",
        statusTaken: "Sudah makan",
        statusNotTaken: "Belum makan",
        emptyState: "Tiada ubat lagi. Klik + untuk tambah.",
        sicknessPopupTitle: "Sakit apa?",
        sicknessSearchPlaceholder: "Cari penyakit...",
        sicknessSkip: "Langkau",
        recommendationTitle: "Cadangan Ubat",
        recommendationFor: "Untuk:",
        recommendedMedicines: "Ubat yang disyorkan:",
        clickToAdd: "Klik untuk tambah ke senarai",
        note: "Nota:",
        close: "Tutup",
        alreadyExists: "sudah ada dalam senarai anda!",
        addedSuccess: "ditambah ke senarai ubat anda!",
        addSuccess: "Ubat berjaya ditambah!",
        updateSuccess: "Ubat dikemaskini!",
        deleteConfirm: "Padam ubat ini?",
        deleteSuccess: "Ubat dipadam!",
        fillAllFields: "Sila lengkapkan semua ruangan!",
        medNamePlaceholder: "cth: Vitamin C",
        medDosePlaceholder: "cth: 2x sehari"
    },
    en: {
        pageTitle: "Medicine List",
        backBtn: "Back",
        addBtn: "+ Add New Medicine",
        sectionTitle: "Your Medicine Schedule",
        tipTitle: "Tip:",
        tipText: "Click on medicine to edit time. Notifications will appear based on the schedule.",
        addModalTitle: "Add New Medicine",
        editModalTitle: "Edit Medicine",
        nameLabel: "Medicine Name",
        doseLabel: "Dosage",
        timeLabel: "Time (HH:MM)",
        timeNote: "Notification will appear at this time",
        saveBtn: "Save Medicine",
        deleteBtn: "Delete",
        statusTaken: "Taken",
        statusNotTaken: "Not taken",
        emptyState: "No medicines added yet. Click + to add.",
        sicknessPopupTitle: "What sickness do you have?",
        sicknessSearchPlaceholder: "Search sickness...",
        sicknessSkip: "Skip",
        recommendationTitle: "Medicine Recommendation",
        recommendationFor: "For:",
        recommendedMedicines: "Recommended Medicines:",
        clickToAdd: "Click to add to your list",
        note: "Note:",
        close: "Close",
        alreadyExists: "is already in your list!",
        addedSuccess: "added to your medicine list!",
        addSuccess: "Medicine added successfully!",
        updateSuccess: "Medicine updated!",
        deleteConfirm: "Delete this medicine?",
        deleteSuccess: "Medicine deleted!",
        fillAllFields: "Please fill all fields!",
        medNamePlaceholder: "e.g: Vitamin C",
        medDosePlaceholder: "e.g: 2x daily"
    }
};

// Get current translations
const t = translations[userLang];

// ========== UPDATE HTML TEXT BASED ON LANGUAGE ==========
function updateUIText() {
    // Header
    const headerTitle = document.querySelector('.header h1');
    if (headerTitle) headerTitle.innerHTML = `💊 ${t.pageTitle}`;
    
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) backBtn.innerHTML = `← ${t.backBtn}`;
    
    // Add button
    const addBtn = document.querySelector('.btn-add');
    if (addBtn) addBtn.textContent = t.addBtn;
    
    // Section title
    const sectionTitle = document.querySelector('.medicine-container h2');
    if (sectionTitle) sectionTitle.textContent = t.sectionTitle;
    
    // Info box
    const infoBox = document.querySelector('.info-box p');
    if (infoBox) infoBox.innerHTML = `💡 <strong>${t.tipTitle}</strong> ${t.tipText}`;
    
    // Add Modal
    const addModalTitle = document.querySelector('#addModal .modal-header h3');
    if (addModalTitle) addModalTitle.innerHTML = `➕ ${t.addModalTitle}`;
    
    // Edit Modal
    const editModalTitle = document.querySelector('#editModal .modal-header h3');
    if (editModalTitle) editModalTitle.innerHTML = `✏️ ${t.editModalTitle}`;
    
    // Labels in modals
    const labels = document.querySelectorAll('.input-group label');
    if (labels[0]) labels[0].textContent = t.nameLabel;
    if (labels[1]) labels[1].textContent = t.doseLabel;
    if (labels[2]) labels[2].textContent = t.timeLabel;
    
    // Small notes in modals
    const smalls = document.querySelectorAll('.input-group small');
    if (smalls[0]) smalls[0].textContent = t.timeNote;
    if (smalls[1]) smalls[1].textContent = t.timeNote;
    
    // Placeholders
    const medNameInput = document.getElementById('medName');
    if (medNameInput) medNameInput.placeholder = t.medNamePlaceholder;
    
    const medDoseInput = document.getElementById('medDose');
    if (medDoseInput) medDoseInput.placeholder = t.medDosePlaceholder;
    
    // Save buttons
    const saveBtns = document.querySelectorAll('.btn-save');
    saveBtns.forEach(btn => {
        if (btn) btn.innerHTML = `💾 ${t.saveBtn}`;
    });
    
    // Delete button
    const deleteBtn = document.querySelector('.btn-delete');
    if (deleteBtn) deleteBtn.innerHTML = `🗑️ ${t.deleteBtn}`;
}

// Call this when page loads
updateUIText();

// ========== SICKNESS & MEDICINE DATABASE ==========
const sicknessDatabase = {
    ms: {
        "Demam": { medicines: ["Paracetamol", "Ibuprofen"], note: "Minum banyak air dan rehat yang cukup" },
        "Sakit Kepala": { medicines: ["Paracetamol", "Aspirin"], note: "Elakkan cahaya terang dan rehat" },
        "Selsema": { medicines: ["Loratadine", "Vitamin C"], note: "Minum air suam dan rehat" },
        "Batuk": { medicines: ["Cough Syrup", "Vitamin C"], note: "Elakkan makanan sejuk" },
        "Sakit Tekak": { medicines: ["Paracetamol", "Vitamin C"], note: "Berkumur dengan air garam" },
        "Sakit Perut": { medicines: ["Antasid", "Omeprazole"], note: "Elakkan makanan pedas" },
        "Alahan": { medicines: ["Loratadine"], note: "Elakkan pencetus alahan" },
        "Luka": { medicines: ["Amoxicillin"], note: "Pastikan luka bersih" },
        "Tekanan Darah Tinggi": { medicines: ["Lisinopril"], note: "Kurangkan garam" },
        "Kencing Manis": { medicines: ["Metformin"], note: "Kawal pengambilan gula" },
        "Senggugut": { medicines: ["Ibuprofen", "Paracetamol"], note: "Kompres panas pada perut" },
        "Sakit Sendi": { medicines: ["Ibuprofen", "Aspirin"], note: "Rehatkan sendi yang sakit" }
    },
    en: {
        "Fever": { medicines: ["Paracetamol", "Ibuprofen"], note: "Drink plenty of water and rest" },
        "Headache": { medicines: ["Paracetamol", "Aspirin"], note: "Avoid bright lights and rest" },
        "Cold": { medicines: ["Loratadine", "Vitamin C"], note: "Drink warm water and rest" },
        "Cough": { medicines: ["Cough Syrup", "Vitamin C"], note: "Avoid cold food" },
        "Sore Throat": { medicines: ["Paracetamol", "Vitamin C"], note: "Gargle with salt water" },
        "Stomachache": { medicines: ["Antasid", "Omeprazole"], note: "Avoid spicy food" },
        "Allergy": { medicines: ["Loratadine"], note: "Avoid allergy triggers" },
        "Wound": { medicines: ["Amoxicillin"], note: "Keep wound clean" },
        "High Blood Pressure": { medicines: ["Lisinopril"], note: "Reduce salt intake" },
        "Diabetes": { medicines: ["Metformin"], note: "Control sugar intake" },
        "Menstrual Cramps": { medicines: ["Ibuprofen", "Paracetamol"], note: "Apply warm compress" },
        "Joint Pain": { medicines: ["Ibuprofen", "Aspirin"], note: "Rest the painful joint" }
    }
};

// Medicine images database
const medicineImages = {
    "Vitamin C": { img: "vitamin.jpg", emoji: "🍊", fallback: "🍊", color: "#FF9800" },
    "Vitamin D": { img: "vitaminD.jpg", emoji: "☀️", fallback: "☀️", color: "#FFC107" },
    "Vitamin B12": { img: "vitaminb12.jpg", emoji: "💪", fallback: "💪", color: "#4CAF50" },
    "Paracetamol": { img: "paracetamol.jpg", emoji: "💊", fallback: "💊", color: "#F44336" },
    "Antasid": { img: "antasid.jpg", emoji: "🥛", fallback: "🥛", color: "#9C27B0" },
    "Ibuprofen": { img: "ibuprofen.jpg", emoji: "💊", fallback: "💊", color: "#FF5722" },
    "Amoxicillin": { img: "amoxicillin.jpg", emoji: "💊", fallback: "💊", color: "#2196F3" },
    "Lisinopril": { img: "lisinopril.jpg", emoji: "❤️", fallback: "❤️", color: "#E91E63" },
    "Metformin": { img: "metformin.jpg", emoji: "🩸", fallback: "🩸", color: "#795548" },
    "Loratadine": { img: "loratadine.jpg", emoji: "🤧", fallback: "🤧", color: "#00BCD4" },
    "Omeprazole": { img: "omeprazole.jpg", emoji: "🔥", fallback: "🔥", color: "#8BC34A" },
    "Aspirin": { img: "aspirin.jpg", emoji: "💊", fallback: "💊", color: "#D32F2F" },
    "Cough Syrup": { img: "cough_syrup.jpg", emoji: "🍯", fallback: "🍯", color: "#FF9800" },
    "Zinc": { img: "zinc.jpg", emoji: "🔋", fallback: "🔋", color: "#607D8B" },
    "Calcium": { img: "calcium.jpg", emoji: "🦴", fallback: "🦴", color: "#3F51B5" },
    "Fish Oil": { img: "fish_oil.jpg", emoji: "🐟", fallback: "🐟", color: "#009688" }
};

let medicines = JSON.parse(localStorage.getItem('medicare_medicines')) || [
    { name: "Vitamin C", name_ms: "Vitamin C", dose: "1x sehari", dose_en: "1x daily", time: "08:00", taken: false, lastTaken: null },
    { name: "Vitamin D", name_ms: "Vitamin D", dose: "1x sehari", dose_en: "1x daily", time: "09:00", taken: false, lastTaken: null },
    { name: "Vitamin B12", name_ms: "Vitamin B12", dose: "1x sehari", dose_en: "1x daily", time: "10:00", taken: false, lastTaken: null },
    { name: "Paracetamol", name_ms: "Paracetamol", dose: "Bila perlu", dose_en: "When needed", time: "14:00", taken: false, lastTaken: null },
    { name: "Antasid", name_ms: "Antasid", dose: "2x sehari", dose_en: "2x daily", time: "20:00", taken: false, lastTaken: null },
    { name: "Ibuprofen", name_ms: "Ibuprofen", dose: "Bila perlu", dose_en: "When needed", time: "18:00", taken: false, lastTaken: null },
    { name: "Amoxicillin", name_ms: "Amoxicillin", dose: "3x sehari", dose_en: "3x daily", time: "08:00", taken: false, lastTaken: null },
    { name: "Lisinopril", name_ms: "Lisinopril", dose: "1x sehari", dose_en: "1x daily", time: "07:00", taken: false, lastTaken: null },
    { name: "Metformin", name_ms: "Metformin", dose: "2x sehari", dose_en: "2x daily", time: "19:00", taken: false, lastTaken: null },
    { name: "Loratadine", name_ms: "Loratadine", dose: "1x sehari", dose_en: "1x daily", time: "12:00", taken: false, lastTaken: null }
];

let currentEditIndex = null;
let sicknessPopupShown = false;

// Save medicines
function saveMedicines() {
    localStorage.setItem('medicare_medicines', JSON.stringify(medicines));
}

// Get medicine image HTML
function getMedicineImageHTML(medicine) {
    const name = medicine.name;
    const imgData = medicineImages[name];
    
    if (imgData && imgData.img) {
        return `<img src="${imgData.img}" alt="${name}" class="medicine-img" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'medicine-emoji-fallback\\' style=\\'background:${imgData.color}20; color:${imgData.color};\\'>${imgData.emoji}</div>'">`;
    } else {
        const emoji = imgData?.emoji || "💊";
        const color = imgData?.color || "#6aa85f";
        return `<div class="medicine-emoji-fallback" style="background:${color}20; color:${color};">${emoji}</div>`;
    }
}

// Display medicine list
function displayMedicines() {
    const container = document.getElementById('medicineList');
    if (!container) return;
    
    if (medicines.length === 0) {
        container.innerHTML = `<div class="empty-state">${t.emptyState}</div>`;
        return;
    }
    
    let html = '';
    medicines.forEach((med, index) => {
        const name = isEnglish ? med.name : (med.name_ms || med.name);
        const dose = isEnglish ? (med.dose_en || med.dose) : med.dose;
        const takenClass = med.taken ? 'taken' : '';
        const statusText = med.taken ? t.statusTaken : t.statusNotTaken;
        
        html += `
            <div class="medicine-card ${takenClass}" onclick="editMedicine(${index})">
                <div class="medicine-image">
                    ${getMedicineImageHTML(med)}
                </div>
                <div class="medicine-info">
                    <div class="medicine-name">${name}</div>
                    <div class="medicine-dose">📋 ${dose}</div>
                    <div class="medicine-time">⏰ ${med.time}</div>
                </div>
                <div class="medicine-status ${takenClass}">${statusText}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Show sickness popup
function showSicknessPopup() {
    if (sicknessPopupShown) return;
    
    const sicknesses = isEnglish ? Object.keys(sicknessDatabase.en) : Object.keys(sicknessDatabase.ms);
    
    const popup = document.createElement('div');
    popup.className = 'sickness-popup';
    popup.innerHTML = `
        <div class="sickness-popup-content">
            <div class="sickness-popup-header">
                <div class="sickness-popup-icon">🤒</div>
                <h2>${t.sicknessPopupTitle}</h2>
            </div>
            <div class="sickness-popup-body">
                <div class="sickness-search">
                    <input type="text" id="sicknessSearch" placeholder="${t.sicknessSearchPlaceholder}" onkeyup="filterSicknessList()">
                </div>
                <div id="sicknessList" class="sickness-list">
                    ${sicknesses.map(s => `<div class="sickness-item" onclick="selectSickness('${s.replace(/'/g, "\\'")}')">${s}</div>`).join('')}
                </div>
            </div>
            <div class="sickness-popup-footer">
                <button class="sickness-btn skip" onclick="closeSicknessPopup()">${t.sicknessSkip}</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    sicknessPopupShown = true;
}

function filterSicknessList() {
    const searchInput = document.getElementById('sicknessSearch');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const sicknesses = isEnglish ? Object.keys(sicknessDatabase.en) : Object.keys(sicknessDatabase.ms);
    const filtered = sicknesses.filter(s => s.toLowerCase().includes(searchTerm));
    
    const listContainer = document.getElementById('sicknessList');
    if (listContainer) {
        listContainer.innerHTML = filtered.map(s => `<div class="sickness-item" onclick="selectSickness('${s.replace(/'/g, "\\'")}')">${s}</div>`).join('');
    }
}

function selectSickness(sickness) {
    closeSicknessPopup();
    const sicknessData = isEnglish ? sicknessDatabase.en[sickness] : sicknessDatabase.ms[sickness];
    if (sicknessData) showMedicineRecommendation(sickness, sicknessData);
}

function showMedicineRecommendation(sickness, sicknessData) {
    const medicineNames = sicknessData.medicines;
    const note = sicknessData.note;
    
    const popup = document.createElement('div');
    popup.className = 'recommendation-popup';
    popup.innerHTML = `
        <div class="recommendation-popup-content">
            <div class="recommendation-popup-header">
                <div class="recommendation-icon">💊</div>
                <h2>${t.recommendationTitle}</h2>
                <p>${t.recommendationFor} ${sickness}</p>
            </div>
            <div class="recommendation-popup-body">
                <div class="recommended-medicines">
                    <h3>${t.recommendedMedicines}</h3>
                    ${medicineNames.map(name => `
                        <div class="rec-medicine-item" onclick="addRecommendedMedicine('${name.replace(/'/g, "\\'")}')">
                            <div class="rec-medicine-icon">${medicineImages[name]?.emoji || '💊'}</div>
                            <div class="rec-medicine-info">
                                <div class="rec-medicine-name">${name}</div>
                                <div class="rec-medicine-desc">${t.clickToAdd}</div>
                            </div>
                            <div class="rec-add-btn">+</div>
                        </div>
                    `).join('')}
                </div>
                <div class="recommendation-note">
                    <p>💡 <strong>${t.note}</strong> ${note}</p>
                </div>
            </div>
            <div class="recommendation-popup-footer">
                <button class="recommendation-btn close" onclick="closeRecommendationPopup()">${t.close}</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
}

function addRecommendedMedicine(medicineName) {
    const existing = medicines.find(m => m.name === medicineName);
    if (existing) {
        alert(`${medicineName} ${t.alreadyExists}`);
        closeRecommendationPopup();
        return;
    }
    
    const defaultDose = isEnglish ? "1x daily" : "1x sehari";
    const defaultTime = "12:00";
    
    medicines.push({
        name: medicineName,
        name_ms: medicineName,
        dose: defaultDose,
        dose_en: defaultDose,
        time: defaultTime,
        taken: false,
        lastTaken: null
    });
    
    saveMedicines();
    displayMedicines();
    alert(`${medicineName} ${t.addedSuccess}`);
    closeRecommendationPopup();
}

// Modal functions
function showAddMedicineModal() {
    document.getElementById('medName').value = '';
    document.getElementById('medDose').value = '';
    document.getElementById('medTime').value = '08:00';
    
    document.getElementById('medName').placeholder = t.medNamePlaceholder;
    document.getElementById('medDose').placeholder = t.medDosePlaceholder;
    
    openModal('addModal');
}

function addMedicine() {
    const name = document.getElementById('medName').value.trim();
    const dose = document.getElementById('medDose').value.trim();
    const time = document.getElementById('medTime').value;
    
    if (!name || !dose || !time) {
        alert(t.fillAllFields);
        return;
    }
    
    medicines.push({
        name: name,
        name_ms: name,
        dose: dose,
        dose_en: dose,
        time: time,
        taken: false,
        lastTaken: null
    });
    
    saveMedicines();
    displayMedicines();
    closeModal('addModal');
    alert(t.addSuccess);
}

function editMedicine(index) {
    currentEditIndex = index;
    const med = medicines[index];
    
    document.getElementById('editMedName').value = isEnglish ? med.name : (med.name_ms || med.name);
    document.getElementById('editMedDose').value = isEnglish ? (med.dose_en || med.dose) : med.dose;
    document.getElementById('editMedTime').value = med.time;
    
    openModal('editModal');
}

function saveEditMedicine() {
    if (currentEditIndex === null) return;
    
    const newName = document.getElementById('editMedName').value.trim();
    const newDose = document.getElementById('editMedDose').value.trim();
    const newTime = document.getElementById('editMedTime').value;
    
    if (!newName || !newDose || !newTime) {
        alert(t.fillAllFields);
        return;
    }
    
    medicines[currentEditIndex].name = newName;
    medicines[currentEditIndex].name_ms = newName;
    medicines[currentEditIndex].dose = newDose;
    medicines[currentEditIndex].dose_en = newDose;
    medicines[currentEditIndex].time = newTime;
    
    saveMedicines();
    displayMedicines();
    closeModal('editModal');
    alert(t.updateSuccess);
}

function deleteMedicine() {
    if (currentEditIndex === null) return;
    
    if (confirm(t.deleteConfirm)) {
        medicines.splice(currentEditIndex, 1);
        saveMedicines();
        displayMedicines();
        closeModal('editModal');
        alert(t.deleteSuccess);
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

function closeSicknessPopup() {
    const popup = document.querySelector('.sickness-popup');
    if (popup) popup.remove();
}

function closeRecommendationPopup() {
    const popup = document.querySelector('.recommendation-popup');
    if (popup) popup.remove();
}

function goBack() {
    window.location.href = 'homepage.html';
}

function loadDarkMode() {
    if (localStorage.getItem('medicare_darkmode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayMedicines();
    loadDarkMode();
    
    setTimeout(() => {
        showSicknessPopup();
    }, 500);
    
    console.log('Medicine page loaded! Language:', isEnglish ? 'English' : 'Malay');
});

window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) modal.style.display = 'none';
    });
}