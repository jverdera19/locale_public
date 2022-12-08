// Checking Inventory
const datePickerButtonArray = document.querySelectorAll(
    '.delivery-date-picker-link'
)
console.log('datePickerButtonArray:', datePickerButtonArray)

let chosenDate = ''
const unavailableItemsList = document.querySelector('#unavailableItems')

// Good code
$('.delivery-date-picker-link').click(function () {
    // get Inventory date and weekday
    let iSODate = new Date(this.innerText)
    let date = formatDate(iSODate, 'inventoryDate')
    let shortDate = iSODate.toLocaleString('en-us', {
        weekday: 'short',
        month: 'numeric',
        day: '2-digit',
    })
    let longDate = formatDate(iSODate, 'long')

    let day = formatDate(iSODate, 'weekday')
    console.log('updated date')
    console.log(date, shortDate, longDate, day)

    previousDate = localStorage.getItem('date')
    localStorage.setItem('previousDate', previousDate)

    localStorage.setItem('date', date)
    localStorage.setItem('day', day)
    localStorage.setItem('shortDate', shortDate)
    localStorage.setItem('longDate', longDate)

    console.log(date)
    console.log(`${date} got clicked NEW (Smart)!`)

    $('.delivery-date-picker-link').removeClass('active')
    this.classList.add('active')

    // Update date
    dateChangeProject()

    chosenDate = date
    updateFCDate()
    action = 'check'
    //checkInventory(action);
})

// Refactoring date buttons event listener
const deliveryDateButtons = document.querySelectorAll('.delivery-date-btn')

for (const button of deliveryDateButtons) {
    button.addEventListener('click', function () {
        let dateText = button.firstChild.innerText

        // // get Inventory date and weekday
        let iSODate = new Date(dateText + ', 2022')

        previousDate = localStorage.getItem('date')
        localStorage.setItem('previousDate', previousDate)

        let date = formatDate(iSODate, 'inventoryDate')
        let shortDate = iSODate.toLocaleString('en-us', {
            weekday: 'short',
            month: 'numeric',
            day: '2-digit',
        })
        let longDate = formatDate(iSODate, 'long')

        let day = formatDate(iSODate, 'weekday')

        localStorage.setItem('date', date)
        localStorage.setItem('day', day)
        localStorage.setItem('shortDate', shortDate)
        localStorage.setItem('longDate', longDate)

        // Select active button when clicking
        $('.delivery-date-btn').removeClass('active')
        $(this).addClass('active')

        // Update date
        dateChangeProject()

        chosenDate = date
        updateFCDate()
        cartAvailability('check')
    })
}

/* $('.delivery-date-btn').click(function () {
    // get Inventory date and weekday
    let iSODate = new Date(this.innerText);
    //let iSODate = new Date(document.querySelector('.delivery-date-btn .date-numbers').innerText + ', 2022');
    let date = formatDate(iSODate, 'inventoryDate');
    let shortDate = iSODate.toLocaleString('en-us', { weekday: 'short', month: 'numeric', day: '2-digit' })
    let longDate = formatDate(iSODate, 'long');

    let day = formatDate(iSODate, 'weekday');
    console.log('updated date');
    console.log(date, shortDate, longDate, day);
    
    previousDate = localStorage.getItem("longDate");
    localStorage.setItem("previousDate", previousDate);

    localStorage.setItem("date", date);
    localStorage.setItem("day", day);
    localStorage.setItem("shortDate", shortDate);
    localStorage.setItem("longDate", longDate);

    // Select active button when clicking
    $(".delivery-date-button").removeClass("active");
    $(this).addClass("active");

    // Update date
    dateChangeProject();

    chosenDate = date;
    updateFCDate();
    cartAvailability('check');
  }); */

function cartAvailability(action) {
    console.log('starting cartAvailability for action: ', action)
}

