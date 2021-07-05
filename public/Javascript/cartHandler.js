const removeBtnel = document.querySelector('.btnControl');
const editEl = document.getElementById('edit-Amount');
const deleteBtnEl = document.querySelectorAll('.delete-btn');
const amtOrderedEls = document.querySelectorAll('#amount_ordered');
let que = amtOrderedEls.length;

async function updateFetchReq(ItemId, Amount) {
  const response = await fetch(`api/orders/update-item-amount/${ItemId}`, {
    method: 'put',
    body: JSON.stringify({
      amount_ordered: Amount,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  const responseBody = await response.json();

  if (response.ok) {
    console.log('updated');
  } else if (responseBody?.message) {
    alert(responseBody.message);
  } else {
    alert(response.statusText);
  }
  if (responseBody) {
    que--;
    console.log(que);
  }
  if (que == 0) {
    document.location.replace('/cart');
  }
  return;
}

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

const featureAlert = () => {
  alert('Feature is in development');
};

const editAmount = () => {
  //select ids of td containing amount ordered
  //query select all
  editEl.innerHTML = '<strong>Done</strong>';

  const numInput = document.createElement('input');
  Object.assign(numInput, {
    type: 'number',
    min: '1',
    max: '99',
  });

  //change contents to input number

  amtOrderedEls.forEach((el) => {
    numInput.setAttribute('value', el.textContent);
    el.removeChild(el.childNodes[0]);
    el.appendChild(numInput.cloneNode());
  });
  //get the input number, then update with a fetch on clicking done
  console.log(amtOrderedEls);

  editEl.removeEventListener('click', editAmount);
  editEl.addEventListener('click', (e) => {
    e.preventDefault();
    amtOrderedEls.forEach((el) => {
      let updatedAmount = el.childNodes[0].value;
      let updatedItemId = el.getAttribute('data');
      updateFetchReq(updatedItemId, updatedAmount);
    });
  });
};

document.getElementById('placeOrder').addEventListener('click', featureAlert);
editEl.addEventListener('click', editAmount);

deleteBtnEl.forEach((el) => {
  el.addEventListener('click', removeItem);
});
