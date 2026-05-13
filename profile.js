// Profile Page JavaScript - with jQuery

// Get language from localStorage
const userLang = localStorage.getItem('medicare_lang') || 'ms';
const isEnglish = userLang === 'en';

// Translations
const t = isEnglish ? {
    pageTitle: "My Profile",
    editTitle: "Edit",
    cancel: "Cancel",
    save: "Save",
    emptyError: "Please enter a value!",
    successMsg: "Information updated successfully!",
    logoutConfirm: "Are you sure you want to logout?",
    photoSuccess: "Profile photo updated successfully!",
    backButton: "Back",
    logoutButton: "Logout",
    personalInfo: "Personal Information",
    name: "Full Name",
    phone: "Phone Number",
    address: "Address",
    postcode: "Postcode",
    city: "City",
    state: "State",
    memberSince: "Member Since",
    changePhoto: "Change Photo",
    guest: "Guest",
    resetPhoto: "Reset to Default",
    photoOptions: "Photo Options"
} : {
    pageTitle: "Profil Saya",
    editTitle: "Edit",
    cancel: "Batal",
    save: "Simpan",
    emptyError: "Sila masukkan nilai!",
    successMsg: "Maklumat berjaya dikemaskini!",
    logoutConfirm: "Adakah anda pasti mahu log keluar?",
    photoSuccess: "Gambar profil berjaya dikemaskini!",
    backButton: "Kembali",
    logoutButton: "Log Keluar",
    personalInfo: "Maklumat Peribadi",
    name: "Nama Penuh",
    phone: "No. Telefon",
    address: "Alamat",
    postcode: "Poskod",
    city: "Bandar",
    state: "Negeri",
    memberSince: "Ahli Sejak",
    changePhoto: "Tukar Gambar",
    guest: "Tetamu",
    resetPhoto: "Reset ke Default",
    photoOptions: "Pilihan Gambar"
};

// Load user data
let currentUser = JSON.parse(localStorage.getItem('medicare_user'));
let currentEditField = '';

if (!currentUser) {
    currentUser = {
        fullName: isEnglish ? 'Guest' : 'Tetamu',
        phoneNo: '-',
        address: '-',
        postcode: '-',
        city: '-',
        state: '-',
        registeredAt: new Date().toLocaleDateString(),
        memberSince: new Date().toLocaleDateString()
    };
}

// Update UI Text
function updateUIText() {
    $('.back-header h2').text(t.pageTitle);
    $('.back-btn').html(`← ${t.backButton}`);
    $('.profile-info-card h3').text(t.personalInfo);
    
    $('.info-group label').eq(0).text(t.name);
    $('.info-group label').eq(1).text(t.phone);
    $('.info-group label').eq(2).text(t.address);
    $('.info-group label').eq(3).text(t.postcode);
    $('.info-group label').eq(4).text(t.city);
    $('.info-group label').eq(5).text(t.state);
    
    $('.member-card span').html(`📅 ${t.memberSince}`);
    $('.photo-toggle-btn span:first-child').html(`📷 ${t.photoOptions}`);
    $('#changePhotoBtn').html(`<span>📷</span> ${t.changePhoto}`);
    $('#resetPhotoBtn').html(`<span>🔄</span> ${t.resetPhoto}`);
    $('#logoutBtn').html(`🚪 ${t.logoutButton}`);
    $('.btn-cancel').text(t.cancel);
    $('.btn-save').text(t.save);
}