function dateChangeProject() {
    date = localStorage.getItem('date')
    shortDate = localStorage.getItem('shortDate')
    longDate = localStorage.getItem('longDate')
    day = localStorage.getItem('day')

    $('.products-item-day-unavailable-value').text(day)
    $('.products-item-date-unavailable-value').text(date)

    // Update date button
    let currentDateDiv = document.querySelector('.current_date')

    if (currentDateDiv) {
        document.querySelector('.current_date').innerText = shortDate
    } else {
        console.log('it doesnt exist!')
    }

    // Check items not delivered on new date
    canShipOnDeliveryDay()
    checkDeliveryType()

    $('.products-item').each(function () {
        $(this).show()
        $(this).find('.products-item-add-to-cart').hide()
        $(this).find('.products-item-out-of-stock').hide()
        $(this).find('.products-item-day-unavailable').hide()

        var deliveryDate1 = $(this).find('.delivery-date-1').text()
        var deliveryDate2 = $(this).find('.delivery-date-2').text()
        var deliveryDate3 = $(this).find('.delivery-date-3').text()
        var deliveryDate4 = $(this).find('.delivery-date-4').text()
        var deliveryDate5 = $(this).find('.delivery-date-5').text()
        var deliveryDate6 = $(this).find('.delivery-date-6').text()
        var deliveryDate7 = $(this).find('.delivery-date-7').text()
        var deliveryDate8 = $(this).find('.delivery-date-8').text()
        var deliveryDate9 = $(this).find('.delivery-date-9').text()
        var deliveryDate10 = $(this).find('.delivery-date-10').text()
        var deliveryDate11 = $(this).find('.delivery-date-11').text()

        var deliveryDate1Inventory = $(this)
            .find('.delivery-date-1-inventory')
            .text()
        var deliveryDate2Inventory = $(this)
            .find('.delivery-date-2-inventory')
            .text()
        var deliveryDate3Inventory = $(this)
            .find('.delivery-date-3-inventory')
            .text()
        var deliveryDate4Inventory = $(this)
            .find('.delivery-date-4-inventory')
            .text()
        var deliveryDate5Inventory = $(this)
            .find('.delivery-date-5-inventory')
            .text()
        var deliveryDate6Inventory = $(this)
            .find('.delivery-date-6-inventory')
            .text()
        var deliveryDate7Inventory = $(this)
            .find('.delivery-date-7-inventory')
            .text()
        var deliveryDate8Inventory = $(this)
            .find('.delivery-date-8-inventory')
            .text()
        var deliveryDate9Inventory = $(this)
            .find('.delivery-date-9-inventory')
            .text()
        var deliveryDate10Inventory = $(this)
            .find('.delivery-date-10-inventory')
            .text()
        var deliveryDate11Inventory = $(this)
            .find('.delivery-date-11-inventory')
            .text()
        var addToCartHref = $(this)
            .find('.products-item-add-to-cart a')
            .attr('href')

        if (deliveryDate1 == date) {
            var inventory = deliveryDate1Inventory
        } else if (deliveryDate2 == date) {
            var inventory = deliveryDate2Inventory
        } else if (deliveryDate3 == date) {
            var inventory = deliveryDate3Inventory
        } else if (deliveryDate4 == date) {
            var inventory = deliveryDate4Inventory
        } else if (deliveryDate5 == date) {
            var inventory = deliveryDate5Inventory
        } else if (deliveryDate6 == date) {
            var inventory = deliveryDate6Inventory
        } else if (deliveryDate7 == date) {
            var inventory = deliveryDate7Inventory
        } else if (deliveryDate8 == date) {
            var inventory = deliveryDate8Inventory
        } else if (deliveryDate9 == date) {
            var inventory = deliveryDate9Inventory
        } else if (deliveryDate10 == date) {
            var inventory = deliveryDate10Inventory
        } else if (deliveryDate11 == date) {
            var inventory = deliveryDate11Inventory
        }

        if (inventory >= 0) {
            var dayAvailable = 'true'
            console.log(
                `Inventory: for ${$(this).find('.pc_name').text()}`,
                inventory
            )
        } else {
            var dayAvailable = 'false'
            console.log(
                `Inventory: for ${$(this).find('.pc_name').text()}`,
                inventory
            )
        }

        if (dayAvailable == 'true') {
            if (inventory > '0') {
                $(this).find('.products-item-add-to-cart').show()
                $(this)
                    .find('.products-item-add-to-cart a')
                    .attr('href', addToCartHref + '&quantity_max=' + inventory)
            } else {
                if (
                    window.location.pathname.match(/all-vendors/) ||
                    window.location.pathname.match(/find/) ||
                    window.location.pathname.match(/product/)
                ) {
                    $(this).find('.products-item-out-of-stock').show()
                } else {
                    $(this).hide()
                }
            }
        } else if (dayAvailable == 'false') {
            if (
                window.location.pathname.match(/all-vendors/) ||
                window.location.pathname.match(/find/) ||
                window.location.pathname.match(/product/)
            ) {
                console.log('day available false, NOT hiding product')
                $(this).find('.products-item-day-unavailable').show()
            } else {
                console.log('day available false, hiding product')
                $(this).hide()
            }
        }
    })

    $('.collection-item-24').each(function () {
        $(this).show()
        $(this).find('.products-item-add-to-cart').hide()
        $(this).find('.products-item-out-of-stock').hide()
        $(this).find('.products-item-day-unavailable').hide()

        var deliveryDate1 = $(this).find('.delivery-date-1').text()
        var deliveryDate2 = $(this).find('.delivery-date-2').text()
        var deliveryDate3 = $(this).find('.delivery-date-3').text()
        var deliveryDate4 = $(this).find('.delivery-date-4').text()
        var deliveryDate5 = $(this).find('.delivery-date-5').text()
        var deliveryDate6 = $(this).find('.delivery-date-6').text()
        var deliveryDate7 = $(this).find('.delivery-date-7').text()
        var deliveryDate8 = $(this).find('.delivery-date-8').text()
        var deliveryDate9 = $(this).find('.delivery-date-9').text()
        var deliveryDate10 = $(this).find('.delivery-date-10').text()
        var deliveryDate11 = $(this).find('.delivery-date-11').text()

        var deliveryDate1Inventory = $(this)
            .find('.delivery-date-1-inventory')
            .text()
        var deliveryDate2Inventory = $(this)
            .find('.delivery-date-2-inventory')
            .text()
        var deliveryDate3Inventory = $(this)
            .find('.delivery-date-3-inventory')
            .text()
        var deliveryDate4Inventory = $(this)
            .find('.delivery-date-4-inventory')
            .text()
        var deliveryDate5Inventory = $(this)
            .find('.delivery-date-5-inventory')
            .text()
        var deliveryDate6Inventory = $(this)
            .find('.delivery-date-6-inventory')
            .text()
        var deliveryDate7Inventory = $(this)
            .find('.delivery-date-7-inventory')
            .text()
        var deliveryDate8Inventory = $(this)
            .find('.delivery-date-8-inventory')
            .text()
        var deliveryDate9Inventory = $(this)
            .find('.delivery-date-9-inventory')
            .text()
        var deliveryDate10Inventory = $(this)
            .find('.delivery-date-10-inventory')
            .text()
        var deliveryDate11Inventory = $(this)
            .find('.delivery-date-11-inventory')
            .text()
        var addToCartHref = $(this)
            .find('.products-item-add-to-cart a')
            .attr('href')

        if (deliveryDate1 == date) {
            var inventory = deliveryDate1Inventory
        } else if (deliveryDate2 == date) {
            var inventory = deliveryDate2Inventory
        } else if (deliveryDate3 == date) {
            var inventory = deliveryDate3Inventory
        } else if (deliveryDate4 == date) {
            var inventory = deliveryDate4Inventory
        } else if (deliveryDate5 == date) {
            var inventory = deliveryDate5Inventory
        } else if (deliveryDate6 == date) {
            var inventory = deliveryDate6Inventory
        } else if (deliveryDate7 == date) {
            var inventory = deliveryDate7Inventory
        } else if (deliveryDate8 == date) {
            var inventory = deliveryDate8Inventory
        } else if (deliveryDate9 == date) {
            var inventory = deliveryDate9Inventory
        } else if (deliveryDate10 == date) {
            var inventory = deliveryDate10Inventory
        } else if (deliveryDate11 == date) {
            var inventory = deliveryDate11Inventory
        }

        if (inventory >= 0) {
            var dayAvailable = 'true'
        } else {
            var dayAvailable = 'false'
        }

        if (dayAvailable == 'true') {
            if (inventory > '0') {
                $(this).find('.products-item-add-to-cart').show()
                $(this)
                    .find('.products-item-add-to-cart a')
                    .attr('href', addToCartHref + '&quantity_max=' + inventory)
            } else {
                $(this).find('.products-item-out-of-stock').show()
            }
        } else if (dayAvailable == 'false') {
            if (
                window.location.pathname.match(/all-vendors/) ||
                window.location.pathname.match(/find/) ||
                window.location.pathname.match(/product/)
            ) {
                console.log('day available false, NOT hiding product')
                $(this).find('.products-item-day-unavailable').show()
            } else {
                console.log('day available false, hiding product')
                $(this).hide()
            }
        }
    
        
    
    })
}

