/*
 *
 * login-register modal
 * Autor: Creative Tim
 * Web-autor: creative.tim
 * Web script: http://creative-tim.com
 * 
 */
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register with');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
}

function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('Login with');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

function showLoginButtons() {
    $('.big-logout').hide();
    $('.big-login').show();
    $('.big-register').show();
    $('#loginModal').modal('hide');
}

function showLogoutButtons() {
    $('.big-login').hide();
    $('.big-register').hide();
    $('.big-logout').show();
    $('#loginModal').modal('hide');
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}

async function doLogin(){
    let formElements = document.forms["loginForm"].elements;

    try {
        await KeratinAuthN.login( { username: formElements.login.value, password: formElements.password.value })
        let sessionId = await KeratinAuthN.session()
        showLogoutButtons()
        console.log(`Successfully logged in, tokenId: ${sessionId}`)
    } catch (e) {
        shakeModal("Invalid email/password combination");
    }
}

async function doLogout(){
    try {
        await KeratinAuthN.logout()
        console.log(`Logged out`)
        showLoginButtons()
    } catch (e) {
        console.log(`Something get wrong`)
    }
}


async function doSignup(){
    let formElements = document.forms["signupForm"].elements;

    if (formElements.password.value !== formElements.passwordConfirmation.value) {
        shakeModal("Passwords don't match");
        return;
    }

    try {
        await KeratinAuthN.signup({ username: formElements.login.value, password: formElements.password.value })
        let sessionId = await KeratinAuthN.session()
        console.log(`Successfully signed up, tokenId: ${sessionId}`)
        $('#loginModal').modal('hide');
        showLogoutButtons()
    } catch (e) {
        console.log("Got signup error ", e)
        if (e[0].message === "INSECURE") {
            shakeModal("Password is too weak");
            return
        } else if (e[0].message === "TAKEN") {
            shakeModal("User with name " + formElements.login.value + " already exists");
            return
        }
        shakeModal("Something got wrong");
    }
}

async function OAuthGitHub() {
    window.location.href = '/authn/oauth/github?redirect_uri=https://'+location.host+'/register/'
}

async function OAuthGoogle() {
    window.location.href = '/authn/oauth/google?redirect_uri=https://'+location.host+'/register/'
}

async function OAuthFacebook() {
    window.location.href = '/authn/oauth/facebook?redirect_uri=https://'+location.host+'/register/'
}

function shakeModal(message){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html(message);
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}

   