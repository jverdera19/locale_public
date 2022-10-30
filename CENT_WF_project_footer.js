// Checking Inventory
  const datePickerButtonArray = document.querySelectorAll('.delivery-date-picker-link');
  console.log('datePickerButtonArray:', datePickerButtonArray);

  let chosenDate = '';
  const unavailableItemsList = document.querySelector('#unavailableItems');

  // Good code
  $(".delivery-date-picker-link").click(function () {
    // get Inventory date and weekday
    let iSODate = new Date(this.innerText);
    let date = formatDate(iSODate, 'inventoryDate');
    let shortDate = iSODate.toLocaleString('en-us', { weekday: 'short', month: 'numeric', day: '2-digit' })
    let longDate = formatDate(iSODate, 'long');

    let day = formatDate(iSODate, 'weekday');
    console.log('updated date');
    console.log(date, shortDate, longDate, day);
    
    previousDate = localStorage.getItem("date");
    localStorage.setItem("previousDate", previousDate);

    localStorage.setItem("date", date);
    localStorage.setItem("day", day);
    localStorage.setItem("shortDate", shortDate);
    localStorage.setItem("longDate", longDate);

    console.log(date);
    console.log(`${date} got clicked NEW (Smart)!`);

    $(".delivery-date-picker-link").removeClass("active")
    this.classList.add('active');

    // Update date
    dateChangeProject();

    chosenDate = date;
    updateFCDate();
    action = 'check';
    //checkInventory(action);
  });

  // Refactoring date buttons event listener
  const deliveryDateButtons = document.querySelectorAll('.delivery-date-btn');

  for (const button of deliveryDateButtons) {
    button.addEventListener('click', function() {
      
      let dateText = button.firstChild.innerText;
      console.log(`clicked on ${dateText}`);

      // // get Inventory date and weekday
      let iSODate = new Date(dateText + ', 2022');
      console.log(iSODate);

      previousDate = localStorage.getItem("date");
      localStorage.setItem("previousDate", previousDate);
      console.log('previous date:', previousDate)
      
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
      $(".delivery-date-btn").removeClass("active");
      $(this).addClass("active");

      // Update date
      dateChangeProject();

      chosenDate = date;
      updateFCDate();
      cartAvailability('check');
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
    let currentDateDiv = document.querySelector('.current_date')

    if (currentDateDiv) {
      document.querySelector('.current_date').innerText = shortDate;
    } else {
        console.log('it doesnt exist!')
    }
    
    // Check items not delivered on new date
    canShipOnDeliveryDay();

    // Update date modal text
    let discMidweek = document.querySelector('.disclaimer-date-midweek')
    let discWeekend = document.querySelector('.disclaimer-date-weekend');

    if (discMidweek) {
      if (['Wednesday', 'Tuesday'].includes(day)) {
        discMidweek.style.display = 'flex';
        discWeekend.style.display = 'none';
      } else {
        discWeekend.style.display = 'flex';
        discMidweek.style.display = 'none';
      }
    }
    
    $(".products-item").each(function () {
      $(this).show();
      $(this).find(".products-item-add-to-cart").hide();
      $(this).find(".products-item-out-of-stock").hide();
      $(this).find(".products-item-day-unavailable").hide();
      
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

      if (inventory >= 0) {
        var dayAvailable = "true";
      } else {
        var dayAvailable = "false";
        console.log(`Inventory: for ${$(this).find(".pc_name").text()}`, inventory);
      }

      if (dayAvailable == "true") {
        if (inventory > "0") {
          $(this).find(".products-item-add-to-cart").show();
          $(this).find(".products-item-add-to-cart a").attr("href", addToCartHref + '&quantity_max=' + inventory);
        } else {
          $(this).find(".products-item-out-of-stock").show();
        }
      } else if (dayAvailable == "false") {
        if (window.location.pathname.match(/all-vendors/) || window.location.pathname.match(/find/) || window.location.pathname.match(/product/)) {
          $(this).find(".products-item-day-unavailable").show();
        } else {
          $(this).hide();
        }
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
    previousDate = localStorage.getItem("previousDate")
    console.log('previousDate', previousDate);
    // $(`.delivery-date-btn:contains(${previousDate})`).click();
    //const deliveryDateButtons = document.querySelectorAll('.delivery-date-btn');

    for (const button of deliveryDateButtons) {
      let dateText = button.firstChild.innerText;
      let dateTextFormatted = new Date(dateText + ', 2022');
      let goodDate = formatDate(dateTextFormatted);
      console.log('goodDate:', goodDate);


      if (goodDate == previousDate) {
        //button.click()
        
        // // get Inventory date and weekday
        let iSODate = new Date(dateText + ', 2022');
        

        previousDate = localStorage.getItem("date");
        console.log('previousDate', previousDate);
        localStorage.setItem("previousDate", previousDate);
        
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
        $(".delivery-date-btn").removeClass("active");
        button.classList.add('active');

        // Update date
        dateChangeProject();

        chosenDate = date;
        updateFCDate();
        cartAvailability('check');

        return;
      } 
    }

    // previousInvDate = new Date(previousDate)
    // $(`.delivery-date-picker-link:contains(${formatDate(previousInvDate)})`).click();
  }

  function canShipOnDeliveryDay() {
    const cartItems = FC.json.items;
    const lowerCaseDay = day.toLowerCase();

    let unavailableItemsList = document.querySelector('#clear_cart_list')
    unavailableItemsList.innerHTML = '';

    for (var i = 0; i < FC.json.items.length; i++) {
      const current = cartItems[i];
      //const deliveryDayIndex = current.options.findIndex(object => object.class === `${lowerCaseDay}_delivery`);

      const deliveryDateIndex = current.options.findIndex(object => object.value === date);
      const deliveryDate = current.options[deliveryDateIndex]?.class;
      const inventoryIndex = current.options.findIndex(object => object.class === `${deliveryDate}_inventory`);
      let currentInventory = current.options[inventoryIndex]?.value;

      console.log(`inventory for ${current.name}: `, currentInventory);

      if (current.name !== "Tip" && current.name !== "Small Order Fee") {
        if (currentInventory <= 0) {
          let li = document.createElement("li");
          li.innerText = current.name;
          unavailableItemsList.appendChild(li);
          console.log("items not avail:", current.name);
        }
      }
    }

    // if (unavailableItemsList.innerHTML != '') {
    //   if (document.querySelector('.date_switch_modal')) {
    //     document.querySelector('.date_switch_modal').style.display = 'none'
    //   }
    //   document.querySelector('.clear_cart_modal').style.display = 'flex'
    // }
  }

  function removeItemsNotAvailable() {
    const cartItems = FC.json.items;
    

    for (var i = 0; i < FC.json.items.length; i++) {
      const current = cartItems[i];

      const deliveryDateIndex = current.options.findIndex(object => object.value === date);
      const deliveryDate = current.options[deliveryDateIndex]?.class;
      const inventoryIndex = current.options.findIndex(object => object.class === `${deliveryDate}_inventory`);
      let currentInventory = current.options[inventoryIndex]?.value;

      
      if (current.name !== "Tip" && current.name !== "Small Order Fee") {
        if (currentInventory <= 0) {
          FC.client.request('https://' + FC.settings.storedomain + '/cart?&cart=update&quantity=0&id=' + current.id).done(function (dataJSON) {
            FC.cart.updateItemQuantity();
            console.log("items deleted:", current.name);
            if (window.location.pathname.match(/review-order/)) {
              console.log('clearing items in review page');
              createCartItems();
              removeDuplicates();
              updateProgressBar();
            }
          });
        }
      }
    }

    document.querySelector('.clear_cart_modal').style.display = 'none'
    
    
  }