function formatDate(date, format) {
    const weekday = date.toLocaleString('en-us', { weekday: 'long' })
    const shortMonth = date.toLocaleString('en-us', { month: 'short' })
    const longMonth = date.toLocaleString('en-us', { month: 'long' })
    const numericMonth = date.toLocaleString('en-us', { month: 'numeric' })
    const year = date.getFullYear()
    const monthdayshort = date.toLocaleString('en-us', { day: 'numeric' })
    const monthdaylong = date.toLocaleString('en-us', { day: '2-digit' })

    const long = `${weekday}, ${longMonth} ${monthdayshort}, ${year}`
    const inventoryDate = `${shortMonth} ${monthdaylong}, ${year}`
    const yymmdd = `${year}-${numericMonth}-${monthdaylong}`

    if (format == 'long') {
        return long
    } else if (format == 'weekday') {
        return weekday
    } else if (format == 'yymmdd') {
        return yymmdd
    } else {
        return inventoryDate
    }
}

function checkInventory(action) {
    console.log('checking inventory')
}

function displayDatePopUp() {
    var x = document.querySelector('#datePopUp')
    if (x.style.display === 'flex') {
        x.style.display = 'none'
    } else {
        x.style.display = 'flex'
    }
}

function displayClearCartModal() {
    var x = document.querySelector('.clear_cart_modal')
    if (x.style.display === 'flex') {
        x.style.display = 'none'
    } else {
        x.style.display = 'flex'
    }
}

