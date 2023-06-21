// Checking Inventory
const datePickerButtonArray = document.querySelectorAll(
    '.delivery-date-picker-link'
)
console.log('datePickerButtonArray:', datePickerButtonArray)

let chosenDate = ''
let hiddenDatesContainer = ''
let recordsToQuery = []

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
        let dateText = button.querySelector('.date-numbers').innerText

        // // get Inventory date and weekday
        let iSODate = ''
        if (dateText.startsWith('Dec')) {
            iSODate = new Date(dateText + ', 2022')
        } else {
            iSODate = new Date(dateText + ', 2023')
        }

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

function cartAvailability(action) {
    console.log('starting cartAvailability for action: ', action)
}

function checkDateProject() {
    let storedDate = localStorage.getItem('date')
    let dates = []

    if (
        window.location.pathname.startsWith('/product/ba') ||
        window.location.pathname.startsWith('/vendor/ba')
    ) {
        hiddenDatesContainer = document.querySelector('#hidden-dates-ba')
        let hiddenDatesList =
            hiddenDatesContainer.querySelectorAll('.hidden-date')

        for (const hiddenDate of hiddenDatesList) {
            var innerText = hiddenDate.innerText
            if (innerText) {
                let dateTextFormatted = new Date(innerText)
                let goodDate = formatDate(dateTextFormatted)

                dates.push(goodDate)
            }
        }
    } else if (
        window.location.pathname.startsWith('/product/la') ||
        window.location.pathname.startsWith('/vendor/la')
    ) {
        hiddenDatesContainer = document.querySelector('#hidden-dates-la')
        let hiddenDatesList =
            hiddenDatesContainer.querySelectorAll('.hidden-date')

        for (const hiddenDate of hiddenDatesList) {
            var innerText = hiddenDate.innerText
            if (innerText) {
                let dateTextFormatted = new Date(innerText)
                let goodDate = formatDate(dateTextFormatted)

                dates.push(goodDate)
            }
        }
    } else if (
        window.location.pathname.startsWith('/product/na') ||
        window.location.pathname.startsWith('/vendor/na')
    ) {
        hiddenDatesContainer = document.querySelector('#hidden-dates-na')
        let hiddenDatesList =
            hiddenDatesContainer.querySelectorAll('.hidden-date')

        for (const hiddenDate of hiddenDatesList) {
            var innerText = hiddenDate.innerText
            if (innerText) {
                let dateTextFormatted = new Date(innerText)
                let goodDate = formatDate(dateTextFormatted)

                dates.push(goodDate)
            }
        }
    } else if (window.location.pathname.startsWith('/review')) {
        $('.delivery-date-btn .date-numbers').each(function () {
            if ($(this).text()) {
                var innerText = $(this).text()
                let dateTextFormatted = new Date(innerText + ', 2023')
                let goodDate = formatDate(dateTextFormatted)

                dates.push(goodDate)
            }
        })
    } else {
        $('.hidden-date').each(function () {
            var innerText = $(this).text()

            if (innerText) {
                let dateTextFormatted = new Date(innerText)
                let goodDate = formatDate(dateTextFormatted)
                console.log(goodDate)
                dates.push(goodDate)
            }
        })
    }

    if (dates.includes(storedDate) == true) {
        checkRegionProject()
    } else {
        storedRegion = ''
        localStorage.setItem('region', storedRegion)
        checkRegionProject()
    }
}

