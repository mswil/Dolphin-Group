let removeBtnel = document.querySelector('.btnControl');

async function removeItem(event) {
  event.preventDefault();
  let itemID = event.target.getAttribute('id');
  if (!itemID) return;
  else {
    const response = await fetch(`/api/orders/remove-item/${itemID}`, {
      method: 'DELETE',
    });
    const responseBody = await response.json();

    if (response.ok) {
      document.location.replace('/cart');
    } else if (responseBody?.message) {
      alert(responseBody.message);
    } else {
      alert(response.statusText);
    }
  }
}

document.getElementById('order-table').addEventListener('click', removeItem);