function displayClearRegionModal() {
    var x = document.querySelector('.clear_region_modal')
    if (x.style.display === 'flex') {
        x.style.display = 'none'
    } else {
        x.style.display = 'flex'
    }
}

const removeItemsButton = document.querySelector('.switch-date-button')
removeItemsButton?.addEventListener('click', function () {
    console.log('Remove items button!')
    removeItemsNotAvailable()
})

const switchDateClose = document.querySelector('.switch-date-close')
switchDateClose?.addEventListener('click', function () {
    console.log('Closing button!')
    displayDatePopUp()
})

const clearCartButton = document.querySelector('#clear_cart_button')
clearCartButton.addEventListener('click', function () {
    removeItemsNotAvailable()
})

let continueShoppingOnClearCart = document.querySelectorAll('.next-button')[0]
continueShoppingOnClearCart.addEventListener('click', function () {
    revertSelectedDate()
})

let continueCheckoutButton
let handleCheckoutListener

if (window.location.pathname.match(/review-order/)) {
    handleCheckoutListener = (e) =>
        canShipOnDeliveryDayReview(e.currentTarget.id)

    continueCheckoutButton = document.querySelector('#continue_checkout')
    continueCheckoutButton.href = '#'
    continueCheckoutButton.addEventListener('click', handleCheckoutListener)
}

function revertSelectedDate() {
    previousDate = localStorage.getItem('previousDate')
    console.log('previousDate', previousDate)

    for (const button of deliveryDateButtons) {
        let dateText = button.firstChild.innerText
        let dateTextFormatted = new Date(dateText + ', 2022')
        let goodDate = formatDate(dateTextFormatted)
        console.log('goodDate:', goodDate)

        if (goodDate == previousDate) {
            // get Inventory date and weekday
            let iSODate = new Date(dateText + ', 2022')

            previousDate = localStorage.getItem('date')
            console.log('previousDate', previousDate)
            localStorage.setItem('previousDate', previousDate)

            let date = formatDate(iSODate, 'inventoryDate')
            let shortDate = iSODate.toLocaleString('en-us', {
                weekday: 'short',
                month: 'numeric',
                day: '2-digit',
            })
            let longDate = formatDate(iSODate, 'long')

            let day = formatDate(iSODate, 'weekday')
            console.log('updated date')
            console.log(date, shortDate, longDate, day)

            localStorage.setItem('date', date)
            localStorage.setItem('day', day)
            localStorage.setItem('shortDate', shortDate)
            localStorage.setItem('longDate', longDate)

            // Select active button when clicking
            $('.delivery-date-btn').removeClass('active')
            button.classList.add('active')

            // Update date
            dateChangeProject()

            chosenDate = date
            updateFCDate()
            cartAvailability('check')

            return
        }
    }
}

