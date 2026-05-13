// Appointment Page JavaScript

// Get language from localStorage
const userLang = localStorage.getItem('medicare_lang') || 'ms';
const isEnglish = userLang === 'en';
const isMalay = userLang === 'ms';

// Translations
const t = isEnglish ? {
    pageTitle: "Appointments",
    backBtn: "Back",
    addBtn: "+ New Appointment",
    upcomingTitle: "Upcoming Appointments",
    pastTitle: "Past Appointments",
    tipTitle: "Tip:",
    tipText: "Click on appointment to edit or cancel. Add your medical appointments to never miss them!",
    addModalTitle: "New Appointment",
    editModalTitle: "Edit Appointment",
    hospitalLabel: "Hospital/Clinic Name",
    doctorLabel: "Doctor Name",
    dateLabel: "Date",
    timeLabel: "Time",
    notesLabel: "Notes (Optional)",
    saveBtn: "Save Appointment",
    deleteBtn: "Cancel Appointment",
    cancel: "Cancel",
    emptyUpcoming: "No upcoming appointments. Click + to add.",
    emptyPast: "No past appointments.",
    statusUpcoming: "Upcoming",
    statusPast: "Past",
    deleteConfirm: "Cancel this appointment?",
    deleteSuccess: "Appointment cancelled!",
    addSuccess: "Appointment added successfully!",
    updateSuccess: "Appointment updated successfully!",
    fillAllFields: "Please fill all required fields!"
} : {
    pageTitle: "Temujanji",
    backBtn: "Kembali",
    addBtn: "+ Temujanji Baru",
    upcomingTitle: "Temujanji Akan Datang",
    pastTitle: "Temujanji Lepas",
    tipTitle: "Tips:",
    tipText: "Klik pada temujanji untuk edit atau batal. Tambah temujanji perubatan anda supaya tidak terlepas!",
    addModalTitle: "Temujanji Baru",
    editModalTitle: "Edit Temujanji",
    hospitalLabel: "Nama Hospital/Klinik",
    doctorLabel: "Nama Doktor",
    dateLabel: "Tarikh",
    timeLabel: "Masa",
    notesLabel: "Catatan (Pilihan)",
    saveBtn: "Simpan Temujanji",
    deleteBtn: "Batal Temujanji",
    cancel: "Batal",
    emptyUpcoming: "Tiada temujanji akan datang. Klik + untuk tambah.",
    emptyPast: "Tiada temujanji lepas.",
    statusUpcoming: "Akan Datang",
    statusPast: "Lepas",
    deleteConfirm: "Batal temujanji ini?",
    deleteSuccess: "Temujanji dibatalkan!",
    addSuccess: "Temujanji berjaya ditambah!",
    updateSuccess: "Temujanji berjaya dikemaskini!",
    fillAllFields: "Sila lengkapkan semua ruangan yang diperlukan!"
};

// Update UI text
function updateUIText() {
    const headerTitle = document.querySelector('.header h1');
    if (headerTitle) headerTitle.textContent = `📅 ${t.pageTitle}`;
    
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) backBtn.innerHTML = `← ${t.backBtn}`;
    
    const addBtn = document.querySelector('.btn-add');
    if (addBtn) addBtn.textContent = t.addBtn;
    
    const titles = document.querySelectorAll('.appointment-container h2');
    if (titles[0]) titles[0].textContent = t.upcomingTitle;
    if (titles[1]) titles[1].textContent = t.pastTitle;
    
    const infoBox = document.querySelector('.info-box p');
    if (infoBox) infoBox.innerHTML = `💡 <strong>${t.tipTitle}</strong> ${t.tipText}`;
    
    const addModalTitle = document.querySelector('#addModal .modal-header h3');
    if (addModalTitle) addModalTitle.innerHTML = `➕ ${t.addModalTitle}`;
    
    const editModalTitle = document.querySelector('#editModal .modal-header h3');
    if (editModalTitle) editModalTitle.innerHTML = `✏️ ${t.editModalTitle}`;
    
    const labels = document.querySelectorAll('.input-group label');
    if (labels[0]) labels[0].textContent = t.hospitalLabel;
    if (labels[1]) labels[1].textContent = t.doctorLabel;
    if (labels[2]) labels[2].textContent = t.dateLabel;
    if (labels[3]) labels[3].textContent = t.timeLabel;
    if (labels[4]) labels[4].textContent = t.notesLabel;
    if (labels[5]) labels[5].textContent = t.hospitalLabel;
    if (labels[6]) labels[6].textContent = t.doctorLabel;
    if (labels[7]) labels[7].textContent = t.dateLabel;
    if (labels[8]) labels[8].textContent = t.timeLabel;
    if (labels[9]) labels[9].textContent = t.notesLabel;
    
    const saveBtns = document.querySelectorAll('.btn-save');
    saveBtns.forEach(btn => {
        if (btn) btn.innerHTML = `💾 ${t.saveBtn}`;
    });
    
    const deleteBtn = document.querySelector('.btn-delete');
    if (deleteBtn) deleteBtn.innerHTML = `🗑️ ${t.deleteBtn}`;
}

