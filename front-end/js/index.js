let url = 'http://localhost:3000/api/teddies';
fetch( url , {method: 'GET'})

.then(data =>{
    return data.json()
}).then(peluches =>{
    console.log(peluches)

let HTML = document.getElementById("wrapper-peluches")
let myHTML = ""

peluches.forEach(peluche => {
        let peluchePrixFormat = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(peluche.price/100);
        myHTML += `<div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100">
                        <a href="#"><img class="card-img-top" src="${peluche.imageUrl}" alt="${peluche.name}"></a>
                        <div class="card-body">
                            <h4 class="card-title">
                            <a href="views/produit.html?id=${peluche._id}">${peluche.name}</a>
                            </h4>
                            <h5>`+peluchePrixFormat+`</h5>
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                        </div>
                        </div>
                    </div>`


    });

    HTML.innerHTML = myHTML 
    // CarouselPictures.innerHTML = myCarouselPictures
        
});
