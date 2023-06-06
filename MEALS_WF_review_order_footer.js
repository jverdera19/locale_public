<!-- Klaviyo -->
<script
async
type="text/javascript"
src="//static.klaviyo.com/onsite/js/klaviyo.js?company_id=REabab"
></script>

<!-- FOXYCART -->
<script
data-cfasync="false"
src="https://cdn.foxycart.com/secure.localemeals.com/loader.js"
></script>
<!-- /FOXYCART -->

<script data-cfasync="false">
function setDeadline(deadlineDate) {
    var deadline = deadlineDate // format - '2022/12/21 23:59';

    function pad(num, size) {
        var s = '0' + num
        return s.substr(s.length - size)
    }

    // fixes "Date.parse(date)" on safari
    function parseDate(date) {
        const parsed = Date.parse(date)
        if (!isNaN(parsed)) return parsed
        return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '))
    }

    function getTimeRemaining(endtime) {
        let total = parseDate(endtime) - Date.parse(new Date())
        let seconds = Math.floor((total / 1000) % 60)
        let minutes = Math.floor((total / 1000 / 60) % 60)
        let hours = Math.floor((total / (1000 * 60 * 60)) % 24)
        let days = Math.floor(total / (1000 * 60 * 60 * 24))

        return { total, days, hours, minutes, seconds }
    }

    function clock(id, endtime) {
        let days = document.getElementById(id + '-days')
        let hours = document.getElementById(id + '-hours')
        let minutes = document.getElementById(id + '-minutes')
        let seconds = document.getElementById(id + '-seconds')

        var timeinterval = setInterval(function () {
            var time = getTimeRemaining(endtime)

            if (time.total <= 0) {
                clearInterval(timeinterval)
            } else {
                days.innerHTML = pad(time.days, 2)
                hours.innerHTML = pad(time.hours, 2)
                minutes.innerHTML = pad(time.minutes, 2)
                seconds.innerHTML = pad(time.seconds, 2)
            }
        }, 1000)
    }

    clock('js-clock', deadline)
}

let fcLoaded = false
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        console.log('This page was restored from the bfcache.')

        setTimeout(function () {
            FC.client.updateCart()
        }, 0)
        setTimeout(function () {
            createQuickViewCartItems()
        }, 3000)
        // Update selected date
        dateChangeProject()
    } else {
        console.log('This page was loaded normally.')
    }
})
// Query all items with FC code
var fcElements = document.querySelectorAll(
    'a[href*="/cart"], form[action*="/cart"]'
)

// iterate through the nodelist and set the display property to none
for (var i = 0; i < fcElements.length; i++) {
    fcElements[i].setAttribute(
        'data-display-original-value',
        fcElements[i].style.display
    )
    fcElements[i].style.display = 'none'
}

// Funtimes when Foxy's ready.
var FC = FC || {}
// --Create cart items in the quickview on FC ready.
var existingOnload =
    typeof FC.onLoad == 'function' ? FC.onLoad : function () {}
FC.onLoad = function () {
    existingOnload()

    if (window.location.pathname.match(/review-order/)) {
        return
    }
    FC.client.on('render.done', updateCheckoutLinks)

    FC.client.on('ready.done', function () {
        fcLoaded = true
        // re-enable FC Add to cart links
        for (var i = 0; i < fcElements.length; i++) {
            fcElements[i].style.display = fcElements[i].getAttribute(
                'data-display-original-value'
            )
        }
        // initDate();
        initRegion()
        createQuickViewCartItems()
        updateProgressBar()

        viewItemGA()
    })
    // --Handle-update cart event? search for event when JSON updated or cart updated
    FC.client.on('cart-item-quantity-update.done', function (params) {
        createQuickViewCartItems()
    })

    FC.client.on('cart-item-remove.done', function (params) {
        createQuickViewCartItems()
        removeFromCartGA(params)
    })

    FC.client.on('cart-update.done', function (params) {
        createQuickViewCartItems()
    })

    // Facebook pixel
    //FC.client.on("cart-submit.done", createQuickViewCartItems); // Calling it from FB pixel function
    FC.client.on('cart-submit.done', function (params) {
        createQuickViewCartItems()
        addToCartGA(params)
        addToCartToast(params)

        if (
            typeof fbq != 'undefined' &&
            FC.client.isActionNeeded(params) &&
            (!FC.sidecart ||
                (FC.sidecart &&
                    !FC.sidecart.shouldUseFullpageCart() &&
                    !FC.sidecart.bypassSidecart(params)))
        ) {
            var item_quantity = params.data.hasOwnProperty('quantity')
                ? parseInt(params.data.quantity)
                : 1
            var item_price = parseFloat(params.data.price)
            fbq('track', 'AddToCart', {
                content_name: decodeURIComponent(params.data.name),
                value: item_price * item_quantity,
                currency: FC.json.locale_info.int_curr_symbol.trim(),
                contents: [
                    {
                        id: params.data.code,
                        quantity: item_quantity,
                        item_price: item_price,
                    },
                ],
                content_type: 'product',
            })
        }
    })
}