// ========== SAMPLE APPOINTMENTS (Manjung, Ipoh, Johor, KL, Penang) ==========
const sampleAppointments = [
    // Upcoming appointments
    {
        name: "Hospital Seri Manjung",
        name_ms: "Hospital Seri Manjung",
        doctor: "Dr. Ahmad Faizal",
        doctor_ms: "Dr. Ahmad Faizal",
        date: getFutureDate(7),
        time: "09:00",
        notes: "Klinik Pakar Dalaman - Sila bawa laporan darah",
        notes_ms: "Klinik Pakar Dalaman - Sila bawa laporan darah"
    },
    {
        name: "Pantai Hospital Manjung",
        name_ms: "Pantai Hospital Manjung",
        doctor: "Dr. Siti Noraisyah",
        doctor_ms: "Dr. Siti Noraisyah",
        date: getFutureDate(14),
        time: "14:30",
        notes: "Pemeriksaan rutin - Sila puasa 8 jam",
        notes_ms: "Pemeriksaan rutin - Sila puasa 8 jam"
    },
    {
        name: "Hospital Raja Permaisuri Bainun",
        name_ms: "Hospital Raja Permaisuri Bainun",
        doctor: "Dr. Mohamed Khairul",
        doctor_ms: "Dr. Mohamed Khairul",
        date: getFutureDate(21),
        time: "11:00",
        notes: "Klinik Ortopedik - Bawa X-ray lama",
        notes_ms: "Klinik Ortopedik - Bawa X-ray lama"
    },
    {
        name: "KPJ Ipoh Specialist Hospital",
        name_ms: "KPJ Ipoh Specialist Hospital",
        doctor: "Dr. Vanitha",
        doctor_ms: "Dr. Vanitha",
        date: getFutureDate(3),
        time: "15:00",
        notes: "Klinik Mata - Bawa cermin mata",
        notes_ms: "Klinik Mata - Bawa cermin mata"
    },
    {
        name: "Gleneagles Hospital Kuala Lumpur",
        name_ms: "Gleneagles Hospital Kuala Lumpur",
        doctor: "Dr. Lim Wei Sheng",
        doctor_ms: "Dr. Lim Wei Sheng",
        date: getFutureDate(10),
        time: "10:30",
        notes: "Klinik Jantung - Sila puasa 6 jam",
        notes_ms: "Klinik Jantung - Sila puasa 6 jam"
    },
    // Past appointments
    {
        name: "Klinik Kesihatan Sitiawan",
        name_ms: "Klinik Kesihatan Sitiawan",
        doctor: "Dr. Norazlin",
        doctor_ms: "Dr. Norazlin",
        date: getPastDate(5),
        time: "08:30",
        notes: "Vaksinasi COVID-19 Dos 1",
        notes_ms: "Vaksinasi COVID-19 Dos 1"
    },
    {
        name: "Hospital Sultanah Aminah",
        name_ms: "Hospital Sultanah Aminah",
        doctor: "Dr. Ramesh",
        doctor_ms: "Dr. Ramesh",
        date: getPastDate(10),
        time: "13:00",
        notes: "Klinik Gigi - Cabutan gigi",
        notes_ms: "Klinik Gigi - Cabutan gigi"
    },
    {
        name: "Penang Adventist Hospital",
        name_ms: "Penang Adventist Hospital",
        doctor: "Dr. Tan Mei Ling",
        doctor_ms: "Dr. Tan Mei Ling",
        date: getPastDate(15),
        time: "16:00",
        notes: "Klinik Kulit - Bawa krim sebelum ini",
        notes_ms: "Klinik Kulit - Bawa krim sebelum ini"
    }
];

