
let numeroCommande = localStorage.getItem('order_id')
if (numeroCommande == null) {
    document.location.href="../index.html"; 
} else {
    document.getElementById('wrapper-numero-commande').innerText = `Nous vous confirmons que votre commande numero `+localStorage.getItem('order_id')+` a bien été passée`
    localStorage.clear();
}   