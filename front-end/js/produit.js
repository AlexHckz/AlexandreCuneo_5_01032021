
  // GETTING URL PROPER TO EACH PELUCHE

        //http://localhost:3000/api/teddies/5be9c8541c9d440000665243

        // RECUPERATION CHAINE REQUETE URL
        const queryString_url_id = window.location.search;
        const urlParams = new URLSearchParams(queryString_url_id);
        const idProduit = urlParams.get("id")

       
        let url = 'http://localhost:3000/api/teddies/'+idProduit;


        // AFFICHER LES DONNEES POUR CHAQUE PRODUIT
        fetch( url , {method: 'GET'} )
        .then(data =>{
            return data.json()
        }).then(produit =>{
            console.log(produit)

            let nomProduit = document.getElementById('nom-produit');
            nomProduit.innerText = `${produit.name}`;

            let prixProduit = document.getElementById('prix-produit');
            let prixProduitFormat = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(produit.price/100);
            prixProduit.innerText = prixProduitFormat;

            let descProduit = document.getElementById('description-produit');
            descProduit.innerText = `${produit.description}`;  
        
            let HTML = document.getElementById('wrapper-produit')
            let myHTMLproduct = ""
            myHTMLproduct += `
            <div class="card h-100">
                <a href="#"><img class="card-img-top" src="${produit.imageUrl}" alt=""></a>
                <div class="card-footer">
                    <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                </div>
            </div>`
            HTML.innerHTML = myHTMLproduct
            
            // AFFICHER LES COULEURS
            console.log(produit.colors)
            let colorsHTML = document.getElementById('colors-options')
            let myHTMLcolors = `<option value="0">Choisir...</option>`

            for (let i = 0; i < produit.colors.length; i++) {
                const color = produit.colors[i];
                myHTMLcolors += `<option value="`+color+`">`+color+`</option>`
            }
            colorsHTML.innerHTML = myHTMLcolors

            // BOUTON PANIER 
            let btnPanier = document.getElementById('submit-btn');
     
            // DEBUT DE L'EVENEMENT CLIC BOUTON PANIER
            btnPanier.addEventListener("click", event => {
                event.preventDefault();

                let btnColor = document.getElementById('colors-options');
                let myPanier = []; 

                // ON VERIFIE QUE LE CLIENT A CHOISI UNE COULEUR
                if (btnColor.value == "0")  {
                    alert("Veuillez choisir une couleur")
                }else{ 

                    let myProduit = {
                        id : produit._id,
                        name : produit.name, 
                        imageUrl : produit.imageUrl,
                        description : produit.description,
                        price : produit.price,
                        color : btnColor.value
                    };
                    // SOIT ON AJOUTE AU PANIER EXISTANT
                   
                    // ON CHECK SI LE PANIER EXISTE
                    if(localStorage.getItem('panier') !== null){
                        console.log("panier existant E1")

                        // SI OUI, ON RECUPERE LE PANIER
                        var recuperation = localStorage.getItem('panier');
                        const myPanier = JSON.parse(recuperation);
                        myPanier.push(myProduit);
                        CardProduits = JSON.stringify(myPanier);
                        localStorage.setItem('panier', CardProduits);
                        
                        console.log( localStorage.getItem('panier') );

                        alert("Vous avez ajouté ce produit à votre panier");

                    }else{ 
                        // SINON , ON CREE UN PANIER
                        console.log("panier vide E2")

                        myPanier.push(myProduit);
                        // pour clear le formulaire
                        document.querySelector('form').reset();

                        console.warn('added', {myPanier} );
                            var CardProduits = JSON.stringify(myPanier);
                            localStorage.setItem('panier', CardProduits);
                            // let panierClient = localStorage.getItem('panier');

                        alert("Vous avez ajouté ce produit à votre panier");
                    }

                
                }



                
            });
           
                
        // FIN DU THEN
        })  

        