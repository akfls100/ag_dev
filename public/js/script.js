document.getElementById('password').addEventListener("keyup", confirm_password);
document.getElementById('r_password').addEventListener("keyup", confirm_password);
document.querySelector('#form_submit').addEventListener("click", registration_alert);

function confirm_password() {
    var password = (document.getElementsByName('password'))[0].value;
    var r_password = (document.getElementsByName('r_password'))[0].value;

    if (password != r_password) {
        document.getElementById('pwd_message').innerHTML = 'Passwords do not match';
        document.getElementById('form_submit').disabled=true;

        (document.getElementsByName('password'))[0].className="diff_pw";
        (document.getElementsByName('r_password'))[0].className="diff_pw";
    }
    else {
        document.getElementById('pwd_message').innerHTML = 'Passwords match! <i class="em em-smile"></i>';
        document.getElementById('form_submit').disabled=false;

        (document.getElementsByName('password'))[0].className="same_pw";
        (document.getElementsByName('r_password'))[0].className="same_pw";
    }
}

function registration_alert() {
    var form = document.getElementById('registration_form');
    setTimeout(function () {
        form.submit();
    }, 5000);
}

function show_edit_form() {
    var form = document.getElementById('edit_post_form');

    form.style.display="block";
}


// Password validation function

var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on pasword, show message box

myInput.onfocus = function() {
    document.getElementById("pswmessage").style.display = "block";
};

// When the user clicks outside password, hide message box
myInput.onblur = function() {
    document.getElementById("pswmessage").style.display = "block";
};

// When the user starts to type password
myInput.onkeyup = function() {
    //Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    //Validae uppercase letters
    var upperCaseLetters = /[A-Z]/g;
    if(myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    //Validate numbers
    var numbers = /[0-9]/g;
    if(myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if(myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
};