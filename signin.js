// MEDICARE - Sign In Page (English Only, jQuery, No Sound)

$(document).ready(function() {
    
    // Set English text
    $('#formTitle').text('Account Registration');
    $('#labelName').text('Full Name');
    $('#labelPhone').text('Phone Number');
    $('#labelAddress').text('Address');
    $('#labelPostcode').text('Postcode');
    $('#labelCity').text('City');
    $('#labelState').text('State');
    $('#submitBtn').html('📝 Sign Up');
    
    $('#fullName').attr('placeholder', 'e.g: Ahmad bin Abdullah');
    $('#address').attr('placeholder', 'Street, Taman...');
    $('#state option:first').text('-- Select State --');
    
    // Form submission
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        
        const fullName = $('#fullName').val().trim();
        const phoneNo = $('#phoneNo').val().trim();
        const address = $('#address').val().trim();
        const postcode = $('#postcode').val().trim();
        const city = $('#city').val().trim();
        const state = $('#state').val();
        
        const $messageDiv = $('#formMessage');
        
        // Validation
        if (!fullName || !phoneNo || !address || !postcode || !city || !state) {
            $messageDiv.text('⚠️ Please complete all required fields.').addClass('message error');
            return;
        }
        
        // Phone validation (min 10 digits)
        const phoneDigits = phoneNo.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            $messageDiv.text('⚠️ Please enter a valid phone number (min 10 digits)').addClass('message error');
            return;
        }
        
        // Save user data
        const userData = {
            fullName: fullName,
            phoneNo: phoneNo,
            address: address,
            postcode: postcode,
            city: city,
            state: state,
            registeredAt: new Date().toLocaleDateString(),
            language: 'en'
        };
        localStorage.setItem('medicare_user', JSON.stringify(userData));
        localStorage.setItem('medicare_lang', 'en');
        
        // Success message
        $messageDiv.text('✅ Registration successful!').addClass('message success');
        
        // Redirect after 2 seconds
        setTimeout(function() {
            window.location.href = 'homepage.html';
        }, 2000);
    });
    
    console.log('🌿 MEDICARE Sign In page ready (English only, no sound)');
});