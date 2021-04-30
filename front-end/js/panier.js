// AFFICHAGE DES PRODUITS DANS LE TABLEAU
let selectionProduits = localStorage.getItem('panier')
let affichagePanier = JSON.parse(selectionProduits);
console.log(affichagePanier)
console.log(selectionProduits)

let Panier2HTML = document.getElementById('wrapper-panier2')
let myHTMLpanier2 = ""
let prixTotal = 0
let productsID = [];

let buttonForm = document.getElementById('afficherFormulaire')
let buttonBack = document.getElementById('retourAccueil')

// REDIRECTION PAGE ACCUEIL SI LE PANIER EST VIDE
if (selectionProduits == null) {
    console.log('le panier est vide')
    let myHTMLpanier3 = `<p>Votre panier est vide</p>`
    Panier2HTML.style.textAlign = 'center';
    Panier2HTML.style.display = 'flex';
    Panier2HTML.style.justifyContent = 'center';
    buttonForm.style.display = 'none'
    buttonBack.style.display = 'block'
    Panier2HTML.innerHTML = myHTMLpanier3
} 

// SINON ON AFFICHE LES PRODUITS
    else {

        for (let i = 0; i < affichagePanier.length; i++) {
            const element = affichagePanier[i];
            productsID.push(element.id)

            let produitPrixFormat2 = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(element.price/100);
            myHTMLpanier2 += `
                            <tr>
                                <td><a href="#"><img class="card-img-top" src="${element.imageUrl}" alt="${element.name}"></a></td>
                                <td><a href="views/produit.html?id=${element.id}">${element.name}</a></td>
                                <td>${element.color}</td>
                                <td>`+produitPrixFormat2+`</td>
                            </tr>`  
        }
    
    let myHTMLpanier3 = `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Produit</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Couleur</th>
                                    <th scope="col">Prix</th>
                                </tr>
                            </thead>
                            <tbody>`
                            +myHTMLpanier2+
                            `
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th scope="col">Votre total</th>
                                    <td colspan="2"></td>
                                    <td id="prix-total"></td>
                                </tr>
                            </tfoot>
                        </table>`

                
    Panier2HTML.innerHTML = myHTMLpanier3
    
// AFFICHAGE DU PRIX TOTAL

    for (let i = 0; i < affichagePanier.length; i++) {
        const element = affichagePanier[i];
        prixTotal += element.price;
        let prixTotalFormat = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(prixTotal/100);
        document.getElementById('prix-total').innerHTML = `<strong>`+prixTotalFormat+`</strong>`;
    }

    // DISPLAY DES BOUTONS
    buttonForm.style.display = 'block'
    buttonBack.style.display = 'none'

}

// AFFICHAGE DU FORMULAIRE AU CLIC ET CACHER LES PRODUITS
let formulaireWrapper = document.getElementById('form-wrapper')
let commandeWrapper = document.getElementById('commande-wrapper')

function displayForm() {
    formulaireWrapper.classList.add("show")
    formulaireWrapper.classList.remove("hide")
    commandeWrapper.classList.add("hide")
    commandeWrapper.classList.remove("show")
}

// VERIFICATION DES INFOS

function verifierInput(input , regex , eltMessage){
    if (input.value === "" || input.value === null || regex.test(input.value) === false){
        console.log("cas 1");
        eltMessage.innerText = "Le champ est non valide";
        return false;
    }
    else {
        console.log("cas 2");
        eltMessage.innerText= "Le champ est valide"
        return true;
    };
}

let prenomInput = document.getElementById('prenom')
let prenomMessage = document.getElementById('prenomHelp')

let nomInput = document.getElementById('nom')
let nomMessage = document.getElementById('nomHelp')

let adresseInput = document.getElementById('adresse')
let adresseMessage = document.getElementById('adresseHelp')

let villeInput = document.getElementById('ville')
let villeMessage = document.getElementById('villeHelp')

let emailInput = document.getElementById('email')
let emailMessage = document.getElementById('emailHelp')

let formulaire = document.querySelector('form')
let formulaireMessage = document.querySelector('form')

let inputRegExp = new RegExp('[a-zA-Z]+');


// AU CLIC SUR LE BOUTON SUBMIT
formulaire.addEventListener('submit', (e) => {

    // ON EMPECHE LE FORMULAIRE DE S'ENVOYER
    e.preventDefault();
    
    // ON VERIFIE LES CHAMPS
    let repPrenom = verifierInput(prenomInput , inputRegExp , prenomMessage);
    let repNom = verifierInput(nomInput , inputRegExp , nomMessage);
    let repAdresse = verifierInput(adresseInput , inputRegExp , adresseMessage);
    let repVille = verifierInput(villeInput , inputRegExp , villeMessage);
    let repEmail = verifierInput(emailInput , inputRegExp , emailMessage);

    // SI TOUT LES CHAMPS SONT VALIDES
    if (repPrenom && repNom && repAdresse && repVille && repEmail) {
        console.log('tout les champs sont valides')
        
        // ON MET MET LES VALEURS DES CHAMPS DANS UN OBJET CONTACT ET ON LE CONVERTIT EN JSON
        let formContact = {
            firstName: prenomInput.value,
            lastName: nomInput.value,
            address: adresseInput.value,
            city: villeInput.value,
            email: emailInput.value,
        }    
        let formContactJ = JSON.stringify(formContact)

        // PUIS ON CREE UN OBJET CONTACT DANS LE LOCALSTORAGE, OU ON REMPLACE CELUI EXISTANT DEJA
        if (localStorage.getItem('contact')!== null) {
            localStorage.removeItem('contact');
            localStorage.setItem('contact', formContactJ);
        } else {
            localStorage.setItem('contact', formContactJ);
        }

        // ON PREPARE UNE VARIABLE QUI CONTIENT L'OBJET CONTACT, LE TABLEAU PRODUIT ET L'IDENTIFIANT COMMANDE

        var myData = {
            contact: formContact,
            products: productsID
          };

        let data = JSON.stringify(myData)

        console.log(myData)
        console.log(data)
          
        // ON ENVOIE LES DONNEES A L'API
        const promesse = fetch("http://localhost:3000/api/teddies/order", 
        {
            method: "POST",
            headers: {
                'Content-type' : 'application/json',
                'Accept': 'application/json'
            },
            body: data
        })
        .then(function(res){ return res.json(); })
        .then(function(data){ 
            console.log( data ) 
            console.log( data.orderId ) 
            localStorage.setItem('order_id', data.orderId )
            document.location.href="confirmation.html"
        })
        .catch(function (error) {
            console.log(error.message)
        })

    }
    else {console.log('certains champs ne sont pas valides')}

}); 