function canShipOnDeliveryDay() {
    const cartItems = FC.json.items
    const lowerCaseDay = day.toLowerCase()

    let unavailableItemsList = document.querySelector('#clear_cart_list')
    unavailableItemsList.innerHTML = ''

    for (var i = 0; i < FC.json.items.length; i++) {
        const current = cartItems[i]
        const deliveryDateIndex = current.options.findIndex(
            (object) => object.value === date
        )
        const deliveryDate = current.options[deliveryDateIndex]?.class
        const inventoryIndex = current.options.findIndex(
            (object) => object.class === `${deliveryDate}_inventory`
        )
        let currentInventory = current.options[inventoryIndex]?.value

        if (
            current.name !== 'Tip' &&
            current.name !== 'Small Order Fee' &&
            current.name !== 'Gift Box'
        ) {
            if (deliveryDateIndex == -1 || currentInventory <= 0) {
                let li = document.createElement('li')
                li.innerText = current.name
                unavailableItemsList.appendChild(li)
            }
        }
    }

    if (unavailableItemsList.innerHTML != '') {
        if (document.querySelector('.date_switch_modal')) {
            document.querySelector('.date_switch_modal').style.display = 'none'
        }
        document.querySelector('.clear_cart_modal').style.display = 'flex'
    }
}

// Call this function when clicking on continue to checkout
// Display an animation while the script is fetching the data
function canShipOnDeliveryDayReview(button_id) {
    console.log('checkout button id: ', button_id)
    const cartItems = FC.json.items
    const lowerCaseDay = day.toLowerCase()

    let unavailableItemsList = document.querySelector('#clear_cart_list_review')
    unavailableItemsList.innerHTML = ''

    checkInv('https://inventory-checker-one.vercel.app/api/inventory')
        .then((e) => {
            currentInv = e
            let iSODate = new Date(date)
            let selectedDate = formatDate(iSODate, 'yymmdd')
            console.log('selectedDate: ', selectedDate)

            for (var i = 0; i < currentInv.length; i++) {
                let deliveryDateKey = Object.keys(currentInv[i]).find(
                    (key) => currentInv[i][key] === selectedDate
                )
                let deliveryDateInvKey = deliveryDateKey + 'Inv'
                console.log('deliveryDateInvKey', deliveryDateInvKey)

                // MARK: If date is missing, need to mark it as unavailable as well (test with a Turkey item)

                if (
                    currentInv[i][deliveryDateInvKey] <= 0 ||
                    !deliveryDateKey
                ) {
                    console.log(
                        'currentInv is less than X for',
                        currentInv[i][deliveryDateKey]
                    )
                    let li = document.createElement('li')
                    li.innerText = currentInv[i].name
                    unavailableItemsList.appendChild(li)
                    console.log(
                        'items not avail on Airtable:',
                        currentInv[i].name
                    )
                }
            }

            if (unavailableItemsList.innerHTML != '') {
                if (document.querySelector('.date_switch_modal')) {
                    document.querySelector('.date_switch_modal').style.display =
                        'none'
                }
                document.querySelector(
                    '.clear_cart_modal_review'
                ).style.display = 'flex'

                continueShoppingOnClearCart = document.querySelector(
                    '#continue_to_clear_review'
                )
                continueShoppingOnClearCart.addEventListener(
                    'click',
                    function () {
                        removeItemsNotAvailableReviewOrder()
                    }
                )
            } else if (
                button_id == 'continue_checkout' ||
                button_id == 'continue_checkout_mobile'
            ) {
                console.log('proceeding to checkout')
                window.location.assign('https://secure.shoplocale.com/checkout')
            }
        })
        .catch((error) => {
            console.log('Error', error)
            gtag('event', 'review_order_error', {
                event_category: 'error',
                event_label: 'Review order Airtable script failed',
            })
            window.location.assign('https://secure.shoplocale.com/checkout')
        })
}

