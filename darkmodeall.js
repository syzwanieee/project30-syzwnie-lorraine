// Dark Mode Manager - Apply to ALL pages

// Function to apply dark mode to current page
function applyDarkModeToPage(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Function to load and apply dark mode status
function loadDarkMode() {
    const savedDarkMode = localStorage.getItem('medicare_darkmode') === 'true';
    applyDarkModeToPage(savedDarkMode);
    return savedDarkMode;
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDarkMode();
    
    // Optional: Listen for storage changes (if dark mode changed in another tab)
    window.addEventListener('storage', function(e) {
        if (e.key === 'medicare_darkmode') {
            const isDark = e.newValue === 'true';
            applyDarkModeToPage(isDark);
        }
    });
});