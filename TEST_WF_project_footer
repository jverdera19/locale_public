// Checking Inventory
console.log('starting remote script');
const datePickerButtonArray = document.querySelectorAll('.delivery-date-picker-link');
console.log('datePickerButtonArray:', datePickerButtonArray);

let chosenDate = '';
const unavailableItemsList = document.querySelector('#unavailableItems');

// Good code
$(".delivery-date-picker-link").click(function () {
    var date = $(this).attr("data-date");
    console.log(date);
    console.log(`${date} got clicked (Smart)!`);

    $(".delivery-date-picker-link").removeClass("active")
    this.classList.add('active');

    chosenDate = date;
    updateFCDate();
    action = 'check';
    //checkInventory(action);
});

// Refactoring date buttons event listener
$('.delivery-date-button').click(function () {
    // get Inventory date and weekday
    let iSODate = new Date(this.innerText);
    let date = formatDate(iSODate, 'inventoryDate');
    let shortDate = iSODate.toLocaleString('en-us', { weekday: 'short', month: 'numeric', day: '2-digit' })
    let longDate = formatDate(iSODate, 'long');

    let day = formatDate(iSODate, 'weekday');
    console.log('updated date');
    console.log(date, shortDate, longDate, day);

    localStorage.setItem("date", date);
    localStorage.setItem("day", day);
    localStorage.setItem("shortDate", shortDate);
    localStorage.setItem("longDate", longDate);

    // Select active button when clicking
    $(".delivery-date-button").removeClass("active");
    $(this).addClass("active");

    // Close date modal
    //document.querySelector('.date_switch_modal').style.display = 'none';

    // Update date
    dateChangeProject();

    chosenDate = date;
    updateFCDate();
    cartAvailability('check');

});

function cartAvailability(action) {
    console.log('starting cartAvailability for action: ', action);
}

function dateChangeProject() {
    date = localStorage.getItem("date");
    shortDate = localStorage.getItem("shortDate");
    longDate = localStorage.getItem("longDate");
    day = localStorage.getItem("day");

    $(".products-item-day-unavailable-value").text(day);
    $(".products-item-date-unavailable-value").text(date);

    // Update date button
    document.querySelector('.current_date').innerText = shortDate;

    // Update date modal text

    if (['Wednesday', 'Tuesday'].includes(day)) {
        document.querySelector('.disclaimer-date-midweek').style.display = 'flex';
        document.querySelector('.disclaimer-date-weekend').style.display = 'none';
    } else {
        document.querySelector('.disclaimer-date-weekend').style.display = 'flex';
        document.querySelector('.disclaimer-date-midweek').style.display = 'none';
    }


    $(".products-item").each(function () {
        $(this).show();
        $(this).find(".products-item-add-to-cart").hide();
        $(this).find(".products-item-out-of-stock").hide();
        var dayAvailable = $(this).find(".delivery-" + day.toLowerCase()).text();
        var deliveryDate1 = $(this).find(".delivery-date-1").text();
        var deliveryDate2 = $(this).find(".delivery-date-2").text();
        var deliveryDate3 = $(this).find(".delivery-date-3").text();
        var deliveryDate4 = $(this).find(".delivery-date-4").text();
        var deliveryDate1Inventory = $(this).find(".delivery-date-1-inventory").text();
        var deliveryDate2Inventory = $(this).find(".delivery-date-2-inventory").text();
        var deliveryDate3Inventory = $(this).find(".delivery-date-3-inventory").text();
        var deliveryDate4Inventory = $(this).find(".delivery-date-4-inventory").text();
        var addToCartHref = $(this).find(".products-item-add-to-cart a").attr("href");

        if (deliveryDate1 == date) {
            var inventory = deliveryDate1Inventory;
        } else if (deliveryDate2 == date) {
            var inventory = deliveryDate2Inventory;
        } else if (deliveryDate3 == date) {
            var inventory = deliveryDate3Inventory;
        } else if (deliveryDate4 == date) {
            var inventory = deliveryDate4Inventory;
        }

        if (dayAvailable == "true") {
            if (inventory > "0") {
                $(this).find(".products-item-add-to-cart").show();
                // $(this).find('input[name="quantity_max"]').val(inventory);
                $(this).find(".products-item-add-to-cart a").attr("href", addToCartHref + '&quantity_max=' + inventory);
            } else {
                $(this).find(".products-item-out-of-stock").show();
            }
        } else if (dayAvailable == "false") {
            $(this).hide();
        }
    });
}

function formatDate(date, format) {
    const weekday = date.toLocaleString('en-us', { weekday: 'long' });
    const shortMonth = date.toLocaleString('en-us', { month: 'short' });
    const longMonth = date.toLocaleString('en-us', { month: 'long' });
    const year = date.getFullYear();
    const monthdayshort = date.toLocaleString('en-us', { day: 'numeric' });
    const monthdaylong = date.toLocaleString('en-us', { day: '2-digit' });

    const long = (`${weekday}, ${longMonth} ${monthdayshort}, ${year}`);
    const inventoryDate = (`${shortMonth} ${monthdaylong}, ${year}`);

    if (format == 'long') {
        return long;
    } else if (format == 'weekday') {
        return weekday;
    } else {
        return inventoryDate;
    }
}

function checkInventory(action) {
    console.log('checking inventory');
}

function displayDatePopUp() {
    var x = document.querySelector('#datePopUp');
    if (x.style.display === 'flex') {
        x.style.display = 'none';
    } else {
        x.style.display = 'flex';
        // FC.cart.updateItemQuantity();
    }
}

function deleteChild() {
    console.log('children not deleted');
    // var e = unavailableItemsList;

    // //e.firstElementChild can be used.
    // var child = e.lastElementChild;
    // while (child) {
    //   e.removeChild(child);
    //   child = e.lastElementChild;
    // }
}

const removeItemsButton = document.querySelector('.switch-date-button');
removeItemsButton?.addEventListener('click', function () {
    console.log('Remove items button!');
    removeItemsNotAvailable();
});

const switchDateClose = document.querySelector('.switch-date-close');
switchDateClose?.addEventListener('click', function () {
    console.log('Closing button!');
    displayDatePopUp();
});

function removeItemsNotAvailable() {
    const cartItems = FC.json.items;

    // // Toggle Classes
    // if (chosenDate.includes(firstDeliveryDate.text)) {
    //     firstDeliveryDate.classList.add("active");
    //     secondDeliveryDate.classList.remove("active");
    // } else if (chosenDate.includes(secondDeliveryDate.text)) {
    //     firstDeliveryDate.classList.remove("active");
    //     secondDeliveryDate.classList.add("active");
    // }

    remove = 'remove';
    checkInventory(remove);
}