// Format date function
function formatDate(dateString) {
    if (!dateString) return new Date().toLocaleDateString();
    
    // If already in readable format
    if (!dateString.includes('T') && !dateString.includes('-')) {
        return dateString;
    }
    
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        
        return date.toLocaleDateString(isEnglish ? 'en-US' : 'ms-MY', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch(e) {
        return dateString;
    }
}

// Display user data
function displayUserData() {
    $('#displayName').text(currentUser.fullName);
    $('#displayPhone').text(currentUser.phoneNo);
    $('#displayAddress').text(currentUser.address);
    $('#displayPostcode').text(currentUser.postcode);
    $('#displayCity').text(currentUser.city);
    $('#displayState').text(currentUser.state);
    
    // Get member date
    const memberDate = currentUser.registeredAt || currentUser.memberSince;
    $('#memberSince').text(formatDate(memberDate));
}

// Load profile photo
function loadProfilePhoto() {
    const savedPhoto = localStorage.getItem('medicare_profile_photo');
    const $photo = $('#profilePhoto');
    
    if (savedPhoto && savedPhoto !== 'orangtua.jpg' && !savedPhoto.includes('orangtua')) {
        $photo.attr('src', savedPhoto);
        $photo.css('objectFit', 'cover');
        $photo.css('padding', '0');
        $photo.css('background', 'transparent');
    } else {
        // Default people icon
        $photo.attr('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236aa85f"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E');
        $photo.css('objectFit', 'contain');
        $photo.css('background', '#e8f5e0');
        $photo.css('padding', '15px');
    }
}

// Change profile photo
function changeProfilePhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg, image/png, image/jpg';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                $('#profilePhoto').attr('src', imageUrl);
                $('#profilePhoto').css('objectFit', 'cover').css('padding', '0').css('background', 'transparent');
                localStorage.setItem('medicare_profile_photo', imageUrl);
                alert(t.photoSuccess);
                $('.photo-dropdown').removeClass('show');
                $('.toggle-arrow').removeClass('rotated');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Reset to default
function resetToDefaultPhoto() {
    if (confirm(isEnglish ? 'Reset to default icon?' : 'Reset ke icon default?')) {
        localStorage.removeItem('medicare_profile_photo');
        loadProfilePhoto();
        alert(isEnglish ? 'Profile photo reset!' : 'Gambar profil direset!');
        $('.photo-dropdown').removeClass('show');
        $('.toggle-arrow').removeClass('rotated');
    }
}

// Edit field
function editField(field) {
    currentEditField = field;
    let currentValue = '';
    let fieldLabel = '';
    
    switch(field) {
        case 'name': currentValue = currentUser.fullName; fieldLabel = t.name; break;
        case 'phone': currentValue = currentUser.phoneNo; fieldLabel = t.phone; break;
        case 'address': currentValue = currentUser.address; fieldLabel = t.address; break;
        case 'postcode': currentValue = currentUser.postcode; fieldLabel = t.postcode; break;
        case 'city': currentValue = currentUser.city; fieldLabel = t.city; break;
        case 'state': currentValue = currentUser.state; fieldLabel = t.state; break;
    }
    
    $('#editModalTitle').text(`${t.editTitle} ${fieldLabel}`);
    $('#editInput').val(currentValue);
    $('#editInput').attr('placeholder', fieldLabel);
    $('#editModal').css('display', 'flex');
}

// Save edit
function saveEdit() {
    const newValue = $('#editInput').val().trim();
    if (!newValue) {
        alert(t.emptyError);
        return;
    }
    
    switch(currentEditField) {
        case 'name': currentUser.fullName = newValue; break;
        case 'phone': currentUser.phoneNo = newValue; break;
        case 'address': currentUser.address = newValue; break;
        case 'postcode': currentUser.postcode = newValue; break;
        case 'city': currentUser.city = newValue; break;
        case 'state': currentUser.state = newValue; break;
    }
    
    localStorage.setItem('medicare_user', JSON.stringify(currentUser));
    displayUserData();
    closeEditModal();
    alert(t.successMsg);
}

// Close edit modal
function closeEditModal() {
    $('#editModal').css('display', 'none');
}

// Go back
function goBack() {
    window.location.href = 'homepage.html';
}

// Logout
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

// Toggle Dropdown
function initDropdown() {
    $('#photoToggleBtn').on('click', function(e) {
        e.stopPropagation();
        $('.photo-dropdown').toggleClass('show');
        $('.toggle-arrow').toggleClass('rotated');
    });
    
    $(document).on('click', function() {
        $('.photo-dropdown').removeClass('show');
        $('.toggle-arrow').removeClass('rotated');
    });
    
    $('.photo-dropdown').on('click', function(e) {
        e.stopPropagation();
    });
    
    $('#changePhotoBtn').on('click', changeProfilePhoto);
    $('#resetPhotoBtn').on('click', resetToDefaultPhoto);
}

// Close modal on outside click
$(window).on('click', function(event) {
    if ($(event.target).is('#editModal')) {
        closeEditModal();
    }
});

// Initialize
$(document).ready(function() {
    updateUIText();
    displayUserData();
    loadProfilePhoto();
    initDropdown();
    
    $('#logoutBtn').on('click', logout);
    
    console.log('Profile page loaded!');
    console.log('Member since:', currentUser.registeredAt || currentUser.memberSince);
});