let form = document.querySelector('form')

// au changement , on teste l'input
form.prenom.addEventListener('change', function () {
    validInput(this);
})

form.email.addEventListener('change', function () {
    validEmail(this);
})

// fonction pour tester avec une regexp
const validEmail = function (inputEmail) {
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

    let testEmail = emailRegExp.test(inputEmail.value);
    let small = inputEmail.nextElementSibling;

    if (testEmail) {
        small.innerHTML = "email est non valide"
    }
    else{small.innerHTML = "email est non valide"}
}

const validInput = function (input) {
    let inputRegExp = new RegExp('/[^a-zA-Z]/g', 'g');

    let testText = inputRegExp.test(input.value);
    let small = input.nextElementSibling;

    if (testEmail) {
        small.innerHTML = "le champ peut contenir seulement des lettres"
    }
    else{small.innerHTML = ""}
}