function checkRegionProject() {
    var storedDate = localStorage.getItem('date')
    var storedRegion = localStorage.getItem('region')
    var currentRegion = ''
    let dates = []

    if (
        window.location.pathname.startsWith('/product/ba') ||
        window.location.pathname.startsWith('/vendor/ba')
    ) {
        currentRegion =
            hiddenDatesContainer.querySelector('.hidden-locale').innerText
    } else if (
        window.location.pathname.startsWith('/product/la') ||
        window.location.pathname.startsWith('/vendor/la')
    ) {
        currentRegion =
            hiddenDatesContainer.querySelector('.hidden-locale').innerText
    } else if (
        window.location.pathname.startsWith('/product/na') ||
        window.location.pathname.startsWith('/vendor/na')
    ) {
        currentRegion =
            hiddenDatesContainer.querySelector('.hidden-locale').innerText
    } else if (window.location.pathname.startsWith('/review')) {
        currentRegion = 'Bay Area Meals'
    } else {
        currentRegion = document.querySelector('.hidden-locale').innerText
        console.log('current region:', currentRegion)
    }
    if (window.location.pathname.startsWith('/review')) {
        if (storedRegion != currentRegion) {
            let iSODate = new Date(baDeliveryDate)
            let shortDate = iSODate.toLocaleString('en-us', {
                weekday: 'short',
                month: 'numeric',
                day: '2-digit',
            })
            let longDate = formatDate(iSODate, 'long')
            let date = formatDate(iSODate, 'inventoryDate')
            let day = iSODate.toLocaleString('en-us', { weekday: 'long' })

            let gaDateFormatted = formatDate(iSODate, 'yymmdd')

            gtag('event', 'date_reset', {
                event_category: 'new_date',
                event_label: gaDateFormatted,
                value: 1,
            })

            localStorage.setItem('date', date)
            localStorage.setItem('shortDate', shortDate)
            localStorage.setItem('longDate', longDate)
            localStorage.setItem('day', day)
            localStorage.setItem('region', currentRegion)
            console.log('date_reset completed')
            console.log('date: ', date)

            // Update date button value
            let currentDateDiv = document.querySelectorAll('.current_date')

            for (const dateDiv of currentDateDiv) {
                dateDiv.innerText = shortDate
                console.log('dateDiv:', dateDiv)
            }

            // Mark first date as active
            $('.delivery-date-btn').first().addClass('active')
        } else if (storedRegion == currentRegion) {
            date = localStorage.getItem('date')
            shortDate = localStorage.getItem('shortDate')
            longDate = localStorage.getItem('longDate')
            day = localStorage.getItem('day')

            console.log('date: ', date, 'day:', day)

            $('.products-item-day-unavailable-value').text(day)
            $('.products-item-date-unavailable-value').text(date)

            // Update date button value
            let currentDateDiv = document.querySelectorAll('.current_date')

            for (const dateDiv of currentDateDiv) {
                dateDiv.innerText = shortDate
                console.log('dateDiv:', dateDiv)
            }

            // Mark selected date as active
            const deliveryDateButtons =
                document.querySelectorAll('.delivery-date-btn')
            for (const button of deliveryDateButtons) {
                let dateText = button.firstChild.innerText
                let dateTextFormatted = new Date(dateText + ', 2023')
                let goodDate = formatDate(dateTextFormatted)
                console.log('goodDate:', goodDate)

                // Select active button of stored date
                if (goodDate == localStorage.getItem('date')) {
                    $('.delivery-date-btn').removeClass('active')
                    button.classList.add('active')
                }
            }
        }
    } else {
        if (storedRegion != currentRegion) {
            let iSODate = ''
            if (
                window.location.pathname.startsWith('/product/ba') ||
                window.location.pathname.startsWith('/vendor/ba')
            ) {
                let hiddenDatesList =
                    hiddenDatesContainer.querySelectorAll('.hidden-date')

                for (const hiddenDate of hiddenDatesList) {
                    var innerText = hiddenDate.innerText
                    if (innerText) {
                        let dateTextFormatted = new Date(innerText)
                        let goodDate = formatDate(dateTextFormatted)

                        dates.push(goodDate)
                    }
                }

                // MARK: Make this pick first Saturday dynamicly
                iSODate = new Date(baDeliveryDate)
                console.warn('testing new date', baDeliveryDate)
            } else if (
                window.location.pathname.startsWith('/product/') ||
                window.location.pathname.startsWith('/vendor/')
            ) {
                let hiddenDatesList =
                    hiddenDatesContainer.querySelectorAll('.hidden-date')

                for (const hiddenDate of hiddenDatesList) {
                    var innerText = hiddenDate.innerText
                    if (innerText) {
                        let dateTextFormatted = new Date(innerText)
                        let goodDate = formatDate(dateTextFormatted)

                        dates.push(goodDate)
                    }
                }

                iSODate = new Date(dates[0])
            } else {
                let hiddenDatesList = document.querySelectorAll('.hidden-date')

                for (const hiddenDate of hiddenDatesList) {
                    var innerText = hiddenDate.innerText
                    if (innerText) {
                        let dateTextFormatted = new Date(innerText)
                        let goodDate = formatDate(dateTextFormatted)

                        dates.push(goodDate)
                    }
                }

                iSODate = new Date(dates[0])
            }

            let shortDate = iSODate.toLocaleString('en-us', {
                weekday: 'short',
                month: 'numeric',
                day: '2-digit',
            })
            let longDate = formatDate(iSODate, 'long')
            let date = formatDate(iSODate, 'inventoryDate')
            let day = iSODate.toLocaleString('en-us', { weekday: 'long' })

            console.log('date: ', date, 'day:', day)

            localStorage.setItem('date', date)
            localStorage.setItem('shortDate', shortDate)
            localStorage.setItem('longDate', longDate)
            localStorage.setItem('day', day)
            localStorage.setItem('region', currentRegion)

            if (
                window.location.pathname.startsWith('/product/') ||
                window.location.pathname.startsWith('/vendor/')
            ) {
                // Update date button value
                let currentDateDiv = document.querySelectorAll('.current_date')

                for (const dateDiv of currentDateDiv) {
                    dateDiv.innerText = shortDate
                    console.log('dateDiv:', dateDiv)
                }

                // Mark first date as active
                //$(".delivery-date-btn").first().addClass("active");
                // Mark selected date as active
                const deliveryDateButtons =
                    document.querySelectorAll('.delivery-date-btn')
                for (const button of deliveryDateButtons) {
                    let dateText = button.firstChild.innerText
                    let dateTextFormatted = ''
                    if (dateText.startsWith('Dec')) {
                        dateTextFormatted = new Date(dateText + ', 2022')
                    } else {
                        dateTextFormatted = new Date(dateText + ', 2023')
                    }
                    let goodDate = formatDate(dateTextFormatted)

                    // Select active button of stored date
                    if (goodDate == localStorage.getItem('date')) {
                        $('.delivery-date-btn').removeClass('active')
                        button.classList.add('active')
                    }
                }
            } else {
                // Update date button value
                let currentDateDiv = document.querySelectorAll('.current_date')

                for (const dateDiv of currentDateDiv) {
                    dateDiv.innerText = shortDate
                    console.log('dateDiv:', dateDiv)
                }

                // Mark first date as active
                $('.delivery-date-btn').first().addClass('active')
            }
        } else if (storedRegion == currentRegion) {
            date = localStorage.getItem('date')
            shortDate = localStorage.getItem('shortDate')
            longDate = localStorage.getItem('longDate')
            day = localStorage.getItem('day')

            console.log('date: ', date, 'day:', day)

            $('.products-item-day-unavailable-value').text(day)
            $('.products-item-date-unavailable-value').text(date)

            if (
                window.location.pathname.startsWith('/product/') ||
                window.location.pathname.startsWith('/vendor/')
            ) {
                // Update date button value
                let currentDateDiv = document.querySelectorAll('.current_date')

                for (const dateDiv of currentDateDiv) {
                    dateDiv.innerText = shortDate
                    console.log('dateDiv:', dateDiv)
                }
            } else {
                // Update date button value
                let currentDateDiv = document.querySelectorAll('.current_date')

                for (const dateDiv of currentDateDiv) {
                    dateDiv.innerText = shortDate
                    console.log('dateDiv:', dateDiv)
                }
            }

            // Mark selected date as active
            const deliveryDateButtons =
                document.querySelectorAll('.delivery-date-btn')
            for (const button of deliveryDateButtons) {
                let dateText = button.firstChild.innerText
                let dateTextFormatted = new Date(dateText + ', 2023')
                let goodDate = formatDate(dateTextFormatted)

                // Select active button of stored date
                if (goodDate == localStorage.getItem('date')) {
                    $('.delivery-date-btn').removeClass('active')
                    button.classList.add('active')
                }
            }
        }
    }
}