function checkInv(url) {
    const cartItems = FC.json.items

    // Out of Stock items array
    let recordsToQuery = []
    let currentInventory = {}

    for (var i = 0; i < FC.json.items.length; i++) {
        var current = cartItems[i]

        if (
            current.name !== 'Tip' &&
            current.name !== 'Small Order Fee' &&
            current.name !== 'Gift Box'
        ) {
            let obj = {
                name: current.name,
                quantity: current.quantity,
                code: current.code,
            }

            recordsToQuery.push(obj)
        }
    }

    var cartItemsJSON = JSON.stringify(recordsToQuery)

    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        credentials: 'same-origin',
        body: cartItemsJSON,
    }

    return fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            return result
            //currentInventory = result;
            //return result;
            // Need to make this work
            //const data = await response.json();
            //return data;
        })
        .catch((error) => console.log('error', error))
}

function removeItemsNotAvailable() {
    const cartItems = FC.json.items

    for (var i = 0; i < FC.json.items.length; i++) {
        const current = cartItems[i]

        const deliveryDateIndex = current.options.findIndex(
            (object) => object.value === date
        )
        const deliveryDate = current.options[deliveryDateIndex]?.class
        const inventoryIndex = current.options.findIndex(
            (object) => object.class === `${deliveryDate}_inventory`
        )
        let currentInventory = current.options[inventoryIndex]?.value

        if (
            current.name !== 'Tip' &&
            current.name !== 'Small Order Fee' &&
            current.name !== 'Gift Box'
        ) {
            if (currentInventory <= 0 || deliveryDateIndex == -1) {
                FC.client
                    .request(
                        'https://' +
                            FC.settings.storedomain +
                            '/cart?&cart=update&quantity=0&id=' +
                            current.id
                    )
                    .done(function (dataJSON) {
                        FC.cart.updateItemQuantity()
                        console.log('items deleted:', current.name)
                        if (window.location.pathname.match(/review-order/)) {
                            console.log('clearing items in review page')
                            addLoadingIcon(reviewItemContainer)
                            createCartItems()
                            //removeDuplicates()
                            updateProgressBar()
                        }
                    })
            }
        }
    }

    document.querySelector('.clear_cart_modal').style.display = 'none'
}

function removeItemsNotAvailableReviewOrder() {
    const cartItems = FC.json.items
    let iSODate = new Date(date)
    let selectedDate = formatDate(iSODate, 'yymmdd')
    console.log('selectedDate: ', selectedDate)

    for (var i = 0; i < currentInv.length; i++) {
        let deliveryDateKey = Object.keys(currentInv[i]).find(
            (key) => currentInv[i][key] === selectedDate
        )
        let deliveryDateInvKey = deliveryDateKey + 'Inv'
        console.log('deliveryDateInvKey', deliveryDateInvKey)

        if (currentInv[i][deliveryDateInvKey] <= 0 || !deliveryDateKey) {
            for (var j = 0; j < FC.json.items.length; j++) {
                const current = cartItems[j]

                if (current.code === currentInv[i].code) {
                    FC.client
                        .request(
                            'https://' +
                                FC.settings.storedomain +
                                '/cart?&cart=update&quantity=0&id=' +
                                current.id
                        )
                        .done(function (dataJSON) {
                            FC.cart.updateItemQuantity()
                            console.log('items deleted:', current.name)
                            if (
                                window.location.pathname.match(/review-order/)
                            ) {
                                console.log('clearing items in review page')
                                addLoadingIcon(reviewItemContainer)
                                createCartItems()
                                //removeDuplicates()
                                addSubtotal()
                                updateProgressBar()
                            }
                        })
                }
            }
        }
    }

    console.log('removed items')

    document.querySelector('.clear_cart_modal_review').style.display = 'none'
    addLoadingIcon(reviewItemContainer)
}

