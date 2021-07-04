
async function checkUserHasOrder() {
  console.log('check has order')
  const response = await fetch('api/users/id');

  if (!response.ok) {
    alert(response.statusText);
    return;
  }

  const userData = await response.json();

  if (!userData.orders.length) {
    const response = await fetch('api/orders', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    });
    const newOrder = await response.json();
    return newOrder
  }
  console.log(userData);
  return userData.orders[userData.orders.length - 1];
};

async function addItemtoOrder(event) {
  event.preventDefault();

  const order = await checkUserHasOrder();
  const itemId = parseInt(event.target.getAttribute('data-item-id'));

  const duplicateItem = order.items.find(item => item.order_items.item_id === itemId)

  if (duplicateItem) {
    const response = await fetch(`api/orders/update-item-amount/${duplicateItem.order_items.id}`, {
      method: 'put',
      body: JSON.stringify({
        amount_ordered: ++duplicateItem.order_items.amount_ordered
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    const responseBody = await response.json();

    if (response.ok) {
      document.location.replace('/cart');
    }
    else if (responseBody?.message) {
      alert(responseBody.message);
    }
    else {
      alert(response.statusText);
    }
  }
  else {
    const response = await fetch('api/orders/add-item', {
      method: 'post',
      body: JSON.stringify({
        item_id: itemId,
        order_id: order.order_id,
        amount_ordered: 1
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    const responseBody = await response.json();

    if (response.ok) {
      document.location.replace('/cart');
    }
    else if (responseBody?.message) {
      alert(responseBody.message);
    }
    else {
      alert(response.statusText);
    }
  }
}

document.getElementById('#item-section').addEventListener('click', addItemtoOrder)