function initRegion() {
    let date = localStorage.getItem('date')
    let region = ''

    if (window.location.host.includes('localemeals.com')) {
        region = 'Bay Area Meals'
    } else if (window.location.pathname.match(/bay-area\/gift-cards/)) {
        region = 'Bay Area'
    } else if (window.location.pathname.match(/socal\/gift-cards/)) {
        region = 'Los Angeles'
    } else if (window.location.pathname.match(/nationwide\/gift-cards/)) {
        region = 'Nationwide'
    } else if (window.location.pathname.match(/socal\/find/)) {
        region = 'Los Angeles'
    } else {
        let itemAddToCartHTML = document.querySelector(
            '.products-item-add-to-cart'
        ).innerHTML
        if (
            itemAddToCartHTML.includes('Locale=Los%20Angeles') ||
            itemAddToCartHTML.includes('Locale=Los Angeles') ||
            itemAddToCartHTML.includes('value="Los Angeles')
        ) {
            region = 'Los Angeles'
        } else if (
            itemAddToCartHTML.includes('Locale=Bay%20Area') ||
            itemAddToCartHTML.includes('Locale=Bay Area') ||
            itemAddToCartHTML.includes('value="Bay Area')
        ) {
            region = 'Bay Area'
        } else if (
            itemAddToCartHTML.includes('Locale=Nationwide') ||
            itemAddToCartHTML.includes('value="Nationwide')
        ) {
            region = 'Nationwide'
        } else {
            region = 'Product Page'
            console.log('region is Product Page')
        }
    }

    // if (window.location.host.includes('localemeals.com')) {
    //     gtag('config', 'UA-175326468-1', { LocaleRegion: 'Bay Area Meals' })
    // } else {
    gtag('config', 'UA-175326468-5', { LocaleRegion: region })
    console.log('gtag region: ', region)
    // }

    if (region == FC.json.custom_fields.region?.value) {
        FC.client
            .request(
                'https://' +
                    FC.settings.storedomain +
                    '/cart?h:region=' +
                    region +
                    '&h:chosenDate=' +
                    date
            )
            .done(function (dataJSON) {
                console.log('Custom fields:')
                console.table(FC.json.custom_fields)
            })
    } else if (region == 'Product Page') {
        console.log(
            'region is Product Page - not clearing cart or updating region'
        )
        FC.client
            .request(
                'https://' +
                    FC.settings.storedomain +
                    '/cart?h:chosenDate=' +
                    date
            )
            .done(function (dataJSON) {
                console.log('Updated date only ', date)
                console.table(FC.json.custom_fields)
            })
    } else {
        FC.client
            .request(
                'https://' + FC.settings.storedomain + '/cart?empty=true'
            )
            .done(function (dataJSON) {
                FC.client
                    .request(
                        'https://' +
                            FC.settings.storedomain +
                            '/cart?h:region=' +
                            region +
                            '&h:chosenDate=' +
                            date
                    )
                    .done(function (dataJSON) {
                        console.log('Updated region to ', region)
                        console.table(FC.json.custom_fields)
                    })
            })
    }
}

function updateFCDate() {
    if (!(typeof FC === 'undefined')) {
        console.log('FC is loaded')
        canShipOnDeliveryDay()
        FC.client
            .request(
                'https://' +
                    FC.settings.storedomain +
                    '/cart?h:chosenDate=' +
                    chosenDate
            )
            .done(function (dataJSON) {
                console.log('Chosen Date:', chosenDate)
                console.table(FC.json.custom_fields)
            })
    } else {
        console.log('FC is not loaded')
    }
}

