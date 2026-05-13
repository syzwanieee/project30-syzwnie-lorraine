// MEDICARE - Hospital Page with Location Detection (with jQuery)

// Get language from localStorage (user's chosen language)
const userLang = localStorage.getItem('medicare_lang') || 'ms';
const isEnglish = userLang === 'en';
const isMalay = userLang === 'ms';

// Hospital database
const hospitals = [
    // ===== PERAK HOSPITALS =====
    { name: "Hospital Raja Permaisuri Bainun", name_ms: "Hospital Raja Permaisuri Bainun", lat: 4.5921, lng: 101.0907, address: "Jalan Raja Ashman Shah, 30450 Ipoh, Perak", address_ms: "Jalan Raja Ashman Shah, 30450 Ipoh, Perak" },
    { name: "Pantai Hospital Ipoh", name_ms: "Pantai Hospital Ipoh", lat: 4.5947, lng: 101.1176, address: "126, Jalan Tambun, 31400 Ipoh, Perak", address_ms: "126, Jalan Tambun, 31400 Ipoh, Perak" },
    { name: "KPJ Ipoh Specialist Hospital", name_ms: "KPJ Ipoh Specialist Hospital", lat: 4.5980, lng: 101.1120, address: "26, Jalan Raja Dihilir, 30350 Ipoh, Perak", address_ms: "26, Jalan Raja Dihilir, 30350 Ipoh, Perak" },
    { name: "Hospital Fatimah", name_ms: "Hospital Fatimah", lat: 4.5840, lng: 101.0820, address: "Lot 21058, Jalan Lapangan Terbang, 31350 Ipoh, Perak", address_ms: "Lot 21058, Jalan Lapangan Terbang, 31350 Ipoh, Perak" },
    { name: "Hospital Seri Manjung", name_ms: "Hospital Seri Manjung", lat: 4.18478, lng: 100.66088, address: "Jalan Gapis, 32040 Seri Manjung, Perak", address_ms: "Jalan Gapis, 32040 Seri Manjung, Perak" },
    { name: "Pantai Hospital Manjung", name_ms: "Pantai Hospital Manjung", lat: 4.215863, lng: 100.670407, address: "Jalan PPMP 1, Pusat Perniagaan Manjung Point, 32040 Seri Manjung, Perak", address_ms: "Jalan PPMP 1, Pusat Perniagaan Manjung Point, 32040 Seri Manjung, Perak" },
    { name: "Hospital Taiping", name_ms: "Hospital Taiping", lat: 4.8550, lng: 100.7370, address: "Jalan Taming Sari, 34000 Taiping, Perak", address_ms: "Jalan Taming Sari, 34000 Taiping, Perak" },
    { name: "Hospital Teluk Intan", name_ms: "Hospital Teluk Intan", lat: 4.0250, lng: 101.0200, address: "Jalan Changkat Jong, 36000 Teluk Intan, Perak", address_ms: "Jalan Changkat Jong, 36000 Teluk Intan, Perak" },
    { name: "Hospital Angkatan Tentera Lumut", name_ms: "Hospital Angkatan Tentera Lumut", lat: 4.2300, lng: 100.6300, address: "Kem Tentera Laut, 32100 Lumut, Perak", address_ms: "Kem Tentera Laut, 32100 Lumut, Perak" },
    { name: "Klinik Kesihatan Seri Manjung", name_ms: "Klinik Kesihatan Seri Manjung", lat: 4.2085, lng: 100.6580, address: "Jalan Klinik, 32040 Seri Manjung, Perak", address_ms: "Jalan Klinik, 32040 Seri Manjung, Perak" },
    { name: "Klinik Kesihatan Sitiawan", name_ms: "Klinik Kesihatan Sitiawan", lat: 4.2180, lng: 100.6980, address: "Jalan Sitiawan, 32000 Sitiawan, Perak", address_ms: "Jalan Sitiawan, 32000 Sitiawan, Perak" },
    
    // ===== KL & SELANGOR HOSPITALS =====
    { name: "Hospital Kuala Lumpur", name_ms: "Hospital Kuala Lumpur", lat: 3.1738, lng: 101.6889, address: "Jalan Pahang, 50586 Kuala Lumpur", address_ms: "Jalan Pahang, 50586 Kuala Lumpur" },
    { name: "Hospital Pusrawi", name_ms: "Hospital Pusrawi", lat: 3.1645, lng: 101.7036, address: "Jalan Bulan, 55100 Kuala Lumpur", address_ms: "Jalan Bulan, 55100 Kuala Lumpur" },
    { name: "Pantai Hospital Kuala Lumpur", name_ms: "Pantai Hospital Kuala Lumpur", lat: 3.0982, lng: 101.6599, address: "Jalan Perubatan 1, 59200 Kuala Lumpur", address_ms: "Jalan Perubatan 1, 59200 Kuala Lumpur" },
    { name: "Gleneagles Hospital Kuala Lumpur", name_ms: "Gleneagles Hospital Kuala Lumpur", lat: 3.1571, lng: 101.7127, address: "Jalan Ampang, 50450 Kuala Lumpur", address_ms: "Jalan Ampang, 50450 Kuala Lumpur" },
    { name: "Prince Court Medical Centre", name_ms: "Prince Court Medical Centre", lat: 3.1592, lng: 101.7149, address: "Jalan Kia Peng, 50450 Kuala Lumpur", address_ms: "Jalan Kia Peng, 50450 Kuala Lumpur" },
    { name: "Hospital Sungai Buloh", name_ms: "Hospital Sungai Buloh", lat: 3.2144, lng: 101.5922, address: "Jalan Hospital, 47000 Sungai Buloh, Selangor", address_ms: "Jalan Hospital, 47000 Sungai Buloh, Selangor" },
    { name: "Hospital Selayang", name_ms: "Hospital Selayang", lat: 3.2581, lng: 101.6558, address: "Lebuhraya Selayang, 68100 Batu Caves, Selangor", address_ms: "Lebuhraya Selayang, 68100 Batu Caves, Selangor" },
    { name: "Hospital Putrajaya", name_ms: "Hospital Putrajaya", lat: 2.9433, lng: 101.7033, address: "Presint 7, 62250 Putrajaya", address_ms: "Presint 7, 62250 Putrajaya" },
    { name: "Hospital Ampang", name_ms: "Hospital Ampang", lat: 3.1583, lng: 101.7689, address: "Jalan Mewah Utara, 68000 Ampang, Selangor", address_ms: "Jalan Mewah Utara, 68000 Ampang, Selangor" },
    { name: "Hospital UKM", name_ms: "Hospital UKM", lat: 3.0833, lng: 101.7178, address: "Jalan Yaacob Latif, 56000 Cheras", address_ms: "Jalan Yaacob Latif, 56000 Cheras" },
    
    // ===== PENANG HOSPITALS =====
    { name: "Hospital Pulau Pinang", name_ms: "Hospital Pulau Pinang", lat: 5.4164, lng: 100.3291, address: "Jalan Residensi, 10990 George Town, Penang", address_ms: "Jalan Residensi, 10990 George Town, Pulau Pinang" },
    { name: "Penang Adventist Hospital", name_ms: "Penang Adventist Hospital", lat: 5.4160, lng: 100.3250, address: "465, Jalan Burmah, 10350 George Town, Penang", address_ms: "465, Jalan Burmah, 10350 George Town, Pulau Pinang" },
    { name: "Island Hospital", name_ms: "Island Hospital", lat: 5.4300, lng: 100.3100, address: "308, Jalan Macalister, 10450 George Town, Penang", address_ms: "308, Jalan Macalister, 10450 George Town, Pulau Pinang" },
    
    // ===== JOHOR HOSPITALS =====
    { name: "Hospital Sultanah Aminah", name_ms: "Hospital Sultanah Aminah", lat: 1.4655, lng: 103.7428, address: "Jalan Kolam Air, 80100 Johor Bahru, Johor", address_ms: "Jalan Kolam Air, 80100 Johor Bahru, Johor" },
    { name: "Regency Specialist Hospital", name_ms: "Regency Specialist Hospital", lat: 1.5880, lng: 103.8570, address: "No. 1, Jalan Suria, Bandar Seri Alam, 81750 Masai, Johor", address_ms: "No. 1, Jalan Suria, Bandar Seri Alam, 81750 Masai, Johor" },
    
    // ===== SABAH HOSPITALS =====
    { name: "Hospital Queen Elizabeth", name_ms: "Hospital Queen Elizabeth", lat: 5.9530, lng: 116.0730, address: "Jalan Penampang, 88200 Kota Kinabalu, Sabah", address_ms: "Jalan Penampang, 88200 Kota Kinabalu, Sabah" },
    
    // ===== SARAWAK HOSPITALS =====
    { name: "Hospital Umum Sarawak", name_ms: "Hospital Umum Sarawak", lat: 1.5650, lng: 110.3480, address: "Jalan Hospital, 93400 Kuching, Sarawak", address_ms: "Jalan Hospital, 93400 Kuching, Sarawak" }
];