// Jetboost filters
if (
    !window.location.pathname.match(/all-vendors/) &&
    !window.location.pathname.match(/find/) &&
    !window.location.pathname.startsWith('/product') &&
    !window.location.pathname.startsWith('/vendor')
) {
    window.JetboostListUpdated = function (collectionList) {
        date = localStorage.getItem('date')
        $('.products-item-date-unavailable-value').text(date)
        // Loop through all collection items in the list that are currently on the page
        for (var collectionItem of collectionList.children) {
            inventory = ''

            $(collectionItem).show()
            $(collectionItem).find('.products-item-add-to-cart').hide()
            $(collectionItem).find('.products-item-out-of-stock').hide()
            $(collectionItem).find('.products-item-day-unavailable').hide()

            var deliveryDate1 = $(collectionItem)
                .find('.delivery-date-1')
                .text()
            var deliveryDate2 = $(collectionItem)
                .find('.delivery-date-2')
                .text()
            var deliveryDate3 = $(collectionItem)
                .find('.delivery-date-3')
                .text()
            var deliveryDate4 = $(collectionItem)
                .find('.delivery-date-4')
                .text()
            var deliveryDate5 = $(collectionItem)
                .find('.delivery-date-5')
                .text()
            var deliveryDate6 = $(collectionItem)
                .find('.delivery-date-6')
                .text()
            var deliveryDate7 = $(collectionItem)
                .find('.delivery-date-7')
                .text()
            var deliveryDate8 = $(collectionItem)
                .find('.delivery-date-8')
                .text()
            var deliveryDate9 = $(collectionItem)
                .find('.delivery-date-9')
                .text()
            var deliveryDate10 = $(collectionItem)
                .find('.delivery-date-10')
                .text()
            var deliveryDate11 = $(collectionItem)
                .find('.delivery-date-11')
                .text()

            var deliveryDate1Inventory = $(collectionItem)
                .find('.delivery-date-1-inventory')
                .text()
            var deliveryDate2Inventory = $(collectionItem)
                .find('.delivery-date-2-inventory')
                .text()
            var deliveryDate3Inventory = $(collectionItem)
                .find('.delivery-date-3-inventory')
                .text()
            var deliveryDate4Inventory = $(collectionItem)
                .find('.delivery-date-4-inventory')
                .text()
            var deliveryDate5Inventory = $(collectionItem)
                .find('.delivery-date-5-inventory')
                .text()
            var deliveryDate6Inventory = $(collectionItem)
                .find('.delivery-date-6-inventory')
                .text()
            var deliveryDate7Inventory = $(collectionItem)
                .find('.delivery-date-7-inventory')
                .text()
            var deliveryDate8Inventory = $(collectionItem)
                .find('.delivery-date-8-inventory')
                .text()
            var deliveryDate9Inventory = $(collectionItem)
                .find('.delivery-date-9-inventory')
                .text()
            var deliveryDate10Inventory = $(collectionItem)
                .find('.delivery-date-10-inventory')
                .text()
            var deliveryDate11Inventory = $(collectionItem)
                .find('.delivery-date-11-inventory')
                .text()
            var addToCartHref = $(collectionItem)
                .find('.products-item-add-to-cart a')
                .attr('href')

            if (deliveryDate1 == date) {
                var inventory = deliveryDate1Inventory
            } else if (deliveryDate2 == date) {
                var inventory = deliveryDate2Inventory
            } else if (deliveryDate3 == date) {
                var inventory = deliveryDate3Inventory
            } else if (deliveryDate4 == date) {
                var inventory = deliveryDate4Inventory
            } else if (deliveryDate5 == date) {
                var inventory = deliveryDate5Inventory
            } else if (deliveryDate6 == date) {
                var inventory = deliveryDate6Inventory
            } else if (deliveryDate7 == date) {
                var inventory = deliveryDate7Inventory
            } else if (deliveryDate8 == date) {
                var inventory = deliveryDate8Inventory
            } else if (deliveryDate9 == date) {
                var inventory = deliveryDate9Inventory
            } else if (deliveryDate10 == date) {
                var inventory = deliveryDate10Inventory
            } else if (deliveryDate11 == date) {
                var inventory = deliveryDate11Inventory
            }

            if (inventory == '') {
                var dayAvailable = 'false'
            } else {
                var dayAvailable = 'true'
            }

            if (dayAvailable == 'true') {
                if (inventory > '0') {
                    $(collectionItem).find('.products-item-add-to-cart').show()
                    $(collectionItem)
                        .find('.products-item-add-to-cart a')
                        .attr(
                            'href',
                            addToCartHref + '&quantity_max=' + inventory
                        )
                } else {
                    //$(collectionItem).find('.products-item-out-of-stock').show()
                    console.log('Item sold out')
                    $(collectionItem).hide()
                }
            } else if (dayAvailable == 'false') {
                $(collectionItem).hide()
            }
        }
    }
}

