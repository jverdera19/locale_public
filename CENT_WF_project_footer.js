// Checking Inventory
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

    // Check items not delivered on new date
    canShipOnDeliveryDay();

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
    }
  }

  function displayClearCartModal() {
    var x = document.querySelector('.clear_cart_modal');
    if (x.style.display === 'flex') {
      x.style.display = 'none';
    } else {
      x.style.display = 'flex';
    }
  }

  function displayClearRegionModal() {
    var x = document.querySelector('.clear_region_modal');
    if (x.style.display === 'flex') {
      x.style.display = 'none';
    } else {
      x.style.display = 'flex';
    }
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

  const clearCartButton = document.querySelector('#clear_cart_button')
  clearCartButton.addEventListener('click', function() {
    removeItemsNotAvailable();
  });

  const continueShoppingOnClearCart = document.querySelectorAll('.next-button')[0];
  continueShoppingOnClearCart.addEventListener('click', function() {
    revertSelectedDate();
  });

  function revertSelectedDate() {
    previousDate = localStorage.getItem("previousDate");
    $(`.delivery-date-button:contains(${previousDate})`).click();
  }

  function canShipOnDeliveryDay() {
    const cartItems = FC.json.items;
    const lowerCaseDay = day.toLowerCase();

    let unavailableItemsList = document.querySelector('#clear_cart_list')
    unavailableItemsList.innerHTML = '';

    for (var i = 0; i < FC.json.items.length; i++) {
      const current = cartItems[i];
      const deliveryDayIndex = current.options.findIndex(object => object.class === `${lowerCaseDay}_delivery`);

      const deliveryDateIndex = current.options.findIndex(object => object.value === date);
      const deliveryDate = current.options[deliveryDateIndex].class;
      const inventoryIndex = current.options.findIndex(object => object.class === `${deliveryDate}_inventory`);
      let currentInventory = current.options[inventoryIndex].value;

      console.log(`inventory for ${current.name}: `, currentInventory);

      if (current.name !== "Tip" && current.name !== "Small Order Fee") {
        if (deliveryDayIndex == -1) {
          let li = document.createElement("li");
          li.innerText = current.name;
          unavailableItemsList.appendChild(li);
          console.log("items not avail:", current.name);
        } else if (current.options[deliveryDayIndex].value === 'false') {
          let li = document.createElement("li");
          li.innerText = current.name;
          unavailableItemsList.appendChild(li);
          console.log("items not avail:", current.name);
        }
      }
    }

    if (unavailableItemsList.innerHTML != '') {
      document.querySelector('.date_switch_modal').style.display = 'none'
      document.querySelector('.clear_cart_modal').style.display = 'flex'
    }

  }

  function removeItemsNotAvailable() {
    const cartItems = FC.json.items;
    const lowerCaseDay = day.toLowerCase();

    for (var i = 0; i < FC.json.items.length; i++) {
      const current = cartItems[i];

      const deliveryDayIndex = current.options.findIndex(object => object.class === `${lowerCaseDay}_delivery`);
      if (current.name !== "Tip" && current.name !== "Small Order Fee") {
        if (deliveryDayIndex == -1) {
          FC.client.request('https://' + FC.settings.storedomain + '/cart?&cart=update&quantity=0&id=' + current.id).done(function (dataJSON) {
            FC.cart.updateItemQuantity();
            console.log("items deleted:", current.name);
          });
        } else if (current.options[deliveryDayIndex].value === 'false') {
          FC.client.request('https://' + FC.settings.storedomain + '/cart?&cart=update&quantity=0&id=' + current.id).done(function (dataJSON) {
            FC.cart.updateItemQuantity();
            console.log("items deleted:", current.name);
          });
        }
      }
    }

    document.querySelector('.clear_cart_modal').style.display = 'none'
  }