function updateCheckoutLinks() {
    const origin = window.location.origin

    if (window.location.pathname.match(/review-order/)) {
        return
    }
    let cartContinueButtons = document.querySelectorAll(
        `a.fc-sidecart-button.fc-btn-action[href^="https://${FC.settings.storedomain}/checkout"], a.fc-action--checkout--button[href^="https://${FC.settings.storedomain}/checkout"], a[data-fc-id="paypal-ec-link"], #checkoutFoxy, .hover_cart_container a[href='https://${FC.settings.storedomain}/checkout']`
    )

    if (FC.json.item_count === 1) {
        cartContinueButtons.forEach((el) => {
            el.href = `${origin}/review-order`
        })
    }
}

function viewItemGA() {
    // GA test
    gtag('event', 'view_item', {
        value: 8,
        currency: 'USD',
        items: [
            {
                id: 'recHAzUPstoSysUJP',
                name: 'Organic Strawberries',
                quantity: 1,
                price: 8,
            },
        ],
    })
}

function addToCartGA(params) {
    gtag('event', 'add_to_cart', {
        items: [
            {
                id: params.data.code,
                name: params.data.name,
                quantity: params.data.quantity,
                price: params.data.price,
            },
        ],
    })
}

function removeFromCartGA(params) {
    gtag('event', 'remove_from_cart', {
        items: [
            {
                id: params.data.code,
                name: params.data.name,
                quantity: params.data.quantity,
                price: params.data.price,
            },
        ],
    })
}

function startCheckoutGA() {
    let cartItems = FC.json.items
    let recordsToQuery = []

    for (var i = 0; i < FC.json.items.length; i++) {
        var current = cartItems[i]

        if (current.name !== 'Tip' && current.name !== 'Small Order Fee') {
            let obj = {
                name: current.name,
                quantity: current.quantity,
                id: current.code,
                price: current.price,
            }

            recordsToQuery.push(obj)
        }
    }

    gtag('event', 'begin_checkout', {
        value: FC.json.total_order,
        currency: 'USD',
        items: recordsToQuery,
    })
}

// --Function that creates cart items
function createQuickViewCartItems() {
    if (window.location.pathname == '/') {
        return
    }
    const cartItems = FC.json.items
    const hoverCartContainerElement =
        document.querySelector('nav .hover_cart')
    // Remove children current cart or loader
    if (hoverCartContainerElement.children.length) {
        hoverCartContainerElement.childNodes.forEach((child) =>
            child.remove()
        )
    }

    const cartItemContainer = `<div style="overflow: visible;height: 100%;">
                <div role="list" class="cart-item-container" style="overflow-y: auto;height: 100%;">
                </div>
            </div>`

    hoverCartContainerElement.insertAdjacentHTML(
        'beforeend',
        cartItemContainer
    )
    const cartItemContainerElement = document.querySelector(
        '.cart-item-container'
    )
    if (!cartItems.length) {
        cartItemContainerElement.innerHTML = `<div class="text-block-185">Your basket is empty, try out some of our seasonal goodies</div>`
        addSubtotal()
        return
    }

    const cartItemTemplate = (
        id,
        name,
        vendorName,
        imageURL,
        price,
        price_each,
        quantity,
        servings,
        size
    ) => {
        return `
<div role="listitem" class="collection-item-21" data-item-id="${id}">
<div class="cart_image_container">
<img
src="${imageURL}"
loading="lazy"
alt=""
class="image-12"
/>
<div class="hover_cart_quantity">${quantity}</div>
</div>
<div class="div-block-425">
<div class="pc_name_container">
<div class="pc_vendor_name">${vendorName ? vendorName : ''}</div>
<div class="pc_name">${name}</div>
</div>
<div class="pc_price_section">
<div class="pc_price_container">
    <div class="pc_price sale"></div>
    <div class="pc_price">$</div>
    <div class="pc_price">${price}</div>
</div>
<div class="pc_detail_container">
    ${
        servings
            ? `<div class="pc_servings_container">
    <div class="pc_detail-text">serves&nbsp;&nbsp;</div>
    <div class="pc_detail-text">${servings}</div>
    </div>`
            : `<div style="display:none"></div>`
    }
${
    size
        ? `<div class="pc_servings_container">
        <div class="pc_detail-text">${size}</div>
    </div>`
        : `<div style="display:none"></div>`
}
</div>
</div>
</div>
</div>
`
    }

    cartItems.forEach((item) => {
        const { id, name, image, price, price_each, quantity, options } =
            item
        let vendorName, size, servings

        if (name === 'Small Order Fee') return
        if (options.length) {
            vendorName = options.find(
                (item) => item.name === 'Vendor'
            )?.value
            //optional
            size = options.find((item) => item.name === 'Size')?.value
            servings = options.find(
                (item) => item.name === 'Servings'
            )?.value
        }

        cartItemContainerElement.insertAdjacentHTML(
            'beforeend',
            cartItemTemplate(
                id,
                name,
                vendorName,
                image,
                price.toFixed(2),
                price_each,
                quantity,
                servings,
                size
            )
        )
    })

    addSubtotal()
    updateProgressBar()
}

