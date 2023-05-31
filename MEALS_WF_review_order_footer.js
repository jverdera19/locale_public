// Funtimes when Foxy's ready.
var FC = FC || {};

FC.onLoad = function () {
  var events_initialized = events_initialized || false;
  if (!events_initialized) {
    FC.client.on("render.done", updateCheckoutLinks);

    events_initialized = true;
  }
};
function updateCheckoutLinks() {
  const origin = window.location.origin;

  if (window.location.pathname.match(/review-order/)) {
    return;
  }
  let cartContinueButtons = document.querySelectorAll(
    `a.fc-sidecart-button.fc-btn-action[href^="https://${FC.settings.storedomain}/checkout"], a.fc-action--checkout--button[href^="https://${FC.settings.storedomain}/checkout"], a[data-fc-id="paypal-ec-link"], #checkoutFoxy, .hover_cart_container a[href='https://${FC.settings.storedomain}/checkout']`
  );
  console.log("Cart continue:", cartContinueButtons.length, FC.json.item_count);
  if (FC.json.item_count === 1) {
    cartContinueButtons.forEach((el) => {
      el.href = `${origin}/bay-area/review-order`;
    });
  }
}

// Review Page Logic starts here----------
const reviewItemContainer = document.querySelector(
  ".review-order-item-container"
);

// Funtimes when Foxy's ready.
var FC = FC || {};

FC.onLoad = function () {
  FC.client.on("ready.done", () => {
    if (window.location.pathname.match(/review-order/)) {
      createCartItems();
      removeDuplicates();
      canShipOnDeliveryDayReview();
      //startCheckoutGA()
    }
  });
};

// When DOM ready, not when FC.json is loaded
window.addEventListener("DOMContentLoaded", () => {
  // Add addon to Cart Event Listener
  document.querySelectorAll(".addon-add-to-cart").forEach((anchor) => {
    anchor.previousSibling.firstChild.getAttribute("href");
    anchor.addEventListener("click", (e) => {
      let addToCartUrlPath =
        anchor.previousSibling.firstChild.getAttribute("href");
      e.target.innerText = "Adding…";
      addLoadingIcon(reviewItemContainer);
      FC.client
        .request(`https://${FC.settings.storedomain}${addToCartUrlPath}`)
        .done((data) => {
          e.target.innerText = "✔ Added";
          e.target.closest(".addon-item").classList.add("hide");
          createCartItems();
        });
    });
  });

  // Animation End event Listener
  document.querySelectorAll(".addon-item").forEach((addon) => {
    addon.addEventListener(
      "transitionend",
      (ev) => {
        if (ev.type === "transitionend") {
          addon.style.display = "none";
        }
      },
      false
    );
  });
});

function removeDuplicates() {
  if (!FC.json.items.length) {
    return;
  }
  document.querySelectorAll(".addon-item-name").forEach((addon) => {
    const cartItems = FC.json.items;

    if (cartItems.find((itemInCart) => addon.innerText === itemInCart.name)) {
      addon.closest(".addon-item").classList.add("hide");
    }
  });
}

function addLoadingIcon(container) {
  container.innerHTML =
    "<div style='display: flex;flex-direction: row;justify-content: center;'><div class='load'></div></div>";
}

