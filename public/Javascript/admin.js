const addFormEl = document.querySelector('.add-form');
const editFormEl = document.querySelector('.edit-form');

async function addItemFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#add-name').value.trim();
    const description = document.querySelector('#add-description').value.trim();
    const in_stock = document.querySelector('#add-in-stock').value.trim();
    const price = document.querySelector('#add-price').value.trim();

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
    console.log(responseBody);

    if (response.ok) {
        // document.location.replace('/admin');
    }
    else if (responseBody?.message) {
        alert(responseBody.message);
    }
    else {
        alert(response.statusText);
    }
}

const showEditForm = () => {
    editFormEl.classList.toggle('hidden')
}


const showFormEl = showForm => {
    console.log('click')
    switch (showForm) {
        case 'add':
            console.log('add')
            addFormEl.classList.remove('hidden');
            editFormEl.classList.add('hidden');
            break
        case 'edit':
            console.log('edit')
            editFormEl.classList.remove('hidden');
            addFormEl.classList.add('hidden');
            break
        default:
            console.log('default')
            addFormEl.classList.add('hidden');
            editFormEl.classList.add('hidden');
    }
}

document.querySelector('.add-btn').addEventListener('click',() =>  showFormEl('add'));
document.querySelector('.edit-btn').addEventListener('click', () => showFormEl('edit'));

// document.querySelector('#add').addEventListener('submit', addItemFormHandler);