function addToCartToast(params) {
    if (window.location.pathname == '/') {
        return
    }
    console.log('cart-submit.done for item: ' + params.data.image)
    addedProductImage = decodeURIComponent(params.data.image)

    let atcContainer = document.querySelector('.atc-container')
    let atcImage = document.querySelector('.atc-image')

    atcImage.style.backgroundImage = `url(${addedProductImage})`
    atcContainer.classList.remove('hide-atc-container')
    atcContainer.style.display = 'flex'

    setTimeout(function () {
        atcContainer.classList.add('hide-atc-container')
    }, 2000)
}

function addSubtotal() {
    document.querySelector(
        '.hover_cart_subtotal .items-subtotal'
    ).innerText = `$${FC.json.total_item_price.toFixed(2)}`
}

function updateProgressBar() {
    let fee_existing = 0
    for (i = 0; i < FC.json.items.length; i++) {
        if (FC.json.items[i].code == 'fee') {
            //fee_id = FC.json.items[i].id
            fee_existing = FC.json.items[i].price
        }
    }
    console.log('Updated subtotal')
    let region = localStorage.getItem('region')
    let minOrderDiv = document.querySelector('.minimum-order-div')
    let progressBar = document.querySelector('.progress_bar_foreground')

    let minQty = 40
    let remaining = parseFloat(
        (minQty - FC.json.total_item_price + fee_existing).toFixed(2)
    )
    let minOrderPercentage = ((FC.json.total_item_price - fee_existing)/ minQty) * 100
    let minOrderTextDiv = document.querySelector('.minimum_order_text')
    let minOrderText = `Add $${remaining} to waive a $6 small order fee`

    if (minOrderDiv) {
        if (minOrderPercentage < 100) {
            minOrderDiv.style.display = 'flex'
            progressBar.style.width = `${minOrderPercentage}%`
            minOrderTextDiv.textContent = minOrderText
            console.log('updated bar width to %', minOrderPercentage)
        } else {
            minOrderDiv.style.display = 'none'
            console.log('hiding cart')
        }
    }
}

window.JetboostItemsLoaded = function (collectionListElement, allItems) {
    // for targeting one collection
    // remove if you want to target every collection using Jetboost
    // if(!collectionListElement.classList.contains(`${collectionClass}`)) {
    // return
    // }

    // run code for each collection item
    // allItems.forEach((item) => {
    // run code one each item in a collection list
    // console.log(item)
    // })

    console.log('allItems.length: ', allItems.length)
}
</script>

<script
data-cfasync="false"
src="https://cdn.jsdelivr.net/gh/jverdera19/locale_public@6f4b92d24ed6261b62311de40ee6eee16262e0b1/MEAL_WF_project_footer.js"
async
defer
></script>

<script id="flowphantom" type="text/javascript">
window.FLOWPHANTOM_SITE_ID = '64545b3f66dc274ddcd1a775'
;(function () {
    d = document
    s = d.createElement('script')
    s.src =
        'https://cdn.flowphantom.com/api/fp-script/64545b3f66dc274ddcd1a775'
    s.async = 1
    s.crossOrigin = 'anonymous'
    d.getElementsByTagName('head')[0].appendChild(s)
})()
</script>
