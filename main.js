let carts = document.querySelectorAll('.add-cart');


let products = [
    {
        name: 'Home / T-shirt',
        tag: 'clothes2',
        price: 100,
        inCart: 0
    }
]

for (let i=0; i < carts.length; i ++) {
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
         document.querySelector('.scart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);


    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.scart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.scart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
        cartItems = {
            ...cartItems,
            [product.tag]: product
        }
    }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}


function displayCart() {

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);

    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {

            productContainer.innerHTML += `
            <table class="products">
            <tbody>
            <tr>
                <td class="product-removal"><i class="fa-solid fa-trash"></i>

                <td><img src="./pictures/${item.tag}.png"></td>

                <td><span>${item.name}</span></td>

                <td class="price">${item.price}</td>

                <td class="quantity">
                    <ion-icon name="caret-back-outline"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon name="caret-forward-outline"></ion-icon>
                </td>

                <td class="total">
                    $${item.inCart * item.price}.00
                </td>

            </tr>
            </tbody>
            </table>
            `
        });


    }

}


onLoadCartNumbers();
displayCart();