$(document).ready(function () {
  $(".w-condition-invisible").each(function () {
    $(this).remove();
  });

  $(".products-item-day-unavailable").hide();
  $(".products-item-out-of-stock").hide();

  var storedDate = localStorage.getItem("date");
  var storedRegion = localStorage.getItem("region");
  var currentRegion = "Bay Area";

  checkDate();
  dateChange();

  function checkDate() {
    let storedDate = localStorage.getItem("date");
    let dates = [];

    $(".delivery-date-btn .date-numbers").each(function () {
      var innerText = $(this).text();

      let dateTextFormatted = new Date(innerText + ", 2022");
      let goodDate = formatDate(dateTextFormatted);
      console.log("goodDate:", goodDate);
      console.log("innerText:", innerText);
      dates.push(goodDate);
    });

    if (dates.includes(storedDate) == true) {
      console.log("Date valid");
      checkRegion();
    } else {
      console.log("Resetting date");
      storedRegion = "";
      checkRegion();
    }
  }

  function checkRegion() {
    if (storedRegion != currentRegion) {
      let iSODate = new Date("Nov 19, 2022");
      let shortDate = iSODate.toLocaleString("en-us", {
        weekday: "short",
        month: "numeric",
        day: "2-digit",
      });
      let longDate = formatDate(iSODate, "long");
      let date = formatDate(iSODate, "inventoryDate");
      let day = iSODate.toLocaleString("en-us", { weekday: "long" });

      console.log("date: ", date, "day:", day);

      localStorage.setItem("date", date);
      localStorage.setItem("shortDate", shortDate);
      localStorage.setItem("longDate", longDate);
      localStorage.setItem("day", day);
      localStorage.setItem("region", currentRegion);

      // Update date button value
      document.querySelector(".current_date").innerText = shortDate;

      // Mark first date as active
      $(".delivery-date-btn").first().addClass("active");
    } else if (storedRegion == currentRegion) {
      date = localStorage.getItem("date");
      shortDate = localStorage.getItem("shortDate");
      longDate = localStorage.getItem("longDate");
      day = localStorage.getItem("day");

      console.log("date: ", date, "day:", day);

      $(".products-item-day-unavailable-value").text(day);
      $(".products-item-date-unavailable-value").text(date);

      // Update date button value
      document.querySelector(".current_date").innerText = shortDate;

      // Mark selected date as active
      const deliveryDateButtons =
        document.querySelectorAll(".delivery-date-btn");
      for (const button of deliveryDateButtons) {
        let dateText = button.firstChild.innerText;
        let dateTextFormatted = new Date(dateText + ", 2022");
        let goodDate = formatDate(dateTextFormatted);
        console.log("goodDate:", goodDate);

        // Select active button of stored date
        if (goodDate == localStorage.getItem("date")) {
          $(".delivery-date-btn").removeClass("active");
          button.classList.add("active");
        }
      }
    }
  }

  $(".products-item-unavailable-link").click(function () {
    document.querySelector(".date_switch_modal").style.display = "flex";
  });

  function dateChange() {
    date = localStorage.getItem("date");
    shortDate = localStorage.getItem("shortDate");
    longDate = localStorage.getItem("longDate");
    day = localStorage.getItem("day");

    $(".products-item-day-unavailable-value").text(day);
    $(".products-item-date-unavailable-value").text(date);

    // Update date button
    document.querySelector(".current_date").innerText = shortDate;

    $(".products-item, .collection-item-24").each(function () {
      $(this).show();
      $(this).find(".products-item-add-to-cart").hide();
      $(this).find(".products-item-out-of-stock").hide();
      $(this).find(".products-item-day-unavailable").hide();

      var deliveryDate1 = $(this).find(".delivery-date-1").text();
      var deliveryDate2 = $(this).find(".delivery-date-2").text();
      var deliveryDate3 = $(this).find(".delivery-date-3").text();
      var deliveryDate4 = $(this).find(".delivery-date-4").text();
      var deliveryDate5 = $(this).find(".delivery-date-5").text();
      var deliveryDate6 = $(this).find(".delivery-date-6").text();
      var deliveryDate7 = $(this).find(".delivery-date-7").text();
      var deliveryDate8 = $(this).find(".delivery-date-8").text();
      var deliveryDate9 = $(this).find(".delivery-date-9").text();
      var deliveryDate10 = $(this).find(".delivery-date-10").text();
      var deliveryDate11 = $(this).find(".delivery-date-11").text();

      var deliveryDate1Inventory = $(this)
        .find(".delivery-date-1-inventory")
        .text();
      var deliveryDate2Inventory = $(this)
        .find(".delivery-date-2-inventory")
        .text();
      var deliveryDate3Inventory = $(this)
        .find(".delivery-date-3-inventory")
        .text();
      var deliveryDate4Inventory = $(this)
        .find(".delivery-date-4-inventory")
        .text();
      var deliveryDate5Inventory = $(this)
        .find(".delivery-date-5-inventory")
        .text();
      var deliveryDate6Inventory = $(this)
        .find(".delivery-date-6-inventory")
        .text();
      var deliveryDate7Inventory = $(this)
        .find(".delivery-date-7-inventory")
        .text();
      var deliveryDate8Inventory = $(this)
        .find(".delivery-date-8-inventory")
        .text();
      var deliveryDate9Inventory = $(this)
        .find(".delivery-date-9-inventory")
        .text();
      var deliveryDate10Inventory = $(this)
        .find(".delivery-date-10-inventory")
        .text();
      var deliveryDate11Inventory = $(this)
        .find(".delivery-date-11-inventory")
        .text();

      var addToCartHref = $(this)
        .find(".products-item-add-to-cart a")
        .attr("href");

      if (deliveryDate1 == date) {
        var inventory = deliveryDate1Inventory;
      } else if (deliveryDate2 == date) {
        var inventory = deliveryDate2Inventory;
      } else if (deliveryDate3 == date) {
        var inventory = deliveryDate3Inventory;
      } else if (deliveryDate4 == date) {
        var inventory = deliveryDate4Inventory;
      } else if (deliveryDate5 == date) {
        var inventory = deliveryDate5Inventory;
      } else if (deliveryDate6 == date) {
        var inventory = deliveryDate6Inventory;
      } else if (deliveryDate7 == date) {
        var inventory = deliveryDate7Inventory;
      } else if (deliveryDate8 == date) {
        var inventory = deliveryDate8Inventory;
      } else if (deliveryDate9 == date) {
        var inventory = deliveryDate9Inventory;
      } else if (deliveryDate10 == date) {
        var inventory = deliveryDate10Inventory;
      } else if (deliveryDate11 == date) {
        var inventory = deliveryDate11Inventory;
      }

      // if inventory = null, product doesn't ship on that day
      if (inventory == "") {
        var dayAvailable = "false";
      } else if (inventory >= 0) {
        var dayAvailable = "true";
        console.log("Inventory:", inventory);
      } else {
        var dayAvailable = "false";
        console.log("Inventory:", inventory);
      }

      if (dayAvailable == "true") {
        if (inventory > "0") {
          $(this).find(".products-item-add-to-cart").show();
          // $(this).find('input[name="quantity_max"]').val(inventory);
          $(this)
            .find(".products-item-add-to-cart a")
            .attr("href", addToCartHref + "&quantity_max=" + inventory);
        } else {
          $(this).find(".products-item-out-of-stock").show();
        }
      } else if (dayAvailable == "false") {
        $(this).hide();
      }
    });
  }

  function formatDate(date, format) {
    const weekday = date.toLocaleString("en-us", { weekday: "long" });
    const shortMonth = date.toLocaleString("en-us", { month: "short" });
    const longMonth = date.toLocaleString("en-us", { month: "long" });
    const year = date.getFullYear();
    const monthdayshort = date.toLocaleString("en-us", { day: "numeric" });
    const monthdaylong = date.toLocaleString("en-us", { day: "2-digit" });

    const long = `${weekday}, ${longMonth} ${monthdayshort}, ${year}`;
    const inventoryDate = `${shortMonth} ${monthdaylong}, ${year}`;

    if (format == "long") {
      return long;
    } else if (format == "weekday") {
      return weekday;
    } else {
      return inventoryDate;
    }
  }
});