function createCartItems() {
  const cartItems = FC.json.items;

  if (!cartItems.length) {
    reviewItemContainer.innerHTML = `<div data-fc-id="block-cart-errors">
                                      <div class="fc-messages">
                                          <div class="fc-messages__empty-notification"> <a href="${FC.json.cart_cancel_and_continue_link}" style="cursor: pointer">Your shopping cart is empty. Click here to return to the store.</a></div>
                                      </div>
                                    </div>
                                    </div>`;
    return;
  }

  // Remove children current cart or loader
  if (reviewItemContainer.children.length) {
    reviewItemContainer.childNodes.forEach((child) => child.remove());
  }

  cartItems.forEach((item) => {
    const { id, name, image, price, price_each, quantity, options } = item;
    let vendorName,
      size,
      servings,
      howItArrives,
      shelfLife,
      prepTime,
      pricePerServing;

    if (name === "Small Order Fee") return;
    //print name
    console.log("name", name);
    if (options.length) {
      vendorName = options.find((item) => item.name === "Vendor")?.value;
      //optional
      size = options.find((item) => item.name === "Size")?.value;
      servings = options.find((item) => item.name === "Servings")?.value;
      howItArrives = options.find(
        (item) => item.class === "how_it_arrives"
      )?.value;
      shelfLife = options.find((item) => item.name === "Shelf Life")?.value;
      prepTime = options.find((item) => item.name === "Prep Time")?.value;
      pricePerServing = options.find(
        (item) => item.name === "Price Per Serving"
      )?.value;
    }

    reviewItemContainer.insertAdjacentHTML(
      "beforeend",
      // Parameters must match the order of the function declaration
      cartItemTemplate(
        id,
        name,
        vendorName,
        image,
        price.toFixed(2),
        price_each,
        quantity,
        servings,
        size,
        howItArrives,
        shelfLife,
        prepTime,
        pricePerServing
      )
    );
  });
  // Event handler increment decrement remove - event listener
  reviewItemContainer.addEventListener("click", handleQuantityChange);

  addSubtotal();
  updateProgressBar();
}

function cartItemTemplate(
  id,
  name,
  vendorName,
  imageURL,
  price,
  price_each,
  quantity,
  servings,
  size,
  howItArrives,
  shelfLife,
  prepTime,
  pricePerServing
) {
  return `<div class="review-cart-item" data-item-id="${id}">
    <div class="review-cart-item-info">
        <div
            class="item-image"
            style="background-image: url(${imageURL})"
        ></div>
        <div class="name-price-checkout">
            <div class="item-vendor-name">
                <div>${vendorName ? vendorName : ""}</div>
            </div>
            <div class="div-block-374">
                <div class="item-name">
                    <div class="text-block-197">${name}</div>
                </div>
            </div>
            <div class="price-per-serving-div" ${
              pricePerServing ? "" : 'style="display:none;"'
            }>
              <div class="div-block-665">
                <div class="pc_price_per_serving">$</div>
                <div class="pc_price_per_serving">${pricePerServing}</div>
              </div>
              <div class="price-per-serving-text">Per serving</div>
            </div>
            <div class="div-block-513">
                <div class="div-block-511">
                    <div class="input-quantity-decrement">
                        <div class="html-embed-10 w-embed">
                            <svg
                                id="Layer_1"
                                class="quantity-decrement"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 200 200"
                            >
                                <defs>
                                    <style>
                                        .cls-1 {
                                            fill: none;
                                        }
                                        .cls-2 {
                                            fill: currentColor;
                                        }
                                    </style>
                                </defs>
                                <rect
                                    class="cls-2"
                                    x="91.12"
                                    y="29.94"
                                    width="17.76"
                                    height="140.11"
                                    rx="8.88"
                                    ry="8.88"
                                    transform="translate(200 0) rotate(90)"
                                ></rect>
                                <rect
                                    class="cls-1"
                                    width="200"
                                    height="200"
                                ></rect>
                            </svg>
                        </div>
                    </div>
                    <div class="input-quantity-container">${quantity}</div>
                    <div class="input-quantity-increment">
                        <div class="html-embed-10 w-embed">
                            <svg
                                id="Layer_1"
                                class="quantity-increment"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 200 200"
                            >
                                <defs>
                                    <style>
                                        .cls-1 {
                                            fill: none;
                                        }
                                        .cls-2 {
                                            fill: currentColor;
                                        }
                                    </style>
                                </defs>
                                <rect
                                    class="cls-2"
                                    x="91.12"
                                    y="29.94"
                                    width="17.76"
                                    height="140.11"
                                    rx="8.88"
                                    ry="8.88"
                                ></rect>
                                <rect
                                    class="cls-2"
                                    x="91.12"
                                    y="29.94"
                                    width="17.76"
                                    height="140.11"
                                    rx="8.88"
                                    ry="8.88"
                                    transform="translate(200 0) rotate(90)"
                                ></rect>
                                <rect
                                    class="cls-1"
                                    width="200"
                                    height="200"
                                ></rect>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-price">
            <div class="item-price-currency">$</div>
            <div class="item-price">${price_each}</div>
        </div>
    </div>
    <div class="review-cart-item-attributes">
      <div class="product-tag" ${howItArrives ? "" : 'style="display:none;"'}>
        <img src="https://uploads-ssl.webflow.com/64545b3f66dc274ddcd1a775/645ab8dfa1df8c15ecb12c1f_Fridge.svg" loading="lazy" 
          alt="" 
          class="product-tag-icon">
        <div class="pc_detail-text">Arrives:</div>
        <div class="pc_detail-text">${howItArrives}</div></div>
      <div class="product-tag" ${prepTime ? "" : 'style="display:none;"'}>
          <img
              src="https://uploads-ssl.webflow.com/64545b3f66dc274ddcd1a775/645ab6b02ed680d08c539cb6_Countdown.svg"
              loading="lazy"
              alt=""
              class="product-tag-icon"
          />
          <div class="pc_detail-text">${prepTime}</div>
      </div>
      <div class="product-tag" ${shelfLife ? "" : 'style="display:none;"'}>
      <img
              src="https://uploads-ssl.webflow.com/64545b3f66dc274ddcd1a775/64545b3f66dc27a81dd1a7ad_product%20detail_shelf%20life.png"
              loading="lazy"
              alt=""
              class="product-tag-icon"
          />
          <div class="pc_detail-text">Eat within</div>
          <div class="pc_detail-text">${shelfLife}</div>
      </div>
        
    </div>
</div>`;
}