let userLocation = null;
let currentFilter = 'all';
let currentSearchTerm = '';
let currentHospitalsWithDistance = [];

// Get translations based on user language
function getText(key) {
    if (isEnglish) {
        const texts = {
            pageTitle: "🏥 Nearby Hospitals",
            backBtn: "Back",
            listTitle: "Hospital List",
            filterTitle: "Filter by distance:",
            searchPlaceholder: "Search hospital by name...",
            detectLocation: "📍 Detect My Location",
            detecting: "📍 Detecting your location... Please allow location access.",
            success: "✓ Location detected! Showing nearby hospitals.",
            error: "⚠️ Unable to get your location. Using default location.",
            notSupported: "⚠️ Geolocation is not supported by your browser.",
            permissionDenied: "⚠️ Location permission denied. Please enable location.",
            timeout: "⚠️ Location timeout. Please try again.",
            distance: "km away",
            direction: "Direction",
            noResults: "No hospitals found",
            loading: "Loading hospital data...",
            clickDetect: "📍 Click 'Detect My Location' to find nearby hospitals",
            filterAll: "All",
            filter5km: "≤ 5 km",
            filter10km: "≤ 10 km",
            filter20km: "≤ 20 km"
        };
        return texts[key];
    } else {
        const texts = {
            pageTitle: "🏥 Hospital Berdekatan",
            backBtn: "Kembali",
            listTitle: "Senarai Hospital",
            filterTitle: "Tapis mengikut jarak:",
            searchPlaceholder: "Cari hospital mengikut nama...",
            detectLocation: "Guna Lokasi Saya",
            detecting: "📍 Mengesan lokasi anda... Sila benarkan akses lokasi.",
            success: "✓ Lokasi dikesan! Menunjukkan hospital berdekatan.",
            error: "⚠️ Tidak dapat mengesan lokasi anda. Menggunakan lokasi default.",
            notSupported: "⚠️ Geolokasi tidak disokong oleh browser anda.",
            permissionDenied: "⚠️ Kebenaran lokasi ditolak. Sila hidupkan lokasi.",
            timeout: "⚠️ Masa lokasi tamat. Sila cuba lagi.",
            distance: "km dari sini",
            direction: "Panduan",
            noResults: "Tiada hospital dijumpai",
            loading: "Memuatkan data hospital...",
            clickDetect: "📍 Klik 'Guna Lokasi Saya' untuk cari hospital berdekatan",
            filterAll: "Semua",
            filter5km: "≤ 5 km",
            filter10km: "≤ 10 km",
            filter20km: "≤ 20 km"
        };
        return texts[key];
    }
}