function dateChangeProject() {
    date = localStorage.getItem('date')
    shortDate = localStorage.getItem('shortDate')
    longDate = localStorage.getItem('longDate')
    day = localStorage.getItem('day')

    $('.products-item-day-unavailable-value').text(day)
    $('.products-item-date-unavailable-value').text(date)

    // Update date button value
    let currentDateDiv = document.querySelectorAll('.current_date')

    if (
        window.location.pathname.startsWith('/product/') ||
        window.location.pathname.startsWith('/vendor/')
    ) {
        for (const dateDiv of currentDateDiv) {
            dateDiv.innerText = shortDate
            console.log('dateDiv:', dateDiv)
        }
    } else {
        if (currentDateDiv) {
            for (const dateDiv of currentDateDiv) {
                dateDiv.innerText = shortDate
                console.log('dateDiv:', dateDiv)
            }
        } else {
            console.log('it doesnt exist!')
        }
    }

    // Check items not delivered on new date
    if (window.location.pathname.startsWith('/review')) {
        console.log('INFO: Starting FC check')
        var FC = FC || {}

        FC.onLoad = function () {
            FC.client.on('ready.done', () => {
                console.log('INFO: Triggering Delivery Day check')
                canShipOnDeliveryDay()
            })
        }
    } else if (fcLoaded == true) {
        canShipOnDeliveryDay()
    }

    let dateChangeClasses = '.products-item'

    if (
        window.location.pathname.match(/new-limited/) ||
        window.location.pathname.match(/all-vendors/)
    ) {
        dateChangeClasses = '.products-item, .collection-item-24'
    }

    $(dateChangeClasses).each(function () {
        $(this).show()
        if (
            window.location.pathname.startsWith('/product/') ||
            window.location.pathname.startsWith('/vendor/')
        ) {
            $(this).find('.products-item-add-to-cart').show()
        } else {
            $(this).find('.products-item-add-to-cart').hide()
        }
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

        // MARK: Refactor or delete?
        //var deadlineDate = $(this).find('.product-code').text()
        //console.log('product code:', deadlineDate)

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

        if (inventory == '') {
            var dayAvailable = 'false'
        } else if (inventory >= 0) {
            var dayAvailable = 'true'
        } else {
            var dayAvailable = 'false'
        }

        if (
            window.location.pathname.startsWith('/product/') ||
            window.location.pathname.startsWith('/vendor/')
        ) {
            if (!$(this).hasClass('products-detail')) {
                if (dayAvailable == 'true') {
                    if (inventory > '0') {
                        $(this).show()
                        $(this)
                            .find('.products-item-add-to-cart a')
                            .attr(
                                'href',
                                addToCartHref + '&quantity_max=' + inventory
                            )
                    } else {
                        // Hide sold out products
                        $(this).hide()
                    }
                } else if (dayAvailable == 'false') {
                    $(this).find('.products-item-day-unavailable').show()
                }
            } else {
                $(this).find('.products-item-add-to-cart').hide()
                if (dayAvailable == 'true') {
                    if (inventory > '0') {
                        $(this).find('.products-item-add-to-cart').show()
                        $('input[name="quantity"]').attr('max', inventory)
                        $('input[name="quantity_max"]').val(inventory)
                    } else {
                        // Hide sold out products
                        $(this).hide()
                    }
                } else if (dayAvailable == 'false') {
                    $(this).find('.products-item-day-unavailable').show()
                }
            }
        } else if (window.location.pathname.startsWith('/review')) {
            if (dayAvailable == 'true') {
                if (inventory > '0') {
                    $(this).css('display', 'flex')
                    $(this).removeClass('hide')
                } else {
                    $(this).hide()
                    $(this).addClass('hide')
                }
            } else if (dayAvailable == 'false') {
                $(this).hide()
                $(this).addClass('hide')
            }
        } else {
            if (dayAvailable == 'true') {
                if (inventory > '0') {
                    $(this).find('.products-item-add-to-cart').show()
                    $(this)
                        .find('.products-item-add-to-cart a')
                        .attr(
                            'href',
                            addToCartHref + '&quantity_max=' + inventory
                        )
                } else {
                    // Hide sold out products
                    $(this).hide()
                }
            } else if (dayAvailable == 'false') {
                if (
                    window.location.pathname.match(/all-vendors/) ||
                    window.location.pathname.match(/find/) ||
                    window.location.pathname.match(/product/)
                ) {
                    $(this).find('.products-item-day-unavailable').show()
                } else {
                    $(this).hide()
                }
            }
        }
    })
}

