async function orderHandler(event) {
  event.preventDefault();
  let itemID = event.target.getAttribute('data-item-id');
  // console.log(itemID);

  // fetch order for logic implementation
  // set a variable to hold data, check if it exists before fetching
  // Prevents repetitive api calls, variable will flush when page changes
  let userData;
  let orderData;
  let orderID;
  const response = await fetch('api/users/id');
  if (response.ok) {
    userData = await response.json();

    console.log(userData);
  } else {
    alert('Error');
  }
  orderData = userData.orders[0];
  if (!orderData) {
    console.log('create the order');
    // expects {"user_id": #}
    const response = await fetch('api/orders', {
      method: 'POST',
      body: JSON.stringify({ userData }),
      headers: { 'Content-Type': 'application/json' },
    });
    let CreateOrderRes = await response.json();
    console.log(CreateOrderRes);
  } else {
    console.log('update the order');
    // expects {"item_id": #, "order_id": #, "amount_ordered": #}
    itemsInOrder = orderData.items;
    orderID = orderData.order_id;
    // console.log(itemsInOrder);
    // console.log(itemID);
    let itemExists;
    itemsInOrder.forEach((item) => {
      if (item.order_items.item_id === parseInt(itemID)) itemExists = true;
    });
    // console.log(itemExists);
    if (!itemExists) {
      const itemObj = {
        item_id: itemID,
        order_id: orderID,
        amount_ordered: 1,
      };
      const response = await fetch('api/orders/add-item', {
        method: 'POST',
        body: JSON.stringify(itemObj),
        headers: { 'Content-Type': 'application/json' },
      });
      let updateOrderRes = await response.json();
      console.log(updateOrderRes);
    }
  }
}

const itemSectionEl = document.getElementById('#item-section');
itemSectionEl.addEventListener('click', orderHandler);