// Update all UI text based on language
function updateUIText() {
    $('#pageTitle').text(getText('pageTitle'));
    $('#backBtn').html(`← ${getText('backBtn')}`);
    $('#listTitle').text(getText('listTitle'));
    $('#filterTitle').text(getText('filterTitle'));
    $('#searchInput').attr('placeholder', getText('searchPlaceholder'));
    $('#detectLocationBtn').html(`📍 ${getText('detectLocation')}`);
    
    $('.filter-btn').each(function() {
        const filterValue = $(this).data('filter');
        if (filterValue === 'all') $(this).text(getText('filterAll'));
        else if (filterValue === '5') $(this).text(getText('filter5km'));
        else if (filterValue === '10') $(this).text(getText('filter10km'));
        else if (filterValue === '20') $(this).text(getText('filter20km'));
    });
}

// Calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Update hospital list with distances
function updateHospitalsWithDistance() {
    if (userLocation) {
        currentHospitalsWithDistance = hospitals.map(hospital => ({
            ...hospital,
            distance: calculateDistance(userLocation.lat, userLocation.lng, hospital.lat, hospital.lng)
        }));
    } else {
        currentHospitalsWithDistance = hospitals.map(hospital => ({
            ...hospital,
            distance: null
        }));
    }
    displayHospitals();
}

// Filter hospitals by distance
function filterByDistance(range) {
    currentFilter = range;
    
    $('.filter-btn').removeClass('active');
    $(`.filter-btn[data-filter="${range}"]`).addClass('active');
    
    displayHospitals();
}

// Filter hospitals by search term
function filterHospitals() {
    currentSearchTerm = $('#searchInput').val().toLowerCase();
    displayHospitals();
}

// Clear search
function clearSearch() {
    $('#searchInput').val('');
    currentSearchTerm = '';
    displayHospitals();
}