function disableCheckoutButton() {
    let checkoutHeaderBtn = document.querySelector('#checkout_header_link')
    let checkoutBtn = document.querySelector('#continue_checkout')
    let checkoutBtnMob = document.querySelector('#continue_checkout_mobile')

    if (FC.json.total_item_price < 80) {
        checkoutHeaderBtn.href = '#'
        checkoutBtn.classList.add('inactive')
        checkoutBtn.href = '#'
        checkoutBtnMob.classList.add('inactive')
        checkoutBtnMob.href = '#'
        continueCheckoutButton.removeEventListener(
            'click',
            handleCheckoutListener
        )
    } else {
        // Add Event listener calling canShipOnDeliveryDay('checkout')
        continueCheckoutButton.addEventListener('click', handleCheckoutListener)
        continueCheckoutButton.classList.remove('inactive')

        // checkoutHeaderBtn.href = "https://secure.shoplocale.com/checkout";
        // checkoutBtn.classList.remove("inactive");
        // checkoutBtn.href = "https://secure.shoplocale.com/checkout";
        // checkoutBtnMob.classList.remove("inactive");
        // checkoutBtnMob.href = "https://secure.shoplocale.com/checkout";
    }
}

function checkDeliveryType() {
    const cartItems = FC.json.items
    let dropshipItems = []
    let dropshipVendors = []

    for (var i = 0; i < FC.json.items.length; i++) {
        const current = cartItems[i]

        const deliveryDateIndex = current.options.findIndex(
            (object) => object.value === date
        )
        const deliveryDate = current.options[deliveryDateIndex]?.class
        const inventoryIndex = current.options.findIndex(
            (object) => object.class === `${deliveryDate}_inventory`
        )
        let currentInventory = current.options[inventoryIndex]?.value

        if (
            current.name !== 'Tip' &&
            current.name !== 'Small Order Fee' &&
            current.name !== 'Gift Box'
        ) {
            if (currentInventory == 999) {
                dropshipItems.push(current.name)
                dropshipVendors.push(current.options[0].value)
            }
        }
    }

    let dropshipItemsString = dropshipItems.join(', ');
    let dropshipVendorsString = dropshipVendors.join(', ');
    
    if (dropshipItems.length == 1) {
        document.querySelector('.shipping-disclaimer').style.display = 'flex'
        document.querySelector('.disclaimer-text').innerHTML =  `<strong>${dropshipItemsString}</strong> ships directly from <strong>${dropshipVendorsString}</strong> since it’s very perishable! You can expect this product to arrive in a separate box and you’ll receive communication updates directly from the vendor.`
    } else if (dropshipItems.length >= 2) {
        document.querySelector('.shipping-disclaimer').style.display = 'flex'
        document.querySelector('.disclaimer-text').innerHTML =  `<strong>${dropshipItemsString}</strong> ship directly from <strong>${dropshipVendorsString}</strong> since they are very perishable! You can expect these products to arrive in separate boxes and you’ll receive communication updates directly from the vendors.`
    } else if (document.querySelector('.shipping-disclaimer')) {
        document.querySelector('.shipping-disclaimer').style.display = 'none'
    }
}

function setDeadline(deadlineDate) {
    
    var deadline = deadlineDate // format - '2022/12/21 23:59';

    function pad(num, size) {
        var s = "0" + num;
        return s.substr(s.length - size);
    }

    // fixes "Date.parse(date)" on safari
    function parseDate(date) {
        const parsed = Date.parse(date);
        if (!isNaN(parsed)) return parsed
        return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '));
    }

    function getTimeRemaining(endtime) {
        let total = parseDate(endtime) - Date.parse(new Date())
        let seconds = Math.floor((total / 1000) % 60)
        let minutes = Math.floor((total / 1000 / 60) % 60)
        let hours = Math.floor((total / (1000 * 60 * 60)) % 24)
        let days = Math.floor(total / (1000 * 60 * 60 * 24))

        return { total, days, hours, minutes, seconds };
    }

    function clock(id, endtime) {
        let days = document.getElementById(id + '-days')
        let hours = document.getElementById(id + '-hours')
        let minutes = document.getElementById(id + '-minutes')
        let seconds = document.getElementById(id + '-seconds')

        var timeinterval = setInterval(function () {
            var time = getTimeRemaining(endtime);

            if (time.total <= 0) {
                clearInterval(timeinterval);
            } else {
                days.innerHTML = pad(time.days, 2);
                hours.innerHTML = pad(time.hours, 2);
                minutes.innerHTML = pad(time.minutes, 2);
                seconds.innerHTML = pad(time.seconds, 2);
            }
        }, 1000);
    }

    clock('js-clock', deadline);
}