// Helper functions for dates
function getFutureDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

function getPastDate(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
}

// Check if there are any appointments, if not add samples
let appointments = JSON.parse(localStorage.getItem('medicare_appointments'));

if (!appointments || appointments.length === 0) {
    appointments = sampleAppointments.map(app => ({
        name: app.name,
        name_ms: app.name_ms,
        doctor: app.doctor,
        doctor_ms: app.doctor_ms,
        date: app.date,
        time: app.time,
        notes: app.notes,
        notes_ms: app.notes_ms
    }));
    saveAppointments();
}

function saveAppointments() {
    localStorage.setItem('medicare_appointments', JSON.stringify(appointments));
}

function getStatusClass(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appDate = new Date(dateStr);
    appDate.setHours(0, 0, 0, 0);
    
    if (appDate < today) return 'past';
    return 'upcoming';
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(isEnglish ? 'en-US' : 'ms-MY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    if (isEnglish) {
        return `${hour12}:${minutes} ${ampm}`;
    } else {
        return `${hours}:${minutes}`;
    }
}

function displayAppointments() {
    const upcomingContainer = document.getElementById('upcomingList');
    const pastContainer = document.getElementById('pastList');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcoming = appointments.filter(a => {
        const appDate = new Date(a.date);
        appDate.setHours(0, 0, 0, 0);
        return appDate >= today;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const past = appointments.filter(a => {
        const appDate = new Date(a.date);
        appDate.setHours(0, 0, 0, 0);
        return appDate < today;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (upcoming.length === 0) {
        upcomingContainer.innerHTML = `<div class="empty-state">${t.emptyUpcoming}</div>`;
    } else {
        upcomingContainer.innerHTML = upcoming.map((app, idx) => {
            const originalIndex = appointments.indexOf(app);
            const name = isEnglish ? app.name : (app.name_ms || app.name);
            const doctor = isEnglish ? app.doctor : (app.doctor_ms || app.doctor);
            const notes = isEnglish ? app.notes : (app.notes_ms || app.notes);
            const formattedDate = formatDate(app.date);
            const formattedTime = formatTime(app.time);
            
            return `
                <div class="appointment-card" onclick="editAppointment(${originalIndex})">
                    <div class="appointment-icon">🏥</div>
                    <div class="appointment-info">
                        <div class="appointment-title">${escapeHtml(name)}</div>
                        <div class="appointment-doctor">👨‍⚕️ ${escapeHtml(doctor || (isEnglish ? 'General' : 'Umum'))}</div>
                        <div class="appointment-datetime">📅 ${formattedDate} • ⏰ ${formattedTime}</div>
                        ${notes ? `<div class="appointment-notes">📝 ${escapeHtml(notes)}</div>` : ''}
                    </div>
                    <div class="appointment-status upcoming">${t.statusUpcoming}</div>
                </div>
            `;
        }).join('');
    }
    
    if (past.length === 0) {
        pastContainer.innerHTML = `<div class="empty-state">${t.emptyPast}</div>`;
    } else {
        pastContainer.innerHTML = past.map((app, idx) => {
            const originalIndex = appointments.indexOf(app);
            const name = isEnglish ? app.name : (app.name_ms || app.name);
            const doctor = isEnglish ? app.doctor : (app.doctor_ms || app.doctor);
            const notes = isEnglish ? app.notes : (app.notes_ms || app.notes);
            const formattedDate = formatDate(app.date);
            const formattedTime = formatTime(app.time);
            
            return `
                <div class="appointment-card past" onclick="editAppointment(${originalIndex})">
                    <div class="appointment-icon">🏥</div>
                    <div class="appointment-info">
                        <div class="appointment-title">${escapeHtml(name)}</div>
                        <div class="appointment-doctor">👨‍⚕️ ${escapeHtml(doctor || (isEnglish ? 'General' : 'Umum'))}</div>
                        <div class="appointment-datetime">📅 ${formattedDate} • ⏰ ${formattedTime}</div>
                        ${notes ? `<div class="appointment-notes">📝 ${escapeHtml(notes)}</div>` : ''}
                    </div>
                    <div class="appointment-status past">${t.statusPast}</div>
                </div>
            `;
        }).join('');
    }
}

// Helper function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

let currentEditIndex = null;

function showAddAppointmentModal() {
    document.getElementById('appName').value = '';
    document.getElementById('doctorName').value = '';
    document.getElementById('appDate').value = '';
    document.getElementById('appTime').value = '';
    document.getElementById('appNotes').value = '';
    openModal('addModal');
}

function addAppointment() {
    const name = document.getElementById('appName').value.trim();
    const doctor = document.getElementById('doctorName').value.trim();
    const date = document.getElementById('appDate').value;
    const time = document.getElementById('appTime').value;
    const notes = document.getElementById('appNotes').value.trim();
    
    if (!name || !date || !time) {
        alert(t.fillAllFields);
        return;
    }
    
    appointments.push({
        name: name,
        name_ms: name,
        doctor: doctor,
        doctor_ms: doctor,
        date: date,
        time: time,
        notes: notes,
        notes_ms: notes
    });
    saveAppointments();
    displayAppointments();
    closeModal('addModal');
    alert(t.addSuccess);
}

function editAppointment(index) {
    currentEditIndex = index;
    const app = appointments[index];
    
    document.getElementById('editAppName').value = app.name;
    document.getElementById('editDoctorName').value = app.doctor || '';
    document.getElementById('editAppDate').value = app.date;
    document.getElementById('editAppTime').value = app.time;
    document.getElementById('editAppNotes').value = app.notes || '';
    
    openModal('editModal');
}

function saveEditAppointment() {
    if (currentEditIndex === null) return;
    
    const name = document.getElementById('editAppName').value.trim();
    const doctor = document.getElementById('editDoctorName').value.trim();
    const date = document.getElementById('editAppDate').value;
    const time = document.getElementById('editAppTime').value;
    const notes = document.getElementById('editAppNotes').value.trim();
    
    if (!name || !date || !time) {
        alert(t.fillAllFields);
        return;
    }
    
    appointments[currentEditIndex] = {
        ...appointments[currentEditIndex],
        name: name,
        name_ms: name,
        doctor: doctor,
        doctor_ms: doctor,
        date: date,
        time: time,
        notes: notes,
        notes_ms: notes
    };
    saveAppointments();
    displayAppointments();
    closeModal('editModal');
    alert(t.updateSuccess);
}

function deleteAppointment() {
    if (currentEditIndex === null) return;
    
    if (confirm(t.deleteConfirm)) {
        appointments.splice(currentEditIndex, 1);
        saveAppointments();
        displayAppointments();
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

function goBack() {
    const lang = localStorage.getItem('medicare_lang') || 'ms';
    if (lang === 'en') {
        window.location.href = 'homepage.html';
    } else {
        window.location.href = 'homepagemalay.html';
    }
}

function loadDarkMode() {
    if (localStorage.getItem('medicare_darkmode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateUIText();
    displayAppointments();
    loadDarkMode();
    console.log('Appointment page loaded! Language:', isEnglish ? 'English' : 'Malay');
    console.log('Sample appointments added for: Manjung, Ipoh, Johor, KL, Penang');
});

window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) modal.style.display = 'none';
    });
}