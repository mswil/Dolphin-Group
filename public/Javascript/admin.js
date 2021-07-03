const addFormEl = document.querySelector('.add-form');
const editFormEl = document.querySelector('.edit-form');
const deleteFormEl = document.querySelector('.delete-form');

async function addItemFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="add-name"]').value.trim();
    const description = document.querySelector('textarea[name="add-description"]').value.trim();
    const in_stock = document.querySelector('input[name="add-in-stock"]').value.trim();
    const price = document.querySelector('input[name="add-price"]').value.trim();

    if (!name) {
        alert('Item Name is empty');
        return;
    }

    if (!in_stock) {
        alert('# In Stock is empty');
        return;
    }

    if (!price) {
        alert('Price is empty');
        return;
    }

    const response = await fetch('/api/items', {
        method: 'post',
        body: JSON.stringify({
            name,
            description,
            in_stock,
            price
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    const responseBody = await response.json();

    if (response.ok) {
        document.location.replace('/admin');
    }
    else if (responseBody?.message) {
        alert(responseBody.message);
    }
    else {
        alert(response.statusText);
    }
}

async function editItemFormHandler(event) {
    event.preventDefault();

    const itemID = document.querySelector('select[name="edit-item"]').value.trim();
    const name = document.querySelector('input[name="edit-name"]').value.trim();
    const description = document.querySelector('textarea[name="edit-description"]').value.trim();
    const in_stock = document.querySelector('input[name="edit-in-stock"]').value.trim();
    const price = document.querySelector('input[name="edit-price"]').value.trim();

    if (!itemID) {
        alert('Select the item you wish to edit');
        return;
    }

    if (!name) {
        alert('Item Name is empty');
        return;
    }

    if (!in_stock) {
        alert('# In Stock is empty');
        return;
    }

    if (!price) {
        alert('Price is empty');
        return;
    }

    const response = await fetch(`/api/items/${itemID}`, {
        method: 'put',
        body: JSON.stringify({
            name,
            description,
            in_stock,
            price
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    const responseBody = await response.json();

    if (response.ok) {
        document.location.replace('/admin');
    }
    else if (responseBody?.message) {
        alert(responseBody.message);
    }
    else {
        alert(response.statusText);
    }
}

async function deleteItemFormHandler(event) {
    event.preventDefault();

    const itemID = document.querySelector('select[name="delete-item"]').value.trim();

    if (!itemID) {
        alert('Select the item you wish to remove');
        return;
    }

    const response = await fetch(`/api/items/${itemID}`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    });

    const responseBody = await response.json();

    if (response.ok) {
        document.location.replace('/admin');
    }
    else if (responseBody?.message) {
        alert(responseBody.message);
    }
    else {
        alert(response.statusText);
    }
}

const showFormEl = showForm => {
    switch (showForm) {
        case 'add':
            addFormEl.classList.toggle('hidden')
            editFormEl.classList.add('hidden');
            deleteFormEl.classList.add('hidden');
            break
        case 'edit':
            editFormEl.classList.toggle('hidden');
            addFormEl.classList.add('hidden');
            deleteFormEl.classList.add('hidden');
            break
        case 'delete':
            deleteFormEl.classList.toggle('hidden');
            addFormEl.classList.add('hidden');
            editFormEl.classList.add('hidden');
            break
        default:
            addFormEl.classList.add('hidden');
            editFormEl.classList.add('hidden');
            deleteFormEl.classList.add('hidden');
    }
}

document.querySelector('.add-btn').addEventListener('click', () => showFormEl('add'));
document.querySelector('.edit-btn').addEventListener('click', () => showFormEl('edit'));
document.querySelector('.delete-btn').addEventListener('click', () => showFormEl('delete'));

document.querySelector('.add-form').addEventListener('submit', addItemFormHandler);
document.querySelector('.edit-form').addEventListener('submit', editItemFormHandler);
document.querySelector('.delete-form').addEventListener('submit', deleteItemFormHandler);