function formatDate(date, format) {
    const weekday = date.toLocaleString('en-us', { weekday: 'long' })
    const shortMonth = date.toLocaleString('en-us', { month: 'short' })
    const longMonth = date.toLocaleString('en-us', { month: 'long' })
    const numericMonth = date.toLocaleString('en-us', { month: '2-digit' })
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
if (window.location.pathname == '/') {
} else {
    clearCartButton.addEventListener('click', function () {
        removeItemsNotAvailable()
    })
}

// MARK: Fix for meals page
if (window.location.pathname.startsWith('/review')) {
    let continueShoppingOnClearCart =
        document.querySelectorAll('.next-button-4')[0]
    continueShoppingOnClearCart.addEventListener('click', function () {
        revertSelectedDate()
    })
}

let submitGroupOrderButton

if (window.location.pathname.startsWith('/review-group')) {
    submitGroupOrderButton = document.querySelector(
        'input.close-button.padding.w-button'
    )

    submitGroupOrderButton.addEventListener('click', handleGroupSubmit)
}

function handleGroupSubmit(event) {
    // prevent default
    event.preventDefault()
    console.log('submitting group order')

    submitGroupOrder()
}

let continueCheckoutButton
let continueCheckoutButtonMobile
let handleCheckoutListener

if (window.location.pathname.startsWith('/review')) {
    handleCheckoutListener = (e) =>
        canShipOnDeliveryDayReview(e.currentTarget.id)

    continueCheckoutButton = document.querySelector('#continue_checkout')
    continueCheckoutButton.href = '#'
    continueCheckoutButton.addEventListener('click', handleCheckoutListener)
    continueCheckoutButtonMobile = document.querySelector(
        '#continue_checkout_mobile'
    )
    continueCheckoutButtonMobile.href = '#'
    continueCheckoutButtonMobile.addEventListener(
        'click',
        handleCheckoutListener
    )
}

function revertSelectedDate() {
    previousDate = localStorage.getItem('previousDate')

    for (const button of deliveryDateButtons) {
        let dateText = button.firstChild.innerText
        let dateTextFormatted = ''
        if (dateText.startsWith('Dec')) {
            dateTextFormatted = new Date(dateText + ', 2022')
        } else {
            dateTextFormatted = new Date(dateText + ', 2023')
        }
        let goodDate = formatDate(dateTextFormatted)

        if (goodDate == previousDate) {
            // get Inventory date and weekday
            let iSODate = ''
            if (dateText.startsWith('Dec')) {
                iSODate = new Date(dateText + ', 2022')
            } else {
                iSODate = new Date(dateText + ', 2023')
            }

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
    console.log('INFO: Starting Delivery Day Check')
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

function canShipOnDeliveryDayReview(button_id) {
    console.log('checkout button id: ', button_id)
}

function submitGroupOrder() {
    setTimeout(() => {
        continueCheckoutButton.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Loading Checkout...`
        continueCheckoutButtonMobile.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Loading Checkout...`
    }, '200')

    const cartItems = FC.json.items
    let employeeEmail = document.querySelector('[data-name="Email"]').value
    let employeeName = document.querySelector('[data-name="Name"]').value

    postOrder('https://inventory-checker-one.vercel.app/api/groupOrder')
        .then((e) => {
            result = e
            console.log('result response: ', result)

            // Log transaction in Google Analytics
            // gtag('event', 'sold_out_items_msg', {
            //     event_category: 'items_unavailable',
            //     event_label: unavailableItemsList.childNodes.length,
            //     value: 1,
            // })

            // Display success message
            let form = document.querySelector('#email-form')
            form.style.display = 'none'
            let success = document.querySelector(
                '.success-message-2.w-form-done'
            )
            success.style.display = 'flex'

            // Clear cart
            FC.session.reset()
            setTimeout(() => {
                createCartItems()
            }, '500')
        })
        .catch((error) => {
            console.log('Error', error)
            // gtag('event', 'group_review_order_error', {
            //     event_category: 'error',
            //     event_label: 'Group review order Airtable script failed',
            // })

            // Ask user to try again
        })
}

function postOrder(url) {
    const cartItems = FC.json.items
    let employeeEmail = document.querySelector('[data-name="Email"]').value
    let employeeName = document.querySelector('[data-name="Name"]').value

    // Out of Stock items array
    recordsToQuery = []

    for (var i = 0; i < FC.json.items.length; i++) {
        var current = cartItems[i]

        if (
            current.name !== 'Tip' &&
            current.name !== 'Small Order Fee' &&
            current.name !== 'Gift Box'
        ) {
            let obj = {
                // Pass all the details of the item
                name: current.name,
                employeeName: employeeName,
                quantity: current.quantity,
                code: current.code,
                transaction: FC.json.transaction_id,
                email: employeeEmail,
            }
            recordsToQuery.push(obj)
        }
    }

    console.log('recordsToQuery', recordsToQuery)

    var cartItemsJSON = JSON.stringify(recordsToQuery)
    console.log('cartItemsJSON', cartItemsJSON)

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
            return result
        })
        .catch((error) => console.log('error', error))
}

function checkInv(url) {
    const cartItems = FC.json.items

    // Out of Stock items array
    recordsToQuery = []
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

    console.log('recordsToQuery', recordsToQuery)

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
            return result
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
                        if (window.location.pathname.startsWith('/review')) {
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
    let itemsDeleted = 0
    const cartItems = FC.json.items
    let iSODate = new Date(date)
    let selectedDate = formatDate(iSODate, 'yymmdd') + 'T00:00:00.000Z'
    let gaDateFormatted = formatDate(iSODate, 'yymmdd')

    for (var i = 0; i < currentInv.length; i++) {
        let deliveryDateKey = Object.keys(currentInv[i]).find(
            (key) => currentInv[i][key] === selectedDate
        )
        let deliveryDateInvKey = deliveryDateKey + '_inventory'

        for (var j = 0; j < FC.json.items.length; j++) {
            // MARK: Log number of items after removing sold out products

            const current = cartItems[j]

            if (
                current.name !== 'Tip' &&
                current.name !== 'Small Order Fee' &&
                current.name !== 'Gift Box'
            ) {
                let recordsToQueryKey = recordsToQuery.findIndex(
                    (object) => object.code === current.code
                )

                let minimumInventory =
                    recordsToQuery[recordsToQueryKey].quantity - 1

                if (
                    currentInv[i][deliveryDateInvKey] <= minimumInventory ||
                    !deliveryDateKey
                ) {
                    if (current.code === currentInv[i].id) {
                        itemsDeleted += 1
                        FC.client
                            .request(
                                'https://' +
                                    FC.settings.storedomain +
                                    '/cart?&cart=update&quantity=0&id=' +
                                    current.id
                            )
                            .done(function (dataJSON) {
                                FC.cart.updateItemQuantity()
                                if (
                                    window.location.pathname.startsWith(
                                        '/review'
                                    )
                                ) {
                                    addLoadingIcon(reviewItemContainer)
                                    createCartItems()
                                    //removeDuplicates()
                                    addSubtotal()
                                    updateProgressBar()
                                    disableCheckoutButton()
                                    console.log('updated progress bar')
                                }
                            })
                    }
                }
            }

            if (i == currentInv.length - 1 && j == FC.json.items.length - 1) {
                checkDateProject()
                let itemsRemaining = currentInv.length - itemsDeleted
                console.log('LAST ITEM')
                // console.log('items deleted:', itemsDeleted)
                // console.log('items remaining:', itemsRemaining)
                gtag('event', 'removed_sold_out_items_event', {
                    event_category: 'items_remaining_in_cart',
                    event_label: `${itemsRemaining}`,
                    value: 1,
                })
                setTimeout(() => {
                    createCartItems()
                }, '500')
            }
        }
    }

    console.log('INFO: removed items')

    document.querySelector('.clear_cart_modal_review').style.display = 'none'
    addLoadingIcon(reviewItemContainer)
}

// Jetboost filters
if (
    !window.location.pathname.match(/all-vendors/) &&
    !window.location.pathname.startsWith('/product') &&
    !window.location.pathname.startsWith('/vendor') &&
    !window.location.pathname.startsWith('/group-order')
) {
    console.log('starting Jetboost script;')
    window.JetboostListUpdated = function (collectionList) {
        date = localStorage.getItem('date')
        $('.products-item-date-unavailable-value').text(date)

        // Loop through all collection items in the list that are currently on the page
        for (var collectionItem of collectionList.children) {
            if (collectionItem.querySelector('.product-deadline')) {
                let productDeadlines = new Date(
                    collectionItem.querySelector('.product-deadline').innerText
                )
            }

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
                    // Hide items that are sold out
                    console.log('Item sold out - hiding it')
                    $(collectionItem).hide()
                }
            } else if (dayAvailable == 'false') {
                $(collectionItem).hide()
            }
        }
    }
}

function disableCheckoutButton() {
    let checkoutBtn = document.querySelector('#continue_checkout')
    let checkoutBtnMob = document.querySelector('#continue_checkout_mobile')
    const cartItems = FC.json.items
    let itemsInCart = 0

    for (var i = 0; i < FC.json.items.length; i++) {
        const current = cartItems[i]

        if (
            current.name !== 'Tip' &&
            current.name !== 'Small Order Fee' &&
            current.name !== 'Gift Box'
        ) {
            itemsInCart += current.quantity
            console.log('itemsInCart: ', itemsInCart)
        }
    }

    if (itemsInCart <= 2) {
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
        console.log('3 or more items in cart')
        continueCheckoutButton.addEventListener('click', handleCheckoutListener)
        continueCheckoutButton.classList.remove('inactive')

        checkoutBtn.classList.remove('inactive')
        checkoutBtn.href = 'https://secure.localemeals.com/checkout'
        checkoutBtnMob.classList.remove('inactive')
        checkoutBtnMob.href = 'https://secure.localemeals.com/checkout'
    }
}
