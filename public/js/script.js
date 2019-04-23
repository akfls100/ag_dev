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
        document.getElementById('pwd_message').innerHTML = 'Passwords match! s(\'-^)b';
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
    if (form.checkValidity() != false) {
        Swal.fire({
            title: "Checking over your credentials!",
            type: "success",
            showConfirmButton: false,
            timer: 2000,
        });
    }
    else {
        Swal.fire({
            title: "Error!",
            text: "Please fill out all the fields!",
            type: "error",
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function show_edit_form() {
    var form = document.getElementById('edit_post_form');

    form.style.display="block";
}