console.log("home Live");


var login = document.getElementById('Login');
var signup = document.getElementById('Signup');
var req = new XMLHttpRequest();

jQuery('#lin').on('click', function () {
    jQuery('#Login').attr('style', 'display:flex');
    jQuery('#sup').removeClass('active');
    jQuery('#Signup').attr('style', 'display:none');
    jQuery('#lin').addClass('active');
});


jQuery('#sup').on('click', function () {
    jQuery('#Login').attr('style', 'display:none');
    jQuery('#lin').removeClass('active');
    jQuery('#Signup').attr('style', 'display:flex');
    jQuery('#sup').addClass('active');
})
login.onsubmit = function(e){
    e.preventDefault();
    let email = login.email.value;
    let pass = login.pass.value;

    req.open('POST', '/login');
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function () {
        if(this.readyState === 4)
        {
            if(this.status === 200)
            {
                sessionStorage.setItem('x-auth', this.getResponseHeader('x-auth'));
                window.location.href="./Dash.html";
            }
            else
            {
                alert('Invalid Email or Password.');
            }
        }
    }
    req.send(`email=${email}&password=${pass}`);

}
// 1d604da9-9a81-4ba9-80c2-de3375d59b40
signup.onsubmit = function(e){
    e.preventDefault();
    let email = signup.email.value;
    let pass = signup.pass.value;
    let Id = signup.Id.value;
    req.open('POST', '/signup');
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function () {
        if(this.readyState === 4)
        {
            if(this.status === 200)
            {
                alert('Registered Succesfully');
            }
            else
            {
                alert('EmailId already in Use');
            }
        }
    }
    req.send(`email=${email}&password=${pass}&Id=${Id}`);

}