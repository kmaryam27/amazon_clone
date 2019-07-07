/**
 * to get all the data in database and call render function
 */
const runDataList = function() {
  $.ajax({ url: '/database', method: 'GET' }).then(function(e) {
    cartRenderFunc(e);
  });
};
/**
 * to render the value related to data base on the page
 * @param {Array} InventoryList all the json data in mongoose database
 */
const cartRenderFunc = function(InventoryList) {
  let cartSubtotal = 0;
  InventoryList.forEach(e => {
    let renderQty = parseFloat(sessionStorage.getItem(`${e._id}`)) || 0;
    $(`#${e._id}`).text(`${renderQty}`);
    cartSubtotal += renderQty * e.itemPrice;
    if (e.itemCount < renderQty) {
      cartSubtotal -= (renderQty - e.itemCount) * e.itemPrice;
      sessionStorage.setItem(`${e._id}`, e.itemCount);
      renderQty = e.itemCount;
      $(`#${e._id}`).text(`Only ${renderQty} left`);
      if (e.itemCount === 0) {
        console.log('in 0' + e.itemCount);
        $(`#${e._id}stock`).text('Not in Stock');
      } else {
        $(`#${e._id}stock`).text(`Only ${e.itemCount} left`);
      }
    } else {
      $(`#${e._id}stock`).text('In Stock');
    }
  });

  $(`.cartSubtotal`).text(`${cartSubtotal}`);
};
runDataList();

/**
 * to increse quantity in cart (session storage)
 * @param {none}
 */

const cartIncFunc = function() {
  const productID = $(this).attr('data-id');
  const incStep = parseFloat($(`#cartSelect${productID}`).val());
  let tempCart = parseFloat(sessionStorage.getItem(`${productID}`)) || 0;
  tempCart += incStep;
  sessionStorage.setItem(`${productID}`, tempCart);
  let inCart = false;
  if (sessionStorage.getItem(`${productID}`) !== '0') {
    inCart = true;
  }
  const updateEntry = {
    itemInCart: inCart
  };
  $.ajax({
    url: `/cartUpdate/${productID}`,
    method: 'PUT',
    data: updateEntry
  }).then(function(data) {
    if (data) {
      console.log('itemInCart successfully change');
    } else {
      console.log("There's some problem in put methord ");
    }
  });
};
$(document).on('click', '#cartIncBtn', cartIncFunc);

/**
 * to decrease quantity in cart (session storage)
 *
 */
const cartDecFunc = function() {
  const productID = $(this).attr('data-id');
  const decStep = parseFloat($(`#cartSelect${productID}`).val());
  let tempCart = parseFloat(sessionStorage.getItem(`${productID}`)) || 0;
  tempCart -= decStep;
  if (tempCart<=0){
    tempCart = 0;
  }
  sessionStorage.setItem(`${productID}`, tempCart);
  let inCart = false;
  if (sessionStorage.getItem(`${productID}`) !== '0') {
    inCart = true;
  }
  const updateEntry = {
    itemInCart: inCart
  };
  $.ajax({
    url: `/cartUpdate/${productID}`,
    method: 'PUT',
    data: updateEntry
  }).then(function(data) {
    if (data) {
      console.log('itemInCart successfully change');
    } else {
      console.log("There's some problem in put methord ");
    }
  });
  location.reload();
};
$(document).on('click', '#cartDecBtn', cartDecFunc);

/**
 * to get all the data in database
 * and call cartDBupdate function
 */
const cartOrderFunc = function() {
  $.ajax({ url: '/database', method: 'GET' }).then(function(e) {
    cartDBUpdate(e);
  });
};
/**
 * to update the data base and clear session storage
 * @param {Array} dataList all the json data in data base
 */
const cartDBUpdate = function(dataList) {
  dataList.forEach(e => {
    if (e.itemInCart === true) {
      const updateCount = e.itemCount - sessionStorage.getItem(`${e._id}`);
      const updateSold =
        parseFloat(sessionStorage.getItem(`${e._id}`)) + e.itemSold;
      const updateEntry = {
        itemInCart: false,
        itemCount: updateCount,
        itemSold: updateSold
      };
      sessionStorage.removeItem(`${e._id}`);

      $.ajax({
        url: `/cartUpdate/${e._id}`,
        method: 'PUT',
        data: updateEntry
      }).then(function(data) {
        if (data) {
          console.log('afterSold, database successfully change');
        } else {
          console.log("There's some problem in put methord ");
        }
      });
    }
  });
  alert('you have successfully placed the order');
  location.reload();
};
$(document).on('click', '#cartOrderBtn', cartOrderFunc);


