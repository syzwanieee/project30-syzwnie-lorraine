// MEDICARE App - Landing Pages (Get Started → Sign In → Homepage)
// jQuery

$(document).ready(function() {
    
    // Get all page elements
    const $splashPage = $('#splashPage');
    const $choicePage = $('#choicePage');
    
    // Helper to switch pages
    function showPage($page) {
        $('.page').removeClass('active');
        if ($page) {
            $page.addClass('active');
            $('html, body').animate({ scrollTop: 0 }, 300);
        }
    }
    
    // 1. Get Started -> Go to Sign In page
    $('#getStartedBtn').on('click', function() {
        console.log('Get Started clicked');
        showPage($choicePage);
    });
    
    // 2. Sign In -> Redirect to signin.html (default language English)
    $('#signInBtn').on('click', function() {
        console.log('Sign In clicked');
        localStorage.setItem('medicare_lang', 'en');
        window.location.href = 'signin.html';
    });
    
    // 3. Floating animation for logo
    const $logo = $('.medicare-logo');
    if ($logo.length) {
        setInterval(function() {
            if ($splashPage.hasClass('active')) {
                $logo.css('transform', 'scale(1.02)');
                setTimeout(function() {
                    if ($splashPage.hasClass('active')) {
                        $logo.css('transform', 'scale(1)');
                    }
                }, 900);
            }
        }, 2800);
    }
    
    // 4. Ensure splash page on load
    showPage($splashPage);
    
    console.log('🌿 MEDICARE landing pages ready');
    console.log('Flow: Get Started → Sign In → signin.html');
});