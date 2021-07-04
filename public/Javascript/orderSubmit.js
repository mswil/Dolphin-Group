async function submitOrder(event) {
  event.preventDefault();
  //execute the code on server side
  const response = await fetch('api/orders/place-order');

  const userData = await response.json();
  console.log(userData);
}

const submitBtn = document.getElementById('placeOrder');
submitBtn.addEventListener('click', submitOrder);
