const upQty = document.querySelectorAll('.cart_quantity_up');
const downQty = document.querySelectorAll('.cart_quantity_down');
const deleteCart = document.querySelectorAll('.cart_quantity_delete');
let sta;
let idProduct;

upQty.forEach(function(button) {
    button.addEventListener('click', async function(e) {
        e.preventDefault();

        sta = 'up';
        idProduct = this.getAttribute('id-product');

        await ajaxEditCart(sta, idProduct);

        const itemProduct = button.closest('tr');
        const inputQty = itemProduct.querySelector('.cart_quantity_input');
        const viewToTal = itemProduct.querySelector('.cart_total_price');

        let qty = parseInt(inputQty.value);
        let price = parseFloat(viewToTal.textContent.replace('$', '')) / qty;

        qty = qty + 1;
        inputQty.value = qty;

        let totalPrice = qty * price;
        viewToTal.textContent = `$${totalPrice}`;

        TotalArea();
    });
});

downQty.forEach(function(button) {
    button.addEventListener('click', async function(e) {
        e.preventDefault();

        sta = 'down';
        idProduct = this.getAttribute('id-product');

        await ajaxEditCart(sta, idProduct);

        const itemProduct = button.closest('tr');
        const inputQty = itemProduct.querySelector('.cart_quantity_input');
        const viewToTal = itemProduct.querySelector('.cart_total_price');

        let qty = parseInt(inputQty.value);
        let price = parseFloat(viewToTal.textContent.replace('$', '')) / qty;

        if (qty > 1) {
            qty = qty - 1;
        } else {
            alert('Không được xóa sản phẩm cuối cùng');
        }
        inputQty.value = qty;

        let totalPrice = qty * price;
        viewToTal.textContent = `$${totalPrice}`;

        TotalArea();
    });
});

deleteCart.forEach(function(button) {
    button.addEventListener('click', async function(e) {
        e.preventDefault();

        sta = 'delete';
        idProduct = this.getAttribute('id-product');

        await ajaxEditCart(sta, idProduct);

        //Xóa html
        const itemProduct = button.closest('tr');
		$(itemProduct).remove();

        TotalArea()
    });
});

async function ajaxEditCart(status, idProduct) {
    const response = await fetch('ajax/edit-cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status, idProduct })
        });

        // const data = await response.json();
}

function TotalArea() {
	const total_area = document.querySelector(".total_area")
	const cart_total = total_area.querySelector(".cart_total")
	const pay_total = total_area.querySelector(".pay_total")

    const cart = document.querySelectorAll('.item-product');

    let cartTotal = 0;
    cart.forEach(function(item) {
        const viewToTal = item.querySelector('.cart_total_price');
        cartTotal = cartTotal + parseFloat(viewToTal.textContent.replace('$', ''));
    });

	cart_total.textContent = `$${cartTotal}`
	pay_total.textContent = `$${cartTotal + 2}`
}
