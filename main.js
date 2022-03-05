let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Home / T-shirt',
        tag: 'clothes2',
        price: 100,
        inCart: 0
    }
]

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.scart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action == "decrease") {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.scart span').textContent = productNumbers - 1;
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1 );
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

function totalCost(product, action) {
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );
    if( action == "decrease") {
        cartCost = parseInt(cartCost);

        localStorage.setItem('totalCost',cartCost - product.price);
    } else if(cartCost != null) {
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

    // console.log(cartItems);
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <table>
                <tbody class="products">
                <tr>
                    <td><ion-icon name="trash-outline"></ion-icon></td>
                    <td><img src="./pictures/${item.tag}.png"></td>
                    <td class="item-name"><span>${item.name}</span></td>
                    <td class="price">$${item.price}.00</td>
                    <td class="quantity">
                    <ion-icon class="decrease" name="caret-back-outline"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon class="increase" name="caret-forward-outline"></ion-icon>
                    </td>
                    <td class="total">$${item.inCart * item.price}.00</td>
                </tr>
                </tbody>
                </table>
            `;
        });
    }

    deleteButtons();
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.products ion-icon');
    let productsName = (products + name);
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            // console.log('clicked')
            productName = deleteButtons[i].parentElement.textContent.toLowerCase().replace(/ /g, '');
            console.log(productName);
            console.log(cartItems[productName].name + " " + cartItems[productName].inCart);
            //console.log("We have " + productNumbers + " products in cart");
        
            //localStorage.setItem('cartNumbers', productNumbers - )
        });
    }
}
onLoadCartNumbers();
displayCart();