// Display hospitals
function displayHospitals() {
    const $container = $('#hospitalList');
    
    if (!userLocation) {
        $container.html(`<div class="no-results">📍 ${getText('clickDetect')}</div>`);
        return;
    }
    
    let filteredHospitals = [...currentHospitalsWithDistance];
    
    if (currentFilter !== 'all') {
        const maxDistance = parseFloat(currentFilter);
        filteredHospitals = filteredHospitals.filter(h => h.distance <= maxDistance);
    }
    
    if (currentSearchTerm && currentSearchTerm !== '') {
        filteredHospitals = filteredHospitals.filter(h => 
            h.name.toLowerCase().includes(currentSearchTerm) || 
            h.name_ms.toLowerCase().includes(currentSearchTerm) ||
            h.address.toLowerCase().includes(currentSearchTerm) ||
            h.address_ms.toLowerCase().includes(currentSearchTerm)
        );
    }
    
    filteredHospitals.sort((a, b) => a.distance - b.distance);
    
    if (filteredHospitals.length === 0) {
        $container.html(`<div class="no-results">${getText('noResults')}</div>`);
        return;
    }
    
    let html = '';
    filteredHospitals.forEach(hospital => {
        const name = isEnglish ? hospital.name : hospital.name_ms;
        const address = isEnglish ? hospital.address : hospital.address_ms;
        const distanceText = hospital.distance < 1 ? 
            `${Math.round(hospital.distance * 1000)} m` : 
            `${hospital.distance.toFixed(1)} ${getText('distance')}`;
        
        html += `
            <div class="hospital-item">
                <div class="hospital-info">
                    <div class="hospital-name">🏥 ${name}</div>
                    <div class="hospital-address">📍 ${address}</div>
                    <div class="hospital-distance"><span>📏 ${distanceText}</span></div>
                </div>
                <button class="direction-btn" data-lat="${hospital.lat}" data-lng="${hospital.lng}" data-name="${name.replace(/'/g, "\\'")}">
                    🗺️ ${getText('direction')}
                </button>
            </div>
        `;
    });
    
    $container.html(html);
    
    // Attach direction button events
    $('.direction-btn').on('click', function() {
        const lat = $(this).data('lat');
        const lng = $(this).data('lng');
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, '_blank');
    });
}

// Detect user location
function detectUserLocation() {
    const $statusDiv = $('#locationStatus');
    const $detectBtn = $('#detectLocationBtn');
    
    if (!navigator.geolocation) {
        $statusDiv.text(getText('notSupported')).css('color', '#e74c3c');
        return;
    }
    
    $detectBtn.text(isEnglish ? "⏳ Detecting..." : "⏳ Mengesan...").prop('disabled', true);
    $statusDiv.text(getText('detecting')).css('color', '#2d6a2c');
    
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            console.log('Location detected:', userLocation.lat, userLocation.lng);
            
            updateHospitalsWithDistance();
            
            $statusDiv.text(getText('success')).css('color', '#4CAF50');
            $detectBtn.text(`📍 ${getText('detectLocation')}`).prop('disabled', false);
            
            setTimeout(() => {
                $statusDiv.fadeOut(500, function() {
                    $(this).text('').fadeIn(500);
                });
            }, 3000);
        },
        function(error) {
            console.error('Geolocation error:', error);
            
            let errorMsg = getText('error');
            if (error.code === error.PERMISSION_DENIED) errorMsg = getText('permissionDenied');
            else if (error.code === error.TIMEOUT) errorMsg = getText('timeout');
            
            $statusDiv.text(errorMsg).css('color', '#e74c3c');
            
            userLocation = { lat: 4.18478, lng: 100.66088 };
            updateHospitalsWithDistance();
            
            $detectBtn.text(`📍 ${getText('detectLocation')}`).prop('disabled', false);
        },
        options
    );
}

// Go back to home page
function goBack() {
    window.location.href = 'homepage.html';
}

// Initialize page with jQuery
$(document).ready(function() {
    updateUIText();
    
    userLocation = null;
    currentHospitalsWithDistance = hospitals.map(hospital => ({
        ...hospital,
        distance: null
    }));
    displayHospitals();
    
    // Auto detect location
    setTimeout(() => {
        detectUserLocation();
    }, 500);
    
    // Event handlers
    $('#backBtn').on('click', goBack);
    $('#detectLocationBtn').on('click', detectUserLocation);
    $('#searchInput').on('keyup', filterHospitals);
    $('#clearSearchBtn').on('click', clearSearch);
    
    // Filter buttons
    $('.filter-btn').on('click', function() {
        const filterValue = $(this).data('filter');
        filterByDistance(filterValue);
    });
    
    console.log('Hospital page loaded! Language:', isEnglish ? 'English' : 'Malay');
    console.log('Redirect: Back -> homepage.html');
});