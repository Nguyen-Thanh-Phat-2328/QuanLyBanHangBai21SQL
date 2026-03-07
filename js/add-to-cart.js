// function abc(id) {
//     alert(id);
// }

const btnAddToCart = document.querySelectorAll('#btn-add-to-cart');
btnAddToCart.forEach(function(btn) {
    btn.addEventListener('click', async function(e) {
        e.preventDefault();

        const idProduct = this.getAttribute('id-product');
        // alert(idProduct);

        const response = await fetch('ajax/add-to-cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(idProduct)
        });

        const totalCartNew = document.querySelector('.cart-count');
        const totalCartOld = document.querySelector('.cart-count').textContent;

        totalCartNew.textContent = parseInt(totalCartOld) + 1;
        // const data = await response.json();
    });
});