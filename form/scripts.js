var LoginAvaiable = false;
function validateLogin() {
    var login = document.getElementById("login");
    var form = login.parentElement;
    removeNotification(form);
    var re = new RegExp(/^[a-z]+$/);
    if(login.value.length < 3) {
        var p = document.createElement("p");
        p.innerHTML = "Podany login jest za krótki. Wpisz minimum 3 znaki.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
    if(login.value.length > 12) {
        var p = document.createElement("p");
        p.innerHTML = "Podany login jest za długi. Wpisz maksymalnie 12 znaków.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
    if(!re.test(login.value)) {
        var p = document.createElement("p");
        p.innerHTML = "Podano niewłaściwe znaki. Serwer przyjmuje tylko małe litery.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
    var url = "https://pi.iem.pw.edu.pl/user/" + login.value;
    checkLoginAvailability(url);
    return LoginAvaiable;
}

function checkLoginAvailability(url) { 
    return new Promise(function (resolve, reject) { 
        var httpReq = new XMLHttpRequest(); 
        httpReq.open("GET", url);
        httpReq.onload = function () {
            if(httpReq.status === 200) {
                var login = document.getElementById("login");
                var form = login.parentElement;
                var p = document.createElement("p");
                p.innerHTML = "Podany login jest zajęty.";
                p.className += "invalid_data";
                form.appendChild(p);
                resolve(httpReq.response);
                LoginAvailable = false;
            }
            else if(httpReq.status === 404) {
                LoginAvaiable = true;
            }
            else if(httpReq.status === 500 || httpReq.status === 502 || httpReq.status === 503 || httpReq.status === 505) {
				window.alert("Błąd po stronie serwera, spróbuj ponownie później.");
				LoginAvailable = false;
            }
            else {
				reject({status: httpReq.status,statusText: httpReq.statusText});
				LoginAvailable = false;
			}
        }
        httpReq.onerror = function() {
            reject(Error("Network Error"));
        };
        httpReq.send();
    }); 
}

function validatePassword() {
    var x = document.getElementById("password");
    var form = x.parentElement;
    removeNotification(form);
    if (x.value.length < 8) {
        var p = document.createElement('p');
        p.innerHTML = "Podane hasło jest za krótkie. Wpisz minimum 8 znaków.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
    var re = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    if(re.test(x.value) != true) {
        var p = document.createElement("p");
        p.innerHTML = "Podane hasło jest za słabe. Hasło powinno zawierać przynajmniej 1 dużą literę, 1 małą literę i 1 cyfrę.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
    return true;
}

function validatePasswordRepeat() {
    var pass1 = document.getElementById("password");
    var pass2 = document.getElementById("password2");
    var form = pass2.parentElement;
    removeNotification(form);
    if(pass1.value != pass2.value) {
        var p = document.createElement("p");
        p.innerHTML = "Podane hasła się nie zgadzają.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
    return true;
}

function validateFirstName() {
    var x = document.getElementById("firstname");
    var form = x.parentElement;
    removeNotification(form);
    var re = new RegExp(/^[A-ZĄĘĆŚŃÓŁŹŻ][a-ząęćśńółźż]+$/);
    if (x.value.length < 3) {
        var p = document.createElement('p');
        p.innerHTML = "Podane imię jest za krótkie. Wpisz minimum 3 znaki.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
    if(!re.test(x.value)) {
        var p = document.createElement('p');
        p.innerHTML = "Podano nieprawidłowe imię. Imię powinno się zaczynać z dużej litery i zawierać same litery.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
    return true;
}

function validateLastName() {
    var x = document.getElementById("lastname");
    var form = x.parentElement;
    removeNotification(form);
    if (x.value.length < 3) {
        var p = document.createElement('p');
        p.innerHTML = "Podane nazwisko jest za krótkie. Wpisz minimum 3 znaki.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
    var re = new RegExp(/^[A-ZĄĘĆŚŃÓŁŹŻ][a-ząęćśńółźż]+$/);
    if(re.test(x.value) != true) {
        var p = document.createElement('p');
        p.innerHTML = "Podano nieprawidłowe nazwisko. Nazwisko powinno się zaczynać z dużej litery i zawierać same litery.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
}

function validateBirthdate() {
    var birthdate = document.getElementById("birthdate").value;
    var lowest = "1900-01-01";
    var form = pesel.parentElement;
    removeNotification(form);
    var today = new Date();
    var todayDate = today.getFullYear() + "-" + today.getMonth()+1 + "-" + today.getDay();
    if(birthdate < lowest || todayDate < birthdate) {
        var p = document.createElement("p");
        p.innerHTML = "Podano nieprawidłową datę urodzenia.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
    return true;
}

function validatePeselAndSetSex() {
    var pesel = document.getElementById("pesel");
    var form = pesel.parentElement;
    removeNotification(form);
    if(pesel.value.length < 11) {
        var p = document.createElement("p");
        p.innerHTML = "Podany pesel jest za krótki.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
    var wagi = [9,7,3,1,9,7,3,1,9,7];
    var suma = 0;
    for(var i=0;i < wagi.length; i++) {
        suma+=(parseInt(pesel.value.substring(i,i+1),10)*wagi[i]);
    }
    suma=suma % 10;
    if(suma === parseInt(pesel.value.substring(10,11),10)) 
    {
        var male = document.getElementById('male');
        var female = document.getElementById('female');
        var liczba = pesel.value[9];
        if(liczba % 2 == 0) {
            male.checked = false;
            female.checked = true;
        }
        else {
            male.checked = true;
            female.checked = false;
        }
        return true;
    }
    else
    {
        var p = document.createElement("p");
        p.innerHTML = "Podany pesel jest nieprawidłowy.";
        p.className += "invalid_data";
        form.appendChild(p);
        return false;
    }
}

function validateFile() {
    var filename = document.getElementById("photo");
    var form = filename.parentElement;
    removeNotification(form);
    var extension = filename.value.split('.').pop();
    if(extension === "jpg" || extension === "bmp" || extension === "png") {
        return true;
    }
    else {
    var p = document.createElement("p");
    p.innerHTML = "Załączono plik z nieprawidłowym rozszerzeniem.";
    p.className += "invalid_data";
    form.appendChild(p);
    return false;
    }
}

function removeNotification(form) {
	var notifications = form.querySelectorAll('p')
	if(notifications.length == 1) {
		form.removeChild(notifications[0]);
	}
}

async function validateForm(form) {
	if(await validateLogin() && validatePassword() && validatePasswordRepeat() && validateFirstName() && validateLastName() && validateBirthdate() && validatePeselAndSetSex() && validateFile()) {
        form.submit();
    }
}









