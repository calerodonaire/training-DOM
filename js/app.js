window.addEventListener("load", () => {
    // Select modal elements
    let addedToCart = new bootstrap.Modal(
        document.querySelector("#addedToCart"),
        {
            keyboard: false,
        }
    );

    let cartPurchased = new bootstrap.Modal(
        document.querySelector("#cartPurchased"),
        {
            keyboard: false,
        }
    );

    let alreadyAddedToCart = new bootstrap.Modal(
        document.querySelector("#alreadyAddedToCart"),
        {
            keyboard: false,
        }
    );
    // Add product to cart with buttons
    let addToCartButtons = document.querySelectorAll(".card-body");
    for (let index = 0; index < addToCartButtons.length; index++) {
        let button = addToCartButtons[index];
        button.addEventListener("click", (e) => {
        addToCartClicked(e)
        });
    }
    // Emptying cart
    document.querySelector("#empty-cart").addEventListener("click", () => {
        emptyCart();
    });
    // Simulating payment confirmation
    document.querySelector("#btn-purchased").addEventListener("click", () => {
        // purchaseClicked();
    });
    // Stop pulse effect
    document.querySelector("#cart").addEventListener("click", () => {
        cart.classList.remove("hvr-pulse");
    });
    // Activate/Deactivate cart buttons
    const toggleShoppingControls = (enable) => {
        if (enable) {
            document.querySelector("#empty-cart").classList.remove("disabled")
            document.querySelector("#btn-purchase").classList.remove("disabled")
            document.querySelector("#btn-purchase").classList.add("hvr-pulse")
        } else {
            document.querySelector("#empty-cart").classList.add("disabled")
            document.querySelector("#btn-purchase").classList.add("disabled")
            document.querySelector("#btn-purchase").classList.remove("hvr-pulse")
        }
    }
    // Empty cart
    const emptyCart = () => {
        document.querySelector("tbody").innerHTML = "";
        // updateCartTotal();
        toggleShoppingControls(false);
    }
    // Simulate purchase and show alert
    const purchaseClicked = () => {
        document.querySelector("tbody").innerHTML = "";
        // updateCartTotal();
        toggleShoppingControls(false);
        cartPurchased.show();
        setTimeout(() => {
            cartPurchased.hide();
        }, 2000);
    }
    // Remove items from cart
    const removeCartItem = (e) => {
        let buttonClicked = e.target;
        let newRow = buttonClicked.parentNode.parentNode.getAttribute("row-number");
        document.querySelector(`#${newRow}`).remove();
        let numItemsAdded = document.querySelector("tbody").childElementCount;
        if (numItemsAdded == 0) {
            toggleShoppingControls(false);
        }
        // updateCartTotal();
    }
    // Add item to cart after clicking cart button
    const addToCartClicked = (e) => {
        let buttonClicked = e.target;
        let shopItem = buttonClicked.parentNode.parentNode.parentNode;
        let productId = shopItem.getAttribute("product-id");
        let title = shopItem.firstElementChild.getAttribute("alt");
        let productName = shopItem.lastElementChild.firstElementChild.textContent;
        let price = shopItem.children[1].firstElementChild.innerText.replace("€ / Kg", "");
        let imageSrc = shopItem.firstElementChild.src;
        addItemToCart(productId, title, productName, price, imageSrc);
        // updateCartTotal();
    }
    // Generate row for cart
    const addItemToCart = (productId, title, productName, price, imageSrc) => {
        let rowId = "row-number-" + productId;
        let cartItems = document.querySelectorAll("tr");
        for (let index = 0; index < cartItems.length; index++) {
            if (cartItems[index].getAttribute("id") == rowId) {
                alreadyAddedToCart.show();
                setTimeout(() => {
                    alreadyAddedToCart.hide();
                }, 2500);
                return;
            }
        }        
        let cartRow = document.createElement("tr");
        cartRow.setAttribute("id", rowId);
        let itemsAdded = cartItems.length;
        let cartRowContents = `<th scope="row">${itemsAdded}</th>
        <td>
           <div class="card border-success mb-3 text-center">
              <div class="card-body text-success">
                 <img src="${imageSrc}" alt="${title}" class="img-thumbnail">
              </div>
              <div class="card-footer bg-transparent border-success">${productName}</div>
           </div>
        </td>
        <td>
           <h4 class="card-title pricing-card-title text-center">${price} € <small class="text-muted">/ Kg</small></h4>
        </td>
        <td>
           <div class="row">
              <div class="d-flex justify-content-center quantity col-12 col-md-6">
                 <input class="form-control rounded-sm text-dark border-info" type="number" min="1" max="10"
                    step="1" value="1" row-number="${rowId}">
                 <div class="quantity-nav">
                    <div class="quantity-button quantity-up border-info">
                      <i class="fa-solid fa-circle-arrow-up text-warning"></i>
                    </div>
                    <div class="quantity-button quantity-down border-info">
                      <i class="fa-solid fa-circle-arrow-down text-warning"></i>
                    </div>
                 </div>
              </div>
              <div class="text-center col-12 col-md-6">
                 <button type="button" class="btn btn-link text-danger mt-2" row-number="${rowId}">
                    <span>
                    <i class="fa-solid fa-circle-xmark"></i>
                    </span>
                 </button>
              </div>
           </div>
        </td>`;
        cartRow.innerHTML = cartRowContents;
        document.querySelector("tbody").appendChild(cartRow);
        cartRow.lastElementChild.lastElementChild.lastElementChild.firstElementChild.addEventListener("click", removeCartItem);
        cartRow.lastElementChild.firstElementChild.firstElementChild.firstElementChild.addEventListener("change", updateCartTotal());
        cartRow.lastElementChild.firstElementChild.firstElementChild.firstElementChild.addEventListener("input", updateCartTotal());
        
    }

// addEventListener closing symbol
});