function handleQuantityChange(event) {
  const handleChange = (type) => {
    const itemContainer = event.target.closest(".review-cart-item");
    const currentQuantity = itemContainer.querySelector(
      ".input-quantity-container"
    ).innerText;
    const itemFoxyID = event.target
      .closest("[data-item-id]")
      .getAttribute("data-item-id");
    let changeURL;
    if (type === "decrement")
      changeURL = `https://${
        FC.settings.storedomain
      }/cart?cart=update&quantity=${
        Number(currentQuantity) - 1
      }&id=${itemFoxyID}`;

    if (type === "increment")
      changeURL = `https://${
        FC.settings.storedomain
      }/cart?cart=update&quantity=${
        Number(currentQuantity) + 1
      }&id=${itemFoxyID}`;

    addLoadingIcon(itemContainer);
    FC.client.request(changeURL).done((json) => {
      const itemToUpdate = json.items.find((item) => item.id === itemFoxyID);
      if (!itemToUpdate) {
        itemContainer.remove();
        addSubtotal();
        updateProgressBar();
        return;
      }
      const { id, name, image, price, price_each, quantity, options } =
        itemToUpdate;
      let vendorName,
        size,
        servings,
        howItArrives,
        shelfLife,
        prepTime,
        pricePerServing;
      if (name === "Small Order Fee") return;
      if (options.length) {
        vendorName = options.find((item) => item.name === "Vendor")?.value;
        //optional
        size = options.find((item) => item.name === "Size")?.value;
        servings = options.find((item) => item.name === "Servings")?.value;
        howItArrives = options.find(
          (item) => item.class === "how_it_arrives"
        )?.value;
        shelfLife = options.find((item) => item.name === "Shelf Life")?.value;
        prepTime = options.find((item) => item.name === "Prep Time")?.value;
        pricePerServing = options.find(
          (item) => item.name === "Price Per Serving"
        )?.value;
      }

      itemContainer.outerHTML = cartItemTemplate(
        id,
        name,
        vendorName,
        image,
        price.toFixed(2),
        price_each,
        quantity,
        servings,
        size,
        howItArrives,
        shelfLife,
        prepTime,
        pricePerServing
      );
      addSubtotal();
      updateProgressBar();
    });
  };
  if (event.target.classList.contains("quantity-decrement")) {
    handleChange("decrement");
  }
  if (event.target.classList.contains("quantity-increment")) {
    handleChange("increment");
  }
}

function addSubtotal() {
  document.querySelector(
    ".items-subtotal"
  ).innerText = `$${FC.json.total_item_price.toFixed(2)}`;
}
